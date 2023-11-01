import React from "react";
import { Input } from "antd";
import "./SearchArea.less";
const { Search } = Input;

function SearchArea(props) {
  const { handleKeywordChange } = props;
  return (
    <div>
      <div className="search-area">
        <Search
          placeholder="input name of coaches"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleKeywordChange}
        />
      </div>
    </div>
  );
}

export default SearchArea;
