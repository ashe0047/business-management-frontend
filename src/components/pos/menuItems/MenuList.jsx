import { React} from "react";
import { Accordion } from "react-bootstrap";
import AccordionItem from "./accordionItem/AccordionItem";
import "./MenuList.css";

const MenuList = (props) => {
  const accordionItems = (props.items.map((item, ind) => <AccordionItem key={ind} eventKey={`${ind}`} menuList={item.menuList} icon={item.icon} title={item.title}/>))

  return (
    // <Fragment>
    //   <Row className="flex-grow-1">
    //     <Col className="d-flex flex-column">
    <Accordion
      defaultActiveKey={["0"]}
      alwaysOpen
      className="d-flex
          flex-column flex-grow-1"
    >
      {accordionItems}
    </Accordion>
    //     {/* <Card className="menu-header">
    //       <Card.Title className="menu-title my-2 me-auto">
    //         {props.icon}
    //         {props.title}
    //       </Card.Title>
    //       <MenuFilter
    //         items={props.menuList.items}
    //         onFilter={categoryFilter}
    //       />
    //     </Card> */}
    // //   </Col>
    // </Row>
    // {/* <Row className="flex-grow-1 mt-3">
    //   <Col className="d-flex flex-column">
    //     <Row className="flex-grow-1">
    //       <Col className="d-flex flex-column">
    //         <Card className="menu-list">
    //           {menuItems(currentItems)}
    //         </Card>
    //       </Col>
    //     </Row>
    //   </Col>
    // </Row> */}
    // </Fragment>
  );
};

export default MenuList;
