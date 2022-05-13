import React  from "react";
import { useSelector} from 'react-redux'
import { Row, Col, Card, CardBody, Button } from "reactstrap"
import FormCompra from './FormCompra'
import SearchsArticulos from '../../../INVENTARIOS/Articulos/components/SearchsArticulo'
import ListaCompras from "./ListaCompras";
import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const EditCompra = ({getComponent}) => {
  const { item } = useSelector(state => state.compras)  
  const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
  const almacen = JSON.parse(localStorage.getItem('@userAlmacen'))


  var d = new Date();
    return (      
      <>
      <Row>        
        <Col md="3" className="btnBack">  
          <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> LISTA COMPRAS
          </Button>              
        </Col>  
      </Row>      
      <Row>
        <Col md="3" className="cardCo">
            <Card>        
              <CardBody>
               <h6>Datos Compra</h6> 
               <p><b>COMPRA Nº : </b> {item.id} </p>
               <p><b>Almacen destino : </b> {almacen.nombre} </p>
               <p><b>Fecha : </b> <Moment format="DD/MM/YYYY">{d}</Moment> </p>                             
               <p><b>Cantidad : </b> {item.nroItems}</p>               
               <p><b>Valor Total : </b>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.totalGeneral)}</p>
              <FormCompra/> 
              </CardBody>   
            </Card>
        </Col>          
        <Col md="9" className="cardCo">
          <Card>
            <CardBody>
              <h6>Productos</h6> 
              <SearchsArticulos/>
              <ListaCompras/>
            </CardBody>
          </Card>           
        </Col>       
      </Row>

      </>
    );
};
export default EditCompra;
