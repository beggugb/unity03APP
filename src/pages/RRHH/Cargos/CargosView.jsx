import React from "react";
import { Row, Col  } from "reactstrap";

import TableCargos from "./components/TableCargos";
import EditCargo from "./components/EditCargo"

const CargosView = () => {      


  return(
    <>    
    <div className="content">     
      <div className="main-contenido">                 
         <div className="card-contenidos"> 
         <Row>
            <Col md={3} className="marco">
            <EditCargo/>
            </Col>
            <Col md={9} className="marco">
            <TableCargos/>
            </Col>            
         </Row>
         </div>
      </div>
    </div>    
    </>
  )

};
export default CargosView;
