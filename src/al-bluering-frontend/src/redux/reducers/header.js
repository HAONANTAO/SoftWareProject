import { UPDATE_NAME } from "../constants";

const initState = { name: "default" };
export default function countReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case UPDATE_NAME:
      return { name: data };
    default:
      return preState;
  }
}
