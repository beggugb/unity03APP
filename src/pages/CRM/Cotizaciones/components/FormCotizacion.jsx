import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Button, FormGroup, Input, Label } from "reactstrap"
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { formaPagos, formaEntregas, impuestos } from "../../../../helpers/dataLoad";
import { defaultVal } from "../../../../helpers/funciones";
import { custom } from '../../../../helpers/customStyles'
import CotizacionCliente from '../../Clientes/components/CotizacionCliente'
import Select from 'react-select'          

const FormVenta = () => {
    const dispatch = useDispatch()  
    const { item, items } = useSelector(state => state.cotizaciones)   
    const it = useSelector(state => state.empresa.item)   
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))    

    const changeHandler = event => {    
        const { name, value } = event.target          
        dispatch(crudActions.SET_CHANGE('COTIZACIONES_CHANGE',name,value))                   
    }
    const changesHandler = (event,name) => {            
      const { value } = event ? event : ''              
      dispatch(crudActions.SET_CHANGE('COTIZACIONES_CHANGE',name,value))           
      if(name === 'iva')
      {
        let iok = (value === 0 || value === '0') ? 0: (parseFloat(item.totalGeneral) * (parseFloat(value) / 100))
        dispatch(crudActions.SET_CHANGE('COTIZACIONES_CHANGE','impuesto',iok)) 
        let sTotal = (value === 0 || value === '0') ? item.totalGeneral: parseFloat(item.totalGeneral)- parseFloat(iok)
        dispatch(crudActions.SET_CHANGE('COTIZACIONES_CHANGE','subTotal',sTotal)) 
              
      }             
    }
    const changeDescuento = (event) => {                       
      const ivalue = event.target.value ? event.target.value : 0  
      dispatch(crudActions.SET_CHANGE('COTIZACIONES_CHANGE','descuento',ivalue))    
      let tDescuento = (ivalue === 0 || ivalue === '0') ? item.totalGeneral: parseFloat(item.totalGeneral) - parseFloat(ivalue)
      dispatch(crudActions.SET_CHANGE('COTIZACIONES_CHANGE','totalDescuento',tDescuento))              
    }
    const submitHandle = () => {       
      let eItem = item                    
      eItem.usuarioId = usuario.id            
      let dato={
        item: eItem,
        items:items
      }   
      dispatch(crudActions.SET_UPDATES('COTIZACIONES_ADD','cotizaciones',dato,'unit')) 
              
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'COTIZACIONES_RESET_ITEM'})        
      };
    }, []); 



  
     
    return (              
          <>                                  
          <Row form>
            <Col md={12}>
              <CotizacionCliente/>    
            </Col>
          </Row>

          <Row form>
            <Col md={12}>
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
          </Row>

          <Row form>
            <Col md={12}>
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
            <Col md={12}>
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
          </Row> 

          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="ndescuento">Descuento</Label>
                  <Input 
                      type="number" name="descuento" id="descuento" 
                      value={item.descuento || 0}                          
                      onChange={ (e) => changeDescuento(e)} 
                      min={0} 
                      max={50000}
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
                      onChange={ (e) => changeHandler(e)} 
                      min={0} max={50000}
                      />
              </FormGroup>   
            </Col>
          </Row>        
          <Row>  
            <Col md={7}>
              <Button
                className={item.id ?"btn-md btn-warning mt-4" : "btn-md btn-info mt-4"}
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
