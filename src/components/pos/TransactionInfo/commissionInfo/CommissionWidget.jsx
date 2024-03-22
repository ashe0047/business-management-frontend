import React, { useState } from "react";
import { AttachMoneySharp } from "@mui/icons-material";
import {
	Divider,
	Stack,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import "./CommissionWidget.css";
import { Card } from "react-bootstrap";
import CardStyled from "../../../common/layout/card/CardStyled";
import { ErrorMessage, FieldArray } from "formik";
import CommissionForm from "./commissionForm/CommissionForm";

const CommissionWidget = ({ employeeList }) => {
	const [granularity, setGranularity] = useState("sale");
	const granularityHandler = (e, value) => {
		setGranularity(value);
	};

	return (
		<CardStyled
			title={
				<>
					<AttachMoneySharp className="title-icon" />
					<h4>Commission</h4>
				</>
			}
		>
			<Card.Body className="comm-body">
				<Stack direction={"row"} spacing={"auto"} marginBottom={2}>
					<Typography variant="body">Granularity</Typography>
					<ToggleButtonGroup
						exclusive
						color="secondary"
						value={granularity}
						onChange={granularityHandler}
					>
						<ToggleButton value={"sale"}>Sale</ToggleButton>
						<ToggleButton value={"saleitem"}>
							Sale Item
						</ToggleButton>
					</ToggleButtonGroup>
				</Stack>
				<Divider variant="middle">Sharing Settings</Divider>
				<Stack direction={"column"} gap={1} className="d-flex flex-grow-1" sx={{height: 0, overflowY: "auto", overflowX: "visible"}}>
					<FieldArray name="commission">
						{({
							move,
							swap,
							push,
							insert,
							unshift,
							pop,
							remove,
							replace,
							form,
							...props
						}) => {
							return (
								<CommissionForm
									arrayHelpers={{
										move,
										swap,
										push,
										insert,
										unshift,
										pop,
										remove,
										replace,
										form,
									}}
									form={form}
									employeeList={employeeList}
									granularity={granularity}
								/>
							);
						}}
					</FieldArray>
					<ErrorMessage name="commission">
						{(msg) => {
							return typeof msg === 'string' && <div>{msg}</div>;
						}}
					</ErrorMessage>
				</Stack>
			</Card.Body>
		</CardStyled>
	);
};

export default CommissionWidget;
