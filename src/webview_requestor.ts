import {AppAuthError} from "@openid/appauth/built/errors";
import {Requestor} from "@openid/appauth/built/xhr";
const request = require("browser-request");

export class WebviewRequestor extends Requestor {
  public xhr<T>(settings: JQueryAjaxSettings): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      request(
          {
            form: settings.data,
            headers: settings.headers,
            json: settings.dataType === "json" ? true : undefined,
            method: settings.method,
            url: settings.url,
          },
          (error: any, response: any, body: any) => {
            if (response.statusCode !== 200) {
              reject(new AppAuthError(response.statusMessage!));
            } else {
              resolve(body as T);
            }
          });
    });
  }
}
