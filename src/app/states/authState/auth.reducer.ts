import { createReducer } from "@ngrx/store"
import { loginState } from "./auth.state"


const loginReducer = createReducer(loginState)

export function authReducer(state,action){
    return loginReducer(state,action)
}