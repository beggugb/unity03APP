import React,{ useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Form, ButtonGroup, FormGroup, Input, Label,Card, CardBody, Button  } from "reactstrap"
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlus } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'  
import { custom } from '../../../../helpers/customStyles'
import { defaultVal } from "../../../../helpers/funciones";
import SelectAlmacenes from "../../../INVENTARIOS/Almacenes/components/SelectAlmacenes";

const roles  = [{"value":1,"label":"administrador"},
                {"value":2,"label":"encargado"},
                {"value":3,"label":"vendedor"},
                {"value":4,"label":"cajero"},
                {"value":5,"label":"usuario"}
              ];

const EditUsuario = () => {
    const dispatch = useDispatch()  
    const {item } = useSelector(state => state.users)   
    const [pass1, setpass1] = useState();
    const [pass2, setpass2] = useState();
   

    const changesHandler = event => {            
      console.log(event)       
      const {value} = event ? event : ''        
      dispatch(crudActions.SET_CHANGE('USUARIOS_CHANGE','rolId',value))          
  }

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('USUARIOS_CHANGE',name,value))  
    }
    const changesNew = () => {    
      dispatch({type:'USUARIOS_RESET_ITEM'}) 
  }
      
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {          
          dispatch(crudActions.SET_UPDATE('USUARIOS_ADD','usuarios',item,'dato'))            
        }else{
          dispatch(crudActions.SET_ADD('USUARIOS_ADD','usuarios/crear',item,'lista'))           
        }          
     }      
    useEffect(() => {      
      return () => {
        dispatch({type:'USUARIOS_RESET_ITEM'})        
      };
    }, []); 
     
    const submitHandlec = event => {       
      event.preventDefault()        
      let iok = item
      iok.password = pass1
      dispatch(crudActions.SET_UPDATE('USUARIOS_ADD','usuarios',iok,'lista'))            
   }  
    return (  
      <>
      <Row>
        <Col md="12">
          <Card>        
            <CardBody>
              <h5>Formulario de Registro</h5>
              <Form onSubmit={ submitHandle}>
              <Row>
                <Col md="12">
                <FormGroup>
                <Label for="enombre">Nombres</Label>
                  <Input type="text" name="nombres" id="nombres" 
                    value={item.nombres || ''}                          
                    onChange={ (e) => changeHandler(e)} 
                    onInvalid={(e) => e.target.setCustomValidity('El campo nombre es obligatorio !')}
                    onInput={(e) => e.target.setCustomValidity('')}
                    required
                    />    
                </FormGroup> 
                </Col>    
              </Row>  
              <Row>
                <Col md="8">
                <FormGroup>
                  <Label for="enombre">Username</Label>
                  <Input type="text" name="username" id="username" 
                    value={item.username || ''}                          
                    onChange={ (e) => changeHandler(e)} 
                    onInvalid={(e) => e.target.setCustomValidity('El campo nombre es obligatorio !')}
                    onInput={(e) => e.target.setCustomValidity('')}
                    required/>    
                </FormGroup> 
                </Col>   
                <Col md="4">
                <FormGroup>
                  <Label for="enombre">Nº Caja</Label>
                  <Input type="text" name="numCaja" id="numCaja" 
                    value={item.numCaja || ''}                          
                    onChange={ (e) => changeHandler(e)} 
                    onInvalid={(e) => e.target.setCustomValidity('El campo nombre es obligatorio !')}
                    onInput={(e) => e.target.setCustomValidity('')}
                    required/>    
                </FormGroup> 
                </Col> 
              </Row>  

              <Row>
                <Col md="6">
                <FormGroup>
                  <Label for="enombreCorto">Rol</Label>
                  <Select                                                               
                        defaultValue={roles[0]}
                        styles={custom} 
                        name="rolId"    
                        id="rolId"                    
                        options={roles}                                                 
                        value={defaultVal(roles,item.rolId)}   
                        onChange={ (e) => changesHandler(e)}                                               
                      /> 
                  </FormGroup>
                </Col>
                <Col md="6">
                <SelectAlmacenes/>
                </Col>    
              </Row>    



               <Row>
                <Col md="2">
                  <Button 
                    onClick={(e) => changesNew(e)}
                    className="btn-md btn-danger mt-2">
                    <FontAwesomeIcon icon={faPlus} />                      
                  </Button> 
                  </Col>
                  <Col md="5"></Col>
                  <Col md="5">
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

      <Row>
        <Col md={12} >
          <Card>        
            <CardBody>
              <h5>Actualización de contraseña</h5>
                  <Form onSubmit={ submitHandlec}>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="enombre">Contraseña</Label>
                              <Input type="text" name="pass1" id="pass1" 
                                value={pass1 || ''}
                                onChange={ (e) => {setpass1(e.target.value)}} 
                                onInvalid={(e) => e.target.setCustomValidity('El campo nombre es obligatorio !')}
                                onInput={(e) => e.target.setCustomValidity('')}
                                required
                                readOnly={item.id ? false : true }
                                />    
                          </FormGroup>    
                        </Col>                                    
                        <Col md={6}>
                          <FormGroup>
                            <Label for="enombre">Re-contraseña</Label>
                            <Input type="text" name="pass2" id="pass2" 
                                value={pass2 || ''}                          
                                onChange={ (e) => {setpass2(e.target.value)}} 
                                onInvalid={(e) => e.target.setCustomValidity('El campo nombre es obligatorio !')}
                                onInput={(e) => e.target.setCustomValidity('')}
                                required
                                readOnly={item.id ? false : true }
                                />    
                          </FormGroup>    
                        </Col>                                    
                      </Row>
                    
                      
                      <Row form>                                         
                        <Col md={4}>
                          <Button 
                          type="submit"
                          className={ pass1 === pass2 ? "btn-md btn-warning mt-2" : "btn-md disabled btn-warning mt-2"}>
                          <FontAwesomeIcon icon={faSave} />  
                          {' '} Actualizar
                          </Button> 
                        </Col>
                        <Col md={6}>
                          <p>{ pass1 === pass2 ? 'iguales':'deben ser iguales'  }</p> 
                        </Col>
                      </Row>                 
                  </Form> 
                </CardBody>
                </Card>   
              </Col>
          </Row> 

      </>                                      
    );
};
export default EditUsuario;
