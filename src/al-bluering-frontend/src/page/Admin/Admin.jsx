import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "antd";

import memory from "../../utils/storage/memoryUtils";

import LeftNav from "../../components/LeftNav/LeftNav";
import MyHeader from "../../components/MyHeader/MyHeader";
import MyFooter from "../../components/MyFooter/MyFooter";

const { Footer, Sider, Content } = Layout;

function Admin() {
  var user = memory.user;
  if (!user || !user.token) {
    return <Navigate to={"/login"}></Navigate>;
  }

  return (
    <Layout style={{ height: "100%" }}>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <LeftNav></LeftNav>
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <MyHeader></MyHeader>
        <Content
          style={{ margin: "20px", backgroundColor: "#fff", overflow: "auto" }}
        >
          <Outlet></Outlet>
        </Content>
        <Footer>
          <MyFooter></MyFooter>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Admin;
