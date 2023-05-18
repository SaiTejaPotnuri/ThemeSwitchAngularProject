import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  lightAndDarkThemeStatus: boolean = true;
  pageRefreshStatus: boolean = false

  images = {
    colorPicker: 'assets/Images/colorPickerIcon.png'
  }


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customThemeService: CustomthemeService,

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
  }

  logOut() {
    localStorage.removeItem('userInfo')
  }


  callFunctionsWhenLoaded() {

    this.visible = false
    this.fetchedColors1 = this.customThemeService.fetchPrimaryColor();
    this.themesColorFetchingStatus1 = true
    this.customThemeService.setNewTheme(this.fetchedColors1, this.themesColorFetchingStatus1);
    this.myNewTheme.patchValue(this.fetchedColors1)
    document.documentElement.style.setProperty('--headerFontColor', this.customThemeService.getFontColor(this.fetchedColors1.primaryColor))

    let switchInfo: any = {
      messageFromSwitch: false,
      statusOfClick: false

    }

    this.changeDarkOrLightTheme(switchInfo)

  }

  buttonClicked() {
    this.visible = !this.visible
    this.fetchedColors1 = this.customThemeService.fetchPrimaryColor();

    this.myNewTheme.patchValue(this.fetchedColors1)
    this.colorPickerTheme1.get('primaryColor11').setValue(this.fetchedColors1.primaryColor)
    this.colorPickerTheme1.get('secondaryColor11').setValue(this.fetchedColors1.secondaryColor)
    document.documentElement.style.setProperty('--defaultPrimary', this.fetchedColors1.primaryColor)
    document.documentElement.style.setProperty('--defaultSecondary', this.fetchedColors1.secondaryColor)

    document.documentElement.style.setProperty('--fontColor11', this.customThemeService.getFontColor(this.fetchedColors1.primaryColor))
    document.documentElement.style.setProperty('--fontColor12', this.customThemeService.getFontColor(this.fetchedColors1.secondaryColor))


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

    this.customThemeService.setNewTheme(themeDetails, this.themesColorFetchingStatus1);
    this.visible = !this.visible

  }

  applyingColorsToInput1(colorData, colorPickerFormController, customThemeControlername) {



    let colorData1

    if (colorData.charAt(0) === '#' && ((colorData.length >= 4 && colorData.length <= 5) || (colorData.length >= 3 || colorData.length === 6)) && CSS.supports('color', colorData)) {

      colorData1 = "#" + this.customThemeService.fetchHexaCode(colorData)
      this.validateColorStatus = true
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
        document.documentElement.style.setProperty('--defaultPrimary', colorData1)
        document.documentElement.style.setProperty('--fontColor11', this.customThemeService.getFontColor(colorData1))
        document.documentElement.style.setProperty('--headerFontColor', this.customThemeService.getFontColor(colorData))
      }
      else {
        document.documentElement.style.setProperty('--defaultSecondary', colorData1)
        document.documentElement.style.setProperty('--fontColor12', this.customThemeService.getFontColor(colorData1))

      }

      let colorPickerSetValue = '#' + this.customThemeService.fetchHexaCode(colorData1)

      this.colorPickerTheme1.get(colorPickerFormController)?.setValue(colorPickerSetValue)

      this.myNewTheme.get(customThemeControlername)?.setValue(colorData)

    }





  }




  changeDarkOrLightTheme(infoFromSwitch) {


    // console.log(document.documentElement.style.getPropertyValue($mystyle),"came data");


    let { messageFromSwitch, statusOfClick } = infoFromSwitch

    this.pageRefreshStatus = true
    this.lightAndDarkThemeStatus = statusOfClick


    let themeObject: any

    console.log(this.lightAndDarkThemeStatus, "lightAndDarkThemeStatus");


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

      console.log("Came inside else");


    }

    if (messageFromSwitch) {
      this.customThemeService.setNewTheme(themeObject, true);
      console.log("came inside theme set");
    }
    else {
      if (localStorage.getItem('primary') === '#5f5f63') {
        themeObject = {
          primaryColor: '#9999ad',
          secondaryColor: '#ffffff'
        }
        this.customThemeService.setNewTheme(themeObject, true);

      }

    }






  }









}
