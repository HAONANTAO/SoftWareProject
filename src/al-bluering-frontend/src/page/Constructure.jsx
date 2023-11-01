import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Admin = lazy(() => import("./Admin/Admin"));
const Login = lazy(() => import("./Login/Login"));
const Home = lazy(() => import("./Admin/Home/Home"));
const Module = lazy(() => import("./Admin/Module/Module"));
const ModuleList = lazy(() => import("./Admin/Module/ModuleList/ModuleList"));
const ModuleView = lazy(() => import("./Admin/Module/ModuleView/ModuleView"));
const Profile = lazy(() => import("./Admin/Profile/Profile"));
const Coach = lazy(() => import("./Admin/Coach/Coach"));
const AgeGroup = lazy(() => import("./Admin/AgeGroup/AgeGroup"));
const CoachView = lazy(() => import("./Admin/Coach/CoachView/CoachView"));
const CoachDisplay = lazy(() =>
  import("./Admin/Coach/CoachDisplay/CoachDisplay")
);

function Constructure() {
  return (
    <Suspense
      fallback={
        <Spin
          indicator={
            <LoadingOutlined
              spin
              style={{
                fontSize: 24,
              }}
            ></LoadingOutlined>
          }
        ></Spin>
      }
    >
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/" element={<Admin></Admin>}>
          <Route path="profile" element={<Profile></Profile>}></Route>
          <Route path="home" element={<Home></Home>}></Route>
          <Route path="module" element={<Module></Module>}>
            <Route path="" element={<ModuleList></ModuleList>}></Route>
            <Route path="view" element={<ModuleView></ModuleView>}></Route>
          </Route>
          <Route path="coach" element={<Coach></Coach>}>
            <Route path="" element={<CoachDisplay></CoachDisplay>}></Route>
            <Route path="view" element={<CoachView></CoachView>}></Route>
          </Route>
          <Route path="U12" element={<AgeGroup cata="U12"></AgeGroup>}></Route>
          <Route path="U14" element={<AgeGroup cata="U14"></AgeGroup>}></Route>
          <Route path="U16" element={<AgeGroup cata="U16"></AgeGroup>}></Route>
          <Route path="U18" element={<AgeGroup cata="U18"></AgeGroup>}></Route>
          <Route path="U20" element={<AgeGroup cata="U20"></AgeGroup>}></Route>
          <Route
            path="adults"
            element={<AgeGroup cata="adults"></AgeGroup>}
          ></Route>
          <Route path="" element={<Navigate to={"home"}></Navigate>}></Route>
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Error address.</p>
            </main>
          }
        ></Route>
      </Routes>
    </Suspense>
  );
}

export default Constructure;
