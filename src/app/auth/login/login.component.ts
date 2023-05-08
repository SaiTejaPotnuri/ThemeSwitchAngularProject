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
      primaryColor: ['', [Validators.pattern("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{1,3})$"), Validators.minLength(2),Validators.maxLength(7)]],
      secondaryColor: ['', [Validators.pattern("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{1,3})$"), Validators.minLength(2),Validators.maxLength(7)]],
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

    this.router.navigate(['/mythemes'])

  }
  changeTheme() {
    this.visible = !this.visible
    this.customTheme.patchValue(this.fetchedColors)
    this.colorPickerTheme.get('primaryColor11').setValue(this.fetchedColors.primaryColor)
    this.colorPickerTheme.get('secondaryColor11').setValue(this.fetchedColors.secondaryColor)
    document.documentElement.style.setProperty('--fontColor1', '#000000')

        
  }

  newTheme(themeDetails) {

    let { primaryColor, secondaryColor } = themeDetails;
    this.themesColorFetchingStatus = false

   
      themeDetails.primaryColor.length <= 3 ? themeDetails.primaryColor = '#' + this.customThemeService.fetchHexaCode(primaryColor) : themeDetails.primaryColor = primaryColor
      themeDetails.secondaryColor.length <= 3 ? themeDetails.secondaryColor = '#' + this.customThemeService.fetchHexaCode(secondaryColor) : themeDetails.secondaryColor = secondaryColor
   
      this.customThemeService.setNewTheme(themeDetails, this.themesColorFetchingStatus);
      this.visible = !this.visible

  }



  applyingColorsToInput(colorData,idData,colorPickerFormController,customThemeControlername){
    
    
    document.getElementById(idData).style.backgroundColor = "#" + this.customThemeService.fetchHexaCode(colorData)
    let colorPickerSetValue = '#' + this.customThemeService.fetchHexaCode(colorData)
    this.colorPickerTheme.get(colorPickerFormController)?.setValue(colorPickerSetValue) 
    this.customTheme.get(customThemeControlername)?.setValue(colorData)
    

  }




}
