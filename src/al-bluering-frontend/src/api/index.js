/**
 * index of all api interface function
 */

import { UPDATED } from "../redux/constants";
import ajax from "./ajax";
const POST = "POST";
const GET = "GET";
const PUT = "PUT";
const DELETE = "DELETE";

// module
export const reqModules = (id) => ajax("/module/subModule", { id }, GET);

export const reqAllModules = () => ajax("/module", {}, GET);

export const reqSingleModule = (id) => ajax("/module", { id }, GET);

export const reqCreateModule = (name, father_id, level) =>
  ajax("/module", { name, father_id, level }, POST);

export const reqUpdateModule = (id, name, father_id, level, materials) =>
  ajax("/module", { id, name, father_id, level, materials }, PUT);

export const reqDeleteModule = (id) => ajax("/module", { id }, DELETE);

export const reqMaterialList = (id) => ajax("/module/materials", { id }, GET);

// materials
export const reqSingleMaterial = (id) => ajax("/material", { id }, GET);

export const reqUpdateTextMaterial = (id, name, content) =>
  ajax("/material", { id, name, content }, PUT);

export const reqDeleteMaterial = (id) => ajax("/material", { id }, DELETE);

export const reqCreateTextMaterial = (type, name, content, module_id, id) =>
  ajax("/material", { type, name, content, module_id, id }, POST);

export const reqCreateFileMaterial = (
  type,
  name,
  url,
  description,
  module_id,
  id
) => ajax("/material", { type, name, url, description, module_id, id }, POST);

export const reqUpdateFileMaterial = (id, name, url, description) =>
  ajax("/material", { id, name, url, description }, PUT);

export const reqCreateAssessment = (
  type,
  name,
  isAnswerVisible,
  questions,
  description,
  module_id,
  id
) =>
  ajax(
    "/material",
    { type, name, isAnswerVisible, questions, description, module_id, id },
    POST
  );

export const reqUpdateAssessment = (
  id,
  name,
  isAnswerVisible,
  questions,
  description
) =>
  ajax("/material", { id, name, isAnswerVisible, questions, description }, PUT);

// admin
export const reqLogin = (loginID, password) =>
  ajax("/admin/login", { loginID, password }, POST);

export const reqSingleAdmin = (id) => ajax("/admin", { id }, GET);

export const reqUpdateAdmin = (
  id,
  firstName,
  middleName,
  lastName,
  loginID,
  password,
  description,
  age,
  address,
  phone
) =>
  ajax(
    "/admin",
    {
      id,
      firstName,
      middleName,
      lastName,
      loginID,
      password,
      description,
      age,
      address,
      phone,
    },
    PUT
  );

export const reqCreateAdmin = (
  firstName,
  middleName,
  lastName,
  loginID,
  password,
  description,
  age,
  address,
  phone
) =>
  ajax(
    "/admin",
    {
      firstName,
      middleName,
      lastName,
      loginID,
      password,
      description,
      age,
      address,
      phone,
    },
    POST
  );

// coach
export const reqAllCoaches = () => ajax("/coacher", {}, GET);

export const reqSearchCoaches = (kw) => ajax("/coacher/find", { kw }, GET);

export const reqCreateCoach = (
  firstName,
  middleName,
  lastName,
  loginID,
  password,
  description,
  age,
  address,
  phone
) =>
  ajax(
    "/coacher",
    {
      firstName,
      middleName,
      lastName,
      loginID,
      password,
      description,
      age,
      address,
      phone,
    },
    POST
  );

export const reqSingleCoach = (id) => ajax("/coacher", { id }, GET);

export const reqDeleteCoach = (id) => ajax("/coacher", { id }, DELETE);

export const reqUpdateCoach = (
  id,
  firstName,
  middleName,
  lastName,
  loginID,
  password,
  description,
  age,
  address,
  phone
) =>
  ajax(
    "/coacher",
    {
      id,
      firstName,
      middleName,
      lastName,
      loginID,
      password,
      description,
      age,
      address,
      phone,
    },
    PUT
  );

// Age Group
export const reqCreateAgeGroup = (name, coaches, modules) =>
  ajax("/ageGroup", { name, coaches, modules }, POST);

export const reqGetAgeGroup = (kw) => ajax("/ageGroup/find", { kw }, GET);

export const reqGetAllAgeGroup = () => ajax("/ageGroup", {}, GET);

export const reqUpdateAgeGroup = (id, name, coaches, modules) =>
  ajax("/ageGroup", { id, name, coaches, modules }, PUT);
