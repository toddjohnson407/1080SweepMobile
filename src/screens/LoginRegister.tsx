import React, { useState, useEffect, useReducer } from 'react';
import { Animated, View, SafeAreaView, Text, StyleSheet, TouchableOpacity, UIManager, LayoutAnimation } from 'react-native';
import BasicTextField from '@components/BasicTextField';
import BasicButton from '@components/BasicButton';
import { LinearGradient } from 'expo-linear-gradient';
import accountUtils from '@utils/AccountUtils';

import * as vars from '@base/variables'
import { Observable } from 'rxjs';

export class LoginRegister extends React.Component {

  _isMounted: boolean = false;

  state: any = {
    user: null,
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',

    otherAccountAction1: `Don't have an account?`,
    otherAccountAction2: `Sign Up Now`,
    isLoggingIn: true
  }

  getUserInfo: Observable<any> = accountUtils.userInfo;

  componentDidMount(): any {
    this._isMounted = true;
    this.getUserInfo.subscribe(user => this._isMounted && this.setState({ user }));
  }

  componentWillUnmount(): any {
    this._isMounted = false;
  }


  login = (): any => {
    if (!this.state.isLoggingIn) this.register()
    else {
      let { password, username } = this.state;
      if (password && username) accountUtils.loginUser({ username, password }).subscribe();
    }
  }
  register = (): any => {
    console.log('Register');
  }

  registerView: any = () => {
    return (
      <View style={[styles.registerSection]}>
        <BasicTextField
          label="Confirm Password"
          autoCapitalize={'none'}
          secureTextEntry={true}
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this._isMounted && this.setState({ confirmPassword })} />
        <BasicTextField
          label="First Name"
          autoCapitalize={'none'}
          value={this.state.firstName}
          onChangeText={firstName => this._isMounted && this.setState({ firstName })} />
        <BasicTextField
          label="Last Name"
          autoCapitalize={'none'}
          value={this.state.lastName}
          onChangeText={lastName => this._isMounted && this.setState({ lastName })} />
        <BasicTextField
          label="Email"
          autoCapitalize={'none'}
          value={this.state.email}
          onChangeText={email => this._isMounted && this.setState({ email })} />
        <BasicTextField
          label="Username"
          autoCapitalize={'none'}
          value={this.state.username}
          onChangeText={username => this._isMounted && this.setState({ username })} />
      </View>
    )
  }


  toggleAccountAction = (): any => {

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    this._isMounted && this.setState((prevState: any) => ({ 
      isLoggingIn: !prevState.isLoggingIn, 
      otherAccountAction1: `${prevState.isLoggingIn ? 'Already have an account?' : "Don't have an account?"}`,
      otherAccountAction2: `${prevState.isLoggingIn ? 'Log In' : "Sign Up Now"}` 
    }));
  }

  forgotPassword(): any {

  }


  FormType = (): any => {
    return (
      <View style={styles.loginFormContainer}>
        <BasicTextField
        label="Username"
        autoCapitalize={'none'}
        value={this.state.username}
        onChangeText={username => this._isMounted && this.setState({ username })} />
        <BasicTextField
          label="Password"
          autoCapitalize={'none'}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this._isMounted && this.setState({ password })} />

        { !this.state.isLoggingIn ? <this.registerView/> : null }

      </View> 
    );
  }

  _setMinHeight(event): void { this._isMounted && this.setState({ minHeight : event.nativeEvent.layout.height })}
  _setMaxHeight(event): void { this._isMounted && this.setState({ maxHeight : event.nativeEvent.layout.height })}

  render(): any {
    return (
      <SafeAreaView style={[vars.screenView, styles.loginView]}>

        { 
          this.state.isLoggingIn ? <View style={styles.loginHeaderContainer}>
            <Text style={styles.loginHeader}>1080° Sweep</Text>
            <Text style={[styles.loginHeader, styles.loginHeaderBottom]}>— Attetional Leadership™ —</Text>
          </View> : <View style={styles.loginHeaderContainer}>
            <Text style={[styles.loginHeader, {letterSpacing: 1.5, fontFamily: 'roboto-light'}]}>Registration</Text>
          </View> 
        }

        <this.FormType/>

        <View style={styles.actionContainer}>
          <BasicButton style={{marginTop: 50}} title={this.state.isLoggingIn ? 'Log In' : 'Create Account'} onPress={this.login}/>
          <TouchableOpacity onPress={this.toggleAccountAction} style={styles.altOpts}>
            <Text style={styles.altOpt}>{this.state.otherAccountAction1}</Text>
            <Text style={[styles.altOpt, styles.altOpt2]}>{this.state.otherAccountAction2}</Text>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={[vars.primaryColor + 'd0', '#00e5d6']}
          style={{ position: 'absolute', zIndex: -1, left: 0, right: 0, bottom: 0, height: 800 }} />

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: vars.primaryColor,
    paddingTop: 15
  },

  actionHeader: {
    flex: 0.35,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  actionHeaderText: {
    fontSize: 40,
    color: '#fff',
    fontFamily: 'roboto-bold',
  },

  loginFormContainer: {
    width: '85%',
    alignSelf: 'center',
    paddingTop: 20,
  },
  registerSection: { overflow: 'hidden' },

  loginHeaderContainer: {
    flex: 0.8,
    justifyContent: 'flex-end',
    paddingBottom: 45,
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    width: '85%',
  },
  loginHeader: {
    fontFamily: 'roboto-medium',
    color: '#fff',
    letterSpacing: 3,
    fontSize: 45,
    textAlign: 'left'
  },
  loginHeaderBottom: {
    marginTop: 5,
    fontFamily: 'roboto-light',
    fontSize: 20,
  },

  altOpts: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  altOpt: {
    color: '#ffff',
    fontSize: 16,
    fontFamily: 'roboto-regular'
  },
  altOpt2: {
    fontFamily: 'roboto-bold',
    marginLeft: 5
  },

  actionContainer: {
    alignSelf: 'center',
    flex: 1
  }
})