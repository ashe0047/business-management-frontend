import { getApiResource } from "./api-config";


export const GET_CUSTOMER = () => getApiResource('crm', 'cust')
export const GET_TREATMENT = () => getApiResource('crm', 'treatment')