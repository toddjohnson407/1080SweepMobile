import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Button, SafeAreaView } from 'react-native';

import { retrieveData, storeData, allKeys, removeAllKeysData } from '@utils/StorageSystem';
import { BasicHeader } from '@components/BasicHeader';
import { ArenaCard } from '@components/ArenaCard';


import * as vars from '@base/variables';
import accountUtils from '@utils/AccountUtils';

export class ArenasOverview extends React.Component {

  state: any = {
    user: null
  }

  // static navigationOptions = {
  //   headerStyle: {
  //     height: 100,
  //     // width: '100%',
  //     // alignSelf: 'stretch',
  //     backgroundColor: vars.primaryColor,
  //   },
  //   headerTitle: () => <BasicHeader title="TESTKLfJJ"/>
  // };

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
      <View style={{flex:1}}>
        <BasicHeader title="Your Arenas"/>

        <SafeAreaView style={[vars.screenView, styles.arenasOverviewContainer]}>
          <ArenaCard title="Primary Arena" description="This is an example Arena." color="#019CBB"/>
          <ArenaCard title="Secondary Arena" description="This is an example Arena." color="#D78876"/>
          <ArenaCard title="Tertiary Arena" description="This is an example Arena." color="pink"/>
        </SafeAreaView>
      </View>
    )
  }

}

const styles = StyleSheet.create({

  arenasOverviewContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  
  arenasTitle: {
    // paddingTop: 32,
    fontSize: 40,
    color: 'black',
    fontFamily: 'roboto-light',
    alignSelf: 'center'
  }
})

