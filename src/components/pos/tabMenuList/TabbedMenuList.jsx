import { React, useEffect, useState } from "react";
import { Tab, Nav, Row, Col } from "react-bootstrap";
import TabItem from "./tabItem/TabItem";
import "./TabbedMenuList.css";
import MenuFilter from "./menuFilter/MenuFilter";
import { FieldArray } from "formik";

const TabbedMenuList = ({ items }) => {
	const [activeKey, setActiveKey] = useState(items[0].key);
	const [currentCategory, setCurrentCategory] = useState(null);

	const getTabItem = (key) => items.find((item) => item.key === key);
	const currentTabItem = getTabItem(activeKey);
	/* Filter functions */
	const [currentFilteredItems, setCurrentFilteredItems] = useState(
		currentTabItem.menuList.slice()
	);

	// If tab is changed, reset currentCategory to null
	useEffect(() => {
		setCurrentCategory(null);
	}, [activeKey]);

	// If currentCategory is changed, update the currentFilteredItems accordingly
	useEffect(() => {
		if (currentCategory) {
			const filteredItems = currentTabItem.menuList.filter((item) => {
				const categoryKey = activeKey + "_category";
				return item[categoryKey].name === currentCategory;
			});
			setCurrentFilteredItems(filteredItems);
		} else {
			setCurrentFilteredItems(currentTabItem.menuList.slice());
		}
	}, [activeKey, currentTabItem.menuList, currentCategory]);

	const tabContent = (
		<Row className="h-100">
			<Col>
				<Tab.Content className="d-flex flex-column h-100">
					{items.map((item, index) => (
						<FieldArray name="sale.saleitem" key={item.key}>
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
									<TabItem
										arrayHelpers={{
											move,
											swap,
											push,
											insert,
											unshift,
											pop,
											remove,
											replace
										}}
										form={form}
										key={item.key}
										eventKey={item.key}
										menuList={currentFilteredItems}
										{...props}
									/>
								);
							}}
						</FieldArray>
					))}
				</Tab.Content>
			</Col>
		</Row>
	);
	const tabItems = (
		<Row>
			<Col>
				<Nav variant="pills" className="mb-3">
					{items.map((item, index) => (
						<Nav.Item key={item.key}>
							<Nav.Link eventKey={item.key}>
								{item.icon}
								{item.title}
							</Nav.Link>
						</Nav.Item>
					))}
					<MenuFilter
						filterList={currentTabItem.filterList}
						onFilter={setCurrentCategory}
						className="ms-auto my-0 inventory-menu-filter"
					/>
				</Nav>
			</Col>
		</Row>
	);

	return (
		<Tab.Container
			defaultActiveKey={items[0].key}
			activeKey={activeKey}
			onSelect={setActiveKey}
			id="menu-list"
			className="d-flex flex-column flex-grow-1 mb-3"
		>
			{tabItems}
			{tabContent}
		</Tab.Container>
	);
};

export default TabbedMenuList;
