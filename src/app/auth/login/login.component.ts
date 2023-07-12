import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthservicesService } from 'src/app/Services/authservices.service';
import { CustomthemeService } from 'src/app/Services/customtheme.service';
import { loginStart } from 'src/app/states/authState/auth.actions';
import { customThemeChoosen } from 'src/app/states/usertheme.actions';
import { getTheme } from 'src/app/states/usertheme.selector';
import {
  addNewThmeToList,
  updateThemeActiveStatus,
} from 'src/app/states/userthemelist.actions';
import { getThemesList } from 'src/app/states/userthemelist.selector';
import { appStoreState } from 'src/app/store/appStore.state';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  signInForm: FormGroup;
  customTheme: FormGroup;
  colorPickerTheme: FormGroup;
  makeDefaultThemeStatusForm: FormGroup;
  visible: boolean = false;
  validateColorStatus1: boolean = false;
  imagesList = {
    logisticsImage: './assets/Images/logisticLogo.png',
  };
  fetchedColors: any;
  defaulthemesList1: Array<any> = [];
  themeSubscription: Subscription;
  fetchDataFromEntireStore;
  themesColorFetchingStatus: boolean = false;
  themeSubscription2: Subscription;
  userInfo:any
  googleImage='./assets/Images/google.png'
  githubImage='./assets/Images/github.png'

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customThemeService: CustomthemeService,
    private toasterService: ToastrService,
    private store: Store<appStoreState>,
    private auth: AuthservicesService
  ) {
    this.signInForm = this.fb.group({
      signInEmail: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9-]{2,4}$'
          ),
        ],
      ],
      signINPassword: [
        '',
        [
          Validators.required,
          // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
          Validators.minLength(8),
        ],
      ],
    });

    this.customTheme = this.fb.group({
      primaryColor: ['', [Validators.required]],
      secondaryColor: ['', [Validators.required]],
    });
    this.colorPickerTheme = this.fb.group({
      primaryColor11: [
        '',
        [
          Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{1,3})$'),
          Validators.minLength(2),
          Validators.maxLength(7),
        ],
      ],
      secondaryColor11: [
        '',
        [
          Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{1,3})$'),
          Validators.minLength(2),
          Validators.maxLength(7),
        ],
      ],
    });

    this.makeDefaultThemeStatusForm = this.fb.group({
      makeDefaultThemeStatus: [''],
    });


  }

  ngOnInit(): void {
    this.callFunctionsWhenLoaded();
    this.auth.isLoggedin();
    
  }

  ngOnDestroy(): void {
    //In the above we are subscribed this is to unsubscribe
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }

    if (this.themeSubscription2) {
      this.themeSubscription2.unsubscribe();
    }
  }


  

  changeDefaultThemeList() {
    this.fetchAllDataFromStore();

    this.defaulthemesList1 = [];

    let userChoosenThmes = this.fetchDataFromEntireStore.slice(-4);

    this.defaulthemesList1 = [...userChoosenThmes];
  }

  continueWithLogining(typeOfLogin:string){
    localStorage.setItem('loginType',typeOfLogin) 
       this.auth.continueWithLogin();   
  }

  callFunctionsWhenLoaded() {
    this.visible = false;
    this.fetchedColors = this.customThemeService.fetchPrimaryColor();
    this.themesColorFetchingStatus = true;
    this.customThemeService.setNewTheme(
      this.fetchedColors,
      this.themesColorFetchingStatus,
      ''
    );
    this.customTheme.patchValue(this.fetchedColors);
    this.setValuesToTheForm(
      this.colorPickerTheme,
      'primaryColor11',
      this.fetchedColors.primaryColor
    );
    this.setValuesToTheForm(
      this.colorPickerTheme,
      'secondaryColor11',
      this.fetchedColors.secondaryColor
    );
    this.changeFontColors();

    this.fetchAllDataFromStore();
    let defaultLightTheme;

    this.store.select(getTheme).subscribe((data) => {
      if (data !== null) {
        if (
          data.primaryColor !== '#5f5f63' &&
          data.secondaryColor !== '#000000'
        ) {
          localStorage.setItem('themeType', 'LIGHT');
          defaultLightTheme = {
            primaryColor: data.primaryColor,
            secondaryColor: data.secondaryColor,
          };
          localStorage.setItem(
            'previouslyChoosenTheme',
            JSON.stringify(defaultLightTheme)
          );
        } else {
          localStorage.setItem('themeType', 'DARK');
        }
      }
    });

    let localStorageValues =
      this.customThemeService.fetchPrimaryAndSecondaryColorsFromLocalstorage();

    let fetchFromStoreList = this.fetchDataFromEntireStore.find(
      (theme) =>
        theme.prime === localStorageValues.primaryColor &&
        theme.secondary === localStorageValues.secondaryColor
    );

    if (fetchFromStoreList !== undefined) {
      let updateDefaultThemeActive = {
        id: fetchFromStoreList.id,
        prime: fetchFromStoreList.prime,
        secondary: fetchFromStoreList.secondary,
        active: true,
      };

      this.store.dispatch(
        updateThemeActiveStatus({ themesStore: updateDefaultThemeActive })
      );
      this.defaulthemesList1 = this.fetchDataFromEntireStore;
    } else {
      let updateDefaultThemeActive = {
        id: this.fetchDataFromEntireStore.length + 1,
        prime: localStorageValues.primaryColor,
        secondary: localStorageValues.secondaryColor,
        active: true,
      };

      this.store.dispatch(
        addNewThmeToList({ themesStore: updateDefaultThemeActive })
      );

      this.changeDefaultThemeList();
    }
  }

  setValuesToTheForm(formGroupInfo, formControllerNameInfo, assigningValue) {
    formGroupInfo.get(formControllerNameInfo)?.setValue(assigningValue);
  }

  submitSignInDetails(a: any) {
    let userName = a.signInEmail.split('@')[0];
    let { signInEmail: email, signINPassword: password } = a;
    localStorage.setItem('userInfo', userName);
    this.store.dispatch(loginStart({ email, password }));
    this.router.navigate(['/mythemes']);
  }

  changeFontColors() {
    this.customThemeService.fetchAndSetFontColors();
  }

  changeTheme() {
    this.visible = !this.visible;
    this.fetchedColors = this.customThemeService.fetchPrimaryColor();
    this.customTheme.patchValue(this.fetchedColors);
    this.setValuesToTheForm(
      this.colorPickerTheme,
      'primaryColor11',
      this.fetchedColors.primaryColor
    );
    this.setValuesToTheForm(
      this.colorPickerTheme,
      'secondaryColor11',
      this.fetchedColors.secondaryColor
    );

    let fetchedrecord = this.fetchDataFromEntireStore.find(
      (theme) =>
        theme.prime === this.fetchedColors.primaryColor &&
        theme.secondary === this.fetchedColors.secondaryColor
    );
    let updateThemEActive = {
      id: fetchedrecord.id,
      prime: fetchedrecord.prime,
      secondary: fetchedrecord.secondary,
      active: true,
    };

    this.store.dispatch(
      updateThemeActiveStatus({ themesStore: updateThemEActive })
    );

    this.changeDefaultThemeList();
  }

  fetchAllDataFromStore() {
    this.store.select(getThemesList).subscribe((data) => {
      this.fetchDataFromEntireStore = [...data];
    });
  }

  newTheme(themeDetails) {
    let { primaryColor, secondaryColor } = themeDetails;
    this.themesColorFetchingStatus = false;

    if (primaryColor.charAt(0) !== '#' || secondaryColor.charAt(0) !== '#') {
      primaryColor = this.customThemeService.fetchTextToHexaCode(primaryColor);
      secondaryColor =
        this.customThemeService.fetchTextToHexaCode(secondaryColor);
    }

    themeDetails.primaryColor.length <= 3
      ? (themeDetails.primaryColor =
          '#' + this.customThemeService.fetchHexaCode(primaryColor))
      : (themeDetails.primaryColor = primaryColor);
    themeDetails.secondaryColor.length <= 3
      ? (themeDetails.secondaryColor =
          '#' + this.customThemeService.fetchHexaCode(secondaryColor))
      : (themeDetails.secondaryColor = secondaryColor);

    // fetch all data from store
    this.fetchAllDataFromStore();
    const addNewThemeToListObject = {
      id: this.fetchDataFromEntireStore.length + 1,
      prime: themeDetails.primaryColor,
      secondary: themeDetails.secondaryColor,
      active: true,
    };

    //assigning to the store
    //------------------------------------

    this.store.dispatch(customThemeChoosen({ customThemeData: themeDetails }));
    //----------------------------------

    let findExistTheme = this.fetchDataFromEntireStore.find(
      (theme) =>
        theme.prime === addNewThemeToListObject.prime &&
        theme.secondary === addNewThemeToListObject.secondary
    );

    if (findExistTheme === undefined) {
      this.store.dispatch(
        addNewThmeToList({ themesStore: addNewThemeToListObject })
      );
    } else {
      this.store.dispatch(
        updateThemeActiveStatus({ themesStore: addNewThemeToListObject })
      );
    }

    //----------------------------------
    let defaultStatus =
      this.makeDefaultThemeStatusForm.get('makeDefaultThemeStatus')?.value !==
      null
        ? this.makeDefaultThemeStatusForm.get('makeDefaultThemeStatus')
            ?.value[0]
        : '';

    this.customThemeService.setNewTheme(
      themeDetails,
      this.themesColorFetchingStatus,
      defaultStatus
    );
    this.makeDefaultThemeStatusForm.reset();
    this.visible = !this.visible;

    this.changeDefaultThemeList();
  }

  changeDefaultThemes(themeInfo) {
    let defaultTheme = {
      primaryColor: themeInfo.prime,
      secondaryColor: themeInfo.secondary,
    };

    let themeDataFromStore = {
      primaryColor: '',
      secondaryColor: '',
    };

    //assigning values to the form groups
    this.customTheme.patchValue(defaultTheme);
    this.setValuesToTheForm(
      this.colorPickerTheme,
      'primaryColor11',
      defaultTheme.primaryColor
    );
    this.setValuesToTheForm(
      this.colorPickerTheme,
      'secondaryColor11',
      defaultTheme.secondaryColor
    );

    //fetchesData From The Store
    this.themeSubscription = this.store.select(getTheme).subscribe((data) => {
      themeDataFromStore.primaryColor = data.primaryColor;
      themeDataFromStore.secondaryColor = data.secondaryColor;
    });

    if (
      defaultTheme.primaryColor === themeDataFromStore.primaryColor &&
      defaultTheme.secondaryColor === themeDataFromStore.secondaryColor
    ) {
      this.visible = true;
      this.toasterService.warning('Theme already applied ');
    } else {
      setTimeout(() => {
        this.visible = false;
      }, 500);
    }

    //store data to the store
    this.store.dispatch(customThemeChoosen({ customThemeData: defaultTheme }));

    this.fetchAllDataFromStore();

    let findExistTheme = this.fetchDataFromEntireStore.find(
      (theme) =>
        theme.prime === defaultTheme.primaryColor &&
        theme.secondary === defaultTheme.secondaryColor
    );

    if (findExistTheme !== undefined) {
      let updateTheme = {
        id: findExistTheme.id,
        prime: findExistTheme.prime,
        secondary: findExistTheme.secondary,
        active: true,
      };

      this.store.dispatch(
        updateThemeActiveStatus({ themesStore: updateTheme })
      );
    }

    //assigning new theme
    this.customThemeService.setNewTheme(defaultTheme, true, '');

    this.customThemeService.setPropertyValuesToCSSVariables(
      '--headerFontColor',
      this.customThemeService.getFontColor(defaultTheme.primaryColor)
    );
  }

  applyingColorsToInput(
    colorData,
    colorPickerFormController,
    customThemeControlername
  ) {
    let colorData1;

    if (
      colorData.charAt(0) === '#' &&
      (colorData.length <= 4 || colorData.length === 7)
    ) {
      let check = '#' + this.customThemeService.fetchHexaCode(colorData);

      if (CSS.supports('color', check)) {
        colorData1 = check;
        this.validateColorStatus1 = true;
      } else {
        this.customTheme.controls[customThemeControlername].setErrors({
          incorrect: true,
        });
      }
    } else if (
      colorData.charAt(0) !== '#' &&
      CSS.supports('color', colorData)
    ) {
      colorData1 = this.customThemeService.fetchTextToHexaCode(colorData);
      this.validateColorStatus1 = true;
    } else {
      this.validateColorStatus1 = false;
      this.customTheme.controls[customThemeControlername].setErrors({
        incorrect: true,
      });
    }

    if (this.validateColorStatus1) {
      if (customThemeControlername === 'primaryColor') {
        this.customThemeService.setPropertyValuesToCSSVariables(
          '--primaryColor1',
          colorData1
        );
        this.customThemeService.setPropertyValuesToCSSVariables(
          '--primaryInputTextFontColor',
          this.customThemeService.getFontColor(colorData1)
        );
      } else {
        this.customThemeService.setPropertyValuesToCSSVariables(
          '--secondaryColor1',
          colorData1
        );
        this.customThemeService.setPropertyValuesToCSSVariables(
          '--secondaryInputTextFontColor',
          this.customThemeService.getFontColor(colorData1)
        );
      }

      let colorPickerSetValue =
        '#' + this.customThemeService.fetchHexaCode(colorData1);

      this.setValuesToTheForm(
        this.colorPickerTheme,
        colorPickerFormController,
        colorPickerSetValue
      );
      this.setValuesToTheForm(
        this.customTheme,
        customThemeControlername,
        colorData
      );
    }
  }
}
