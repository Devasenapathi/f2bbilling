import axios from "axios";
import { PRODUCTSAPI } from "../utils/api";
import { BASE_AUTH } from "../utils/base_auth";

export function farmItems(data){
    return axios.post(PRODUCTSAPI,data,{
        headers:{
            Authorization:BASE_AUTH,
            "Content-Type":"application/json"
        }
    })
}