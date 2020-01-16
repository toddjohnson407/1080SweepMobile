/* This module functions as a simple way for making HTTP requests 
 * using Axios and then returning them in an Observable format */

import { from, of, Observable, BehaviorSubject, throwError, ReplaySubject, iif } from 'rxjs';
import { tap, catchError, mergeMap, map } from 'rxjs/operators';
import axios, { AxiosStatic, AxiosRequestConfig, AxiosResponse, AxiosPromise } from 'axios';


let getRequest = (url: string, config?: AxiosRequestConfig): Observable<any> =>  {
  let httpPromise = axios.get(url, config).then((res: AxiosResponse<any>) => res.data).catch((error: any) => ({ loggedIn: false, error }));
  return from(httpPromise)
}

let postRequest = (url: string, data: any = null, config: AxiosRequestConfig = null): Observable<any> => {
  let httpPromise: AxiosPromise = axios.post(url, data, config).then((res: AxiosResponse<any>) => {
    console.log('post', res.status);
    return res.data
  }).catch((error: any) => error);
  return from(httpPromise);
}

export { getRequest, postRequest }
