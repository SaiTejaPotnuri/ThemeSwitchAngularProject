import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { CustomthemeService } from 'src/app/Services/customtheme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signInForm: FormGroup;
  customTheme: FormGroup
  colorPickerTheme:FormGroup
  visible: boolean = false
  validateColorStatus1:boolean=false
  imagesList = {
    logisticsImage: './assets/Images/logisticLogo.png'
  }
  fetchedColors: any

  themesColorFetchingStatus: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customThemeService: CustomthemeService,
    private toasterService: ToastrService

  ) {

    this.signInForm = this.fb.group({
      signInEmail: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9-]{2,4}$'
          )
        ]
      ],
      signINPassword: [
        '',
        [
          Validators.required,
          // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
          Validators.minLength(8)
        ]
      ]
    })

    this.customTheme = this.fb.group({
      primaryColor: ['', [Validators.required]],
      secondaryColor: ['', [Validators.required]],
    })
    this.colorPickerTheme = this.fb.group({
      primaryColor11: ['', [Validators.pattern("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{1,3})$"), Validators.minLength(2), Validators.maxLength(7)]],
      secondaryColor11: ['', [Validators.pattern("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{1,3})$"), Validators.minLength(2), Validators.maxLength(7)]],
    })
  }

  ngOnInit(): void {
    this.callFunctionsWhenLoaded()
  }


  callFunctionsWhenLoaded() {
    this.visible = false
    this.fetchedColors = this.customThemeService.fetchPrimaryColor();
    
    this.themesColorFetchingStatus = true
    this.customThemeService.setNewTheme(this.fetchedColors, this.themesColorFetchingStatus);
    this.customTheme.patchValue(this.fetchedColors)
    this.colorPickerTheme.get('primaryColor11').setValue(this.fetchedColors.primaryColor)
    this.colorPickerTheme.get('secondaryColor11').setValue(this.fetchedColors.secondaryColor)
    
   
  }


  submitSignInDetails(a: any) {
    let userName = a.signInEmail.split('@')[0]
    
    localStorage.setItem('userInfo',userName)
    this.router.navigate(['/mythemes'])

  }






  changeTheme() {
    this.visible = !this.visible
    this.fetchedColors = this.customThemeService.fetchPrimaryColor();
    this.customTheme.patchValue(this.fetchedColors)
    
    this.colorPickerTheme.get('primaryColor11').setValue(this.fetchedColors.primaryColor)
    this.colorPickerTheme.get('secondaryColor11').setValue(this.fetchedColors.secondaryColor)
    document.documentElement.style.setProperty('--defaultPrimary', this.fetchedColors.primaryColor)
    document.documentElement.style.setProperty('--defaultSecondary', this.fetchedColors.secondaryColor)
    document.documentElement.style.setProperty('--fontColor11', this.customThemeService.getFontColor(this.fetchedColors.primaryColor))
    document.documentElement.style.setProperty('--fontColor12', this.customThemeService.getFontColor(this.fetchedColors.secondaryColor))


        
  }

  newTheme(themeDetails) {

    let { primaryColor, secondaryColor } = themeDetails;
    this.themesColorFetchingStatus = false

    if (primaryColor.charAt(0) !== '#' || secondaryColor.charAt(0) !== '#') {
      primaryColor = this.customThemeService.fetchTextToHexaCode(primaryColor)
      secondaryColor = this.customThemeService.fetchTextToHexaCode(secondaryColor)
    }




      themeDetails.primaryColor.length <= 3 ? themeDetails.primaryColor = '#' + this.customThemeService.fetchHexaCode(primaryColor) : themeDetails.primaryColor = primaryColor
      themeDetails.secondaryColor.length <= 3 ? themeDetails.secondaryColor = '#' + this.customThemeService.fetchHexaCode(secondaryColor) : themeDetails.secondaryColor = secondaryColor
   
      this.customThemeService.setNewTheme(themeDetails, this.themesColorFetchingStatus);
      this.visible = !this.visible

  }



  applyingColorsToInput(colorData,colorPickerFormController,customThemeControlername){

    let colorData1

    if (colorData.charAt(0) === '#' && ((colorData.length >= 4 && colorData.length <= 5) || (colorData.length >= 3 || colorData.length === 6))) {

      colorData1 = "#" + this.customThemeService.fetchHexaCode(colorData)
      this.validateColorStatus1 = true
    }
    else if (colorData.charAt(0) !== '#' && CSS.supports('color', colorData)) {

      colorData1 = this.customThemeService.fetchTextToHexaCode(colorData);
      this.validateColorStatus1 = true
    }
    else {
      this.validateColorStatus1 = false
    }



    if (this.validateColorStatus1) {
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

      this.colorPickerTheme.get(colorPickerFormController)?.setValue(colorPickerSetValue)

      this.customTheme.get(customThemeControlername)?.setValue(colorData)

    }
  


   
  }




}
