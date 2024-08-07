import axios from "./axios";

export function getPosts(params) {
  return axios.request({
    url: "hall/cycle",
    method: "get",
    params,
  });
}

export const getHallData = () => {
  return axios.request({
    url: "hall",
    method: "get",
  });
};
