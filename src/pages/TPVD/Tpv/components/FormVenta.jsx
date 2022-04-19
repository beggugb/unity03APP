import React,{useEffect, useState, useRef} from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import SingleCliente from '../../../CRM/Clientes/components/SingleCliente'
import Recibotpv from './Recibotpv'
import { useReactToPrint } from 'react-to-print';

const FormVenta = () => {
   const dispatch = useDispatch() 
   const { items, item }= useSelector(state => state.ventas)   
   const iteme = useSelector(state => state.empresa.item)   
   const [ recibido, setRecibido] = useState()    
   const [ cambio, setCambio] = useState()    
   const fechaHoy = new Date()
   const almacenId = JSON.parse(localStorage.getItem('@userAlmacen'))  
   const usuario = JSON.parse(localStorage.getItem('@userUnity'))

    
   const changeHandler = (event) =>{
    const { name, value } = event.target  
    setRecibido(value)
    setCambio(value - item.totalGeneral)  
   }

  const submitHandle = event => {       
    event.preventDefault()         
      let it = {              
          "fechaVenta": fechaHoy,
          "tipo":'contado',
          "nroItems":item.nroItem,
          "totalGeneral": item.totalGeneral,
          "observaciones":'terminal punto de venta',
          "estado": true,
          "usuarioId": usuario.id,
          "clienteId": item.clienteId ? item.clienteId : 1, 
          "forma": "cajero"                    
          }
      let dato = {
        item :it,
        items: items,
        almacenId: almacenId.id
      }    
     dispatch(crudActions.VENTA_DIRECTA('ARTICULOS_DATA','tpv',dato,'lista'))           
     handlePrint()
  } 

  useEffect(() => {
      /*makeHttpRequestWithPage(1,12)*/
      return () => {
      /*    cleanup*/
      console.log('clean table inventario')
      };
  }, []);
  const componentRef = useRef();  
  const handlePrint = useReactToPrint({    
    content: () => componentRef.current,    
  });

 
  return(
    <div className="card-contenidos">    
    <Row>    
      <Col md={7} className="card-contenido">       
      <Recibotpv
        ref={componentRef} 
        user= {usuario}   
        empresa={iteme}     
        items={items}
        item={item}        
      />
      </Col>  
      <Col md={5} className="card-contenido">
        <SingleCliente/> 
        <Form onSubmit={ submitHandle}>     
                    <Row form>
                      <Col md={12}>
                        <FormGroup>   
                        <Label for="total">Total</Label>                 
                          <Input 
                            type="number" 
                            name="total"                             
                            id="total"  
                            value={item.totalGeneral.toFixed(2)}  
                            onChange={changeHandler}                             
                            readOnly={true}/>
                        </FormGroup>
                      </Col>
                    </Row>  
                    
                    <Row>
                      <Col md={12}>
                        <FormGroup>                    
                        <Label for="recibido">Recibido</Label>
                          <Input 
                            type="text" 
                            name="recibido"                             
                            id="recibido"  
                            value={recibido || ''}  
                            onChange={changeHandler} />
                        </FormGroup>
                      </Col>
                    </Row>  
                    <Row>
                      <Col md={12}>
                        <FormGroup>                    
                        <Label for="cambio">Cambio</Label>
                          <Input 
                            type="text" 
                            name="cambio"                             
                            id="cambio"  
                            value={ cambio || ''}  
                            onChange={changeHandler} 
                            readOnly={true}/>
                        </FormGroup>
                      </Col>
                    </Row>  
                    <Row>
                      <Col md={12}>
                        <Button className={(cambio > 0 ) ? "btn-md btn-info mt-3": "btn-md disabled mt-3"}>
                         <FontAwesomeIcon icon={faSave} />                          
                        </Button>
                      </Col>
                    </Row>
        </Form>                   
      </Col>      
    </Row>       
</div>      
  )

};
export default FormVenta;
