import { Component } from '@angular/core';
import { AuthservicesService } from 'src/app/Services/authservices.service';

@Component({
  selector: 'app-oauth2-init',
  templateUrl: './oauth2-init.component.html',
  styleUrls: ['./oauth2-init.component.scss']
})
export class OAuth2InitComponent {

  constructor(private auth:AuthservicesService) {

  }
  ngOnInit() {
    // use the code param in url and exchange for token google oauth2
    setTimeout(()=>{
      this.auth.fetchResposeGoogleCallback(this.auth.fetchTheCode())
    },800)
  }


  


  




 
  
}
