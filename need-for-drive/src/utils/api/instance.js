import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "X-Api-Factory-Application-Id": process.env.VUE_APP_ID,
    Authorization: process.env.VUE_APP_SECRET_KEY,
    "Content-Type": "application/json"
  }
});
