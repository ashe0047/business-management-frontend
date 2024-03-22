import React from "react";
import { Alert } from "react-bootstrap";

const FormError = ({errorMsg, title}) => {
	return (
		<>
			{errorMsg && Object.keys(errorMsg).length !== 0 && (
				<Alert variant="danger">
					<strong className="me-auto">{title}</strong>
					<ul>
						{Object.entries(errorMsg).map(([k, v]) => {
							return <li key={k}>{v}</li>;
						})}
					</ul>
				</Alert>
			)}
		</>
	);
};

export default FormError;
