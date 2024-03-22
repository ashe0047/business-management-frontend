import { getApiResource } from "./api-config";

export const GET_EMPLOYEES = () => getApiResource('hrm', 'emps')
