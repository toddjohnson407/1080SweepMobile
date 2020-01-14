import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Font from 'expo-font';

import { primaryColor, bodyText, fonts } from './variables';

// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

// import { Dashboard } from '@screens/Dashboard';
// import { Dashboard } from './src/screens/main/Dashboard';

// import { LoginRegister } from './src/screens/LoginRegister';



// const TabNavigator = createMaterialBottomTabNavigator(
//   {
//     List: { screen: ListItems, navigationOptions: {
//       tabBarIcon: (({tintColor}) => (
//         <View><Icon style={[{color: tintColor, fontSize: 26}]} name="home"/></View>
//       )),
//     }},
//     AddItem: { screen: AddItem, navigationOptions: {
//       tabBarIcon: (({tintColor}) => (
//         <View><Icon style={[{color: tintColor, fontSize: 26}]} name="add-circle"/></View>
//       ))
//     }},
//     Profile: { screen: Profile, navigationOptions: {
//       tabBarIcon: (({tintColor}) => (
//         <View><Icon style={[{color: tintColor, fontSize: 26}]} name="person"/></View>
//       )),
//     }},
//   },
//   {
//     initialRouteName: 'List',
//     shifting: false,
//     labeled: false,
//     activeColor: '#21f0d3',
//     inactiveColor: 'grey',
//     barStyle: { backgroundColor: 'white' }
//   }
// );

// const MainNavigator = createStackNavigator(
//   {
//     Home: { screen: TabNavigator },
//     SelectPhoto: { screen: SelectPhoto },
//     Login,
//     SignUp,
//     Loading,
//     Settings,
//     OtherProfile
//   },
//   {
//     headerMode: 'none',
//     initialRouteName: 'Loading',
//     defaultNavigationOptions: {
//       header: null
//     }
//   }
// );

// const AppContainer = createAppContainer(MainNavigator);

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
            <Image source={require('./assets/images/logo.png')} style={{ width: 200, height: 200 }}></Image>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
