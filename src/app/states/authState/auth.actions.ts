import { createAction, props } from "@ngrx/store"

export const loginStartMessage ='login start'
export const loginSuccessMessage = 'login suceess'
export const loginFailedMessage = 'login Failed'



export const loginStart = createAction(loginStartMessage, props<{ email:string,password:string }>())

export const loginSuccess = createAction(loginSuccessMessage)

export const loginFailed = createAction(loginFailedMessage)
