import React from "react";
import { Nav, NavItem  } from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const subMenu = ({items,prop}) => {     
  return(
  <>    
    <div className="nav-sunity" expand="lg">     
    <Nav>
    {items.map((item, index) => (
      <NavItem key={index}>  
      <NavLink                
        to={`/consolidado/${item.link}/`}
        className={item.name === prop ? "nav-link active" : "nav-link"}> 
        <FontAwesomeIcon icon={ item.name === prop ? faChevronDown : faChevronRight } />{' '} {item.name}
      </NavLink>
    </NavItem>             
    ))}
    </Nav>  
    </div>     
  </>         
  )

};
export default subMenu;
