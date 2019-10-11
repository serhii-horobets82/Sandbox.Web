import axios from "axios";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { VersionInfo, DatabaseInstance, DatabaseSetupParams } from "@/models/version.interface";
import { Credentials } from "@/models/credentials.interface";

class VersionService extends BaseService {
  private static instance: VersionService;

  private constructor() {
    super();
  }

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  public getVersion(): Observable<VersionInfo> {
    return new Observable(observer => {
      axios
        .get(`api/version`)
        .then(response => {
          observer.next(response.data as VersionInfo);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  public initDatabase(data: DatabaseSetupParams): Observable<VersionInfo> {
    return new Observable(observer => {
      axios
        .post(
          `api/setup/init-db`,
          data,
          {
            headers: {
              "X-Api-Key": "dea70539-3569-4fc8-a0b6-65dd3857a091"
            }
          }
        )
        .then(response => {
          observer.next(response.data as VersionInfo);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  public getDemoUsers(): Observable<Credentials[]> {
    return new Observable(observer => {
      axios
        .get(`api/demo/users`)
        .then(response => {
          let data = response.data.map((e: any) => {
            e.userName = e.email;
            return e;
          });
          observer.next(data as Credentials[]);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  public getDatabases(): Observable<DatabaseInstance[]> {
    return new Observable(observer => {
      axios
        .get(`api/demo/databases`)
        .then(response => {
          observer.next(response.data as DatabaseInstance[]);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}

// export a singleton instance in the global namespace
export const versionService = VersionService.Instance;
