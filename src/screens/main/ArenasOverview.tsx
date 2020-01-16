import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Button, SafeAreaView } from 'react-native';

import { retrieveData, storeData, allKeys, removeAllKeysData } from '@utils/StorageSystem';


import * as vars from '@base/variables';
import accountUtils from '@utils/AccountUtils';

export class ArenasOverview extends React.Component {

  state: any = {
    user: null
  }

  static navigationOptions = {
    title: 'Home',
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
      <SafeAreaView style={[vars.screenView, styles.arenasOverviewContainer]}>

        <Text style={styles.arenasTitle}>Your Arenas</Text>
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({

  arenasOverviewContainer: {
    // justifyContent: 'space-around'
  },
  
  arenasTitle: {
    paddingTop: 32,
    fontSize: 40,
    color: 'black',
    fontFamily: 'roboto-light',
    alignSelf: 'center'
  }
})

