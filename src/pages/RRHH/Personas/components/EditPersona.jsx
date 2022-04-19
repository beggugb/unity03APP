import React,{ useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { TabContent, TabPane, Nav, NavLink, NavItem, Row,Col,Button, Form, FormGroup, Input, Label, Card, CardBody } from "reactstrap"
import Select from 'react-select'  
import { crudActions } from '../../../../actions'

import PersonaImagen from './PersonaImagen'
import { locations, ciudades } from "../../../../helpers/locations";
import { custom } from '../../../../helpers/customStyles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft   } from "@fortawesome/free-solid-svg-icons";
import EstudiosView from "../../Estudios/EstudiosView"
import ExperienciasView from "../../Experiencias/ExperienciasView"

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const tipos     = [{"value":"personal","label":"personal"},
                   {"value":"empresa","label":"empresa"},];
                     
const EditPersonas = ({getComponent}) => {
    const dispatch = useDispatch()  
    const { item } = useSelector(state => state.personas)   
    const [citys, setcitys] = useState([]);
    const [iok1, setiok1] = useState(true);
    const [iok2, setiok2] = useState(false);
    const [iok3, setiok3] = useState(false);
    const [tab, settab] = useState('1');
    
    const changeHandler = event => {          
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('PERSONAS_CHANGE',name,value))  
    }
      
    const changesPaises = event => {                  
      const {value, indice} = event ? event : ''   
      console.log(value)           
      console.log(indice)           
      dispatch(crudActions.SET_CHANGE('PERSONAS_CHANGE','pais',value))   
      let datc = ciudades.filter(d => (d.indice === indice) )  
      setcitys(datc)
  }
    const changesCiudades = event => {                  
      const {value} = event ? event : ''               
      dispatch(crudActions.SET_CHANGE('PERSONAS_CHANGE','ciudad',value))   
      
    }

    const changesHandler = event => {            
        console.log(event)       
        const {value} = event ? event : ''        
        dispatch(crudActions.SET_CHANGE('PERSONAS_CHANGE','tipo',value))          
    }
  
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('PERSONAS_ADD','personas',item,'unit'))            
        }else{
          dispatch(crudActions.SET_ADD('PERSONAS_ADD','personas',item,'unit'))           
        }            
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'PERSONAS_RESET_ITEM'})        
      };
    }, []); 

    const setChange = (kit) =>{ 
      switch(kit){
        case '1':
          setiok1(true)
          setiok2(false)
          setiok3(false)
          settab('1') 
          break;
        case '2':
          setiok1(false)
          setiok2(true)
          setiok3(false)
          settab('2') 
          break;
        case '3':
          setiok1(false)
          setiok2(false)
          setiok3(true)
          settab('3') 
          break;        
        default:
          break;  
      }      
    }
    console.log('repeticiones')
    return (              
      <>
       <Row>              
        <Col md="3" className="btnBack">
          <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> LISTA CLIENTES
          </Button>
        </Col>                 
      </Row> 
      <Row>        
      <Col>
        <Card>
            <CardBody>
             <Row>               
             <Col md="12">
               <div className="nav-sunitys" expand="lg">            
               <Nav tabs>
                <NavItem>
                  <NavLink className={iok1 ? 'active':''}  onClick={ () => {setChange('1')}} >
                   Datos Generales
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={iok2 ? 'active':''}  onClick={ () => {setChange('2')}} >
                    Información Académica
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={iok3 ? 'active':''}  onClick={ () => {setChange('3')}} >
                    Esperiencia Laboral
                  </NavLink>
                </NavItem>
              </Nav>
              </div>
               </Col>               
              </Row>  
              <Row>      
              <Col>
              <TabContent activeTab={tab}>
                <TabPane tabId="1">
                <Row>
                 <Col md="8" className="cardCo">
                    <Form onSubmit={ submitHandle}>   
                      <Row form>
                        <Col md={8}>
                          <FormGroup>
                            <Label for="codigo">
                              Código
                            </Label>
                            <Input
                              id="codigo"
                              name="codigo"                    
                              type="text"
                              value={item.codigo || ''}
                              onChange={ (e) => changeHandler(e)}                                 
                              onInvalid={(e) => e.target.setCustomValidity('El campo código es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                              required 
                              
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="tipo">
                              Tipo
                            </Label>
                              <Select                                                               
                                defaultValue={tipos[0]}
                                styles={custom} 
                                name="tipo"    
                                id="tipo"                    
                                options={tipos}      
                                isClearable={false}                          
                                value={defaultVal(tipos,item.tipo)}
                                onChange={ (e) => changesHandler(e)}      
                                
                              />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="nombres">
                              Nombres
                            </Label>
                            <Input
                              id="nombres"
                              name="nombres"                    
                              type="text"
                              value={item.nombres || ''}
                              onChange={ (e) => changeHandler(e)}
                              onInvalid={(e) => e.target.setCustomValidity('El campo nombres es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                              required  
                           
                            />
                          </FormGroup>
                        </Col>   
                        <Col md={4}>
                          <FormGroup>
                            <Label for="paterno">
                              Apellido Paterno
                            </Label>
                            <Input
                              id="paterno"
                              name="paterno"                    
                              type="text"
                              value={item.paterno || ''}
                              onChange={ (e) => changeHandler(e)}
                              onInvalid={(e) => e.target.setCustomValidity('El campo paterno es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                              required  
                           
                            />
                          </FormGroup>
                        </Col> 
                        <Col md={4}>
                          <FormGroup>
                            <Label for="materno">
                              Apellido Materno
                            </Label>
                            <Input
                              id="materno"
                              name="materno"                    
                              type="text"
                              value={item.materno || ''}
                              onChange={ (e) => changeHandler(e)}
                              onInvalid={(e) => e.target.setCustomValidity('El campo materno es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                              required  
                           
                            />
                          </FormGroup>
                        </Col>         
                      </Row>
                      <Row form>
                      <Col md={4}>
                          <FormGroup>
                            <Label for="web">
                              WEB
                            </Label>
                            <Input
                              id="web"
                              name="web"                    
                              type="text"
                              value={item.web || ''}
                              onChange={ (e) => changeHandler(e)}
                            />
                        </FormGroup>
                        </Col>
                        <Col md={4}>
                        <FormGroup>
                            <Label for="telefono">
                              Teléfono
                            </Label>
                            <Input
                              id="telefono"
                              name="telefono"                    
                              type="text"
                              value={item.telefono || ''}
                              onChange={ (e) => changeHandler(e)}
                              onInvalid={(e) => e.target.setCustomValidity('El campo teléfono es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                              required  
                              placeholder="(591)-000000"
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="celular">
                              Celular
                            </Label>
                            <Input
                              id="celular"
                              name="celular"                    
                              type="text"
                              value={item.celular || ''}
                              onChange={ (e) => changeHandler(e)}
                              onInvalid={(e) => e.target.setCustomValidity('El campo celular es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                              required  
                              placeholder="(591)-000000"
                            />
                          </FormGroup>
                        </Col>            
                      </Row>
                      <FormGroup>
                        <Label for="direccion">
                          Dirección
                        </Label>
                        <Input
                          id="direccion"
                          name="direccion"
                          type="text"
                          value={item.direccion || ''}
                          onChange={ (e) => changeHandler(e)}      
                          onInvalid={(e) => e.target.setCustomValidity('El campo dirección es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                          required  
                                
                        />
                      </FormGroup>            
                    <Row form>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="Pais">
                            Pais
                          </Label>   
                            <Select                                                               
                              defaultValue={locations[0]}
                              styles={custom} 
                              name="pais"    
                              id="pais"                    
                              options={locations}      
                              isClearable={true}                          
                              value={defaultVal(locations,item.pais)}   
                              onChange={ (e) => changesPaises(e)}                                               
                            />                
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="ciudad">
                            Ciudad
                          </Label>
                          <Select                                                               
                            defaultValue={citys[0]}
                            styles={custom} 
                            name="ciudad"    
                            id="ciudad"                    
                            options={citys}      
                            isClearable={true}                          
                            value={defaultVal(ciudades,item.ciudad)}     
                            onChange={ (e) => changesCiudades(e)}                                             
                          />                   
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="Cod/Postal">
                            Código postal
                          </Label>
                          <Input
                            id="codpostal"
                            name="codpostal"
                            type="text"
                            value={item.codpostal || ''}
                            onChange={ (e) => changeHandler(e)}                
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
                        type="text"
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
            <Col md="4" className="cardCo">
              <h6 className="text-center">Imagen NIT</h6>
              <PersonaImagen/>
            </Col>
          </Row>
          </TabPane>
          
                 <TabPane tabId="2">
                   <EstudiosView/>
                 </TabPane>
                 <TabPane tabId="3">
                   <ExperienciasView/>
                 </TabPane>
               </TabContent>  
             </Col>          
            </Row>
          </CardBody>   
        </Card>       
      </Col>  
      </Row>
      
    </>
    );
};
export default EditPersonas;
