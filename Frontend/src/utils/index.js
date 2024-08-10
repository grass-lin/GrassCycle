import axios from "./axios";

export function getPosts(params) {
  return axios.request({
    url: "cycle",
    method: "get",
    params,
  });
}

export const postNewPost = (val, params) => {
  return axios.request({
    url: "cycle",
    method: "post",
    data: val,
    params,
  });
};

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

export const deleteUserJoin = (val, params) => {
  return axios.request({
    url: "hall/join",
    method: "delete",
    data: val,
    params,
  });
};

export const postUserLike = (val, params) => {
  return axios.request({
    url: "cycle/like",
    method: "post",
    data: val,
    params,
  });
};

export const deleteUserLike = (val, params) => {
  return axios.request({
    url: "cycle/like",
    method: "delete",
    data: val,
    params,
  });
};
