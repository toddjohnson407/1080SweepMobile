import React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { primaryColor } from '@base/variables';

export const ArenaCard = ({ title, color, description = '', style = null }) => {


  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  card: {
    width: '80%',
    height: 150,
    borderRadius: 15,
    paddingLeft: 16,
    paddingTop: 16,
    marginBottom: 32
  },
  title: {
    color: '#ffff',
    fontFamily: 'roboto-bold',
    fontSize: 30
  },
  description: {
    color: '#ffff',
    fontFamily: 'roboto-regular',
    fontSize: 18
  }
})
