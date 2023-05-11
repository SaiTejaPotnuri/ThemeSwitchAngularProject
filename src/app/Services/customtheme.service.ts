import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomthemeService {

  constructor(private toasterService: ToastrService) { }


// fetch and send the color codes from localstorage

  fetchPrimaryColor(){


    let prim = localStorage.getItem('primary')
    let seco = localStorage.getItem('secondary')
    
// this is for checking if user changing data in localstorage and update and setting to default code
    if (prim !== null || seco !== null){
      if (!CSS.supports('color', prim) || !CSS.supports('color', seco) || (prim.length >= 4 && prim.length <= 5) || (seco.length >= 4 && seco.length <= 5)){


        if ((((prim.length >= 2 && prim.length <= 4) || (seco.length >= 2 && seco.length <= 4)) && (prim.charAt(0) === '#' && seco.charAt(0) === '#' && (CSS.supports('color', prim) && CSS.supports('color', seco))  ) )){
          prim = '#' + this.fetchHexaCode(prim)
          seco = '#' + this.fetchHexaCode(seco)
        }else{
              prim = '#000000'
              seco = '#FFFFFF'
          this.toasterService.error('Do To invalid colorCode Came to Default Color', '')
        }

      }
    }
    else{
      prim = '#000000'
      seco = '#FFFFFF'
      this.toasterService.error('Do To invalid colorCode Came to Default Color', '')

    }

    // final colors to set theme this below object holds it
  
    let themeColors={
      primaryColor: prim,
      secondaryColor: seco
    }
    
    return themeColors;
    
  }

  // creating new theme with given colors and assign to CSS variable 

  setNewTheme(themeInfo,stausOfThemeColors) {

    let { primaryColor, secondaryColor } = themeInfo;
    
    primaryColor = '#' + this.fetchHexaCode(primaryColor);
    secondaryColor = '#' + this.fetchHexaCode(secondaryColor);


      localStorage.removeItem('primary')
      localStorage.removeItem('secondary')
      localStorage.setItem('primary', primaryColor || '')
      localStorage.setItem('secondary', secondaryColor || '')
      !stausOfThemeColors ? this.toasterService.success('Theme Applied', '') : ''
    
    document.documentElement.style.setProperty('--primaryColor1', primaryColor)
    document.documentElement.style.setProperty('--secondaryColor1', secondaryColor)

    document.documentElement.style.setProperty('--fontColor1', this.getFontColor(secondaryColor))
    document.documentElement.style.setProperty('--buttonFontColor', this.getFontColor(primaryColor))

  }




// findling the hexadecimal code 
  fetchHexaCode(hex:string){

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
    
    
   
    return hex;

    
  }


// it will assign the font color either white or black based on color theme dark or light background
  getFontColor(hex1: string) {

    let r: any;
    let g: any;
    let b: any;

    hex1 = this.fetchHexaCode(hex1)
   

    r = parseInt(hex1.slice(0, 2), 16);
    g = parseInt(hex1.slice(2, 4), 16);
    b = parseInt(hex1.slice(4, 6), 16);



    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
      ? '#000000'
      : '#FFFFFF';
  }


}
