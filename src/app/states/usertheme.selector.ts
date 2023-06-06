import { createFeatureSelector, createSelector } from "@ngrx/store";
import { themeChangeModal } from "./usertheme.state";


export const newlyGeneratedTheme = 'myThemePicker'

const getThemesState = createFeatureSelector<themeChangeModal>(newlyGeneratedTheme)


export const getTheme = createSelector(getThemesState, (state) => {
    return { primaryColor: state.primaryColor,secondaryColor:state.secondaryColor}

})