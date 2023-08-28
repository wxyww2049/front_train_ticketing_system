import axios from "axios";
import { getToken } from "../api/getToken";
import { SELECT_COURSE_LIST_URL } from "../constants/url";
export const request = async (params, authEnable = false) => {
  const Token = authEnable ? getToken() : null;
  //
  let response = await new Promise((res, rej) => {
    setTimeout(() => {
      axios
        .request({
          ...params,

          // withCredentials: true,
          headers: {
            token: Token,
            "Access-Control-Allow-Origin": "*",
            ...params.headers,
          },
        })
        .then((resp) => {
          res(resp);
        })
        .catch((err) => {
          rej(err);
        });
    }, 0);
  });
  // if (params.method == "get" && !params.headers?.ContentType) {
  //   response = JSON.stringify(response);
  //   response = JSON.parse(response);
  // }
  return response;
};
