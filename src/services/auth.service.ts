import axios from "axios";
import { Credentials } from "@/models/credentials.interface";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { Token } from "@/models/token.interface";

class AuthService extends BaseService {
  private static instance: AuthService;

  private constructor() {
    super();
  }

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  public login(credentials: Credentials): Observable<Token> {
    return new Observable(observer => {
      axios
        .post(`api/auth/login`, credentials)
        .then(response => {
          observer.next(response.data as Token);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  public facebookLogin(accessToken: string): Observable<Token> {
    return new Observable(observer => {
      axios
        .post(`api/externalauth/facebook`, { accessToken })
        .then(response => {
          observer.next(response.data as Token);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}

// export a singleton instance in the global namespace
export const authService = AuthService.Instance;
