import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

import { Markers } from "./rebels/markers";
import 'rxjs/Rx';
import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
  markerUrl = 'http://gis4oldenburg.oldenburg.de/viewer/php/getmarker.php';
  constructor(public http: Http) { }

  getRebels() {
    let reqParam = {
      mandant: 'oldenburg',
      ukat: '77',
      mids: '',
      bbox: '8.188923597335815,53.1497860033164,8.231903314590454,53.136941114903514',
      width: '2003',
      height: '998',
      z: '16',
      cluster: '1',
      _: '',
    };
    const params = new URLSearchParams();
    params.set('mandant', reqParam.mandant);
    params.set('ukat', reqParam.ukat);
    params.set('mids', reqParam.mids);
    params.set('bbox', reqParam.bbox);
    params.set('width', reqParam.width);
    params.set('height', reqParam.height);
    params.set('z', reqParam.z);
    params.set('cluster', reqParam.cluster);
    params.set('_', reqParam._);

    return this.http.get(this.markerUrl, { search: params })
      .map((res: Response) => {
        var markers: Markers[] = [];
        let marker: Markers;
        // const markers :Markers[]=res.json(); return markers;
        for (let obj of res.json()) {
          marker = new Markers(obj.ukat, obj.lat, obj.lon, obj.id, obj.file);
          markers.push(marker);
        }
        return markers;
      })
      .catch(this.handleError);
  }
  handleError(error: Response | any) {
    console.log('ERROR WITH REQUEST');
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
