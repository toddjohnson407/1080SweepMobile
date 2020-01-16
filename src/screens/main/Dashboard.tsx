import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Button } from 'react-native';

import { retrieveData, storeData, allKeys, removeAllKeysData } from '@utils/StorageSystem';


import * as vars from '@base/variables';
import accountUtils from '@utils/AccountUtils';

export class Dashboard extends React.Component {

  state: any = {
    user: null
  }

  async componentDidMount() {
    // await storeData('ObjStore', { test: 'this is an obj' });
    // await storeData('Test', 'Storing in local cache');
    // await storeLocalData('testing', { obj: 'i am tod' });
  }

  logout() {
    accountUtils.logoutUser.subscribe(res => {
      console.log(res, 'Logged Out', typeof res)
    });
  }

  render(): any {
    return (
      <View style={vars.screenView}>
        <Text style={vars.bodyText}>Dashboard Screen Renders</Text>
        <Image source={require('@assets/images/logo.png')} style={{ width: 200, height: 200 }}></Image>
        <Button title="Test Logout" onPress={this.logout}/>
      </View>
    )
  }

}

const styles = StyleSheet.create({

})

