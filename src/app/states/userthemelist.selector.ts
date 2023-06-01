import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userThemeSList } from "./userthemelist.state";

const getThemesListState = createFeatureSelector<userThemeSList>('listOfThemes')


export const getThemesList = createSelector(getThemesListState ,(state)=>{
    return state.themePosts

})