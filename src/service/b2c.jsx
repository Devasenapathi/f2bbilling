import axios from "axios";
import { ADDMULTIPLEFARMPRODUCTAPI, CATEGORYAPI, FARMERAPI, GETFARMPRODUCTBYIDAPI, PRODUCTSAPI, PRODUCTTYPEAPI, UNITAPI, UPDATEFARMPRODUCTAPI } from "../utils/api";
import { BASE_AUTH } from "../utils/base_auth";
import { getToken } from "../utils/storage";

const TOKEN = getToken()

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
  return axios.get(PRODUCTTYPEAPI, {
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
          Token:getToken()
        },
      });
}

export function unitMasterService() {
  return axios.get(UNITAPI, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
      Token:getToken()
    },
  });
}


export function farmerMasterService() {
    return axios.get(FARMERAPI, {
      headers: {
        Authorization: BASE_AUTH,
        "Content-Type": "application/json",
        Token:getToken()
      },
    });
  }

export function updateFarmProductService(data){
  return axios.patch(UPDATEFARMPRODUCTAPI,data,{
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
      Token:getToken()
    },
  })
}

export function addMultipleFarmProductService(data){
  return axios.put(ADDMULTIPLEFARMPRODUCTAPI,data,{
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
      Token:getToken()
    },
  })
}

export function getFarmProductByIdService(data){
    return axios.get(GETFARMPRODUCTBYIDAPI,{
      headers: {
        Authorization: BASE_AUTH,
        "Content-Type": "application/json",
        Token:getToken()
      },
    })
}