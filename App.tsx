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
import { Observable } from 'rxjs';
import accountUtils from '@utils/AccountUtils';

const MainNavigator = createStackNavigator(
  {
    Dashboard,
    LoginRegister
  },
  {
    headerMode: 'none',
    initialRouteName: 'Dashboard',
    defaultNavigationOptions: { headerShown: false }
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {

  state: any = { fontsLoaded: false, loggedIn: null, user: null }

  async componentDidMount() {
    await Font.loadAsync(fonts);
    this.setState({ fontsLoaded: true });
    accountUtils.userInfo.subscribe(user => {
      user ? this.setState({ loggedIn: true, user }) : this.setState({ loggedIn: false, user: null })
    });
  }

  render(): any {
    return (
      <View style={styles.container}>
        { 
          this.state.fontsLoaded && this.state.loggedIn !== null ? ( 
            this.state.loggedIn ? (<AppContainer/>) : (<LoginRegister/>)
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
