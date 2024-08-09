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

export const getUserData = (params) => {
  return axios.request({
    url: "user",
    method: "get",
    params,
  });
};

export const updateUserData = (val, params) => {
  return axios.request({
    url: "api/update",
    method: "post",
    params,
    data: val,
  });
};

export const handleLoginInfo = (val) => {
  return axios.request({
    url: "login",
    method: "post",
    data: val,
  });
};

export const postUserJoin = (val, params) => {
  return axios.request({
    url: "hall/join",
    method: "post",
    data: val,
    params,
  });
};
