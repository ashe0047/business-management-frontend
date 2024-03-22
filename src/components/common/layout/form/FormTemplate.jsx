import { React, useEffect } from 'react'
import { useFormik } from 'formik';
import { Form as RouterForm, useActionData } from 'react-router-dom';
import FormError from './FormError';
/**
 * Reusable Form component using Form from react-router-dom with Formik and Yup as form validation
 * 
 * 
 * @formikObj {object} Formik configuration object 
 * @formProps {object} Form properties object
 * @children {object} Nested Form components such as Input, Labels
 * 
 * @returns {<>}
 */
const FormTemplate = ({title, formikObj, formProps, children}) => {
    //form validation
	const formik = useFormik(formikObj);

	//response error handling
	const actionData = useActionData();
	useEffect(() => {
		if (actionData !== undefined) {
			const fieldErr = {}
      const formWideErr = {}
      Object.entries(actionData.data).forEach(([k, v]) => {
        if(k in formik.values){
          fieldErr[k] = v
        }else{
          formWideErr[k] = v
        }
      })
			formik.setErrors(fieldErr);
			formik.setStatus(formWideErr);
		}
	}, [actionData]);

  return (
    <>
        {/* Error Message Display */}
        <FormError errorMsg={formik.status} title={title+' Error'} />
        <RouterForm noValidate onSubmit={formik.handleSubmit} {...formProps}>
            {children(formik)}
        </RouterForm>

    </>
  )
}

export default FormTemplate