import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Button, FormGroup, Input, Label } from "reactstrap"
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { impuestos } from "../../../../helpers/dataLoad";
import { defaultVal } from "../../../../helpers/funciones";
import Select from 'react-select'    
import { custom } from '../../../../helpers/customStyles'
import SingleProveedor from '../../Proveedores/components/SingleProveedor'
const FormCompra = () => {
    const dispatch = useDispatch()  
    const { item, items } = useSelector(state => state.compras)   
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))
    const almacen = JSON.parse(localStorage.getItem('@userAlmacen'))
    

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('COMPRAS_CHANGE',name,value))  
    }
    const changesHandler = (event,name) => {                       
      const { value } = event ? event : ''              
      dispatch(crudActions.SET_CHANGE('COMPRAS_CHANGE',name,value))     
      console.log(value)    
      if(name === 'iva')
      {
        let iok = (value === 0 || value === '0') ? 0: (parseFloat(item.totalGeneral) * (parseFloat(value) / 100))
        dispatch(crudActions.SET_CHANGE('COMPRAS_CHANGE','impuesto',iok)) 
        let sTotal = (value === 0 || value === '0') ? item.totalGeneral: parseFloat(item.totalGeneral)- parseFloat(iok)
        dispatch(crudActions.SET_CHANGE('COMPRAS_CHANGE','subTotal',sTotal)) 
              
      }       
    }
      


    const submitHandle = () => { 
        let eItem = item                     
        eItem.usuarioId = usuario.id                
        eItem.detalle   = item.observaciones +', '+item.proveedors
        eItem.almacenId = almacen.id
        let xcode ={
          item : eItem,
          items: items
        }

        if(item.id)
        {
          dispatch(crudActions.SET_UPDATES('COMPRAS_ADD','compras',xcode,'unit'))
        }else{
          dispatch(crudActions.SET_ADD('COMPRAS_ADD','compras',xcode,'lista'))
        }
     }


    useEffect(() => {      
      return () => {
        dispatch({type:'COMPRAS_RESET_ITEM'})        
      };
    }, []); 
     
    return (              
        <>                                  
          <Row form>            
            <SingleProveedor/>            
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
                  <Label for="observaciones">Glosa</Label>
                  <Input type="textarea" name="observaciones" id="observaciones" 
                          value={item.observaciones || ''}                          
                          onChange={ (e) => changeHandler(e)} />
                </FormGroup>   
            </Col>
          </Row>  
          
          <Row form>
            <Col md={5}>
              <Button
                className={ item.observaciones ? (item.id ? "btn-md btn-warning mt-4" : "btn-md btn-info mt-4") : "btn-md disabled btn-info mt-4"}
                onClick={() => submitHandle()}>
                <FontAwesomeIcon icon={faSave} />  
                  {' '} {item.id ? " Actualizar" : " Guardar"}                        
              </Button>    
            </Col>                  
          </Row>
    </>
                                      
    );
};
export default FormCompra;
