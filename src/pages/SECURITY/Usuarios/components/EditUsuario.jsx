import React,{ useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Table, Row,Col,Form, FormGroup, Input, Label,Card, CardBody, Button  } from "reactstrap"
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

const roles  = [{"value":1,"label":"administrador"},
                {"value":2,"label":"encargado"},
                {"value":3,"label":"vendedor"},
                {"value":4,"label":"cajero"},
                {"value":5,"label":"usuario"}
              ];

const EditUsuario = () => {
    const dispatch = useDispatch()  
    const {item, modulos } = useSelector(state => state.users)   
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
      
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {          
          dispatch(crudActions.SET_UPDATE('USUARIOS_ADD','usuarios',item,'dato'))            
        }else{
          dispatch(crudActions.SET_ADD('USUARIOS_ADD','usuarios/crear',item,'lista'))           
        }   
       
     }  
     const submitHandlec = event => {       
      event.preventDefault()        
      let iok = item
      iok.password = pass1
      dispatch(crudActions.SET_UPDATE('USUARIOS_ADD','usuarios',iok,'lista'))            
   }  
     
    useEffect(() => {      
      return () => {
        dispatch({type:'USUARIOS_RESET_ITEM'})        
      };
    }, []); 
     

    return (       
      <>       
      <Row>
      <Col>
        <Card>        
            <CardBody>
              <Row>
                <Col md={7} >
                <h5>Formulario de Registro</h5>
            <Form onSubmit={ submitHandle}>
                <Row form>
                  <Col md={11}>
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
                <Row form>
                  <Col md={11}>
                    <FormGroup>
                      <Label for="enombre">Username</Label>
                        <Input type="text" name="username" id="username" 
                          value={item.username || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo nombre es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                          />    
                    </FormGroup>    
                  </Col>                                    
                </Row>
                <Row form>                  
                  <Col md={11}>
                    <FormGroup>
                      <Label for="enombreCorto">Rol</Label>
                      <Select                                                               
                              defaultValue={roles[0]}
                              styles={custom} 
                              name="rolId"    
                              id="rolId"                    
                              options={roles}      
                              isClearable={true}                          
                              value={defaultVal(roles,item.rolId)}   
                              onChange={ (e) => changesHandler(e)}                                               
                            /> 
                    </FormGroup>   
                  </Col>
                </Row> 
                
                <Row form>                  
                  <Col md={7}>
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
                
            <Col md={5}>
                <Table className="table-simple">
                    <thead>
                        <tr>  
                            <th width="100%">Módulos</th>                                        
                        </tr>
                    </thead>
                    {modulos && (
                        <tbody>
                            {modulos.map((item,index) => (
                                <tr key={index}>                                              
                                  <td>{item.name}</td>                                                                   
                                </tr>  
                                ))}
                        </tbody>
                    )}
                </Table>
                </Col>
            </Row> 
            </CardBody>                      
          </Card> 
      </Col>    
    </Row>       
    <Row>
    <Col>
      <Card>        
          <CardBody>
            <Row>
              <Col md={12} >
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
                          className={((pass1 === undefined || pass1 === "") && (pass2 === undefined || pass2 === "")) ? "btn-md disabled btn-warning mt-2" : pass1 === pass2 ? "btn-md btn-warning mt-2":"btn-md disabled btn-warning mt-2" }>
                          <FontAwesomeIcon icon={faSave} />  
                          {' '} Actualizar
                          </Button> 
                        </Col>
                        <Col md={6}>
                          <p className="mt-2">{ ((pass1 === undefined || pass1 === "") && (pass2 === undefined || pass2 === "")) ? null : pass1 === pass2 ? 'iguales':'deben ser iguales'  }</p> 
                        </Col>
                      </Row>                 
                  </Form> 
              </Col>
          </Row> 
          </CardBody>                      
        </Card> 
    </Col>    
  </Row>  
  </>                                      
    );
};
export default EditUsuario;
