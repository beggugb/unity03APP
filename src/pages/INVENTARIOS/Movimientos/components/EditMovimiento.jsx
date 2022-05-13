import React  from "react";
import { useSelector} from 'react-redux'
import { Row, Col, Card, CardBody, Button } from "reactstrap"
import FormMovimiento from './FormMovimiento'
import SearchmArticulos from '../../../INVENTARIOS/Articulos/components/SearchmArticulo'
import ListaMovimientos from "./ListaMovimientos";
import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const EditMovimiento = ({getComponent}) => {
  const { item } = useSelector(state => state.movimientos)  
  const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))


  var d = new Date();
    return (      
      <>
      <Row>        
        <Col md="3" className="btnBack">  
          <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> Lista Movimientos
          </Button>              
        </Col>  
      </Row> 
      <Row>
      <Col md="12">
        <Card>
            <CardBody>
             <Row>
               <Col md="2" className="barraz">
               <h5><b>Movimiento Nº : </b> {item.id} </h5>
               </Col> 
               <Col md="2" className="barrac">
               <h5><b>Fecha : </b> <Moment format="DD/MM/YYYY">{d}</Moment> </h5>
               </Col> 
               <Col md="2" className="barrac">
               <h5><b>Estado : </b> {item.estado}</h5>
               </Col> 
               <Col md="3" className="barrac">
               <h5><b>Cantidad : </b> {item.nroItems}</h5>
               </Col> 
               <Col md="3" className="barrac">
               <h5><b>Valor Total : </b>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.totalGeneral)}</h5>
               </Col> 
              </Row>  
            </CardBody>   
        </Card>       
      </Col>  
      </Row>

      <Row>
        <Col md="12" className="cardCo">
            <Card>        
              <CardBody>               
              <FormMovimiento/> 
              </CardBody>   
            </Card>
        </Col>          
      </Row>  

      <Row>  
        <Col md="12" className="cardCo">
          <Card>
            <CardBody>
              <h6>Productos</h6> 
              <SearchmArticulos/>
              <ListaMovimientos/>
            </CardBody>
          </Card>           
        </Col>       
      </Row>

      </>
    );
};
export default EditMovimiento;
