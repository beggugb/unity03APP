import React from "react";
import { Row, Col  } from "reactstrap";
import SubMenu from '../../../components/subInventario.jsx';
import { InventarioRouter } from '../../../routes'
import SearchUnidad from './components/SearchUnidad'
import TableUnidades from "./components/TableUnidades";
import EditUnidad from "./components/EditUnidad"

const UnidadsView = () => {      


  return(
    <>    
    <div className="content">     
      <div className="main-contenido">        
         <Row>
            <Col md={12}>
            <SearchUnidad/>
            </Col>            
         </Row>
         <div className="card-contenidos"> 
         <Row>
            <Col md={3} className="marco">
            <EditUnidad/>
            </Col>
            <Col md={9} className="marco">
            <TableUnidades/>
            </Col>            
         </Row>
         </div>
      </div>
    </div>    
    </>
  )

};
export default UnidadsView;
