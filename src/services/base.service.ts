import { Observable } from "rxjs";

export abstract class BaseService {
  protected readonly api = process.env.VUE_APP_ROOT_API;

  protected handleError(error: any) {
    const applicationError = error.headers["Application-Error"];

    if (applicationError) {
      return Observable.throw(applicationError);
    }

    let modelStateErrors: any = "";

    if (error.data) {
      for (const key in error.data) {
        if (error.data[key]) {
          modelStateErrors += error.data[key] + "\n";
        }
      }
    }

    modelStateErrors = modelStateErrors == "" ? null : modelStateErrors;
    return Observable.throw(modelStateErrors || "Server error");
  }
}
