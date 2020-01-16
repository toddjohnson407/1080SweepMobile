/* This module functions as a simple way for making HTTP requests 
 * using Axios and then returning them in an Observable format */

import { from, of, Observable, BehaviorSubject, throwError, ReplaySubject, iif } from 'rxjs';
import { tap, catchError, mergeMap, map } from 'rxjs/operators';
import axios, { AxiosStatic, AxiosRequestConfig, AxiosResponse, AxiosPromise } from 'axios';


let getRequest = (url: string, config?: AxiosRequestConfig): Observable<any> =>  {
  let httpPromise = axios.get(url, config).then((res: AxiosResponse<any>) => ({ res: res.data, status: res.status, error: false })).catch((error: any) => ({ res: error.response.data, status: error.response.status, error: true }));
  return from(httpPromise)
}

let postRequest = (url: string, data: any = null, config: AxiosRequestConfig = null): Observable<any> => {
  let httpPromise: AxiosPromise = axios.post(url, data, config).then((res: AxiosResponse<any>) => {
    let response: any = { res: res.data, error: false }
    return response
  }).catch((error: any) => ({ res: error, error: true }));
  return from(httpPromise);
}

export { getRequest, postRequest }
