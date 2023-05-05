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
  visible:boolean=false
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

  }

  ngOnInit(): void {
    this.callFunctionsWhenLoaded()
  }



  callFunctionsWhenLoaded() {
    this.visible = false
    let fetchedColors = this.customThemeService.fetchPrimaryColor();
    this.themesColorFetchingStatus1 = true
    this.customThemeService.setNewTheme(fetchedColors, this.themesColorFetchingStatus1);
    this.myNewTheme.patchValue(fetchedColors)

  }

  buttonClicked(){
      this.visible = !this.visible    
  }


  newThemeInDashboard(themeDetails) {

    let { primaryColor, secondaryColor } = themeDetails;
    this.themesColorFetchingStatus1 = false

  
    themeDetails.primaryColor.length <= 3 ? themeDetails.primaryColor = '#' + this.customThemeService.fetchHexaCode(primaryColor) : themeDetails.primaryColor = primaryColor
    themeDetails.secondaryColor.length <= 3 ? themeDetails.secondaryColor = '#' + this.customThemeService.fetchHexaCode(secondaryColor) : themeDetails.secondaryColor = secondaryColor

    this.customThemeService.setNewTheme(themeDetails, this.themesColorFetchingStatus1);
    this.visible = !this.visible

  }
}
