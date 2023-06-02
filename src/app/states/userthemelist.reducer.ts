import { createReducer, on } from "@ngrx/store"
import { userListOfThemes } from "./userthemelist.state"
import { addNewThmeToList, updateThemeActiveStatus } from "./userthemelist.actions"
import { state } from "@angular/animations"
import { Actions } from "@ngrx/effects"


const themesListReducer = createReducer(userListOfThemes,
    on(addNewThmeToList,(state,action)=>{
        let stateTheme
        let themeContainer
        themeContainer  = state.themePosts.map(theme => {
           
            stateTheme={
                id:theme.id,
                prime:theme.prime,
                secondary : theme.secondary,
                active : false
            }

            return theme.active === true ? stateTheme : theme

        })
        

        let themePost ={...action.themesStore}
      
        return{
            ...state,
            themePosts: [...themeContainer, themePost]

        }
    }),
    on(updateThemeActiveStatus,(state,action)=>{

        

        let makeActive
        let themeContainer
        themeContainer = state.themePosts.map(theme => {

            makeActive = {
                id: theme.id,
                prime: theme.prime,
                secondary: theme.secondary,
                active: false
            }
            
            
            return theme.active === true ? makeActive : theme

        })

        


        let updateThemActiveStatusdata = themeContainer.map(theme=>{

            
                makeActive = {
                    id: theme.id,
                    prime: theme.prime,
                    secondary: theme.secondary,
                    active: true
                }
            return theme.prime === action.themesStore.prime && theme.secondary === action.themesStore.secondary ? makeActive : theme

        })

      
        return{
            ...state,
            themePosts: updateThemActiveStatusdata
        }
    })
)











export function userThemesListReducer(state, action) {
    return themesListReducer(state, action)
}
