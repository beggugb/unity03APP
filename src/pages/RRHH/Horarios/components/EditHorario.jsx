import React,{ useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Form, FormGroup, Input, Label,Card, CardBody, Button  } from "reactstrap"
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { registerLocale } from  "react-datepicker";
import TimeField from 'react-simple-timefield';
import es from 'date-fns/locale/es';
registerLocale('es', es)

const EditHorario = () => {
    const dispatch = useDispatch()   
    const item = useSelector(state => state.horarios.item)   

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('HORARIOS_CHANGE',name,value))  
    }
      
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('HORARIOS_ADD','horarios',item,'lista'))            
        }else{
          dispatch(crudActions.SET_ADD('HORARIOS_ADD','horarios',item,'lista'))           
        }   
       
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'HORARIOS_RESET_ITEM'})        
      };
    }, []); 
    const onTimeChange1 = (value) =>{      
      dispatch(crudActions.SET_CHANGE('HORARIOS_CHANGE','d1',value)) 
    }
    const onTimeChange2 = (value) =>{      
      dispatch(crudActions.SET_CHANGE('HORARIOS_CHANGE','d2',value)) 
    }
    const onTimeChange3 = (value) =>{      
      dispatch(crudActions.SET_CHANGE('HORARIOS_CHANGE','d3',value)) 
    }
    const onTimeChange4 = (value) =>{      
      dispatch(crudActions.SET_CHANGE('HORARIOS_CHANGE','d4',value)) 
    }
    return (              
      <Row>
      <Col>
        <Card>        
            <CardBody>
            <h5>Formulario de Registro</h5>
            <Form onSubmit={ submitHandle}>
                <Row form>
                  <Col md={11}>
                    <FormGroup>
                      <Label for="enombre">Nombre</Label>
                        <Input type="text" name="nombre" id="enombre" 
                          value={item.nombre || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo nombre es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                          />    
                    </FormGroup>    
                  </Col>                                    
                </Row>
                <Row form>                  
                  <Col md={12}>
                    <FormGroup>
                      <Label for="ingresoI">Ingreso I</Label>   
                      <TimeField
                        value={item.d1}                       
                        onChange={(event, value) => {onTimeChange1(value)}}                                         
                        colon=":"
                        className="lsTimes"
                        showSeconds
                      />                   
                    </FormGroup>   
                  </Col>
                </Row> 
                <Row form>                  
                  <Col md={12}>
                    <FormGroup>
                      <Label for="ingresoI">Salida I</Label>   
                      <TimeField
                        value={item.d2}                       
                        onChange={(event, value) => {onTimeChange2(value)}}                                         
                        colon=":"                          
                        className="lsTimes" 
                        showSeconds               
                      />                   
                    </FormGroup>
                  </Col>
                </Row> 
                <Row form>                  
                  <Col md={12}>
                    <FormGroup>
                      <Label for="ingresoI">Ingreso T</Label>   
                      <TimeField
                        value={item.d3}                       
                        onChange={(event, value) => {onTimeChange3(value)}}                                         
                        colon=":"                          
                        className="lsTimes" 
                        showSeconds                  
                      />                   
                    </FormGroup>
                  </Col>
                </Row> 
                <Row form>                  
                  <Col md={11}>
                    <FormGroup>
                      <Label for="ingresoI">Salida T</Label>   
                      <TimeField
                        value={item.d4}                       
                        onChange={(event, value) => {onTimeChange4(value)}}                                         
                        colon=":"                          
                        className="lsTimes" 
                        showSeconds                    
                      />                   
                    </FormGroup>
                  </Col>
                </Row> 
                
                <Row form>                  
                  <Col md={6}>
                    <Button 
                    type="submit"
                    className={item.id ?"btn-md btn-warning mt-2" : "btn-md btn-info mt-2"}>
                    <FontAwesomeIcon icon={faSave} />  
                    {' '} {item.id ? " Actualizar" : " Guardar"}
                    </Button> 
                  </Col>
                </Row>                 
            </Form> 
            </CardBody>                      
          </Card> 
      </Col>    
    </Row>                                             
    );
};
export default EditHorario;
