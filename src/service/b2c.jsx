import axios from "axios";
import { PRODUCTSAPI } from "../utils/api";

export function farmItems(data){
    return axios.post(PRODUCTSAPI,data,{
        headers:{
            Authorization:"DAF87DSFDSFDSA98FSADKJE324KJL32HFD7FDSFB24343J49DSF",
            "Content-Type":"application/json"
        }
    })
}