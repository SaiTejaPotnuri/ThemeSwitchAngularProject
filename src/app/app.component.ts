import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  title = 'ThemeSwitchAngularProject';
  selectedTheme = localStorage.getItem('theme-color')
  retrivedFontColor:any;
  colorPicker:any;
  

  ngOnInit(){}
  colorChanged(){
    this.retrivedFontColor = this.getFontColor(this.colorPicker, true)
    document.documentElement.style.setProperty('--colorPicker1',this.colorPicker)
    document.documentElement.style.setProperty('--fontColor1', this.retrivedFontColor)
    localStorage.setItem('theme-color', this.colorPicker);
    localStorage.setItem('theme-color', this.retrivedFontColor);


  }


  getFontColor(hex: string, bw: boolean) {
    
    let r:any;
    let g:any;
    let b:any;
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }

    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    // checking the length of a color
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }


    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);


    if (bw) {
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
        ? '#000000'
        : '#FFFFFF';
    }

    //invert color
    let rColorInText = (255-r).toString(16)
    let gColorInText = (255 - g).toString(16)
    let bColorInText = (255 - b).toString(16)
    return "#" + this.padZero(rColorInText) + this.padZero(gColorInText) + this.padZero(bColorInText);
}


  padZero(str: any) {
   let len =  2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }





}
