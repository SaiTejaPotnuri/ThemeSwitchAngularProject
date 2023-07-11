import { Component, OnInit } from '@angular/core';
import { AuthservicesService } from 'src/app/Services/authservices.service';

@Component({
  selector: 'app-themes-dashboard',
  templateUrl: './themes-dashboard.component.html',
  styleUrls: ['./themes-dashboard.component.scss'],
})
export class ThemesDashboardComponent implements OnInit {
  constructor(private auth:AuthservicesService) {}

  ngOnInit(): void {
    // this.getUserData();
    this.auth.isLoggedin()
  }

  
}
