import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';

import * as vars from '@base/variables';

export class Dashboard extends React.Component {

  state: any = {}

  componentDidMount(): any {

  }

  render(): any {
    return (
      <View style={vars.screenView}>
        <Text style={vars.bodyText}>Dashboard Screen Renders</Text>
        <Image source={require('@assets/images/logo.png')} style={{ width: 200, height: 200 }}></Image>
      </View>
    )
  }

}

const styles = StyleSheet.create({

})

