import { createAction, props } from "@ngrx/store";
import { themeModel } from "../modals/userthemelist.model";



export const addNewThmeToList = createAction('addNewThmeToList',props<{themesStore:themeModel}>())    

export const updateThemeActiveStatus = createAction('updateThemeActiveStatus', props<{ themesStore: themeModel }>())