import { createReducer, on } from "@ngrx/store";
import { defaultThemeColor } from "./usertheme.state";
import { customThemeChoosen } from "./usertheme.actions";

const themeReducer = createReducer(defaultThemeColor,
    
    on(customThemeChoosen,(state,action)=>{

        return{
            ...state,
            primaryColor: action.customThemeData.primaryColor,
            secondaryColor: action.customThemeData.secondaryColor
        }
    })
);

export function userthemeReducer(state,action){
    return themeReducer(state,action)
}
