import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Button, FormGroup, Input, Label } from "reactstrap"
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { tiposMovimiento } from "../../../../helpers/dataLoad";
import { defaultVal } from "../../../../helpers/funciones";
import Select from 'react-select'    
import { custom } from '../../../../helpers/customStyles'
import SelectmAlmacen from '../../Almacenes/components/SelectmAlmacen'
const FormMovimiento = () => {
    const dispatch = useDispatch()  
    const { item, items } = useSelector(state => state.movimientos)   
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('MOVIMIENTOS_CHANGE',name,value))  
    }
    const changesHandler = (event,name) => {                       
      const { value } = event ? event : ''              
      dispatch(crudActions.SET_CHANGE('MOVIMIENTOS_CHANGE',name,value))          
    }

      


    const submitHandle = () => { 
        let eItem = item                     
        eItem.usuarioId = usuario.id                
        eItem.detalle   = item.observaciones +', '+item.proveedors
        let xcode ={
          item : eItem,
          items: items
        }

        if(item.id)
        {
          dispatch(crudActions.SET_UPDATES('MOVIMIENTOS_ADD','movimientos',xcode,'unit'))
        }else{
          dispatch(crudActions.SET_ADD('MOVIMIENTOS_ADD','movimientos',xcode,'lista'))
        }
     }


    useEffect(() => {      
      return () => {
        dispatch({type:'MOVIMIENTOS_RESET_ITEM'})        
      };
    }, []); 
     
    return (              
    
          <Row form>  
            <Col md={2}>
              <FormGroup>  
                  <Label for="ftipo">Tipo</Label>
                    <Select                                                               
                      defaultValue={tiposMovimiento[0]}
                      styles={custom} 
                      name="tipo"    
                      id="tipo"                    
                      options={tiposMovimiento}      
                      value={defaultVal(tiposMovimiento,item.tipo)}
                      onChange={ (e) => changesHandler(e,'tipo')}/>
              </FormGroup>   
            </Col>    
            <SelectmAlmacen/>      
            <Col md={5}>
                <FormGroup>                  
                <Label for="fmotivo">Motivo</Label>
                  <Input type="text" name="motivo" id="motivo" 
                          value={item.motivo || ''}                          
                          onChange={ (e) => changeHandler(e)} />
                </FormGroup>   
            </Col>    
            <Col md={1}>
              <Button
                className={ item.motivo ? (item.id ? "btn-md btn-warning mt-3" : "btn-md btn-info mt-3") : "btn-md disabled btn-info mt-3"}
                onClick={() => submitHandle()}>
                <FontAwesomeIcon icon={faSave} />  
                  {' '} {item.id ? " Actualizar" : " Guardar"}                        
              </Button>    
            </Col>                  
          </Row>
    
                                      
    );
};
export default FormMovimiento;
