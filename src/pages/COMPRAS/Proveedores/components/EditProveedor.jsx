import React,{ useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Button, Form, Modal, FormGroup, ModalBody, Input, Label, Card, CardBody } from "reactstrap"
import Select from 'react-select'  
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMapMarkerAlt, faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ProveedorImagen from './ProveedorImagen'
import { tiposPersona, tiposProveedor } from "../../../../helpers/dataLoad";
import { defaultVal } from "../../../../helpers/funciones";
import { locations, ciudades } from "../../../../helpers/locations";
import { custom } from '../../../../helpers/customStyles'
import Mapa from './Mapa'

const EditProveedores = ({getComponent}) => {
    const dispatch = useDispatch()  
    const item = useSelector(state => state.proveedores.item)   
    const [citys, setcitys] = useState([]);
    const [ modalView, setmodalView ] = useState(false)

    const toggleMapaView = () => {    
      let est = modalView === true ? false : true;             
      setmodalView(est)                 
    };

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('PROVEEDORES_CHANGE',name,value))  
    }

    const changesPaises = event => {                  
      const {value, indice} = event ? event : ''         
      dispatch(crudActions.SET_CHANGE('PROVEEDORES_CHANGE','pais',value))   
      let datc = ciudades.filter(d => (d.indice === indice) )  
      setcitys(datc)
  }
   
    const changesHandler = (event,name) => {                     
        const {value} = event ? event : ''        
        dispatch(crudActions.SET_CHANGE('PROVEEDORES_CHANGE',name,value))          
    }
  
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('PROVEEDORES_ADD','proveedores',item,'unit'))            
        }else{
          dispatch(crudActions.SET_ADD('PROVEEDORES_ADD','proveedores',item,'unit'))           
        }            
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'PROVEEDORES_RESET_ITEM'})        
      };
    }, []); 
     
    return (             
    <> 
    <Row>
      <Col md="3" className="btnBack">       
        <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> LISTA PROVEEDORES
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
            <Card>        
              <CardBody>
               <Row>
                <Col md="8" className="cardCo">
                  <Form onSubmit={ submitHandle}>   
                  <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="codigo">Código</Label>
                        <Input type="text" name="codigo" id="codigo" 
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
                      <Label for="tipoFiscal">Tipo Persona</Label>
                      <Select                                                               
                          defaultValue={tiposPersona[0]}
                          styles={custom}
                          name="tipoFiscal"    
                          id="tipoFiscal"                    
                          options={tiposPersona}      
                          isClearable={false}                          
                          value={defaultVal(tiposPersona,item.tipoFiscal)}
                          onChange={ (e) => changesHandler(e,'tipoFiscal')}                                                 
                        />   
                    </FormGroup>    
                  </Col>  
                  <Col md={4}>
                    <FormGroup>
                      <Label for="tipoProveedor">Tipo Proveedor</Label>
                      <Select                                                               
                          defaultValue={tiposProveedor[0]}
                          styles={custom}
                          name="tipoProveedor"    
                          id="tipoProveedor"                    
                          options={tiposProveedor}      
                          isClearable={false}                          
                          value={defaultVal(tiposProveedor,item.tipoProveedor)}
                          onChange={ (e) => changesHandler(e,'tipoProveedor')}                                                 
                        />   
                    </FormGroup>    
                  </Col>                                             
                </Row>
                <Row form>
                  <Col md={9}>
                    <FormGroup>
                      <Label for="razonSocial">Razón Social</Label>
                        <Input type="text" name="razonSocial" id="razonSocial" 
                          value={item.razonSocial || ''}
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo razón social es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required 
                          />    
                    </FormGroup>    
                  </Col> 
                  <Col md={3}>
                    <FormGroup>
                      <Label for="nit">Nit</Label>
                        <Input type="text" name="nit" id="nit" 
                          value={item.nit || ''}
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo nit es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required 
                         />    
                    </FormGroup>    
                  </Col>                                          
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="direccion">Dirección</Label>
                        <Input type="text" name="direccion" id="direccion" 
                          value={item.direccion || ''}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>  
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
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="contacto">Contato</Label>
                      <Input type="text" name="contacto" id="contacto" 
                          value={item.contacto || ''}
                          onChange={ (e) => changeHandler(e)} />   
                    </FormGroup>    
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="pais">País</Label>
                      <Select                                                               
                      defaultValue={locations[0]}
                      styles={custom}
                      name="pais"    
                      id="pais"                    
                      options={locations}      
                      isClearable={false}                          
                      value={defaultVal(locations,item.pais)}   
                      onChange={ (e) => changesPaises(e)}                                               
                    />  
                    </FormGroup>    
                  </Col>                                    
                  <Col md={3}>
                    <FormGroup>
                      <Label for="ciudad">Ciudad</Label>
                      <Select                                                               
                    defaultValue={citys[0]}
                    name="ciudad"    
                    id="ciudad"                    
                    options={citys}      
                    isClearable={false}   
                    styles={custom}                       
                    value={defaultVal(ciudades,item.ciudad)}     
                    onChange={ (e) => changesHandler(e,'ciudad')}                                           
                  />
                        
                    </FormGroup>    
                  </Col>                                                                                          
                </Row>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input type="email" name="email" id="email" 
                          value={item.email || ''}
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo mail valido es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required                           
                          />   
                    </FormGroup>    
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="web">Web</Label>
                      <Input type="text" name="web" id="web" 
                          value={item.web || ''}
                          onChange={ (e) => changeHandler(e)} />   
                        
                    </FormGroup>    
                  </Col>                                    
                  <Col md={3}>
                    <FormGroup>
                      <Label for="telefono">Teléfono</Label>
                      <Input type="text" name="telefono" id="telefono" 
                          value={item.telefono || ''}
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo teléfono es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required 
                          />   
                        
                    </FormGroup>    
                  </Col>                                                                                          
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="observacione">Observaciones</Label>
                        <Input type="textarea" name="observaciones" id="observaciones" 
                          value={item.observaciones || ''}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>                                    
                </Row>
                <Row form>
                  <Col md={5}>
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
              <ProveedorImagen/>
            </Col>
          </Row>
        </CardBody>   
      </Card>
        </Col>          
      </Row>

      <Modal isOpen={modalView} toggle={toggleMapaView} >
        <Button className="btn-view btn-danger"  onClick={() => toggleMapaView()} >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        <ModalBody>         
            <Mapa/>
        </ModalBody>
      </Modal>
    </>                                            
    );
};
export default EditProveedores;
