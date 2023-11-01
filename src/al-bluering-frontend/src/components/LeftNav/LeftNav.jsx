import React, { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { Menu } from "antd";

import "./LeftNav.less";
import { getIcon, menuList } from "../../config/menuConfig";
import logo from "../../assets/img/logo.png";

// redux
import { connect } from "react-redux";
import { createSelectionAction } from "../../redux/actions/curTag";

const { SubMenu } = Menu;

const menuGenerate = (menuList, path, openKeyList) => {
  return menuList.map((item) => {
    if (!item.children) {
      return (
        <Menu.Item key={item.key} icon={getIcon(item.icon)}>
          <NavLink to={item.key}>
            <span>{item.title}</span>
          </NavLink>
        </Menu.Item>
      );
    } else {
      if (item.children.find((cItem) => cItem.key === path))
        openKeyList.push(item.key);

      return (
        <SubMenu
          key={item.key}
          title={<span>{item.title}</span>}
          icon={getIcon(item.icon)}
        >
          {menuGenerate(item.children)}
        </SubMenu>
      );
    }
  });
};

function LeftNav(props) {
  // get current path to determine defaultSelectedKeys
  const location = useLocation();
  const curPath = location.pathname;
  const openKeyList = [];

  const menuNodes = menuGenerate(menuList, curPath, openKeyList);

  const { curTag, select } = props;

  useEffect(() => {
    let tag = "/" + curPath.split("/")[1];
    select([tag]);
  }, [select, curPath]);

  return (
    <div className="left-nav">
      <Link to={"/home"} className="left-nav-header">
        <img src={logo} alt="logo" />
      </Link>
      <Menu
        selectedKeys={curTag}
        defaultOpenKeys={openKeyList}
        mode="inline"
        theme="dark"
      >
        {menuNodes}
      </Menu>
    </div>
  );
}

export default connect((state) => ({ curTag: state.curTag }), {
  select: createSelectionAction,
})(LeftNav);
