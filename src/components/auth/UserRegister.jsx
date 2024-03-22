import { React, useEffect } from "react";
import { Form, Spinner, NavLink, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useOutletContext, useNavigation, useSubmit } from "react-router-dom";
import { AccountCircleSharp } from "@mui/icons-material";
import Input from "../common/layout/form/Input";
import FormTemplate from "../common/layout/form/FormTemplate";
import "./UserRegister.css";

const UserRegister = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	//Sets the icon and title for the root layout
	const pageConfig = {
		icon: <AccountCircleSharp sx={{ fontSize: 50 }} className="mx-auto" />,
		title: "Registration",
	};

	const headerHandler = useOutletContext().headerHandler;
	useEffect(() => headerHandler(pageConfig), []);

	//formik config
	const submit = useSubmit();
	const formik = {
		initialValues: {
			name: "",
			username: "",
			email: "",
			password: "",
			phone_num: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Please provide a Name"),
			username: Yup.string().required("Please provide a Username"),
			email: Yup.string()
				.email("Please provide a valid E-mail")
				.required("Please provide an E-mail"),
			password: Yup.string()
				.min(6, "Password must be at least 6 characters")
				.required("Please provide a Password"),
			phone_num: Yup.string().required("Please provide a Phone Number"),
		}),
		onSubmit: async (values) => {
			submit(values, { method: "post" });
		},
	};
	//form properties
	const formProps = {
		method: "post",
		className: "mx-5 mt-5 px-5 mb-auto d-flex flex-column",
	};

	return (
		// Form
		<FormTemplate
			title={pageConfig.title}
			formikObj={formik}
			formProps={formProps}
		>
			{(formik) => (
				<>
					<Form.Group className="form-floating mb-3">
						<Input
							className="auth-field form-control form-control-lg"
							id="name"
							placeholder="name"
							type="text"
							name="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							isInvalid={
								formik.touched.name && !!formik.errors.name
							}
							feedback={formik.errors.name}
						/>
						<Form.Label htmlFor="name">Name</Form.Label>
					</Form.Group>
					<Form.Group className="form-floating mb-3">
						<Input
							className="auth-field form-control form-control-lg"
							id="username"
							placeholder="username"
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
							id="email"
							placeholder="email"
							type="email"
							name="email"
							value={formik.values.email}
							onChange={formik.handleChange}
							isInvalid={
								formik.touched.email && !!formik.errors.email
							}
							feedback={formik.errors.email}
						/>
						<Form.Label htmlFor="email">Email</Form.Label>
					</Form.Group>
					<Form.Group className="form-floating mb-3">
						<Input
							className="auth-field form-control form-control-lg"
							id="password"
							placeholder="password"
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
						<Form.Label htmlFor="">Password</Form.Label>
					</Form.Group>
					<Form.Group className="form-floating mb-3">
						<Input
							className="auth-field form-control form-control-lg"
							id="phone_num"
							placeholder="phone_num"
							type="number"
							name="phone_num"
							value={formik.values.phone_num}
							onChange={formik.handleChange}
							isInvalid={
								formik.touched.phone_num &&
								!!formik.errors.phone_num
							}
							feedback={formik.errors.phone_num}
						/>
						<Form.Label htmlFor="phone_num">
							Phone Number
						</Form.Label>
					</Form.Group>
					<Form.Group id="hasaccounthelp" className="form-text">
						Have an account? Proceed to{" "}
						<NavLink
							href="/auth"
							className="fw-bold text-decoration-underline d-inline"
						>
							Login
						</NavLink>
					</Form.Group>
					<Button
						type="submit"
						variant="filled"
						disabled={isSubmitting}
						className="register-btn"
					>
						{isSubmitting ? (
							<Spinner as="span" size="sm" />
						) : (
							"Register"
						)}
					</Button>
				</>
			)}
		</FormTemplate>
	);
};

export default UserRegister;
