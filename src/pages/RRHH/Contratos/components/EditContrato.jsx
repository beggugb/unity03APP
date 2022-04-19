import React,{ useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Button, Form, FormGroup, Input, Label, Card, CardBody } from "reactstrap"
import { crudActions } from '../../../../actions'
import ContratoImagen from './ContratoImagen'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft   } from "@fortawesome/free-solid-svg-icons";
import SelectHorario from "../../Horarios/components/SelectHorario"
import SelectSalario   from "../../Salarios/components/SelectSalario"
import SelectCargo from "../../Cargos/components/SelectCargo"
import ContratoPersona from "../../Personas/components/ContratoPersona"


const EditContratos = ({getComponent}) => {
    const dispatch = useDispatch()  
    const { item } = useSelector(state => state.contratos)           
    const changeHandler = event => {          
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('CONTRATOS_CHANGE',name,value))  
    }
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('CONTRATOS_ADD','contratos',item,'unit'))            
        }else{
          dispatch(crudActions.SET_ADD('CONTRATOS_ADD','contratos',item,'unit'))           
        }            
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'CONTRATOS_RESET_ITEM'})        
      };
    }, []); 

    console.log('repeticiones')
    return (              
      <>
      <Row>        
        <Col md="3" className="btnBack">  
          <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> LISTA CONTRATOS
          </Button>              
        </Col>  
      </Row>
      <Row>      
        <Col>
            <Card>                    
              <CardBody>
               <Row>
                 <Col md="5" className="cardCo">
                 <ContratoPersona/>
                    <Form onSubmit={ submitHandle}>   
                      <Row form>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="nro">
                              Nro
                            </Label>
                            <Input
                              id="nro"
                              name="nro"                    
                              type="text"
                              value={item.nro || ''}
                              onChange={ (e) => changeHandler(e)}                                 
                              onInvalid={(e) => e.target.setCustomValidity('El campo nro es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                              required 
                              
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="fechaInicio">
                              Fecha Inicio
                            </Label>
                            <Input
                              id="fechaInicio"
                              name="fechaInicio"                    
                              type="date"
                              value={item.fechaInicio || ''}
                              onChange={ (e) => changeHandler(e)}
                              onInvalid={(e) => e.target.setCustomValidity('El campo fechaInicio es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                              required  
                           
                            />
                          </FormGroup>
                        </Col> 
                        <Col md={4}>
                          <FormGroup>
                              <Label for="fechaFin">Fecha Fin</Label>
                              <Input
                                id="fechaFin"
                                name="fechaFin"                    
                                type="date"
                                value={item.fechaFin || ''}
                                onChange={ (e) => changeHandler(e)}
                                onInvalid={(e) => e.target.setCustomValidity('El campo fechaFin es obligatorio !')}
                                onInput={(e) => e.target.setCustomValidity('')}
                                required                             
                            />
                          </FormGroup>
                        </Col>
                    </Row>            
                    <FormGroup>
                      <Label for="observaciones">
                        Observaciones
                      </Label>
                      <Input
                        id="observaciones"
                        name="observaciones"
                        type="textarea"
                        value={item.observaciones || ''}
                        onChange={ (e) => changeHandler(e)}                
                      />
                    </FormGroup>
                    <Row form>
                      <Col md={4}>            
                          <Button 
                            type="submit"
                            className={item.id ?"btn-md btn-warning mt-2" : "btn-md btn-info mt-2"}>
                            <FontAwesomeIcon icon={faSave} />  
                            {' '} {item.id ? " Actualizar" : " Guardar"}
                          </Button>
                      </Col>
                    </Row>              
            </Form>
            </Col>
            <Col md="3">              
              <SelectCargo/>
              <SelectSalario/>
              <SelectHorario/>
            </Col>
            <Col md="4" className="cardCo">
              <h6 className="text-center">Imagen NIT</h6>
              <ContratoImagen/>
            </Col>
          </Row>
        </CardBody>   
      </Card>
        </Col>          
      </Row>
    </>
    );
};
export default EditContratos;
