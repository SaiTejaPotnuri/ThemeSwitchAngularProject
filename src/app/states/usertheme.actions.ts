import { createAction, props } from "@ngrx/store";
import { themeChangeModal } from "./usertheme.state";

export const customThemeChoosen = createAction('customThemeChoosen', props<{ customThemeData:themeChangeModal }>())    