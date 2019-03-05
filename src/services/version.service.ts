import axios from 'axios';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';

class VersionService extends BaseService {

  private static instance: VersionService;

  private constructor() {
    super();
  }

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  public getVersion(): Promise<any> {
    return axios.get(`${this.api}api/version`);
  }

  public get(): Observable<any> {
    return Observable.create(axios.get(`${this.api}/version`))
      .map((res: any) => res.data)
      .catch((error: any) => this.handleError(error.response));
  }
}

// export a singleton instance in the global namespace
export const versionService = VersionService.Instance;
