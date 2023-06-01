import { themeModel } from "../modals/userthemelist.model"

export interface userThemeSList {

    themePosts: themeModel[]
}


export const userListOfThemes: userThemeSList = {

    themePosts: [
        { id: 1, prime: '#27374D', secondary: '#526D82', active: false },
        { id: 2, prime: '#643843', secondary: '#99627A', active: false },
        { id: 3, prime: '#2C5F2D', secondary: '#97BC62', active: false },
        { id: 4, prime: '#ECF8F9', secondary: '#068DA9', active: false },
    ]

}


