import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import "./AuthenticatedLayout.css";

const AuthenticatedLayout = (props) => {
	const [currentHeader, setCurrentHeader] = useState({});
	const { icon, title } = currentHeader;

	return (
		<Container fluid="True" className="px-0">
			<Row className="m-0">
				<Col md="auto" className="vh-100 py-3 sidebar-container">
					<Sidebar {...props} />
				</Col>
				<Col className="py-3 d-flex flex-column vh-100">
					<Row>
						<Col>
							<Header icon={icon} title={title} />
						</Col>
					</Row>
					<Outlet context={{ headerHandler: setCurrentHeader }} />
				</Col>
			</Row>
		</Container>
	);
};

export default AuthenticatedLayout;
