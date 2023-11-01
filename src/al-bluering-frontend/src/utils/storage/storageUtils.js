/**
 * modules containing tools used to operating local storage
 */

import store from "store";

const USER_KEY = "user_key";
const EXPIRE_TIME = 1000 * 60 * 60;

const storageUtils = {
  // save user
  saveUser(user) {
    // original js code
    // localStorage.setItem(USER_KEY, JSON.stringify(user));

    Object.assign(user, { login_time: new Date().getTime() });
    store.set(USER_KEY, JSON.stringify(user));
  },

  // read user
  getUser() {
    // original js code
    // return JSON.parse(localStorage.getItem(USER_KEY) || "{}");

    // adding function of expired time of local storage
    var user = JSON.parse(store.get(USER_KEY) || "{}");
    let date = new Date().getTime();
    let loginTime = user.login_time;
    delete user.login_time;
    if (loginTime && date - loginTime > EXPIRE_TIME) {
      this.deleteUser();
      console.log("login expired");
      return {};
    } else {
      return user;
    }
  },

  // delete user
  deleteUser() {
    // original js code
    // localStorage.removeItem(USER_KEY);
    store.remove(USER_KEY);
    store.remove("persist:root");
  },
};

export default storageUtils;
