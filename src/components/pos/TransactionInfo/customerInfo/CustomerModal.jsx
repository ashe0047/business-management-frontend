import { React, useEffect, useState } from "react";
import {
	Modal,
	Form,
	Table,
	InputGroup,
	DropdownButton,
	Dropdown,
} from "react-bootstrap";
import { Chip, Avatar, Paper } from "@mui/material";
import ModalTemplate from "../../../common/layout/modal/ModalTemplate";
import { FilterList, Person, Search, Add } from "@mui/icons-material";
import "./CustomerModal.css";

const CustomerModal = ({ field, form, menuList, custFieldKeys }) => {
	const [selectedFilter, setSelectedFilter] = useState(
		custFieldKeys[0][0][1]
	);

	/* Search Function */
	const [searchValue, setSearchValue] = useState("");

	/* Selection Function */
	const [selectedRow, setSelectedRow] = useState({});
	const isSelectedCust = Object.keys(selectedRow).length !== 0;

	const selectRowHandler = (item) => {
		!isSelectedCust ? setSelectedRow(item) : setSelectedRow({});
	};

	useEffect(() => {
		form.setFieldValue(field.name, selectedRow);
	}, [field.name, selectedRow]);

	const custDataDisplay = (
		<Table hover>
			<thead>
				<tr>
					<td></td>
					{custFieldKeys.map(([_, [__, column]], index) => (
						<th key={index}>{column}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{menuList
					.filter(
						(item) =>
							!searchValue ||
							item.email.toLowerCase().includes(searchValue) ||
							item.name.toLowerCase().includes(searchValue) ||
							item.phoneNum
								.toString()
								.toLowerCase()
								.includes(searchValue)
					)
					.map((item, index) => (
						<tr
							key={index}
							onClick={() => {
								selectRowHandler(item);
							}}
							className={`${
								selectedRow.cust_id === item.cust_id
									? "selected"
									: ""
							}`}
						>
							<td>
								<Form.Check
									className="d-flex justify-content-center"
									type="checkbox"
									checked={
										selectedRow.cust_id === item.cust_id
									}
									onChange={() => {}}
								/>
							</td>
							{custFieldKeys.map(([key, _], index) => (
								<td key={index}>{item[key]}</td>
							))}
						</tr>
					))}
			</tbody>
		</Table>
	);

	return (
		<ModalTemplate
			btnIcon={<></>}
			btnTitle={"Customer"}
			headerIcon={<Person className="title-icon" />}
			headerTitle={"Customer"}
			dialogClassName={"modal-dialog"}
			toggleComponent={{
				component: {
					function: Paper,
					props: {
						className: "bg-transparent cust-badge-container",
						elevation: 0,
					},
				},
				nestedComponent: {
					component: {
						function: Chip,
						props: {
							label: isSelectedCust
								? `${selectedRow.cust_name} #${selectedRow.cust_id}`
								: "Select customer",
							avatar: isSelectedCust ? (
								<Avatar>
									{selectedRow.cust_name?.charAt(0)}
								</Avatar>
							) : null,
							icon: !isSelectedCust && (
								<Add fontSize="small" className="title-icon" />
							),
							onDelete: () => setSelectedRow({}),
							color: "tertiary",
							className: "cust-badge",
						},
					},
				},
			}}
		>
			<Modal.Body style={{ display: "flex", flexDirection: "column" }}>
				<Form>
					{/* <h6 className='ms-1'>Filter by:</h6> */}
					<Form.Group className="d-flex flex-row mb-3">
						<InputGroup className="d-flex flex-row me-2">
							<InputGroup.Text className=" text-muted">
								<Search
									style={{
										width: "1.2rem",
										height: "1.2rem",
									}}
								/>
							</InputGroup.Text>
							<Form.Control
								type="text"
								placeholder="Search a customer"
								onChange={(e) => setSearchValue(e.target.value)}
								autoFocus
							/>
						</InputGroup>
						<DropdownButton
							title={<FilterList className="me-2" />}
							variant="cust-filter"
						>
							{custFieldKeys
								.filter(
									([_, [__, option]]) =>
										option !== selectedFilter
								)
								.map(([_, [__, option]], index) => (
									<Dropdown.Item
										key={index}
										onClick={() =>
											setSelectedFilter(option)
										}
									>
										{option}
									</Dropdown.Item>
								))}
						</DropdownButton>
					</Form.Group>
				</Form>
				<div
					style={{
						height: 0,
						overflowY: "auto",
						display: "flex",
						flexDirection: "column",
						flexGrow: 1,
					}}
				>
					{custDataDisplay}
				</div>
			</Modal.Body>
			<Modal.Footer></Modal.Footer>
		</ModalTemplate>
	);
};

export default CustomerModal;
