import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import config from 'src/assets/oAuth2AppConncetion.json';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class AuthservicesService {

  userObject:any;

  constructor(private http: HttpClient,private route:ActivatedRoute,private router:Router,private toaster:ToastrService) {
    // this.isLoggedIn()
  }

  ngOnInit(){    
  }


  isLoggedin(){
    localStorage.getItem('accessToken')  ? this.router.navigate(['/mythemes']) : this.router.navigate(['/login']);
  }


  fetchUserProfileData(){
    let accessToken = localStorage.getItem('accessToken')
    
    this.checkLoginType() 
      let loginType =localStorage.getItem('loginType') 

      if(loginType === 'google'){
        return this.http.get(`${this.userObject.profile_url}${accessToken}`); 
      }
      else if(loginType === 'github'){
        let headers = new HttpHeaders({'Authorization':`Bearer ${accessToken}`})
        // headers= headers.set();

        return this.http.get('https://api.github.com/user',{'headers':headers}); 
      }
  }




  checkLoginType(){

    let loginType = localStorage.getItem('loginType')
    if(loginType === 'google'){
        this.userObject = config.google
    }
    else if(loginType === 'github'){
        this.userObject = config.github
    }

  }

  handleCallback(code: string): Observable<any> {
    this.checkLoginType()
    const clientId = this.userObject.client_id;
    const clientSecret = this.userObject.client_secret;
    const redirectUri = this.userObject.redirect_uri;
    const tokenUrl = this.userObject.token_url;


    let headers = new HttpHeaders();
     headers.set('content-type', 'application/json')
     headers.set('Accept', 'application/json');
       
    const body = {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
       redirect_uri: redirectUri,
      grant_type: this.userObject.grant_type,

    };
   
    let loginType = localStorage.getItem('loginType')
    if(loginType === 'github'){
      return this.http.post(tokenUrl,body, { headers, responseType: 'text' });
    }
    else{
      return this.http.post(tokenUrl,body, { headers});

    }
  }


  fetchResposeCallback(code: string) {
    
    return this.handleCallback(code).subscribe((response) => {
      localStorage.getItem('loginType')
      console.log(response,"Response1234");
      
      // let access_token_github =
      let accessToken = localStorage.getItem('loginType') !== "google"?  response.split('&')[0].split('=')[1]: response.access_token    
        console.log(accessToken,"accessToken");
        accessToken === 'bad_verification_code' ? this.router.navigate(['/login']) :
        
      localStorage.setItem('accessToken',accessToken)   
      this.router.navigate(['/mythemes'])   
      return response
    },error =>{
      console.log(error,"1234");
      
      this.isLoggedin()
      this.toaster.error(`${error.error.message}`,'');
    })
  }




  fetchTheCode(){
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code);
    
    return code
  }


  continueWithLogin() {
    this.checkLoginType()
    const params = new URLSearchParams();
    params.set('client_id',this.userObject.client_id);
    // params.set('client_secret', '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');
    params.set('redirect_uri', this.userObject.redirect_uri);
    params.set('response_type', this.userObject.response_type);
    params.set('scope', this.userObject.scope);
    const githubAuthUrl = `${this.userObject.accounts_url}${params.toString()}`;
    window.location.href = githubAuthUrl;
  }




  

  login(loginDetails) {
    // this.oAuthService.hasValidAccessToken()

    let { signInEmail, signINPassword } = loginDetails;

    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      { signInEmail, signINPassword, returnSecureToken: true }
    );
  }

  logout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loginType');
  }
}
