/* This file stores style variables and layouts that are used throughout the application */
import * as Font from 'expo-font';

const fonts: {[name: string]: Font.FontSource;} = {
  'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  'ubuntu-bold': require('./assets/fonts/Ubuntu-Bold.ttf'),
  'ubuntu-medium': require('./assets/fonts/Ubuntu-Medium.ttf'),
  'ubuntu-regular': require('./assets/fonts/Ubuntu-Regular.ttf'),
  'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
  'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
  'questrial': require('./assets/fonts/Questrial-Regular.ttf')
}

const primaryColor: any = '#019CBB';

const bodyText: any = {
  fontSize: 100,
  fontFamily: 'questrial'
}


export { 
  primaryColor,
  bodyText,
  fonts
}