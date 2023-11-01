import { SELECT_COACH } from "../constants";

const initState = {};
export default function coachReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case SELECT_COACH:
      return { ...data };
    default:
      return preState;
  }
}
