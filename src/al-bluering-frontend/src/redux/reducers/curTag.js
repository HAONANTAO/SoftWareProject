import { SELECTION } from "../constants";

const initState = ["/login"];
export default function countReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case SELECTION:
      return [...data];
    default:
      return preState;
  }
}
