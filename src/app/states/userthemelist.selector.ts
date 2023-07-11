import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userThemeSList } from "./userthemelist.state";


export const themeListContainer ='listOfThemes'

const getThemesListState = createFeatureSelector<userThemeSList>(themeListContainer)


export const getThemesList = createSelector(getThemesListState ,(state)=>{
    return state.themePosts
})