import React from "react";
import "./TransactionInfo.css";
import { Col, Nav, Row } from "react-bootstrap";
import EmployeeWidget from "./commissionInfo/employeeInfo/EmployeeWidget";
import CustomerWidget from "./customerInfo/CustomerWidget";
import { Divider } from "@mui/material";

const TransactionInfo = ({ customerList, employeeList }) => {
	return (
		<Nav variant="pills" className="transaction-bar">
			<Row className="flex-grow-1">
				<Col md={"auto"} className="d-flex flex-row">
					<CustomerWidget menuList={customerList} />
				</Col>
				<Col md={"auto"} className="d-flex flex-row p-0">
					<Divider
						className="divider"
						flexItem
						variant="middle"
						orientation="vertical"
					/>
				</Col>
			</Row>
		</Nav>
	);
};

export default TransactionInfo;
