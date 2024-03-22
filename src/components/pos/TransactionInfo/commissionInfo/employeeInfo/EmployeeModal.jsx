import { React, useState } from "react";
import {
	Modal,
	Form,
	Table,
	InputGroup,
	DropdownButton,
	Dropdown,
} from "react-bootstrap";
import ModalTemplate from "../../../../common/layout/modal/ModalTemplate";
import { FilterList, Badge, Search, OpenInNew } from "@mui/icons-material";
import "./EmployeeModal.css";

const EmployeeModal = ({ field, form, onSelect, menuList, empFieldKeys }) => {
	const [selectedFilter, setSelectedFilter] = useState(empFieldKeys[0][1][1]);
	/* Search Function */

	const [searchValue, setSearchValue] = useState("");
	const searchHandler = () => {};
	const [selectedRow, setSelectedRow] = useState([]);
	const selectRowHandler = (index) => {
		if (selectedRow.includes(index)) {
			setSelectedRow(
				selectedRow.slice().filter((item) => item !== index)
			);
		} else {
			setSelectedRow(selectedRow.slice().concat(index));
		}
		onSelect(menuList[index]);
	};
	const empDataDisplay = (
		<Table hover>
			<thead
				style={{
					top: 0,
					position: "sticky",
					backgroundColor: "#0D1B1E",
					color: "white",
				}}
			>
				<tr>
					<td></td>
					{empFieldKeys.map(([_, [__, column]], index) => (
						<th key={index}>{column}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{menuList
					.filter(
						(item) =>
							!searchValue ||
							item.emp_name.toLowerCase().includes(searchValue) ||
							item.emp_phone_num
								.toString()
								.toLowerCase()
								.includes(searchValue)
					)
					.map((item, index) => (
						<tr
							key={index}
							onClick={() => selectRowHandler(index)}
							className={`${
								selectedRow.includes(index) ? "selected" : ""
							}`}
						>
							<td>
								<Form.Check
									className="d-flex justify-content-center"
									type="checkbox"
									checked={selectedRow.includes(index)}
									onChange={() => {}}
								/>
							</td>
							{empFieldKeys.map(([key, _], index) => {
								return <td key={index}>{item[key]}</td>;
							})}
						</tr>
					))}
			</tbody>
		</Table>
	);
	return (
		<ModalTemplate
			btnIcon={<OpenInNew fontSize="small" className="title-icon" />}
			btnTitle={""}
			headerIcon={<Badge className="title-icon" />}
			headerTitle={"Employee"}
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
								onChange={(e) =>
									setSearchValue(e.target.value.toLowerCase())
								}
								autoFocus
							/>
						</InputGroup>
						<DropdownButton
							title={<FilterList className="me-2" />}
							variant="cust-filter"
						>
							{empFieldKeys
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
					{empDataDisplay}
				</div>
			</Modal.Body>
			<Modal.Footer></Modal.Footer>
		</ModalTemplate>
	);
};

export default EmployeeModal;
