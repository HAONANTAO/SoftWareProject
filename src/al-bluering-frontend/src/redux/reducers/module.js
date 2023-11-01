import {
  EDIT,
  EDIT_STATUS,
  EDIT_NAME,
  EDIT_ID,
  UPDATED,
  REMOVE,
} from "../constants";

const initState = { name: "defaultName", mLength: 0 };
export default function categoryReducer(preState = initState, action) {
  // get type and data from input
  const { type, data } = action;
  switch (type) {
    case EDIT:
      return { ...data, mLength: data.materials.length };
    case EDIT_NAME:
      return { ...preState, name: data };
    case EDIT_ID:
      return { ...preState, _id: data };
    case EDIT_STATUS:
      return { ...preState, status: data };
    case UPDATED:
      let oldLength = preState.mLength;
      return { ...preState, mLength: oldLength + data };
    case REMOVE:
      return initState;
    default:
      return preState;
  }
}
