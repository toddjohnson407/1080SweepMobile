/** 
 * This utility module provides methods related to a
 * user's account.
 */

import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { getRequest, postRequest } from './HttpSubscriber';

const userOwnershipsEndpoint: string = '/api/user/ownerships';
const userHomeEndpoint: string = '/api/user/home';
const userInfoEndpoint: string = 'http://localhost:3000/api/user/info';
const userUpdateEndpoint: string = '/api/user/updateprofile'
const userCanCreateArenaEndpoint: string = '/api/user/cancreatearena'

const userLoginEndpoint: string = 'http://localhost:3000/api/auth/login/';
const userRegisterEndpoint: string = 'http://localhost:3000/api/auth/register/';
const userLogoutEndpoint: string = 'http://localhost:3000/api/auth/logout/';

const user: BehaviorSubject<any> = new BehaviorSubject(null);
let userHasEmitted: boolean = false;

const accountUtils = { 
  /** Creates an new user and logs them in */
  registerUser(creds: any): Observable<any> {
    return postRequest(userRegisterEndpoint, creds)
  },
  loginUser: loginUser,
  // /** Logs in a user */
  // loginUser(creds: any): Observable<any> {
  //   return getRequest(userLoginEndpoint)
  //   // .pipe(tap(_ => clearAllProperties()))
  // },
  logoutUser: logoutUser(),
  userInfo: userInfo()
}

function loginUser(creds: any): Observable<any> {
  return getRequest(userLoginEndpoint).pipe(tap(_ => {
    userHasEmitted = false;
    requestUser();
  }))
  // .pipe(
  //   tap((res: any) => res && console.log(res.data, 'TAPPING')),
  //   catchError((err: any) => err)
  // )
}

/** Gets an observable that emits the user object whenever it is changed */
function userInfo(): Observable<any> {
  !userHasEmitted && requestUser();
  return user.asObservable();
}

/** Make the request to the api to get the user */
function requestUser(): void {
  userHasEmitted = true;
  getRequest(userInfoEndpoint).pipe(catchError(_ => of(null))).subscribe(val => user.next(val))
}

/** Logs out the current user */
function logoutUser(): Observable<any> {
  return getRequest(userLoginEndpoint).pipe(tap(_ => clearAllProperties()))
}


/** Clears the properties from observables that need to be reset */
function clearAllProperties(): void {
  userHasEmitted = false;
  user.next(null);
  console.log('USER VALUE:', user.value);
}

export default accountUtils