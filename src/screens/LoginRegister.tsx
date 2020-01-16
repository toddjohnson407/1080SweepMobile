import React, { useState, useEffect, useReducer } from 'react';
import { Animated, View, SafeAreaView, Text, StyleSheet, TouchableOpacity, UIManager, LayoutAnimation } from 'react-native';
import BasicTextField from '@components/BasicTextField';
import BasicButton from '@components/BasicButton';
import { LinearGradient } from 'expo-linear-gradient';
import accountUtils from '@utils/AccountUtils';
import { createFormField } from '@utils/FormUtils';

import * as vars from '@base/variables'
import { Observable } from 'rxjs';



export class LoginRegister extends React.Component {

  /** 
   * Tracks whether or not component is mounted to
   * ensure setState() isn't call while unmounted
   */
  _isMounted: boolean = false;

  static navigationOptions = {
    title: 'Home',
  };

  state: any = {
    user: null,

    loginForm: [
      createFormField('username', 'Username'),
      createFormField('password', 'Password', 'none', true)
    ],
    registerForm: [
      createFormField('confirmPassword', 'Confirm Password', 'none', true),
      createFormField('firstName', 'First Name', 'words'),
      createFormField('lastName', 'Last Name', 'words'),
      createFormField('email', 'Email'),
    ],

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
      let { loginForm } = this.state;
      
      if (loginForm.every(({value}) => !!value)) {
        let [username, password] = loginForm.map(({ key, value }) => ({ [key]: value }));
        let loginCredentials = Object.assign(username, password);
        accountUtils.loginUser(loginCredentials).subscribe();
      }
    }
  }

  register = (): any => {
    console.log('Register Form:', this.state.registerForm)
  }

  toggleAccountAction = (): any => {

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    this._isMounted && this.setState((prevState: any) => ({ 
      isLoggingIn: !prevState.isLoggingIn, 
      otherAccountAction1: `${prevState.isLoggingIn ? 'Already have an account?' : "Don't have an account?"}`,
      otherAccountAction2: `${prevState.isLoggingIn ? 'Log In' : "Sign Up Now"}` 
    }));
  }

  //TODO: Implement forgot password and reset password features 
  forgotPassword(): any {}

  /** Updates a form field value by its index */
  handleFormUpdate(formName: string, fieldIndex: number, newValue: any): void {
    this.setState((prevState: any) => {
      let formCopy = [...prevState[formName]];
      formCopy[fieldIndex] = { ...formCopy[fieldIndex], value: newValue };
      return ({ [formName]: formCopy })
    });
  }


  FormsView = (): any => {
    return (
      <View style={styles.loginFormContainer}>
        { this.state.loginForm.map((field: any, index: number) => {
          return (
            <BasicTextField
            key={index}
            label={field.label}
            autoCapitalize={field.autoCapitalize}
            secureTextEntry={field.isSecure}
            value={field.value}
            onChangeText={newVal => this._isMounted && this.handleFormUpdate('loginForm', index, newVal) } />
          )
        }) }

        { !this.state.isLoggingIn && this.state.registerForm.map((field: any, index: number) => {
          return (
            <BasicTextField
              key={index}
              label={field.label}
              autoCapitalize={field.autoCapitalize}
              secureTextEntry={field.isSecure}
              value={field.value}
              onChangeText={newVal => this._isMounted && this.handleFormUpdate('registerForm', index, newVal) } />
          )
        }) }
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

        <this.FormsView/>

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