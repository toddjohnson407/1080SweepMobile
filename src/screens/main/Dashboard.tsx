import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Button } from 'react-native';

import { retrieveData, storeData, allKeys, removeAllKeysData } from '@utils/StorageSystem';


import * as vars from '@base/variables';
import accountUtils from '@utils/AccountUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BasicHeader } from '@components/BasicHeader';

export class Dashboard extends React.Component {

  state: any = {
    user: null
  }

  static navigationOptions = {
    title: 'Dashboard',
  };

  async componentDidMount() {
    // await storeData('ObjStore', { test: 'this is an obj' });
    // await storeData('Test', 'Storing in local cache');
    // await storeLocalData('testing', { obj: 'i am tod' });
  }

  logout() {
    accountUtils.logoutUser.subscribe(res => {
      // console.log(res.sta, 'Logged Out')
    });
  }

  render(): any {
    return (
      <View style={{flex:1, backgroundColor: '#ffff'}}>
        <BasicHeader title="Dashboard"/>
        <SafeAreaView style={vars.screenView}>
          {/* <Image source={require('@assets/images/logo.png')} style={{ width: 200, height: 200 }}></Image> */}
          <Button title="Test Logout" onPress={this.logout}/>
        </SafeAreaView>
      </View>
    )
  }

}

const styles = StyleSheet.create({

})

