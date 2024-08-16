import { decrypt, encrypt } from "../helpers/encrypt"

export function setBill(data){
    localStorage.setItem("bill",JSON.stringify(data))
}

export function getBill(){
    const storedValue = localStorage.getItem("bill")
    return storedValue? JSON.parse(storedValue):[]
}

export function setOfflineBill(data){
    localStorage.setItem("offline",JSON.stringify(data))
}

export function getOfflineBill(){
    const storedValue = localStorage.getItem("offline")
    return storedValue? JSON.parse(storedValue):[]
}

export function setToken(data){
    localStorage.setItem("Token",encrypt('Bearer '+data))
}

export function getToken(){
    const storedValue = localStorage.getItem("Token")
    return storedValue? decrypt(storedValue):[]
}