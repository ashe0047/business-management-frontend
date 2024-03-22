import { React, useState, useRef, useEffect, useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import PosContext from "../../../../../store/pos/pos-context";
import {
	saleItemProcessor,
	getInventoryId,
	tempGDUrlFix,
} from "../../../../../utils/utilities";
import "./MenuItem.css";

const MenuItem = ({ arrayHelpers, form, itemType, item, ...props }) => {
	const itemData = {
		id: item[itemType + "_id"],
		category: item[itemType + "_category"],
		name: item[itemType + "_name"],
		desc: item[itemType + "_desc"],
		cost: item[itemType + "_cost"],
		price: item[itemType + "_price"],
		discount_percent: item[itemType + "_discount_percent"],
		qty: item[itemType + "_qty"],
		img: item[itemType + "_img"],
		sku: item[itemType + "_sku"],
		barcode: item[itemType + "_barcode"],
		is_active: item[itemType + "_is_active"],
		supplier: item[itemType + "_id"],
		prod_com: item[itemType + "_prod_com"],
	};

	//Responsive font scaling
	const parentRef = useRef(null);
	const [parentWidth, setParentWidth] = useState(0);

	useEffect(() => {
		setParentWidth(parentRef.current.offsetWidth);
		const observer = new ResizeObserver((entries) => {
			const { width } = entries[0].contentRect;
			setParentWidth(width);
		});
		observer.observe(parentRef.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	//Card Selection
	const qtyRef = useRef(0);
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		const isSelected = form.values.sale.saleitem.find(
			(saleitem) => getInventoryId(saleitem).inventoryId === itemData.id
		);
		if (isSelected) {
			setSelected(true);
		}
	}, [form.values.sale.saleitem]);

	const cardSelectedHandler = (event) => {
		event.preventDefault();
		const saleItem = saleItemProcessor(itemType, item, {
			sale_item_type: itemData.category.type,
			sales_item_qty: 1,
		});
		//For UI highlight
		setSelected(!selected);
		// const currQty = qtyRef.current.value;
		// const currQtyInt = +currQty;

		// if (currQty.trim().length === 0 || currQtyInt < 1) {
		// 	return;
		// }

		if (!selected) {
			arrayHelpers.push(saleItem);
		} else {
			const itemIndex = form.values.sale.saleitem.findIndex(
				(saleitem) =>
					getInventoryId(saleitem).inventoryId === itemData.id
			);
			arrayHelpers.remove(itemIndex);
		}
	};
	const itemSelectedCheck = () => {
		if (
			form.values.sale.saleitem.some((saleitem) => {
				const { inventoryType, inventoryId } = getInventoryId(saleitem);

				return (
					inventoryId === itemData.id && inventoryType === itemType
				);
			})
		) {
			return true;
		} else {
			setSelected(!selected);
			return false;
		}
	};
	return (
		<Card className={`menu-item `} onClick={cardSelectedHandler}>
			<Card.Img
				src={
					itemData.img
						? tempGDUrlFix(itemData.img)
						: "https://dummyimage.com/240x240/E1E3E3/3F484A.png"
				}
				className="menu-item-img"
			></Card.Img>
			<Card.Body
				className={`menu-item-desc ${
					selected && itemSelectedCheck() ? "selected" : ""
				}`}
			>
				<Row>
					<Col className="pt-2">
						<h6 className="item-name">{itemData.name}</h6>
					</Col>
				</Row>
				<Row className="d-flex flex-grow-1" xxl={2} xl={2} lg={1}>
					<Col className="menu-item-left">
						<h6
							className="item-price"
							// style={{ fontSize: fontScale(parentWidth, 0.5) }}
							// style={{ fontSize: '1vw' }}
						>{`RM ${itemData.price}`}</h6>
					</Col>
					<Col ref={parentRef} className="menu-item-right pb-2">
						{/* <QuantityForm ref={qtyRef} /> */}
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default MenuItem;
