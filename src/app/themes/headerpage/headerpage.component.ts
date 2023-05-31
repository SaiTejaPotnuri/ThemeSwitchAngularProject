import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomthemeService } from 'src/app/Services/customtheme.service';

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
  defaulthemesList:Array<any> =[] 

  images = {
    colorPicker: 'assets/Images/colorPickerIcon.png'
  }


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customThemeService: CustomthemeService,
    private toasterService: ToastrService

  ) {
    this.myNewTheme = this.fb.group({
      primaryColor: ['', [Validators.required]],
      secondaryColor: ['', [Validators.required]],
    })
    this.colorPickerTheme1 = this.fb.group({
      primaryColor11: ['', [Validators.pattern("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{1,3})$"), Validators.minLength(2), Validators.maxLength(7)]],
      secondaryColor11: ['', [Validators.pattern("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{1,3})$"), Validators.minLength(2), Validators.maxLength(7)]],
    })

  }



  ngOnInit(): void {
    this.callFunctionsWhenLoaded()
    this.defaulthemesList=[
      { prime: '#27374D', secondary: '#526D82', active: false, colorsName:'Blue & pink'},
      { prime: '#643843', secondary: '#99627A', active: false, colorsName: 'Purple Theme ' },
      { prime: '#2C5F2D', secondary: '#97BC62', active: false, colorsName: 'Forest g.. & moss g..' },
      { prime: '#ECF8F9', secondary: '#068DA9', active: false, colorsName: 'Royal B.. & Pale Y..' },
    ]

  }

  logOut() {
    localStorage.removeItem('userInfo')
  }


  callFunctionsWhenLoaded() {

    this.visible = false
    this.fetchedColors1 = this.customThemeService.fetchPrimaryColor();
    this.themesColorFetchingStatus1 = true
    this.customThemeService.setNewTheme(this.fetchedColors1, this.themesColorFetchingStatus1,'');
    this.myNewTheme.patchValue(this.fetchedColors1)
    this.customThemeService.setPropertyValuesToCSSVariables('--headerFontColor', this.customThemeService.getFontColor(this.fetchedColors1.primaryColor))
   
    let switchInfo: any = {
      messageFromSwitch: false,
      statusOfClick: false

    }

    this.changeDarkOrLightTheme(switchInfo)
    this.defaulthemesList.filter(theme => theme.prime !== this.fetchedColors1.primaryColor || theme.secondary !== this.fetchedColors1.secondaryColor).map(selectedTheme => selectedTheme.active = false)
    this.lightAndDarkThemeStatus = localStorage.getItem('primary') === '#5f5f63' ? true : false

  }


  setValuesToTheForm(formGroupInfo, formControllerNameInfo, assigningValue) {
    formGroupInfo.get(formControllerNameInfo)?.setValue(assigningValue)
  }




  buttonClicked() {
    this.visible = !this.visible
    this.fetchedColors1 = this.customThemeService.fetchPrimaryColor();

    this.myNewTheme.patchValue(this.fetchedColors1)
    this.setValuesToTheForm(this.colorPickerTheme1, 'primaryColor11', this.fetchedColors1.primaryColor)
    this.setValuesToTheForm(this.colorPickerTheme1, 'secondaryColor11', this.fetchedColors1.secondaryColor)

    this.customThemeService.setPropertyValuesToCSSVariables('--primaryColor1', this.fetchedColors1.primaryColor)
    this.customThemeService.setPropertyValuesToCSSVariables('--secondaryColor1', this.fetchedColors1.secondaryColor)
    this.customThemeService.setPropertyValuesToCSSVariables('--headerFontColor', this.customThemeService.getFontColor(this.fetchedColors1.primaryColor))
    this.customThemeService.setPropertyValuesToCSSVariables('--fontColor1', this.customThemeService.getFontColor(this.fetchedColors1.secondaryColor))
   
    this.defaulthemesList.filter(theme => theme.prime !== this.fetchedColors1.primaryColor || theme.secondary !== this.fetchedColors1.secondaryColor).map(selectedTheme => selectedTheme.active = false)
    this.defaulthemesList.filter(theme => theme.prime === this.fetchedColors1.primaryColor && theme.secondary === this.fetchedColors1.secondaryColor).map(selectedTheme => selectedTheme.active=true)

  }




  newThemeInDashboard(themeDetails) {

    let { primaryColor, secondaryColor } = themeDetails;
    this.themesColorFetchingStatus1 = false

    if (primaryColor.charAt(0) !== '#' || secondaryColor.charAt(0) !== '#') {
      primaryColor = this.customThemeService.fetchTextToHexaCode(primaryColor)
      secondaryColor = this.customThemeService.fetchTextToHexaCode(secondaryColor)
    }

    themeDetails.primaryColor.length <= 3 ? themeDetails.primaryColor = '#' + this.customThemeService.fetchHexaCode(primaryColor) : themeDetails.primaryColor = primaryColor
    themeDetails.secondaryColor.length <= 3 ? themeDetails.secondaryColor = '#' + this.customThemeService.fetchHexaCode(secondaryColor) : themeDetails.secondaryColor = secondaryColor

    this.customThemeService.setNewTheme(themeDetails, this.themesColorFetchingStatus1,'');
    this.visible = !this.visible

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



  changeDefaultThemes(themeInfo){

    
   let  defaultTheme = {
     primaryColor: themeInfo.prime,
     secondaryColor: themeInfo.secondary
    }

    let localstorageTheme = this.customThemeService.fetchPrimaryColor();
    this.customThemeService.setNewTheme(defaultTheme, true,'');
    themeInfo.active =true
    this.defaulthemesList.filter(theme => theme.prime !== themeInfo.prime && theme.secondary !== themeInfo.secondary).map(unselectedThemes => unselectedThemes.active = false)

    if (defaultTheme.primaryColor === localstorageTheme.primaryColor && defaultTheme.secondaryColor === localstorageTheme.secondaryColor)
    {
      this.visible = true
      this.toasterService.warning('Theme already applied ',)
    }
    else{

      setTimeout(() => {
        this.visible = false
      }, 500)
    }

    this.customThemeService.setPropertyValuesToCSSVariables('--headerFontColor', this.customThemeService.getFontColor(defaultTheme.primaryColor))

 
  }




  changeDarkOrLightTheme(infoFromSwitch) {
    // console.log(document.documentElement.style.getPropertyValue($mystyle),"came data");

    this.defaulthemesList.map(theme => theme.active=false)
    let { messageFromSwitch, statusOfClick } = infoFromSwitch
    this.pageRefreshStatus = true
    this.lightAndDarkThemeStatus = statusOfClick
    let themeObject: any

    if (this.lightAndDarkThemeStatus) {
      themeObject = {
        primaryColor: '#5f5f63',
        secondaryColor: '#000000'
      }
    }
    else {
      themeObject = {
        primaryColor: '#9999ad',
        secondaryColor: '#ffffff'
      }
    }


    if (messageFromSwitch) {
      this.customThemeService.setNewTheme(themeObject, true,'');
    }

  }


}
