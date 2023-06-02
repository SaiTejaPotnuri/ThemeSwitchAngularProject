import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CustomthemeService } from 'src/app/Services/customtheme.service';
import { customThemeChoosen } from 'src/app/states/usertheme.actions';
import { addNewThmeToList, updateThemeActiveStatus } from 'src/app/states/userthemelist.actions';
import { getThemesList } from 'src/app/states/userthemelist.selector';
import { appStoreState } from 'src/app/store/appStore.state';

@Component({
  selector: 'app-headerpage',
  templateUrl: './headerpage.component.html',
  styleUrls: ['./headerpage.component.scss']
})
export class HeaderpageComponent implements OnInit {
  myNewTheme: FormGroup
  colorPickerTheme1: FormGroup
  visible: boolean = false
  fetchedColors1: any
  themesColorFetchingStatus1: boolean;
  validateColorStatus: boolean = false
  lightAndDarkThemeStatus: boolean = false;
  pageRefreshStatus: boolean = false
  defaulthemesList: Array<any> = []
  makeDefaultThemeStatusForm1: FormGroup
  fetchDataFromEntireStore
  dummyObject
  darkOrLightThemeStatus


  images = {
    colorPicker: 'assets/Images/colorPickerIcon.png'
  }
  themeSubscription1: Subscription;
  themeSubscription2: Subscription;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customThemeService: CustomthemeService,
    private toasterService: ToastrService,
    private store: Store<appStoreState>


  ) {
    this.myNewTheme = this.fb.group({
      primaryColor: ['', [Validators.required]],
      secondaryColor: ['', [Validators.required]],
    })
    this.colorPickerTheme1 = this.fb.group({
      primaryColor11: ['', [Validators.pattern("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{1,3})$"), Validators.minLength(2), Validators.maxLength(7)]],
      secondaryColor11: ['', [Validators.pattern("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{1,3})$"), Validators.minLength(2), Validators.maxLength(7)]],
    })
    this.makeDefaultThemeStatusForm1 = this.fb.group({
      makeDefaultThemeStatus: ['']
    })

  }



  ngOnInit(): void {
    this.callFunctionsWhenLoaded()
  }

  logOut() {
    localStorage.removeItem('userInfo')
  }

  ngOnDestroy(): void {

    //In the above we are subscribed this is to unsubscribe
    if (this.themeSubscription1) {
      this.themeSubscription1.unsubscribe()
    }

    if (this.themeSubscription2) {
      this.themeSubscription2.unsubscribe()
    }


  }



  changeDefaultThemeList() {
    this.fetchAllDataFromStore()

    this.defaulthemesList = []

    let userChoosenThmes = this.fetchDataFromEntireStore.slice(-4)

    this.defaulthemesList = [...userChoosenThmes]

  }


  makeSwitchTrueOrFalse(){
    
    this.lightAndDarkThemeStatus = localStorage.getItem('themeType') === 'DARK' ? true : false
  }


  callFunctionsWhenLoaded() {


    this.visible = false
    this.fetchedColors1 = this.customThemeService.fetchPrimaryColor();
    this.themesColorFetchingStatus1 = true
    this.customThemeService.setNewTheme(this.fetchedColors1, this.themesColorFetchingStatus1, '');
    this.myNewTheme.patchValue(this.fetchedColors1)
    this.setValuesToTheForm(this.colorPickerTheme1, 'primaryColor11', this.fetchedColors1.primaryColor)
    this.setValuesToTheForm(this.colorPickerTheme1, 'secondaryColor11', this.fetchedColors1.secondaryColor)
    this.changeFontColors1();

    this.customThemeService.setPropertyValuesToCSSVariables('--headerFontColor', this.customThemeService.getFontColor(this.fetchedColors1.primaryColor))

    let dataFromLocal = this.customThemeService.fetchPrimaryAndSecondaryColorsFromLocalstorage()

    let { primaryColor, secondaryColor } = dataFromLocal

    if (localStorage.getItem('themeType') === 'DARK'){
      localStorage.setItem('themeType', 'DARK')

    }
    else if (localStorage.getItem('themeType') === 'LIGHT' && (primaryColor === '#5f5f63' && secondaryColor === '#000000') ){

      this.store.select('myThemePicker').subscribe((data)=>{
          if(data !== null){

            if (data.primaryColor === '#5f5f63' && data.secondaryColor === '#000000'){
              localStorage.setItem('themeType', 'DARK')

            }
            else{
              localStorage.setItem('themeType', 'LIGHT')

            }
          
          }
        
      })

    }
    else{
      localStorage.setItem('themeType', 'LIGHT')

    }

    let previouslyChoosenThemeDATA = JSON.parse(localStorage.getItem('previouslyChoosenTheme'))

    let defaultLightTheme = {
      primaryColor: previouslyChoosenThemeDATA.primaryColor,
      secondaryColor: previouslyChoosenThemeDATA.secondaryColor
    }

    localStorage.setItem('previouslyChoosenTheme', JSON.stringify(defaultLightTheme))

    this.makeSwitchTrueOrFalse()

    // fetches list of themes from store
    this.fetchAllDataFromStore()

 
    let fetchFromStoreList = this.fetchDataFromEntireStore.find(theme => theme.prime === dataFromLocal.primaryColor && theme.secondary === dataFromLocal.secondaryColor)


    if (fetchFromStoreList !== undefined) {

      let updateDefaultThemeActive = {
        id: fetchFromStoreList.id,
        prime: fetchFromStoreList.prime,
        secondary: fetchFromStoreList.secondary,
        active: true
      }

      this.store.dispatch(updateThemeActiveStatus({ themesStore: updateDefaultThemeActive }))
      this.defaulthemesList = this.fetchDataFromEntireStore

    }
    else {


      let updateDefaultThemeActive = {
        id: this.fetchDataFromEntireStore.length + 1,
        prime: dataFromLocal.primaryColor,
        secondary: dataFromLocal.secondaryColor,
        active: true
      }

      this.store.dispatch(addNewThmeToList({ themesStore: updateDefaultThemeActive }))
      this.changeDefaultThemeList()
    }


  }



  changeFontColors1() {
    this.customThemeService.fetchAndSetFontColors()
  }


  setValuesToTheForm(formGroupInfo, formControllerNameInfo, assigningValue) {
    formGroupInfo.get(formControllerNameInfo)?.setValue(assigningValue)
  }




  buttonClicked() {
    this.visible = !this.visible
    this.fetchedColors1 = this.customThemeService.fetchPrimaryColor();
    let updateThemEActive

    this.myNewTheme.patchValue(this.fetchedColors1)
    this.setValuesToTheForm(this.colorPickerTheme1, 'primaryColor11', this.fetchedColors1.primaryColor)
    this.setValuesToTheForm(this.colorPickerTheme1, 'secondaryColor11', this.fetchedColors1.secondaryColor)

    this.customThemeService.setPropertyValuesToCSSVariables('--primaryColor1', this.fetchedColors1.primaryColor)
    this.customThemeService.setPropertyValuesToCSSVariables('--secondaryColor1', this.fetchedColors1.secondaryColor)
    this.customThemeService.setPropertyValuesToCSSVariables('--headerFontColor', this.customThemeService.getFontColor(this.fetchedColors1.primaryColor))
    this.customThemeService.setPropertyValuesToCSSVariables('--fontColor1', this.customThemeService.getFontColor(this.fetchedColors1.secondaryColor))



    let fetchedrecord = this.fetchDataFromEntireStore.find(theme => theme.prime === this.fetchedColors1.primaryColor && theme.secondary === this.fetchedColors1.secondaryColor)

    if (fetchedrecord !== undefined){

       updateThemEActive = {
        id: fetchedrecord.id,
        prime: fetchedrecord.prime,
        secondary: fetchedrecord.secondary,
        active: true
      }

      this.store.dispatch(updateThemeActiveStatus({ themesStore: updateThemEActive }))

    }
    this.changeDefaultThemeList()

  }


  fetchAllDataFromStore() {

    this.store.select(getThemesList).subscribe((data) => {
      this.fetchDataFromEntireStore = [...data]

    })
  }



  newThemeInDashboard(themeDetails) {

    this.visible = true
    let addNewThemeToListObject
   
    let { primaryColor, secondaryColor } = themeDetails;
    this.themesColorFetchingStatus1 = false

    if (primaryColor !== '#5f5f63' || secondaryColor !== '#000000') {
      
      localStorage.setItem('themeType', 'LIGHT')
      localStorage.setItem('previouslyChoosenTheme', JSON.stringify(themeDetails))

    }
    else {
      localStorage.setItem('themeType', 'DARK')

    }

    this.makeSwitchTrueOrFalse()




    if (primaryColor.charAt(0) !== '#' || secondaryColor.charAt(0) !== '#') {
      primaryColor = this.customThemeService.fetchTextToHexaCode(primaryColor)
      secondaryColor = this.customThemeService.fetchTextToHexaCode(secondaryColor)
    }

    themeDetails.primaryColor.length <= 3 ? themeDetails.primaryColor = '#' + this.customThemeService.fetchHexaCode(primaryColor) : themeDetails.primaryColor = primaryColor
    themeDetails.secondaryColor.length <= 3 ? themeDetails.secondaryColor = '#' + this.customThemeService.fetchHexaCode(secondaryColor) : themeDetails.secondaryColor = secondaryColor


    // fetch all data from store 
    this.fetchAllDataFromStore()


    addNewThemeToListObject = {
      id: this.fetchDataFromEntireStore.length + 1,
      prime: themeDetails.primaryColor,
      secondary: themeDetails.secondaryColor,
      active: true
    }


    //assigning to the store
    //------------------------------------
    this.store.dispatch(customThemeChoosen({ customThemeData: themeDetails }))
    // storing values in a list


    let findExistTheme = this.fetchDataFromEntireStore.find(theme => theme.prime === addNewThemeToListObject.prime && theme.secondary === addNewThemeToListObject.secondary)

    if (findExistTheme === undefined) {
      this.store.dispatch(addNewThmeToList({ themesStore: addNewThemeToListObject }))
    }
    else {
      this.store.dispatch(updateThemeActiveStatus({ themesStore: addNewThemeToListObject }))
    }

    //----------------------------------




    let defaultStatus = this.makeDefaultThemeStatusForm1.get('makeDefaultThemeStatus')?.value !== null ? this.makeDefaultThemeStatusForm1.get('makeDefaultThemeStatus')?.value[0] : ''

    this.customThemeService.setNewTheme(themeDetails, this.themesColorFetchingStatus1, defaultStatus);


    if (themeDetails.primaryColor !== '#5f5f63' && themeDetails.secondaryColor !== '#000000') {
      localStorage.setItem('previouslyChoosenTheme', JSON.stringify(themeDetails))
    }

    this.makeDefaultThemeStatusForm1.reset()
    this.visible = !this.visible

    //assigning last four Objects to choose Default themes
    this.changeDefaultThemeList()


  }




  applyingColorsToInput1(colorData, colorPickerFormController, customThemeControlername) {

    let colorData1

    if (colorData.charAt(0) === '#' && (colorData.length <= 4 || colorData.length === 7)) {

      let check = "#" + this.customThemeService.fetchHexaCode(colorData)

      if (CSS.supports('color', check)) {
        colorData1 = check
        this.validateColorStatus = true
      }
      else {
        this.myNewTheme.controls[customThemeControlername].setErrors({ 'incorrect': true });
      }
    }
    else if (colorData.charAt(0) !== '#' && CSS.supports('color', colorData)) {

      colorData1 = this.customThemeService.fetchTextToHexaCode(colorData);
      this.validateColorStatus = true
    }
    else {
      this.validateColorStatus = false
      //making form controler invalid 
      this.myNewTheme.controls[customThemeControlername].setErrors({ 'incorrect': true });

    }


    if (this.validateColorStatus) {
      if (customThemeControlername === "primaryColor") {

        this.customThemeService.setPropertyValuesToCSSVariables('--primaryColor1', colorData1)
        this.customThemeService.setPropertyValuesToCSSVariables('--headerFontColor', this.customThemeService.getFontColor(colorData1))
        //   this.customThemeService.setPropertyValuesToCSSVariables('--headerFontColor', this.customThemeService.getFontColor(colorData))
      }
      else {

        this.customThemeService.setPropertyValuesToCSSVariables('--secondaryColor1', colorData1)
        this.customThemeService.setPropertyValuesToCSSVariables('--fontColor1', this.customThemeService.getFontColor(colorData1))
      }

      let colorPickerSetValue = '#' + this.customThemeService.fetchHexaCode(colorData1)

      this.colorPickerTheme1.get(colorPickerFormController)?.setValue(colorPickerSetValue)

      this.myNewTheme.get(customThemeControlername)?.setValue(colorData)

    }


  }



  changeDefaultThemes(themeInfo) {

    let updateTheme
    let defaultTheme = {
      primaryColor: themeInfo.prime,
      secondaryColor: themeInfo.secondary
    }


    if (defaultTheme.primaryColor !== '#5f5f63' && defaultTheme.secondaryColor !== '#000000'){
      localStorage.setItem('previouslyChoosenTheme', JSON.stringify(defaultTheme))
      localStorage.setItem('themeType', 'LIGHT')
    }
    else{
      localStorage.setItem('themeType', 'DARK')

    }
    
    this.makeSwitchTrueOrFalse()


    let themeDataFromStore = {
      primaryColor: '',
      secondaryColor: ''
    };
    let status: boolean = false


    //assigning values to the form groups
    this.myNewTheme.patchValue(defaultTheme)
    this.setValuesToTheForm(this.colorPickerTheme1, 'primaryColor11', defaultTheme.primaryColor)
    this.setValuesToTheForm(this.colorPickerTheme1, 'secondaryColor11', defaultTheme.secondaryColor)

    //fetchesData From The Store
    this.themeSubscription1 = this.store.select('myThemePicker').subscribe((data) => {
      themeDataFromStore.primaryColor = data.primaryColor
      themeDataFromStore.secondaryColor = data.secondaryColor
    })

    if (defaultTheme.primaryColor === themeDataFromStore.primaryColor && defaultTheme.secondaryColor === themeDataFromStore.secondaryColor) {
      this.visible = true
      this.toasterService.warning('Theme already applied ',)
      status = true
    }
    else {

      setTimeout(() => {
        this.visible = false
      }, 500)
    }

    this.store.dispatch(customThemeChoosen({ customThemeData: defaultTheme }))

    // storing values in a list
    this.fetchAllDataFromStore()

    let findExistTheme = this.fetchDataFromEntireStore.find(theme => theme.prime === defaultTheme.primaryColor && theme.secondary === defaultTheme.secondaryColor)

    if (findExistTheme !== undefined) {


       updateTheme = {
        id: findExistTheme.id,
        prime: findExistTheme.prime,
        secondary: findExistTheme.secondary,
        active: true
      }

      this.store.dispatch(updateThemeActiveStatus({ themesStore: updateTheme }))


    }

    //-------------
    this.customThemeService.setNewTheme(defaultTheme, status, '');

    this.customThemeService.setPropertyValuesToCSSVariables('--headerFontColor', this.customThemeService.getFontColor(defaultTheme.primaryColor))


    this.changeDefaultThemeList()
    

  }



  changeDarkOrLightTheme(infoFromSwitch) {
    // console.log(document.documentElement.style.getPropertyValue($mystyle),"came data");


    let { messageFromSwitch, statusOfClick } = infoFromSwitch
    this.pageRefreshStatus = true
    this.lightAndDarkThemeStatus = statusOfClick
    let themeObject: any
    let previouslyUpdatedData
    let themeObject1

    this.fetchAllDataFromStore()
 
  
    

    if (this.lightAndDarkThemeStatus) {


      localStorage.setItem('primary', '#5f5f63')
      localStorage.setItem('secondary', '#000000')
      
      // update theme object
      themeObject = {
        primaryColor: '#5f5f63',
        secondaryColor: '#000000'
      }
    
      
      localStorage.setItem('themeType', 'DARK')


    }
    else {
      this.changeDefaultThemeList()
      previouslyUpdatedData = JSON.parse(localStorage.getItem('previouslyChoosenTheme'))

      
      themeObject = {
        primaryColor: previouslyUpdatedData.primaryColor,
        secondaryColor: previouslyUpdatedData.secondaryColor
      }
      
 

      let findThemeExistOrNot = this.fetchDataFromEntireStore.find(theme => theme.prime === themeObject.primaryColor && theme.secondary === themeObject.secondaryColor)

      if (findThemeExistOrNot !== undefined){
        themeObject1 = {
          id: findThemeExistOrNot.id,
          prime: findThemeExistOrNot.prime,
          secondary: findThemeExistOrNot.secondary,
          active: true

        }

        this.store.dispatch(updateThemeActiveStatus({ themesStore: themeObject1 }))
      }

      localStorage.setItem('themeType', 'LIGHT')

    
    }

    this.changeDefaultThemeList()

    // 
    this.makeSwitchTrueOrFalse()


    if (messageFromSwitch) {
      this.store.dispatch(customThemeChoosen({ customThemeData: themeObject }))
      this.customThemeService.setNewTheme(themeObject, true, '');
    }





  }


}
