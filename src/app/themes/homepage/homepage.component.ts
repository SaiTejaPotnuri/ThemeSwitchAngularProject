import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  searchForm:FormGroup

  constructor(private fb: FormBuilder) {
      this.searchForm = this.fb.group({
          serchingText :['']
      })
   }

  userInfo:any={
    bannerImage :'assets/Images/banner.png',
    profileImage:'assets/Images/profilePic.png',
    employeeId:'20090523',
    employeeName:'Jack',
    contactNumber:'9632581478',
    designation:'Software Engineer',
    companyName:'ImagInnovate',
    employeeLocation:'Rushikonda, Hill -2, Visakhapatnam-530008',
    companyLogo: 'assets/Images/companyLogo.png',
  }
  



  ngOnInit(): void {
  }

}
