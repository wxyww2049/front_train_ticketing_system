import { request } from "../api/request";

export const postQueryFn = async (param) => {
  const { data } = await request(
    {
      url: param.url,
      method: param.method ?? "post",
      data: param.data ?? {},
      params: param.params ?? {},
      headers: param.headers ?? {},
    },
    param.useToken ?? false
  );
  return {
    data,
  };
};
