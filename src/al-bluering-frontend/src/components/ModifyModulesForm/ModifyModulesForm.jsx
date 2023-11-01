import React, { useState, useEffect, useCallback } from "react";
import { Checkbox, Row, Col, message, Card } from "antd";

import { reqAllModules } from "../../api";

function ModifyModulesForm(props) {
  // states
  const [loading, setLoading] = useState(false);
  const [allModules, setAllModules] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  // props
  const { assignedModules, update } = props;

  // callback function
  const getCoachesCallback = useCallback(() => {
    (async function () {
      try {
        setLoading(true);
        let result = await reqAllModules();
        console.log(assignedModules, result);
        setAllModules(result);
        setLoading(false);
      } catch (err) {
        message.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    getCoachesCallback();
    setCheckedList(generateDefaultValue());
  }, [getCoachesCallback]);

  useEffect(() => {
    update(checkedList);
  }, [checkedList]);

  const onChange = (checkedValues) => {
    setCheckedList(checkedValues);
  };
  const generateNodes = () => {
    // reorder modules according to their levels
    const levelMap = new Object();
    allModules.map((item) => {
      let name = item.name;
      let _id = item._id;
      let father_id = item.father_id;
      let level = item.level;
      levelMap[item.level] = levelMap[item.level]
        ? [...levelMap[item.level], [{ name, _id, father_id, level }]]
        : [[{ name, _id, father_id, level }]];
    });

    // get key list in descending order
    let keyList = Object.keys(levelMap);
    keyList.sort(function (x, y) {
      if (parseInt(x) > parseInt(y)) {
        return -1;
      } else {
        return 1;
      }
    });

    // form a list backward from low level to high level in level map
    for (let i = 0; i < keyList.length - 1; i++) {
      let level = keyList[i];
      for (let key in levelMap[level]) {
        let obj = levelMap[level][key][0];
        let f_id = obj.father_id;
        for (let k in Object.keys(levelMap[level - 1])) {
          if (levelMap[level - 1][k][0]._id === f_id) {
            levelMap[level - 1][k] = [
              ...levelMap[level - 1][k],
              ...levelMap[level][key],
            ];
          }
        }
      }
    }

    let sorted = [];
    for (let key in levelMap[0]) {
      let objs = levelMap[0][key];
      sorted = [...sorted, ...objs];
    }
    console.log(levelMap);
    return sorted.map((item) => {
      return (
        <Col span={24} key={item._id}>
          <Checkbox style={{ marginLeft: item.level * 10 }} value={item._id}>
            {item.name}
          </Checkbox>
        </Col>
      );
    });
  };
  const generateOptions = () => {
    return allModules.map((item) => {
      return { label: item.name, value: item._id };
    });
  };
  const generateDefaultValue = () => {
    return assignedModules.map((item) => {
      return item._id;
    });
  };
  const option = generateOptions();
  const checkAll = option.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < option.length;
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? option.map((i) => i.value) : []);
  };
  const extra = (
    <Checkbox
      indeterminate={indeterminate}
      onChange={onCheckAllChange}
      checked={checkAll}
    >
      Check all
    </Checkbox>
  );
  return (
    <Card title={"update modules"} loading={loading} extra={extra}>
      <Checkbox.Group
        style={{
          width: "100%",
        }}
        onChange={onChange}
        value={checkedList}
      >
        <Row>{generateNodes()}</Row>
      </Checkbox.Group>
    </Card>
  );
}

export default ModifyModulesForm;
