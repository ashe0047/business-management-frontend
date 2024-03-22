import { React, useState } from "react";
import { Tab, Row, Col, Card } from "react-bootstrap";
import MenuItem from "./menuItem/MenuItem";
import "./TabItem.css";

const TabItem = ({ arrayHelpers, form, eventKey, menuList, ...props }) => {

	const menuItems = (currentItems) => {
		// const pairs = currentItems.reduce((acc, item, index) => {
		//   if (index % 2 === 0) {
		//     acc.push([item]);
		//   } else {
		//     acc[acc.length - 1].push(item);
		//   }
		//   return acc;
		// }, []);

		// return pairs.map(([item1, item2], index) => (
		//   <Row key={index} style={{ flex: 0, width: "100%" }}>
		//     {item1 ? (
		//       <Col className="me-1 px-0">
		//         <MenuItem
		//           key={item1[eventKey+'_id']}
		//           id={item1[eventKey+'_id']}
		//           name={item1[eventKey+'_name']}
		//           price={item1[eventKey+'_price']}
		//           type={item1[eventKey+'_category']}
		//         />
		//       </Col>
		//     ) : (
		//       ""
		//     )}
		//     {item2 ? (
		//       <Col className="ms-1 px-0">
		//         <MenuItem
		//           key={item2[eventKey+'_id']}
		//           id={item2[eventKey+'_id']}
		//           name={item2[eventKey+'_name']}
		//           price={item2[eventKey+'_price']}
		//           type={item1[eventKey+'_category']}
		//         />
		//       </Col>
		//     ) : (
		//       <Col className="ms-1 px-0">
		//         <Card className=" border-0 bg-transparent"></Card>
		//       </Col>
		//     )}
		//   </Row>
		// ));}
		return (
			<Row className="g-5" style={{ flex: 0, width: "100%"}} xxl={4} xl={4} lg={3} md={2} sm={2} xs={1}>
				{currentItems.map((item, index) => (
					<Col className="" key={index}>
						<MenuItem
							arrayHelpers={arrayHelpers}
							form={form}
							key={item[eventKey + "_id"]}
							itemType={eventKey}
							item={item}
						/>
					</Col>
				))}
			</Row>
		);
	};

	return (
		<Tab.Pane eventKey={eventKey}>
			<Card className="tabbed-menu-list">{menuItems(menuList)}</Card>
		</Tab.Pane>
	);
};

export default TabItem;
