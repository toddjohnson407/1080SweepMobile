import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Font from 'expo-font';

import { primaryColor, bodyText, fonts, defaultNavigationOptions } from '@base/variables';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Dashboard } from '@screens/main/Dashboard';
import { LoginRegister } from '@screens/LoginRegister';
import { ArenasOverview } from '@screens/main/ArenasOverview';
import { CreateArena } from '@screens/main/CreateArena';
import { Toolkit } from '@screens/main/Toolkit';
import { Library } from '@screens/main/Library';

import { Observable } from 'rxjs';
import accountUtils from '@utils/AccountUtils';

import { Ionicons, Foundation, MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';


const ArenasStack = createStackNavigator({ ArenasOverview }, { defaultNavigationOptions });
const CreateArenaStack = createStackNavigator({ CreateArena }, { defaultNavigationOptions });
const DashboardStack = createStackNavigator({ Dashboard }, { defaultNavigationOptions });
const LibraryStack = createStackNavigator({ Library }, { defaultNavigationOptions });

const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: { screen: DashboardStack, navigationOptions: {
      tabBarIcon: (({tintColor}) => (
        <View><MaterialCommunityIcons size={30} color={tintColor} name="view-dashboard"/></View>
      )),
    }},
    ArenasOverview: { screen: ArenasStack, navigationOptions: {
      tabBarIcon: (({tintColor}) => (
        <View><MaterialCommunityIcons size={35} color={tintColor} name="target"/></View>
      ))
    }},
    Library: { screen: LibraryStack, navigationOptions: {
      tabBarIcon: (({tintColor}) => (
        <View><FontAwesome size={30} color={tintColor} name="book"/></View>
      )),
    }},
    // Toolkit: { screen: Toolkit, navigationOptions: {
    //   tabBarIcon: (({tintColor}) => (
    //     <View><Entypo style={[{color: tintColor, fontSize: 26}]} name="tools"/></View>
    //   )),
    // }},
    // CreateArena: { screen: CreateArena, navigationOptions: {
    //   tabBarIcon: (({tintColor}) => (
    //     <View><Ionicons style={[{color: tintColor, fontSize: 26}]} name="md-add-circle"/></View>
    //   )),
    // }},
  },
  {
    initialRouteName: 'ArenasOverview',
    tabBarOptions: {
      activeTintColor: '#ffff',
      inactiveTintColor: '#94ecfc',
      // inactiveTintColor: '#6be2f9',
      showLabel: false,
      style: {
        backgroundColor: primaryColor + 'ff',
        paddingTop: 12,
      }
    }
  }
);

const MainNavigator = createStackNavigator(
  {
    Main: { screen: TabNavigator },
    // LoginRegister,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Main',
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {

  state: any = { fontsLoaded: false, loggedIn: null, user: null }
  
  async componentDidMount() {
    // console.log('logged in status:', this.state.loggedIn)
    await Font.loadAsync(fonts);
    this.setState({ fontsLoaded: true });
    accountUtils.userInfo.subscribe(user => {
      // console.log(user, '<--- USER INFO');
      user && !user.error ? this.setState({ loggedIn: true, user }) : this.setState({ loggedIn: false, user: null })
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
