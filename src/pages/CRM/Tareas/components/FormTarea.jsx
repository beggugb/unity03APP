import React from "react";
import { Row, Col, Label, Button, Input, FormGroup } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import Select from 'react-select'  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlus, faEnvelope, faPhone, faUsersCog } from "@fortawesome/free-solid-svg-icons";
import DatePicker, { registerLocale } from  "react-datepicker";
import { custom } from '../../../../helpers/customStyles'
import es from 'date-fns/locale/es';
import { getMes, defaultVal } from "../../../../helpers/funciones";
import { tiposLlamada } from "../../../../helpers/dataLoad";
registerLocale('es', es)


function FormTarea(){
  const dispatch = useDispatch()    
  const { item }  = useSelector(state => state.tareas)   
  const usuario = JSON.parse(localStorage.getItem('@userUnity'))


  const changeHandler = event => {          
    const { name, value } = event.target  
    dispatch(crudActions.SET_CHANGE('TAREAS_CHANGE',name,value))   
  }
  const submitHandle = event => {       
    event.preventDefault()   
    const {desde, hasta} = getMes() 
    let iok = item
    iok.usuarioId = usuario.id    
    iok.end       = item.start
    iok.inicio    = desde
    iok.fin       = hasta    
    iok.backgroundColor = item.backgroundColor
    
    if(item.id)
    {
      dispatch(crudActions.SET_UPDATE('TAREAS_ADD','tareas',iok,'unit'))            
    }else{
      dispatch(crudActions.SET_ADD_SINGLE('TAREAS_ADD','tareas',iok)) 
    }
    

  }
  const onChange1 = (value) => {          
    dispatch(crudActions.SET_CHANGE('TAREAS_CHANGE','start',value)) 
  }
  const changesHandler = event => {                    
    const {value} = event ? event : ''        
    dispatch(crudActions.SET_CHANGE('TAREAS_CHANGE','backgroundColor',value))          
  }
  const handleNew = () => {                    
    dispatch({type:'TAREAS_ITEM_RESET'}) 
  }
 
return(
    <div className="registroCalendario">
    <h6 className="ml-1 mt-2" >Registro de tareas</h6>
    <Row form>
        <Col md={2}>
          <Button className={ item.id ? "btn-xs btn-warning mt-2" :"btn-xs btn-warning mt-2 disabled"} 
            onClick={handleNew}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Col>        
        <Col md={8}></Col>
        <Col md={2}>
          <Button             
            className={item.title === '' ? "btn-xs disabled btn-info mt-2":"btn-xs btn-info mt-2"}
            onClick={submitHandle}>
            <FontAwesomeIcon icon={faSave} />
          </Button>
        </Col>
    </Row>            
    <Row form>
        <Col md={12} className="mt-3">   
          <FormGroup>
            <Label for="titulo">Titulo</Label>
              <Input
                  id="title"
                  name="title"                    
                  type="text"
                  value={item.title || ''}
                  onChange={ (e) => changeHandler(e)}                                 
                  onInvalid={(e) => e.target.setCustomValidity('El campo titulo es obligatorio !')}
                  onInput={(e) => e.target.setCustomValidity('')}
                  required />
          </FormGroup>
        </Col>
      </Row> 
      <Row form>
        <Col md={12}>   
          <FormGroup>
            <Label for="detalle">Detalle</Label>
              <Input
                  id="detalle"
                  name="detalle"                    
                  type="textarea" 
                  value={item.detalle || ''}
                  onChange={ (e) => changeHandler(e)}                                 
                  onInvalid={(e) => e.target.setCustomValidity('El campo titulo es obligatorio !')}
                  onInput={(e) => e.target.setCustomValidity('')}
                  required />
          </FormGroup>
        </Col>
      </Row> 
      <Row form>
        <Col md={12}>
          <FormGroup>
            <Label for="eHasta">Fecha : </Label>
              <DatePicker 
                locale="es" 
                selected={item.start} 
                onChange={(date) => onChange1(date)} 
              />            
          </FormGroup>
        </Col>
      </Row>   
      <Row form>
        <Col md={12}>
          <FormGroup>
            <Label for="eTipo">Tipo : </Label>
            <Select                                                               
              defaultValue={tiposLlamada[0]}
              styles={custom} 
              name="backgroundColor"    
              id="backgroundColor"                    
              options={tiposLlamada}      
              isClearable={false}                          
              value={defaultVal(tiposLlamada,item.backgroundColor)}
              onChange={ (e) => changesHandler(e)}  
            />        
          </FormGroup>
        </Col>
      </Row>    
      <Row form>        
        <Col md={12} className="linea">
         <p className="linear"><FontAwesomeIcon icon={faEnvelope}/>     Email</p> 
         <p className="lineav"><FontAwesomeIcon icon={faPhone} />     Llamada</p> 
         <p className="lineam"><FontAwesomeIcon icon={faUsersCog } />     Reunion</p> 
        </Col>
      </Row>  
    </div>       
  )
}


export default FormTarea