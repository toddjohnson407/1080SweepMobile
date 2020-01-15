import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Font from 'expo-font';

import { primaryColor, bodyText, fonts } from '@base/variables';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Dashboard } from '@screens/main/Dashboard';
import { LoginRegister } from '@screens/LoginRegister';

const MainNavigator = createStackNavigator(
  {
    Dashboard,
    LoginRegister
  },
  {
    headerMode: 'none',
    initialRouteName: 'LoginRegister',
    defaultNavigationOptions: { headerShown: false }
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {

  state: any = { fontsLoaded: false }

  async componentDidMount() {
    await Font.loadAsync(fonts);
    this.setState({ fontsLoaded: true });
  }

  render(): any {
    return (
      <View style={styles.container}>
        { 
          this.state.fontsLoaded ? (
            <AppContainer/> 
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
});
