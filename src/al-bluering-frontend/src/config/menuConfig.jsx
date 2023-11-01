import {
  AppstoreOutlined,
  UserOutlined,
  BorderlessTableOutlined,
  ApartmentOutlined,
  ProfileOutlined,
  BarsOutlined,
} from "@ant-design/icons";

import { ageGroupList } from "./ageGroupConfig";

const ageGroupMenu = ageGroupList.map((item) => {
  return {
    title: item,
    key: "/" + item,
  };
});
export const menuList = [
  {
    title: "Profile",
    key: "/profile",
    icon: "ProfileOutlined",
  },
  {
    title: "Module",
    key: "/module",
    icon: "AppstoreOutlined",
  },
  {
    title: "Coach",
    key: "/coach",
    icon: "UserOutlined",
  },
  {
    title: "Age Group",
    key: "/ageGroup",
    icon: "ApartmentOutlined",
    children: ageGroupMenu,
  },
];

export const getIcon = (iconString) => {
  switch (iconString) {
    case "ProfileOutlined":
      return <ProfileOutlined />;
    case "AppstoreOutlined":
      return <AppstoreOutlined />;
    case "BarsOutlined":
      return <BarsOutlined />;
    case "UserOutlined":
      return <UserOutlined />;
    case "ApartmentOutlined":
      return <ApartmentOutlined />;
    default:
      return <BorderlessTableOutlined />;
  }
};

export const getTitle = (key) => {
  let title;
  menuList.forEach((item) => {
    if (item.key === key) {
      title = item.title;
    } else if (item.children) {
      const cItem = item.children.find((cItem) => cItem.key === key);
      if (cItem) {
        title = item.title;
      }
    }
  });
  return title;
};
