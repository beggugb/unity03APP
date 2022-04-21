import React from "react";
import { Row, Col, Form, Label, Button, Input, FormGroup } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import { getMes } from '../../../../helpers/funciones'
registerLocale('es', es)


function FormTarea({fecha,toogleModalView}){
  const dispatch = useDispatch()    
  const { item }  = useSelector(state => state.tdcs)   
  const ff = new Date()
  
  const changeHandler = event => {          
    const { name, value } = event.target  
    dispatch(crudActions.SET_CHANGE('TDCS_CHANGE',name,value))   
  }
  const submitHandle = event => {       
    event.preventDefault()   
    const {desde, hasta} = getMes() 
    let iok = item    
    iok.end       = fecha ? fecha :item.end  
    iok.start     = fecha ? fecha :item.start 
    iok.inicio    = desde
    iok.fin       = hasta   
    iok.monto     = parseFloat(item.title) 
    iok.backgroundColor = "#fd5d93"
    iok.gestion   = ff.getFullYear()
    console.log(iok)
    if(item.id)
    {
      dispatch(crudActions.SET_UPDATE('TDCS_ADD','tdcs',iok,'unit'))            
    }else{
      dispatch(crudActions.SET_ADD_SINGLE('TDCS_ADD','tdcs',iok)) 
    }
    
    toogleModalView()
  }


 
return(
    <div className="registroCalendarios">
    <h6 className="ml-1 mt-2" >Registro de Tipo de Cambio</h6>  
    <Form onSubmit={ submitHandle }>                
      <Row form>
        <Col md={5}>   
          <FormGroup>
            <Label for="titulo">Monto</Label>
              <Input
                  id="title"
                  name="title"                    
                  type="number"
                  value={item.title || ''}
                  onChange={ (e) => changeHandler(e)}                                 
                  onInvalid={(e) => e.target.setCustomValidity('El campo es obligatorio !')}
                  onInput={(e) => e.target.setCustomValidity('')}
                  required />
          </FormGroup>
        </Col>
      </Row>       
      <Row form>        
        <Col md={3}>
          <Button 
            type="submit"
            className="btn-md btn-info mt-2">
            <FontAwesomeIcon icon={faSave} /></Button>
        </Col>
      </Row> 
    </Form>  
    </div>       
  )
}


export default FormTarea