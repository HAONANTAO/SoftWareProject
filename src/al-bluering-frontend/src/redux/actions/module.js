import { EDIT, EDIT_NAME, EDIT_ID, EDIT_STATUS, UPDATED, REMOVE } from "../constants";

export const createEditAction = (data) => ({ type: EDIT, data });
export const createEditNameAction = (data) => ({ type: EDIT_NAME, data });
export const createEditIdAction = (data) => ({ type: EDIT_ID, data });
export const createEditStatusAction = (data) => ({ type: EDIT_STATUS, data });
export const createUpdatedAction = (data) => ({ type: UPDATED, data });
export const createRemoveAction = (data) => ({ type: REMOVE, data });
