import { React, useEffect, useState } from "react";
import { Alert, Form, Spinner } from "react-bootstrap";
import {
	useSubmit,
	useNavigation,
	useOutletContext,
	useSearchParams,
	useActionData,
} from "react-router-dom";
import * as Yup from "yup";
import Input from "../common/layout/form/Input";
import FormTemplate from "../common/layout/form/FormTemplate";
import { AlternateEmailSharp } from "@mui/icons-material";

const PasswordReset = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [email, setEmail] = useState("");
	const isDone = searchParams.get("status") === "done";
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	//Sets the icon and title for the root layout
	const pageConfig = {
		icon: <AlternateEmailSharp sx={{ fontSize: 50 }} className="mx-auto" />,
		title: "Forgot Password",
	};

	const headerHandler = useOutletContext().headerHandler;
	useEffect(() => headerHandler(pageConfig), []);

	//formik config
	const submit = useSubmit();
	const formik = {
		initialValues: {
			email: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Please provide a valid E-mail")
				.required("Please provide an E-mail"),
		}),
		onSubmit: async (values) => {
			setEmail(values.email);
			submit(values, { method: "post" });
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
				isDone ? (
					<Alert variant="success">
						<Alert.Heading className="d-flex justify-content-center">
							Password Reset E-mail Sent
						</Alert.Heading>
						<p>
							An email to reset your password has been sent to{" "}
							<span className="fw-bold text-decoration-underline">
								{email}
							</span>
						</p>
					</Alert>
				) : (
					<>
						<Form.Group
							id="hasaccounthelp"
							className="form-text mb-3 fw-bold d-flex flex-column"
						>
							<span>
								Please enter your email to reset password, if
								you have an account,
							</span>
							<span>
								a reset email will be sent to your email address
							</span>
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
									formik.touched.email &&
									!!formik.errors.email
								}
								feedback={formik.errors.email}
							/>
							<Form.Label htmlFor="email">Email</Form.Label>
						</Form.Group>
						<button
							type="submit"
							disabled={isSubmitting}
							className="btn register-btn"
						>
							{isSubmitting ? (
								<Spinner as="span" size="sm" />
							) : (
								"Continue"
							)}
						</button>
					</>
				)
			}
		</FormTemplate>
	);
};

export default PasswordReset;
