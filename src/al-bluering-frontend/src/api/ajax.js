/**
 * a function modules that send ajax request
 * return a promise
 */
import axios from "axios";
import { message } from "antd";
import memory from "../utils/storage/memoryUtils";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = "Bearer " + memory.user.token; // we put our token in the header
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

const env = "DEP";
const BASE_URL =
  env === "DEV" ? "http://localhost:8080" : "http://13.239.40.255:8080";

export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    if (type === "GET") {
      if (data.id) {
        promise = axios.get(BASE_URL + url + "/" + data.id);
      } else if (data.kw) {
        // keyword search
        promise = axios.get(BASE_URL + url + "/" + data.kw);
      } else {
        promise = axios.get(BASE_URL + url, {
          params: data,
        });
      }
    } else if (type === "POST") {
      console.log("post:", data);
      promise = axios.post(BASE_URL + url, data);
    } else if (type === "PUT") {
      promise = axios.put(BASE_URL + url + "/" + data.id, data);
    } else if (type === "DELETE") {
      promise = axios.delete(BASE_URL + url + "/" + data.id, data);
    }

    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        message.error(err.message);
        reject();
      });
  });
}
