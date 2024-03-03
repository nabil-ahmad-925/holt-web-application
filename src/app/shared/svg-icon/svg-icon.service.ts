import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/** Don't use this service - use only in the directives */

@Injectable()
export class SvgIconService {
  private _clientBaseUrl = '../../../assets/icons';
  private iconMapper = {};

  constructor(private http: HttpClient) {}

  set baseUrl(value: string) {
    this._clientBaseUrl += `/${value}`;
  }

  public async getSvgByName(svgName: string): Promise<any> {
    let promise: Promise<any>;
    if (this.iconMapper[svgName]) {
      promise = this.iconMapper[svgName];
    } else {
      promise = this.http.get(`${this._clientBaseUrl}/${svgName}.svg`, { responseType: 'text' }).toPromise();
      this.iconMapper[svgName] = promise;
    }
    // svg result
    return await promise;
  }
}
