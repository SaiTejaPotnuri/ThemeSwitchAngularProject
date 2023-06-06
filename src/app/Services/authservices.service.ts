import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {

  constructor(private http:HttpClient) { }




  login(loginDetails){
    console.log(loginDetails);

    let { signInEmail, signINPassword } = loginDetails
    
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      { signInEmail, signINPassword, returnSecureToken: true })

  }
}
