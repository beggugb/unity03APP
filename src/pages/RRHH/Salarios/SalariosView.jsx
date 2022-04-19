import React from "react";
import { Row, Col  } from "reactstrap";

import TableSalarios from "./components/TableSalarios";
import EditSalario from "./components/EditSalario"

const SalariosView = () => {      


  return(
    <>    
    <div className="content">     
      <div className="main-contenido">          
    
         <div className="card-contenidos"> 
         <Row>
            <Col md={3} className="marco">
            <EditSalario/>
            </Col>
            <Col md={9} className="marco">
            <TableSalarios/>
            </Col>            
         </Row>
         </div>
      </div>
    </div>    
    </>
  )

};
export default SalariosView;
