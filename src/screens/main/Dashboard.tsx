import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Button } from 'react-native';

import { _retrieveData, _storeData } from '@utils/StorageSystem';


import * as vars from '@base/variables';
import accountUtils from '@utils/AccountUtils';

export class Dashboard extends React.Component {

  state: any = {
    user: null
  }

  async componentDidMount() {
    await _storeData();
    // await storeLocalData('testing', { obj: 'i am tod' });
  }

  async logout() {
    // accountUtils.logoutUser.subscribe(res => {
    //   console.log(res, 'Logged Out', typeof res)
    // });
    let test = await _retrieveData();
    console.log(test)


  }

  render(): any {
    return (
      <View style={vars.screenView}>
        <Text style={vars.bodyText}>Dashboard Screen Renders</Text>
        <Image source={require('@assets/images/logo.png')} style={{ width: 200, height: 200 }}></Image>
        <Button title="Test Local Storage" onPress={this.logout}/>
      </View>
    )
  }

}

const styles = StyleSheet.create({

})

