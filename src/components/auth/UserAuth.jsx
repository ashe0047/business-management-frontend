import { Form, NavLink, Spinner, Alert, Button } from "react-bootstrap";
import { React, useEffect } from "react";
import {
	useOutletContext,
	useNavigation,
	useSubmit,
	useSearchParams,
} from "react-router-dom";
import { LoginSharp } from "@mui/icons-material";
import * as Yup from "yup";
import Input from "../common/layout/form/Input";
import FormTemplate from "../common/layout/form/FormTemplate";
import "./UserAuth.css";

const UserAuth = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	//Login expiry error display
	const [searchParams] = useSearchParams();
	const isLoginExpired = searchParams.get("status") === "expired";

	//Sets the icon and title for the root layout
	const pageConfig = {
		icon: <LoginSharp sx={{ fontSize: 50 }} className="mx-auto" />,
		title: "Login",
	};
	const headerHandler = useOutletContext().headerHandler;
	useEffect(() => headerHandler(pageConfig), []);
	//form validation
	const submit = useSubmit();
	const formik = {
		initialValues: {
			username: "",
			password: "",
		},
		validationSchema: Yup.object({
			username: Yup.string().required("Please provide a Username"),
			password: Yup.string()
				.min(6, "Password must be at least 6 characters")
				.required("Please provide a Password"),
		}),
		onSubmit: (values) => {
			submit(values, { method: "post" });
		},
	};
	const formProps = {
		method: "post",
		className: "mx-5 mt-5 px-5 mb-auto d-flex flex-column",
	};

	return (
		// {/* Form */}
		<FormTemplate
			title={pageConfig.title}
			formikObj={formik}
			formProps={formProps}
		>
			{(formik) => (
				<>
					{isLoginExpired && (
					<Alert variant="danger">
						<p>Login expired, please proceed to re-login again</p>
					</Alert>
					)}
					<Form.Group className="form-floating mb-3">
						<Input
							className="auth-field form-control form-control-lg"
							placeholder="username"
							id="username"
							type="text"
							name="username"
							value={formik.values.username}
							onChange={formik.handleChange}
							isInvalid={
								formik.touched.username &&
								!!formik.errors.username
							}
							feedback={formik.errors.username}
						/>
						<Form.Label htmlFor="username">Username</Form.Label>
					</Form.Group>
					<Form.Group className="form-floating mb-3">
						<Input
							className="auth-field form-control form-control-lg"
							placeholder="password"
							id="password"
							type="password"
							name="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							isInvalid={
								formik.touched.password &&
								!!formik.errors.password
							}
							feedback={formik.errors.password}
						/>
						<Form.Label htmlFor="password">Password</Form.Label>
						<Form.Group id="noaccounthelp" className="form-text">
							If you do not have an account, proceed to{" "}
							<NavLink
								href="/auth/register"
								className="fw-bold text-decoration-underline d-inline"
							>
								Sign Up
							</NavLink>
						</Form.Group>
					</Form.Group>
					<Button
						type="submit"
						variant="filled"
						disabled={isSubmitting}
						className="login-btn"
					>
						{isSubmitting ? (
							<Spinner as="span" size="sm" />
						) : (
							"Login"
						)}
					</Button>
					{/* <button type="button" onClick={handleForgotPassword}>
        Forgot Password
      </button> */}
				</>
			)}
		</FormTemplate>
	);
};

export default UserAuth;
