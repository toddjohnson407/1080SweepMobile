import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, SafeAreaView } from 'react-native';

import * as vars from '@base/variables'
import { ArenaCard } from '@components/ArenaCard';
import { BasicHeader } from '@components/BasicHeader';

export class Library extends React.Component {

  state: any = {}

  componentDidMount(): any {

  }

  render(): any {
    return (
      <View style={{flex:1, backgroundColor: '#ffff'}}>
        <BasicHeader title="Library"/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
})

