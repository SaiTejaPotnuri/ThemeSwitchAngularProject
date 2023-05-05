import { Component, OnInit } from '@angular/core';
import { CustomthemeService } from 'src/app/Services/customtheme.service';

@Component({
  selector: 'app-color-picker-theme',
  templateUrl: './color-picker-theme.component.html',
  styleUrls: ['./color-picker-theme.component.scss']
})
export class ColorPickerThemeComponent implements OnInit {

  retrivedFontColor: any;
  themesColorFetchingStatus:boolean=false

  constructor(private customThemeService:CustomthemeService ){}

  ngOnInit() { 
    this.retrivedFontColor = this.customThemeService.fetchPrimaryColor();
    this.themesColorFetchingStatus = true
    this.customThemeService.setNewTheme(this.retrivedFontColor, this.themesColorFetchingStatus);

  }
 


}
// if (bw) {
//   return (r * 0.299 + g * 0.587 + b * 0.114) > 186
//     ? '#000000'
//     : '#FFFFFF';
// }

// //invert color
// let rColorInText = (255 - r).toString(16)
// let gColorInText = (255 - g).toString(16)
// let bColorInText = (255 - b).toString(16)

// return "#" + rColorInText + gColorInText + bColorInText;