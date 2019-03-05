import axios from "axios";
import {BaseService} from "./base.service";
import {Observable} from "rxjs";

class ProfileService extends BaseService {
  private static instance: ProfileService;

  private constructor() {
    super();
  }

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  public get(): Observable<any> {


    return new Observable(observer => {
      axios
        .get(`${this.api}api/profile/me`)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}

export const profileService = ProfileService.Instance;
