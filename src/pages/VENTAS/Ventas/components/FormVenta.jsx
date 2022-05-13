import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Button, FormGroup, Input, Label } from "reactstrap"
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { formaPagos, formaEntregas, impuestos } from "../../../../helpers/dataLoad";
import { defaultVal } from "../../../../helpers/funciones";
import { custom } from '../../../../helpers/customStyles'
import SingleCliente from '../../../CRM/Clientes/components/SingleCliente'
import Select from 'react-select'          

const FormVenta = () => {
    const dispatch = useDispatch()  
    const { item, items } = useSelector(state => state.ventas)   
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))  
    const almacen = JSON.parse(localStorage.getItem('@userAlmacen'))  

    const changeHandler = event => {    
        const { name, value } = event.target          
        dispatch(crudActions.SET_CHANGE('VENTAS_CHANGE',name,value)) 
    }
    const changesHandler = (event,name) => {                       
      const { value } = event ? event : ''              
      dispatch(crudActions.SET_CHANGE('VENTAS_CHANGE',name,value))     
      console.log(value)    
      if(name === 'iva')
      {
        let iok = (value === 0 || value === '0') ? 0: (parseFloat(item.totalGeneral) * (parseFloat(value) / 100))
        dispatch(crudActions.SET_CHANGE('VENTAS_CHANGE','impuesto',iok)) 
        let sTotal = (value === 0 || value === '0') ? item.totalGeneral: parseFloat(item.totalGeneral)- parseFloat(iok)
        dispatch(crudActions.SET_CHANGE('VENTAS_CHANGE','subTotal',sTotal)) 
              
      }       
    }
    const changeDescuento = (event) => {                       
      const ivalue = event.target.value ? event.target.value : 0        
      dispatch(crudActions.SET_CHANGE('VENTAS_CHANGE','descuento',ivalue))    
      let sTotal = (ivalue === 0 || ivalue === '0' || ivalue === undefined || ivalue === null  || ivalue >= item.totalDescuento) ? item.totalDescuento: parseFloat(item.totalDescuento)- parseFloat(ivalue)
      dispatch(crudActions.SET_CHANGE('VENTAS_CHANGE','totalGeneral',sTotal))           
    }
    const submitHandle = () => {       
      let eItem = item                    
      eItem.usuarioId = usuario.id            
      eItem.detalle   = item.observaciones +', '+item.clients
      eItem.almacenId = almacen.id
      let xcode={
        item: eItem,
        items:items
      }          
      if(item.id)
      {
        dispatch(crudActions.SET_UPDATES('VENTAS_ADD','ventas',xcode,'unit'))
      }else{
        dispatch(crudActions.SET_ADD('VENTAS_ADD','ventas',xcode,'lista'))
      }   
      
        
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'VENTAS_RESET_ITEM'})        
      };
    }, []); 



  
     
return (              
    <>                                  
    <Row form>
      <Col md={11}>
        <SingleCliente/>                                                     
      </Col>                                                                               
    </Row>
    <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="fpago"> Forma de pago </Label>
                  <Select                                                               
                    defaultValue={formaPagos[0]}
                    styles={custom} 
                    name="formaPago"    
                    id="formaPago"                    
                    options={formaPagos}      
                    isClearable={false}                          
                    value={defaultVal(formaPagos,item.formaPago)}
                    onChange={ (e) => changesHandler(e,'formaPago')}/>
              </FormGroup>   
            </Col>      
            <Col md={6}>
              <FormGroup>
                <Label for="fentrega"> Forma de entrega </Label>
                  <Select                                                               
                    defaultValue={formaEntregas[0]}
                    styles={custom} 
                    name="formaEntrega"    
                    id="formaEntrega"                    
                    options={formaEntregas}      
                    isClearable={false}                          
                    value={defaultVal(formaEntregas,item.formaEntrega)}
                    onChange={ (e) => changesHandler(e,'formaEntrega')}/>
              </FormGroup>   
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
            <FormGroup>
                <Label for="fiva"> Impuesto </Label>
                  <Select                                                               
                    defaultValue={impuestos[0]}
                    styles={custom} 
                    name="iva"    
                    id="iva"                    
                    options={impuestos}      
                    isClearable={false}                          
                    value={defaultVal(impuestos,item.iva)}
                    onChange={ (e) => changesHandler(e,'iva')}/>
              </FormGroup>   
            </Col>          
            <Col md={6}>
              <FormGroup>
                <Label for="ndescuento">Descuento</Label>
                  <Input 
                      type="number" name="descuento" id="descuento" 
                      value={item.descuento}                          
                      onChange={ (e) => changeDescuento(e)} 
                     
                  />
              </FormGroup>   
            </Col>
          </Row>                           
        
    <Row form>                                    
      <Col md={12}>
        <FormGroup>
          <Label for="observaciones">Glosa</Label>
          <Input type="textarea" name="observaciones" id="observaciones" 
                 value={item.observaciones || ''}                          
                 onChange={ (e) => changeHandler(e)} />
        </FormGroup>   
      </Col>
    </Row>
    <Row>  
      <Col md={7}>
        <Button
          className={ (item.observaciones && item.clienteId) ? (item.id ? "btn-md btn-warning mt-4" : "btn-md btn-info mt-4") : "btn-md disabled btn-info mt-4"}
          onClick={() => submitHandle()}>
          <FontAwesomeIcon icon={faSave} />  
          {' '} {item.id ? " Actualizar" : " Guardar"}
        </Button>    
      </Col>                  
    </Row>
  </>                                 
    );
};
export default FormVenta;
