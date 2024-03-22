import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./PageError.css";
import { redirect, useAsyncError, useNavigate } from "react-router-dom";

const PageError = () => {
	const navigate = useNavigate();
	const error = useAsyncError();
	const isRedirect = error.status === 302;
	useEffect(() => {
		if (isRedirect) {
			navigate(error.headers.get("Location"));
		}
	}, [error, isRedirect, navigate]);
	return (
		!isRedirect && (
			<Row className="d-flex flex-grow-1">
				<Col className="my-auto">
					<h1 className="text-center">Error occured</h1>
				</Col>
			</Row>
		)
	);
};

export default PageError;
