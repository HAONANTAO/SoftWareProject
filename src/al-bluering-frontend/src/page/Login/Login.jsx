import React from "react";
import { useNavigate, Navigate } from "react-router-dom";

import LoginTable from "../../components/LoginTable/LoginTable";
import { message } from "antd";

import memory from "../../utils/storage/memoryUtils";
import storageUtils from "../../utils/storage/storageUtils";

import "./Login.less";
import logo from "../../assets/img/logo.png";

import { reqLogin } from "../../api";

function Login(porps) {
  const navigator = useNavigate();

  //if already login, navigate to home page
  const user = memory.user;
  if (user.token) {
    message.info("Welcome back, navigate to home page");
    return <Navigate to={"/home"}></Navigate>;
  }
  // get login infomation from
  const getLoginInfo = async (user) => {
    const { username, password } = user;
    console.log(username, password);
    try {
      const value = await reqLogin(username, password);
      message.success("login successfully");
      memory.user = value;
      storageUtils.saveUser(value);
      navigator("/home");
    } catch (err) {
      message.error(err);
    }
  };

  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo" />
        <h1>Altona Gators Basketball Club</h1>
      </header>
      <section className="login-content">
        <h2>Login as An Administrator</h2>
        <LoginTable getLoginInfo={getLoginInfo}></LoginTable>
      </section>
    </div>
  );
}

export default Login;
