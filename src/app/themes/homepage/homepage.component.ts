import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthservicesService } from 'src/app/Services/authservices.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  searchForm:FormGroup

  constructor(private fb: FormBuilder,private auth:AuthservicesService) {
      this.searchForm = this.fb.group({
          serchingText :['']
      })
   }

  userInfo:any={
    bannerImage :'assets/Images/banner.png',
    profileImage:'',
    employeeId:'20090523',
    employeeName:'Jack',
    contactNumber:'9632581478',
    designation:'Software Engineer',
    companyName:'ImagInnovate',
    employeeLocation:'Rushikonda, Hill -2, Visakhapatnam-530008',
    companyLogo: 'assets/Images/companyLogo.png',
  }
  
  usersData:Array<any>=[
    { 
      profileImage1:'',
      nameOfTheUser:'',
      designation: 'Software Engineer 1 at ImagInnovate ',
      eventPic:'assets/Images/javaFeaturesPic1.png',
      description:'Welcome To Java'

     },
    {
      profileImage1: '',
      nameOfTheUser: '',
      designation: 'Software Engineer 1 at ImagInnovate ',
      eventPic: 'assets/Images/javaFeaturesPic1.png',
      description: 'Welcome To Java'

    },
    {
      profileImage1: '',
      nameOfTheUser: '',
      designation: 'Software Engineer 1 at ImagInnovate ',
      eventPic: 'assets/Images/javaFeaturesPic1.png',
      description: 'Welcome To Java'

    },
    {
      profileImage1: '',
      nameOfTheUser: '',
      designation: 'Software Engineer 1 at ImagInnovate ',
      eventPic: 'assets/Images/javaFeaturesPic1.png',
      description: 'Welcome To Java'

    },
    {
      profileImage1: '',
      nameOfTheUser: '',
      designation: 'Software Engineer 1 at ImagInnovate ',
      eventPic: 'assets/Images/javaFeaturesPic1.png',
      description: 'Welcome To Java'

    },
    {
      profileImage1: '',
      nameOfTheUser: '',
      designation: 'Software Engineer 1 at ImagInnovate ',
      eventPic: 'assets/Images/javaFeaturesPic1.png',
      description: 'Welcome To Java'

    }

  ]
  



  ngOnInit(): void {

    this.auth.fetchUserProfileData().subscribe((res)=>{
      this.usersData.forEach((user:any)=>{
        user.profileImage1 = res['picture'] 
        user.nameOfTheUser=res['name']
      })

       this.userInfo.profileImage =res['picture'] 
       this.userInfo.employeeName =res['name']

      
    })
  }

}
