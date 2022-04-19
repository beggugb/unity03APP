import React  from "react";
import { useSelector} from 'react-redux'
import { Row, Col, Card, CardBody, Button } from "reactstrap"
import FormPedido from './FormPedido'
import SearchpArticulos from '../../../INVENTARIOS/Articulos/components/SearchpArticulo'
import ListaPedidos from "./ListaPedidos";
import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ProveedorCotizacion from '../../Proveedores/components/ProveedorCotizacion'
import ListaProveedores from "./ListaProveedores";

const EditPedido = ({getComponent}) => {
  const { item } = useSelector(state => state.compras)  

  var d = new Date();
    return (      
      <>
      <Row>        
        <Col md="3" className="btnBack">  
          <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> LISTA COTIZACIONES
          </Button>              
        </Col>  
      </Row> 
      <Row>
      <Col md="12">
        <Card>
            <CardBody>
             <Row>
               <Col md="3" className="barraz">
               <h5><b>COTIZACIÓN Nº : </b> {item.id} </h5>
               </Col> 
               <Col md="3" className="barrac">
               <h5><b>Fecha : </b> <Moment format="DD/MM/YYYY">{d}</Moment> </h5>
               </Col> 
               <Col md="3" className="barrac">
               <h5><b>Estado : </b> {item.estado}</h5>
               </Col> 
               <Col md="3" className="barrac">
               <h5><b>Cantidad : </b> {item.nroItems}</h5>
               </Col>                
              </Row>  
            </CardBody>   
        </Card>       
      </Col>  
      </Row>

      <Row>
        <Col md="3" className="cardCo">
            <Card>        
              <CardBody>
               <h6>Datos Cotización</h6> 
              <FormPedido/> 
              </CardBody>   
            </Card>
        </Col>          
        <Col md="6" className="cardCo">
          <Card>
            <CardBody>
              <h6>Productos</h6> 
              <SearchpArticulos/>
              <ListaPedidos/>
            </CardBody>
          </Card>           
        </Col>
        <Col md="3" className="cardCo">
          <Card>
            <CardBody>
              <ProveedorCotizacion/>
              <ListaProveedores/>
            </CardBody>
          </Card>           
        </Col>          
      </Row>

      </>
    );
};
export default EditPedido;
