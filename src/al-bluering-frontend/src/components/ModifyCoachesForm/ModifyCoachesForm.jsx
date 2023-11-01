import React, { useState, useEffect, useCallback } from "react";
import { Checkbox, message, Card } from "antd";

import { reqAllCoaches } from "../../api";

function ModifyCoachesForm(props) {
  // states
  const [loading, setLoading] = useState(false);
  const [allCoaches, setAllCoaches] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  // props
  const { assignedCoaches, update } = props;

  // callback function
  const getCoachesCallback = useCallback(() => {
    (async function () {
      try {
        setLoading(true);
        let result = await reqAllCoaches();
        const coachList = result.map((item) => {
          const { firstName, middleName, lastName } = item.coach;
          let name =
            middleName === ""
              ? firstName + " " + lastName
              : firstName + " " + middleName + " " + lastName;
          let ageGroup = item.ageGroup;
          return { name, ageGroup, ...item.coach };
        });
        setAllCoaches(coachList);
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
  const generateOptions = () => {
    return allCoaches.map((item) => {
      return { label: item.name, value: item._id };
    });
  };
  const generateDefaultValue = () => {
    return assignedCoaches.map((item) => {
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
    <Card title={"assign coaches"} loading={loading} extra={extra}>
      <Checkbox.Group
        style={{
          width: "100%",
        }}
        onChange={onChange}
        options={option}
        value={checkedList}
      ></Checkbox.Group>
    </Card>
  );
}

export default ModifyCoachesForm;
