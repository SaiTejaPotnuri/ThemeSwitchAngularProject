import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess } from './auth.actions';
import { exhaustMap, map } from 'rxjs';
import { AuthservicesService } from 'src/app/Services/authservices.service';

@Injectable()
export class authEffects{

    constructor(private actions:Actions,private authService:AuthservicesService){}

    login$ = createEffect(()=>{
        return this.actions.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action).pipe(map((data) => {
                    return loginSuccess();
                }))
            })
            
            
        )
    })


    

}