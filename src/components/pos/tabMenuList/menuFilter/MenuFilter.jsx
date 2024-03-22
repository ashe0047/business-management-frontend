import { React } from "react";
import { Dropdown } from "react-bootstrap";
import { FilterList } from "@mui/icons-material";
import DropdownTemplate from "../../../common/layout/dropdown/DropdownTemplate";
import "./MenuFilter.css";

const MenuFilter = ({ filterList, onFilter, className }) => {
	const filterNameList = filterList.map((item, ind) => {
		return item.name;
	});

	return (
		<DropdownTemplate
			toggleContent={<FilterList />}
			headerTitle={"Categories"}
			headerOn={true}
			extraProps={{
				dropdown: {
					className: className
				},
				menu: {
					align: "end"
				},
				toggle:{
					className: "filter-btn btn-text",
					variant: "text"
				}
			}}
		>
			{filterNameList.map((items) => (
				<Dropdown.Item key={items} onClick={() => onFilter(items)}>
					{items}
				</Dropdown.Item>
			))}
			<Dropdown.Divider />
			<Dropdown.Item onClick={() => onFilter(null)}>Clear</Dropdown.Item>
		</DropdownTemplate>
	);
};

export default MenuFilter;
