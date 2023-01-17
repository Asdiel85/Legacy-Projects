import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVolume, IVolumes } from '../models/volume';
import {
  AUTH_API_KEY,
  KEY_PARAM,
  LOCAL_ID,
  MY_VOLUMES,
  MY_VOLUMES_URL,
  VOLUMES,
  VOLUMES_URL
} from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {

  constructor(private http: HttpClient) {
  }

  /*
  *  SENDS REQUEST FOR SEARCHED VOLUMES
  * */
  getSearchedVolumes(params: string, results: string): Observable<IVolumes> {
    return this.http.get<IVolumes>(`${VOLUMES_URL}${VOLUMES}?q=${params}&maxResults=${results}`);
  }

  /*
  * SENDS REQUEST FOR VOLUME DETAILS
  * */
  getCurrentVolumeDetails(id: string): Observable<IVolume> {
    return this.http.get<IVolume>(`${VOLUMES_URL}${VOLUMES}/${id}`);
  }

  /*
  * CREATES MY VOLUME
  * */
  createMyVolume(item: IVolume): Observable<IVolume> {
    return this.http.put<IVolume>(`${MY_VOLUMES_URL}/${MY_VOLUMES}/${localStorage.getItem(LOCAL_ID)}/${item.id}.json${KEY_PARAM}${AUTH_API_KEY}`,
      JSON.stringify(item));
  }

  /*
  * SENDS REQUEST FOR MY VOLUMES
  * */
  getMyVolumes(): Observable<any> {
    return this.http.get<any>(`${MY_VOLUMES_URL}/${MY_VOLUMES}/${localStorage.getItem(LOCAL_ID)}.json${KEY_PARAM}${AUTH_API_KEY}`);
  }

  deleteMyVolume(item: IVolume): Observable<void> {
    return this.http.delete<void>(`${MY_VOLUMES_URL}/${MY_VOLUMES}/${localStorage.getItem(LOCAL_ID)}/${item.id}.json`);
  }

  getVolume(id: string): Observable<IVolume> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<IVolume>(`${MY_VOLUMES_URL}/${MY_VOLUMES}/${localStorage.getItem(LOCAL_ID)}/${id}.json${KEY_PARAM}${AUTH_API_KEY}`);
  }
}
