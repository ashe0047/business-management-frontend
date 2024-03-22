import {React, Fragment, useState} from 'react'
import { Card, Accordion, Col, Row } from 'react-bootstrap';
import MenuItem from "../MenuItem";
import MenuFilter from "../MenuFilter";
import MenuHeaderButton from "../MenuHeaderButton";
import './AccordionItem.css'

const AccordionItem = (props) => {
  const menuItems = (currentItems) => {
    const pairs = currentItems.reduce((acc, item, index) => {
      if (index % 2 === 0) {
        acc.push([item]);
      } else {
        acc[acc.length - 1].push(item);
      }
      return acc;
    }, []);
    return pairs.map(([item1, item2], index) => (
      <Row key={index} style={{ flex: 1, width: "100%" }}>
        {item1 ? (
          <Col className="me-1 px-0">
            <MenuItem
              key={item1.id}
              id={item1.id}
              name={item1.name}
              price={item1.price}
            />
          </Col>
        ) : (
          ""
        )}
        {item2 ? (
          <Col className="ms-1 px-0">
            <MenuItem
              key={item2.id}
              id={item2.id}
              name={item2.name}
              price={item2.price}
            />
          </Col>
        ) : (
          <Col className="ms-1 px-0">
            <Card className=" border-0 bg-transparent"></Card>
          </Col>
        )}
      </Row>
    ));
  };
  const [currentItems, setCurrentItems] = useState(props.menuList.items);
  const categoryFilter = (category = null) => {
    if (category) {
      const filteredItems = props.menuList.items.filter(
        (item) => item.category === category
      );
      setCurrentItems(filteredItems);
    } else {
      setCurrentItems(props.menuList.items.slice());
    }
  };
  return (
    <Fragment>
      <MenuHeaderButton eventKey={props.eventKey} className="menu-header">
        <h5 className="me-2 menu-title">
          {props.icon}
          {props.title}
        </h5>
        <MenuFilter items={props.menuList.items} onFilter={categoryFilter} />
      </MenuHeaderButton>
      <Accordion.Collapse eventKey={props.eventKey} className="d-flex flex-column mt-3">
        <Card className="menu-list">{menuItems(currentItems)}</Card>
      </Accordion.Collapse>
    </Fragment>
  )
}

export default AccordionItem