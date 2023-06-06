import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { themeChangeModal } from '../states/usertheme.state';
import { Subscription } from 'rxjs';
import { customThemeChoosen } from '../states/usertheme.actions';
import { appStoreState } from '../store/appStore.state';
import { getTheme } from '../states/usertheme.selector';

@Injectable({
  providedIn: 'root'
})
export class CustomthemeService implements OnDestroy {


  primaryColorChoosen: string;
  secodaryColorChoosen: string;
  themeSubscription: Subscription;


  constructor(private toasterService: ToastrService, private store: Store<appStoreState>) { }

  ngOnDestroy(): void {

    //In the above we are subscribed this is to unsubscribe
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe()
    }
  }


  fetchMyThemePickerActionValues() {
    this.themeSubscription = this.store.select(getTheme).subscribe((data) => {
      this.primaryColorChoosen = data.primaryColor
      this.secodaryColorChoosen = data.secondaryColor
    })
  }


  setPropertyValuesToCSSVariables(cssColorName, valueAssigned) {
    document.documentElement.style.setProperty(cssColorName, valueAssigned)
  }


  fetchPrimaryAndSecondaryColorsFromLocalstorage() {
    let dataFromLocal = {
      primaryColor: localStorage.getItem('primary'),
      secondaryColor: localStorage.getItem('secondary')
    }
    return dataFromLocal;
  }




  // creating new theme with given colors and assign to CSS variable 

  setNewTheme(themeInfo, stausOfThemeColors, defaultThemeStatus) {
    //fetching data from store and assigns to the global variables 

    
    this.fetchMyThemePickerActionValues()
    // checking if user given theme as default 
    if (defaultThemeStatus !== '' && defaultThemeStatus !== undefined) {
      localStorage.setItem('primary', this.primaryColorChoosen || '')
      localStorage.setItem('secondary', this.secodaryColorChoosen || '')
    }
    !stausOfThemeColors ? this.toasterService.success('Theme Applied', '') : ''

    // assigning values to the color variables
    this.setPropertyValuesToCSSVariables('--primaryColor1', this.primaryColorChoosen)
    this.setPropertyValuesToCSSVariables('--secondaryColor1', this.secodaryColorChoosen)
    this.setPropertyValuesToCSSVariables('--fontColor1', this.getFontColor(this.secodaryColorChoosen))
    this.setPropertyValuesToCSSVariables('--buttonFontColor', this.getFontColor(this.primaryColorChoosen))

  }



  checkTheColorCodeIsValidOrNot(){

    let primeColor = localStorage.getItem('primary')
    let secoColor = localStorage.getItem('secondary')
    let status=false

    if (primeColor === null || secoColor===null ){
      return false
    }    

    if (CSS.supports('color', primeColor) && CSS.supports('color', secoColor) ){

      if ((primeColor.charAt(0) === '#' && primeColor.length === 5) || (secoColor.charAt(0) === '#' && secoColor.length === 5)){
        status=false        
      }
      else{
        status=true
      }
      
    }
    else if ((primeColor.charAt(0) === '#' && (primeColor.length >= 1 && primeColor.length <= 3) && CSS.supports('color', secoColor) )   ){
      status = true

    }
    else if ((secoColor.charAt(0) === '#' && (secoColor.length >= 1 && secoColor.length <= 3) && CSS.supports('color', primeColor))) {
      status = true

    }
    else if (primeColor.charAt(0) === '#' || secoColor.charAt(0) === '#'){

      primeColor = '#'+ this.fetchHexaCode(primeColor)
      secoColor = '#' + this.fetchHexaCode(secoColor)
      if (CSS.supports('color', primeColor) && CSS.supports('color', secoColor)){
          status =true

      } 
      else{
        status=false
      }
    }
    else{
      status=false
    }

    return status;

  }




  // fetch and send the color codes from localstorage

  fetchPrimaryColor() {
    let dataFromLocalStorage

    if (this.checkTheColorCodeIsValidOrNot()) {
      this.fetchMyThemePickerActionValues()
        if(this.primaryColorChoosen === '' || this.secodaryColorChoosen === ''){
          dataFromLocalStorage = this.fetchPrimaryAndSecondaryColorsFromLocalstorage()
              
        }
        else{
          dataFromLocalStorage ={
            primaryColor:this.primaryColorChoosen,
            secondaryColor : this.secodaryColorChoosen
          }
          
        }

      let { primaryColor, secondaryColor } = dataFromLocalStorage

      primaryColor.charAt(0) !== '#' ? primaryColor = this.fetchTextToHexaCode(primaryColor) : primaryColor = '#'+ this.fetchHexaCode(primaryColor)
      secondaryColor.charAt(0) !== '#' ? secondaryColor = this.fetchTextToHexaCode(secondaryColor) : secondaryColor = '#'+ this.fetchHexaCode(secondaryColor)
      
      dataFromLocalStorage={
        primaryColor: primaryColor,
        secondaryColor: secondaryColor
      }
     
      this.store.dispatch(customThemeChoosen({ customThemeData: dataFromLocalStorage }))
    }
    else {
    
      localStorage.setItem('primary', '#000000')
      localStorage.setItem('secondary', '#FFFFFF')
      dataFromLocalStorage = this.fetchPrimaryAndSecondaryColorsFromLocalstorage()      
      this.store.dispatch(customThemeChoosen({ customThemeData: dataFromLocalStorage }))
      this.toasterService.warning('Applying Default ColorTheme','')

    }

    return dataFromLocalStorage;

  }




  fetchAndSetFontColors() {

    // it will fetch and assigns data to the global variables primaryColorChoosen and secodaryColorChoosen
    this.fetchMyThemePickerActionValues()

    this.setPropertyValuesToCSSVariables('--primaryColor1', this.primaryColorChoosen)
    this.setPropertyValuesToCSSVariables('--primaryInputTextFontColor', this.getFontColor(this.primaryColorChoosen))
    this.setPropertyValuesToCSSVariables('--secondaryColor1', this.secodaryColorChoosen)
    this.setPropertyValuesToCSSVariables('--secondaryInputTextFontColor', this.getFontColor(this.secodaryColorChoosen))

  }



  // findling the hexadecimal code 
  fetchHexaCode(hex: string) {

    if (hex !== undefined) {

      if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
      }
      // convert 3-digit hex to 6-digits.
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      else if (hex.length === 2) {
        hex = hex + hex + hex
      }
      else if (hex.length === 1) {
        hex = hex + hex + hex + hex + hex + hex;

      }
      else if (hex.length === 6) {
        hex = hex;
      }

    }
    return hex;
  }


  // it will assign the font color either white or black based on color theme dark or light background
  getFontColor(hex1: string) {

    let r: any;
    let g: any;
    let b: any;

    hex1 = this.fetchHexaCode(hex1)
    if (hex1 !== undefined) {
      r = parseInt(hex1.slice(0, 2), 16);
      g = parseInt(hex1.slice(2, 4), 16);
      b = parseInt(hex1.slice(4, 6), 16);

    }


    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
      ? '#000000'
      : '#FFFFFF';
  }


  fetchTextToHexaCode(str) {
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = str;
    return ctx.fillStyle;
  }




}
