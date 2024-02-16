import axios from "axios";
import { ORDERAPI } from "../utils/api";
import { BASE_AUTH } from "../utils/base_auth";

export function OrderSave(data) {
  return axios.post(ORDERAPI, data, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
    },
  });
}
