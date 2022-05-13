import React from "react";
import { Row, Col  } from "reactstrap";
import SearchSucursal from './components/SearchSucursal'
import TableSucursales from "./components/TableSucursales";
import EditSucursal from "./components/EditSucursal"

const SucursalesView = () => {      


  return(
    <>    
    <div className="content">     
      <div className="main-contenido">             
         <Row>
            <Col md={12}>
            <SearchSucursal/>
            </Col>            
         </Row>
         <div className="card-contenidos"> 
         <Row>
            <Col md={3} className="marco">
            <EditSucursal/>
            </Col>
            <Col md={9} className="marco">
            <TableSucursales/>
            </Col>            
         </Row>
         </div>
      </div>
    </div>    
    </>
  )

};
export default SucursalesView;
