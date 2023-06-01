
import { userthemeReducer } from '../states/usertheme.reducer'
import { themeChangeModal  } from '../states/usertheme.state'
import { userThemesListReducer } from '../states/userthemelist.reducer'
import { userThemeSList } from '../states/userthemelist.state'

export interface appStoreState{
    myThemePicker: themeChangeModal,
    listOfThemes: userThemeSList
}

// here is in above themeChangeModal is interface name or type


export const appStoreReducer={
    myThemePicker: userthemeReducer,
    listOfThemes: userThemesListReducer
}