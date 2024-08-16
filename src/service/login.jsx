import axios from "axios";
import { LOGINAPI } from "../utils/api";
import { BASE_AUTH } from "../utils/base_auth";

export function loginService(data){
    return axios.post(LOGINAPI, data, {
        headers: {
          Authorization: BASE_AUTH,
          "Content-Type": "application/json",
        },
      });
}