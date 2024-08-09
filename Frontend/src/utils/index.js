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

export const handleLoginInfo = (val) => {
  console.log(val);
  return axios.request({
    url: "login",
    method: "post",
    data: val,
  });
};
