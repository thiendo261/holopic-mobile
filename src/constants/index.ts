export enum HoloScreen {
  AUTH_STACK = 'AuthStack',
  LOADING = 'Loading',
  WELCOME = 'Welcome',

  LOGIN_STACK = 'LoginStack',
  LOGIN = 'Login',
  COUNTRIES_DIAL_CODE = 'CountriesDialCode',
  VERIFY_OTP = 'VerifyOTP',

  APP_STACK = 'AppStack',
  UPLOAD_PHOTO = 'UploadPhoto',

  TAB_BAR = 'TabBar',
  HOME = 'Home',
  SEARCH = 'Search',
  LIKES = 'Likes',
  PROFILE = 'Profile',
}

export enum AuthStatus {
  VERIFYING = 'VERIFYING',
  FIST_TIME_LOGIN = 'FIRST_TIME_LOGIN',
  UNAUTHORIZED = 'UNAUTHORIZED',
  LOGGED_IN = 'LOGGED_IN',
}
