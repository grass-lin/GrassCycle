import axios from "./axios";

export function getPostData(params) {
  return axios.request({
    url: "api/get-post",
    method: "get",
    params,
  });
}

export const getHomeData = () => {
  return axios.request({
    url: "",
    method: "get",
  });
};
