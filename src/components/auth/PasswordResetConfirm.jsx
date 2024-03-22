import { React, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import {
	useNavigation,
	useOutletContext,
	useSubmit,
	useSearchParams,
	useLoaderData,
} from "react-router-dom";
import * as Yup from "yup";
import { LockResetSharp } from "@mui/icons-material";
import FormTemplate from "../common/layout/form/FormTemplate";
import Input from "../common/layout/form/Input";
import { Form, Alert } from "react-bootstrap";

const PasswordResetConfirm = () => {
	const loaderData = useLoaderData();
	const [searchParams, setSearchParams] = useSearchParams();
	const isDone = searchParams.get("status") === "done";
	const [errorMsg, setErrorMsg] = useState("");
	const [validLink, setValidLink] = useState(false);

	useEffect(() => {
		if (loaderData !== undefined) {
			if (
				"validlink" in loaderData.data &&
				loaderData.data["validlink"]
			) {
				setValidLink(loaderData.data["validlink"]);
			} else {
				setErrorMsg(loaderData.data);
			}
		}
	}, [loaderData]);

	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	//Sets the icon and title for the root layout
	const pageConfig = {
		icon: <LockResetSharp sx={{ fontSize: 50 }} className="mx-auto" />,
		title: "Reset Password",
	};

	const headerHandler = useOutletContext().headerHandler;
	useEffect(() => headerHandler(pageConfig), []);

	//formik config
	const submit = useSubmit();
	const formik = {
		initialValues: {
			password1: "",
			password2: "",
		},
		validationSchema: Yup.object({
			password1: Yup.string()
				.min(6, "Password must be at least 6 characters")
				.required("Please provide a Password"),
			password2: Yup.string()
				.oneOf([Yup.ref("password1"), null], "Passwords must match")
				.required("Please confirm your Password"),
		}),
		onSubmit: async (values) => {
			submit(values, { method: "post" });
			setValidLink(false);
		},
	};
	//form properties
	const formProps = {
		method: "post",
		className: "mx-5 mt-5 px-5 mb-auto d-flex flex-column",
	};
	return (
		<FormTemplate
			title={pageConfig.title}
			formikObj={formik}
			formProps={formProps}
		>
			{(formik) =>
				validLink && !isDone ? (
					<>
						<Form.Group className="form-floating mb-3">
							<Input
								className="auth-field form-control form-control-lg"
								id="password1"
								placeholder="password1"
								type="password"
								name="password1"
								value={formik.values.password1}
								onChange={formik.handleChange}
								isInvalid={
									formik.touched.password1 &&
									!!formik.errors.password1
								}
								feedback={formik.errors.password1}
							/>
							<Form.Label htmlFor="password1">
								Password
							</Form.Label>
						</Form.Group>
						<Form.Group className="form-floating mb-3">
							<Input
								className="auth-field form-control form-control-lg"
								id="password2"
								placeholder="password2"
								type="password"
								name="password2"
								value={formik.values.password2}
								onChange={formik.handleChange}
								isInvalid={
									formik.touched.password2 &&
									!!formik.errors.password2
								}
								feedback={formik.errors.password2}
							/>
							<Form.Label htmlFor="password2">
								Confirm password
							</Form.Label>
						</Form.Group>
						<button
							type="submit"
							disabled={isSubmitting}
							className="btn register-btn"
						>
							{isSubmitting ? (
								<Spinner as="span" size="sm" />
							) : (
								"Reset"
							)}
						</button>
					</>
				) : !validLink && isDone ? (
					<Alert variant="success">
						<Alert.Heading className="d-flex justify-content-center">
							Password Reset Successful
						</Alert.Heading>
						<p>Please proceed to login with your new credentials</p>
					</Alert>
				) : (
					<Alert variant="danger">
						<ul>
							{Object.entries(errorMsg).map(([k, v]) => {
								return <li key={k}>{v}</li>;
							})}
						</ul>
					</Alert>
				)
			}
		</FormTemplate>
	);
};

export default PasswordResetConfirm;
