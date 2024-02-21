import axios from "axios";
import { CATEGORYAPI, FARMERAPI, PRODUCTSAPI, PRODUCTTYPEAPI, UNITAPI } from "../utils/api";
import { BASE_AUTH, TOKEN } from "../utils/base_auth";

export function farmItems(data) {
  return axios.post(PRODUCTSAPI, data, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
    },
  });
}

export function categoryService(data) {
  return axios.get(CATEGORYAPI, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
    },
  });
}

export function productMasterService() {
  return axios.get(CATEGORYAPI, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
    },
  });
}

export function productTypeService(){
    return axios.get(PRODUCTTYPEAPI, {
        headers: {
          Authorization: BASE_AUTH,
          "Content-Type": "application/json",
          Token:TOKEN
        },
      });
}

export function unitMasterService() {
  return axios.get(UNITAPI, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
      Token:TOKEN
    },
  });
}


export function farmerMasterService() {
    return axios.get(FARMERAPI, {
      headers: {
        Authorization: BASE_AUTH,
        "Content-Type": "application/json",
        Token:TOKEN
      },
    });
  }