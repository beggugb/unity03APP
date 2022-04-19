import React from "react";
import { Row, Col  } from "reactstrap";
import SearchPuc from './components/SearchPuc'
import TablePucs from "./components/TablePucs";
import EditPuc from "./components/EditPuc"

const PucsView = () => {      


  return(
    <>    
    <div className="content">     
      <div className="main-contenido">       
         <Row>
            <Col md={12}>
            <SearchPuc/>
            </Col>            
         </Row>
         <div className="card-contenidos"> 
         <Row>
            <Col md={3} className="marco">
            <EditPuc/>
            </Col>
            <Col md={9} className="marco">
            <TablePucs/>
            </Col>            
         </Row>
         </div>
      </div>
    </div>    
    </>
  )

};
export default PucsView;
