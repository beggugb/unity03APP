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
const paises  = [
          {"value":"Argentina","label":"Argentina"},
          {"value":"Bolivia","label":"Bolivia"},
          {"value":"Colombia","label":"Colombia"}
        ];
        
const motivos = [
          {"value":"Fin Contrato","label":"Fin Contrato"},
          {"value":"Retiro Voluntario","label":"Retiro Voluntario"},
          {"value":"Otro","label":"Otro"}          
        ]; 


const EditExperiencia = ({getComponent}) => {
    const dispatch = useDispatch()  
    const {item} = useSelector(state => state.experiencias)   
    const itt = useSelector(state => state.personas.item)

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('EXPERIENCIAS_CHANGE',name,value))  
    }
    const changesHandlern = event => {                  
      const {value} = event ? event : ''        
      dispatch(crudActions.SET_CHANGE('EXPERIENCIAS_CHANGE','motivo',value))          
    }
    const changesHandlers = event => {                  
      const {value} = event ? event : ''        
      dispatch(crudActions.SET_CHANGE('EXPERIENCIAS_CHANGE','pais',value))          
    }
  
      
    const submitHandle = event => {       
        event.preventDefault()        
        let iok = item
        iok.personaId = itt.id        
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('EXPERIENCIAS_ADD','experiencias',item,itt.id))            
        }else{
          dispatch(crudActions.SET_ADD('EXPERIENCIAS_ADD','experiencias',item,'lista'))           
        }   
        console.log(iok)
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'EXPERIENCIAS_RESET_ITEM'})        
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
                    <Col md={6}>
                      <FormGroup>
                        <Label for="edesde">Desde</Label>
                        <Input type="date" name="desde" id="desde"  
                          value={item.desde || ''}                         
                          onChange={ (e) => changeHandler(e)}  
                          onInvalid={(e) => e.target.setCustomValidity('El campo es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required  
                          />
                      </FormGroup>   
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="ehasta">Hasta</Label>
                        <Input type="date" name="hasta" id="hasta"  
                          value={item.hasta || ''}                         
                          onChange={ (e) => changeHandler(e)}  
                          onInvalid={(e) => e.target.setCustomValidity('El campo es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                          />
                      </FormGroup>   
                    </Col>
                  </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                        <Label for="paises">Paises</Label>
                        <Select                                                               
                              defaultValue={paises[0]}
                              styles={custom} 
                              name="paises"    
                              id="paises"                    
                              options={paises}                                                         
                              value={defaultVal(paises,item.pais)}   
                              onChange={ (e) => changesHandlers(e)}                                               
                        />  
                    </FormGroup>    
                  </Col>                                    
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                        <Label for="ciiudad">Ciudad</Label>
                        <Input type="text" name="ciudad" id="ciudad" 
                          value={item.ciudad || ''}                          
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
                       <Label for="motivo">Motivo</Label>
                        <Select                                                               
                              defaultValue={motivos[0]}
                              styles={custom} 
                              name="motivo"    
                              id="motivo"                    
                              options={motivos}                                                        
                              value={defaultVal(motivos,item.motivo)}   
                              onChange={ (e) => changesHandlern(e)}                                               
                        />  
                    </FormGroup>    
                  </Col>                                    
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                        <Label for="contacto">Contacto</Label>
                        <Input type="text" name="contacto" id="contacto" 
                          value={item.contacto || ''}                          
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
                        <Label for="contacto">Teléfono</Label>
                        <Input type="text" name="telefono" id="telefono" 
                          value={item.telefono || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo nombre es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
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
export default EditExperiencia;
