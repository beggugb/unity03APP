import React,{ useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { TabPane, TabContent, Nav, NavItem, Modal, ModalBody, NavLink,Row,Col,Button, Form, FormGroup, Input, Label, Card, CardBody } from "reactstrap"
import Select from 'react-select'  
import { crudActions } from '../../../../actions'
import { locations, ciudades } from "../../../../helpers/locations";
import { tipoCliente, grupoCliente } from "../../../../helpers/dataLoad";
import { defaultVal } from "../../../../helpers/funciones";
import { custom } from '../../../../helpers/customStyles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes, faArrowLeft , faMapMarkerAlt  } from "@fortawesome/free-solid-svg-icons";
import ClienteImagen from './ClienteImagen'
import ClienteNit from './ClienteNit'
import ClienteCi from './ClienteCi'
import TableVentasCliente from '../../../VENTAS/Ventas/components/TableVentasCliente'
import Mapas from './Mapas'

                    
const EditClientes = ({getComponent}) => {
    const dispatch = useDispatch()  
    const { item } = useSelector(state => state.clientes)   
    const [citys, setcitys] = useState([]);
    const [iok1, setiok1] = useState(true);
    const [iok2, setiok2] = useState(false);
    const [iok3, setiok3] = useState(false);
    const [tab, settab] = useState('1');
    const [ modalView, setmodalView ] = useState(false)

    const toggleMapaView = () => {    
      let est = modalView === true ? false : true;             
      setmodalView(est)                 
    };

    const changeHandler = event => {          
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('CLIENTES_CHANGE',name,value))  
    }

    const changesHandler = (event,name) => {                       
      const { value } = event ? event : ''              
      dispatch(crudActions.SET_CHANGE('CLIENTES_CHANGE',name,value))          
    }


      
    const changesPaises = event => {                  
      const {value, indice} = event ? event : ''                  
      dispatch(crudActions.SET_CHANGE('CLIENTES_CHANGE','pais',value))   
      let datc = ciudades.filter(d => (d.indice === indice) )  
      setcitys(datc)
  }

  
   
  
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('CLIENTES_ADD','clientes',item,'unit'))            
        }else{
          dispatch(crudActions.SET_ADD('CLIENTES_ADD','clientes',item,'unit'))           
        }            
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'CLIENTES_RESET_ITEM'})        
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

 

    return (              
      <>
     <Row>        
        <Col md="3" className="btnBack">  
          <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> LISTA CLIENTES
          </Button>              
        </Col>  
        <Col md="8"> 
        </Col>
        <Col md="1">  
          <Button 
            className="bg-danger text-white" 
            onClick={()=> toggleMapaView() }>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> 
          </Button>              
        </Col>  
      </Row>      
      <Row>      
        <Col>
        <div className="nav-sunitys" expand="lg">            
               <Nav tabs>
                <NavItem>
                  <NavLink className={iok1 ? 'active':''}  onClick={ () => {setChange('1')}} >
                   Datos Generales
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={iok2 ? 'active':''}  onClick={ () => {setChange('2')}} >
                    Imagenes
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={iok3 ? 'active':''}  onClick={ () => {setChange('3')}} >
                    Ventas 
                  </NavLink>
                </NavItem>
              </Nav>
              </div>
        </Col>          
      </Row>

      <Row>      
       <Col>
        <Card>
          <CardBody>
          <TabContent activeTab={tab}>
            <TabPane tabId="1">      
            <Form onSubmit={ submitHandle} className="mb-3">   
                <Row form>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="fcodigo">Código</Label>
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
                      <Label for="fnit">Nit</Label>
                      <Input
                        id="nit"
                        name="nit"                    
                        type="text"
                        value={item.nit || ''}
                        onChange={ (e) => changeHandler(e)}                                 
                        onInvalid={(e) => e.target.setCustomValidity('El campo nit es obligatorio !')}
                        onInput={(e) => e.target.setCustomValidity('')}
                        required
                      />
                    </FormGroup>
                  </Col> 
                  <Col md={6}>
                    <FormGroup>
                      <Label for="fnombres">Nombres</Label>
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
                </Row>  

                <Row form>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="fregistro">Fecha Registro</Label>
                      <Input
                        id="createdAt"
                        name="createdAt"
                        type="date"
                        value={item.createdAt || ''}
                        onChange={ (e) => changeHandler(e)}                        
                        readOnly={true}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="ftipo"> Tipo </Label>
                        <Select                                                               
                          defaultValue={tipoCliente[0]}
                          styles={custom} 
                          name="tipo"    
                          id="tipo"                    
                          options={tipoCliente}      
                          isClearable={false}                          
                          value={defaultVal(tipoCliente,item.tipo)}
                          onChange={ (e) => changesHandler(e,'tipo')}/>
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="fgrupo"> Grupo </Label>
                        <Select                                                               
                          defaultValue={grupoCliente[0]}
                          styles={custom} 
                          name="grupo"    
                          id="grupo"                    
                          options={grupoCliente}      
                          isClearable={false}                          
                          value={defaultVal(grupoCliente,item.grupo)}
                          onChange={ (e) => changesHandler(e,'grupo')}/>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                  <FormGroup>
                    <Label for="ftelefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      name="telefono"                    
                      type="text"
                      value={item.telefono || ''}
                      onChange={ (e) => changeHandler(e)}
                      onInvalid={(e) => e.target.setCustomValidity('El campo teléfono es obligatorio !')}
                      onInput={(e) => e.target.setCustomValidity('')}
                      required  
                      placeholder="(00)-000000"
                    />
                  </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="fcelular">Celular</Label>
                      <Input
                        id="celular"
                        name="celular"                    
                        type="text"
                        value={item.celular || ''}
                        onChange={ (e) => changeHandler(e)}
                        onInvalid={(e) => e.target.setCustomValidity('El campo celular es obligatorio !')}
                        onInput={(e) => e.target.setCustomValidity('')}
                        required  
                        placeholder="(00)-000000"/>
                    </FormGroup>
                  </Col>

                </Row>  

                <Row form>
                <Col md={3}>
                    <FormGroup>
                      <Label for="flatitude">Latitude</Label>
                      <Input
                        id="latitude"
                        name="latitude"                    
                        type="text"
                        value={item.latitude || ''}
                        onChange={ (e) => changeHandler(e)}
                        readOnly={true}
                        />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                  <FormGroup>
                    <Label for="flongitude">Longitude</Label>
                    <Input
                      id="longitude"
                      name="longitude"                    
                      type="text"
                      value={item.longitude || ''}
                      onChange={ (e) => changeHandler(e)}    
                      readOnly={true}                  
                    />
                  </FormGroup>
                  </Col>                                  
                  <Col md={6}>
                  <FormGroup>
                      <Label for="fpersonac">Persona Contacto</Label>
                      <Input
                        id="personaContacto"
                        name="personaContacto"                    
                        type="text"
                        value={item.personaContacto || ''}
                        onChange={ (e) => changeHandler(e)}                        
                        />
                    </FormGroup>
                  </Col>
                </Row>  
                <Row form>
                  <Col md={6}>
                  <FormGroup>
                    <Label for="fdireccion">Dirección</Label>
                    <Input
                      id="direccion"
                      name="direccion"                    
                      type="text"
                      value={item.direccion || ''}
                      onChange={ (e) => changeHandler(e)}                              
                    />
                  </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="fpais">Pais</Label>
                      <Select                                                               
                        defaultValue={locations[0]}
                        styles={custom} 
                        name="pais"    
                        id="pais"                    
                        options={locations}                                               
                        value={defaultVal(locations,item.pais)}   
                        onChange={ (e) => changesPaises(e)}/>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                  <FormGroup>
                      <Label for="fciudad">Ciudad</Label>
                      <Select                                                               
                        defaultValue={citys[0]}
                        styles={custom} 
                        name="ciudad"    
                        id="ciudad"                    
                        options={citys}                                                 
                        value={defaultVal(ciudades,item.ciudad)}     
                        onChange={ (e) => changesHandler(e,'ciudad')}/>
                    </FormGroup>
                  </Col>
                </Row> 
                <Row form>
                  <Col md={6}>
                  <FormGroup>
                    <Label for="fcuenta">Cuenta Bancaria</Label>
                    <Input
                      id="cuentaBancario"
                      name="cuentaBancario"                    
                      type="text"
                      value={item.cuentaBancario || ''}
                      onChange={ (e) => changeHandler(e)}/>
                  </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="femail">Email</Label>
                      <Input
                      id="email"
                      name="email"                    
                      type="text"
                      value={item.email || ''}
                      onChange={ (e) => changeHandler(e)}/>
                      
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="fweb">Web</Label>
                      <Input
                      id="web"
                      name="web"                    
                      type="text"
                      value={item.web || ''}
                      onChange={ (e) => changeHandler(e)}/>                     
                    </FormGroup>
                  </Col>
                </Row> 
                  <FormGroup>
                      <Label for="fobservaciones">Observaciones</Label>
                      <Input
                      id="observaciones"
                      name="observaciones"                    
                      type="textarea"
                      value={item.observaciones || ''}
                      onChange={ (e) => changeHandler(e)}/>                     
                  </FormGroup>

                <Row form>
                  <Col md={2}>            
                      <Button 
                        type="submit"
                        className={item.id ?"btn-md btn-warning mt-2" : "btn-md btn-info mt-2"}>
                        <FontAwesomeIcon icon={faSave} />  
                        {' '} {item.id ? " Actualizar" : " Guardar"}
                      </Button>
                  </Col>
                </Row> 
            </Form>                        
          </TabPane>  
          <TabPane tabId="2">
              <Row>
                <Col md="4">
                  <ClienteImagen/>
                </Col>
                <Col md="4">
                  <ClienteNit/>
                </Col>
                <Col md="4">
                  <ClienteCi/>
                </Col>
              </Row>
          </TabPane>
            
          <TabPane tabId="3">
              <TableVentasCliente/>
            </TabPane>
          </TabContent> 
          </CardBody>
        </Card>  
       </Col>
      </Row>  
      
      <Modal isOpen={modalView} toggle={toggleMapaView}>
        <Button className="btn-view btn-danger"  onClick={() => toggleMapaView()} >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        <ModalBody>         
            <Mapas/>
        </ModalBody>
      </Modal>
    </>
    );
};
export default EditClientes;
