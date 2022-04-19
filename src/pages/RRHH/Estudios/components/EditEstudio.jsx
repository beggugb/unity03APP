import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Form, FormGroup, Input, Label,Card, CardBody, Button  } from "reactstrap"
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'  
import { custom } from '../../../../helpers/customStyles'
const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}
const carreras     = [
          {"value":"Administración","label":"Administración"},
          {"value":"Ingenieria","label":"Ingenieria"},
          {"value":"Informática","label":"Informática"},
          {"value":"Derecho","label":"Derecho"},
        ];
        
        const niveles     = [
          {"value":"Técnico Medio","label":"Técnico Medio"},
          {"value":"Técnico Superio","label":"Técnico Superio"},
          {"value":"Licenciatura","label":"Licenciatura"},
          {"value":"Postgrado","label":"Postgrado"},
        ]; 

        const estados     = [
          {"value":"Proceso","label":"Proceso"},
          {"value":"Egreso","label":"Egreso"},
          {"value":"Titulado","label":"Titulado"},          
        ]; 
        const instituciones     = [
          {"value":"Univerisad San Andres","label":"Univerisad San Andres"},
          {"value":"Universidad de la Plata","label":"Universidad de la Plata"},
          {"value":"Universidad de Cordova","label":"Universidad de Cordova"},          
        ]; 
        

const EditEstudio = () => {
    const dispatch = useDispatch()  
    const {item} = useSelector(state => state.estudios)   
    const itt = useSelector(state => state.personas.item)

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('ESTUDIOS_CHANGE',name,value))  
    }
    const changesHandler = event => {                  
      const {value} = event ? event : ''        
      dispatch(crudActions.SET_CHANGE('ESTUDIOS_CHANGE','carrera',value))          
    }
    const changesHandlern = event => {                  
      const {value} = event ? event : ''        
      dispatch(crudActions.SET_CHANGE('ESTUDIOS_CHANGE','nivel',value))          
    }
    const changesHandlere = event => {                  
      const {value} = event ? event : ''        
      dispatch(crudActions.SET_CHANGE('ESTUDIOS_CHANGE','estado',value))          
    }
    const changesHandleri = event => {                  
      const {value} = event ? event : ''        
      dispatch(crudActions.SET_CHANGE('ESTUDIOS_CHANGE','institucion',value))          
    }
      
    const submitHandle = event => {       
        event.preventDefault()        
        let iok = item
        iok.personaId = itt.id
        iok.universidadId = 1
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('ESTUDIOS_ADD','estudios',item,itt.id))            
        }else{
          dispatch(crudActions.SET_ADD('ESTUDIOS_ADD','estudios',item,'lista'))           
        }   
       
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'ESTUDIOS_RESET_ITEM'})        
      };
    }, []); 
     
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
                        <Label for="efecha">Fecha</Label>
                        <Input type="date" name="fecha" id="fecha"  
                          value={item.fecha || ''}                         
                          onChange={ (e) => changeHandler(e)}  
                          onInvalid={(e) => e.target.setCustomValidity('El campo es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                          />
                      </FormGroup>   
                    </Col>
                  </Row>
                <Row form>
                  <Col md={11}>
                    <FormGroup>
                        <Label for="carrera">Carrera</Label>
                        <Select                                                               
                              defaultValue={carreras[0]}
                              styles={custom} 
                              name="carrera"    
                              id="carrera"                    
                              options={carreras}                                                         
                              value={defaultVal(carreras,item.carrera)}   
                              onChange={ (e) => changesHandler(e)}                                               
                        />  
                    </FormGroup>    
                  </Col>                                    
                </Row>
                <Row form>
                  <Col md={11}>
                    <FormGroup>
                        <Label for="institucion">Institución</Label>
                        <Select                                                               
                              defaultValue={instituciones[0]}
                              styles={custom} 
                              name="institucion"    
                              id="institucion"                    
                              options={instituciones}                                                         
                              value={defaultVal(instituciones,item.institucion  )}   
                              onChange={ (e) => changesHandleri(e)}                                               
                        />  
                    </FormGroup>    
                  </Col>                                    
                </Row>

                <Row form>
                  <Col md={11}>
                    <FormGroup>
                       <Label for="nivel">Nivel</Label>
                        <Select                                                               
                              defaultValue={niveles[0]}
                              styles={custom} 
                              name="nivel"    
                              id="nivel"                    
                              options={niveles}                                                        
                              value={defaultVal(niveles,item.nivel)}   
                              onChange={ (e) => changesHandlern(e)}                                               
                        />  
                    </FormGroup>    
                  </Col>                                    
                </Row>
                <Row form>
                  <Col md={11}>
                    <FormGroup>
                        <Label for="estado">Estado</Label>
                        <Select                                                               
                              defaultValue={estados[0]}
                              styles={custom} 
                              name="estado"    
                              id="estado"                    
                              options={estados}                                                       
                              value={defaultVal(estados,item.estado)}   
                              onChange={ (e) => changesHandlere(e)}                                               
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
export default EditEstudio;
