import {Requestor} from "@openid/appauth/built/xhr";
import axios from "axios";

export class WebviewRequestor extends Requestor {
  public xhr<T>(settings: JQueryAjaxSettings): Promise<T> {
    const request = {
      data: settings.data,
      headers: settings.headers,
      method: settings.method || "GET",
      url: settings.url,
    };
    return axios(request).then((response) => {
      return (response.data);
    });
  }
}
