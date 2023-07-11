import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthservicesService } from './Services/authservices.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
