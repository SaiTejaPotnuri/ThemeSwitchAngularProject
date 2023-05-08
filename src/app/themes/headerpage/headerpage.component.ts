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
  colorPickerTheme1:FormGroup
  visible:boolean=false
  fetchedColors1:any
  themesColorFetchingStatus1:boolean;
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customThemeService: CustomthemeService,

  ){
    this.myNewTheme = this.fb.group({
      primaryColor: ['', [Validators.pattern("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{1,3})$"), Validators.minLength(2), Validators.maxLength(7)]],
      secondaryColor: ['', [Validators.pattern("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{1,3})$"), Validators.minLength(2), Validators.maxLength(7)]],
    })
    this.colorPickerTheme1 = this.fb.group({
      primaryColor11: ['', [Validators.pattern("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{1,3})$"), Validators.minLength(2), Validators.maxLength(7)]],
      secondaryColor11: ['', [Validators.pattern("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{1,3})$"), Validators.minLength(2), Validators.maxLength(7)]],
    })

  }

  ngOnInit(): void {
    this.callFunctionsWhenLoaded()
  }



  callFunctionsWhenLoaded() {
    this.visible = false
    this.fetchedColors1 = this.customThemeService.fetchPrimaryColor();
    this.themesColorFetchingStatus1 = true
    this.customThemeService.setNewTheme(this.fetchedColors1, this.themesColorFetchingStatus1);
    this.myNewTheme.patchValue(this.fetchedColors1)

  }

  buttonClicked(){
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

  
    themeDetails.primaryColor.length <= 3 ? themeDetails.primaryColor = '#' + this.customThemeService.fetchHexaCode(primaryColor) : themeDetails.primaryColor = primaryColor
    themeDetails.secondaryColor.length <= 3 ? themeDetails.secondaryColor = '#' + this.customThemeService.fetchHexaCode(secondaryColor) : themeDetails.secondaryColor = secondaryColor

    this.customThemeService.setNewTheme(themeDetails, this.themesColorFetchingStatus1);
    this.visible = !this.visible

  }

  applyingColorsToInput1(colorData, colorPickerFormController, customThemeControlername) {

    
    let colorData1
    if (this.myNewTheme.valid) {
      colorData1 = "#" + this.customThemeService.fetchHexaCode(colorData)
      if (customThemeControlername === "primaryColor") {
        document.documentElement.style.setProperty('--defaultPrimary', colorData1)
        document.documentElement.style.setProperty('--fontColor11', this.customThemeService.getFontColor(colorData1))


      }
      else {
        document.documentElement.style.setProperty('--defaultSecondary', colorData1)
        document.documentElement.style.setProperty('--fontColor12', this.customThemeService.getFontColor(colorData1))

      }
    }


    let colorPickerSetValue = '#' + this.customThemeService.fetchHexaCode(colorData)
    this.colorPickerTheme1.get(colorPickerFormController)?.setValue(colorPickerSetValue)
    
    this.myNewTheme.get(customThemeControlername)?.setValue(colorData)


  }












}
