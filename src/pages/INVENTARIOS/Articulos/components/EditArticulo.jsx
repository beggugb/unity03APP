import React,{ useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row,Col,Button, Form, FormGroup, Input, Label, Card, CardBody } from "reactstrap"
import Select from 'react-select'  
import Switch from 'react-switch'
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft   } from "@fortawesome/free-solid-svg-icons";
import ArticuloImagen from './ArticuloImagen'
import SelectCategoria from '../../Categorias/components/SelectCategoria'
import SelectMarca from '../../Marcas/components/SelectMarca'
import SelectUnidad from '../../Unidades/components/SelectUnidad'
import { custom } from '../../../../helpers/customStyles'
import { tiposServicio, niveles, clasificaciones } from "../../../../helpers/dataLoad";
import { defaultVal } from "../../../../helpers/funciones";


const EditArticulos = ({getComponent}) => {
    const dispatch = useDispatch()  
    const { item } = useSelector(state => state.articulos)  
    const empresa = JSON.parse(localStorage.getItem('@userEmpresa')) 
    const [iok1, setiok1] = useState(true);
    const [iok2, setiok2] = useState(false);
    const [iok3, setiok3] = useState(false);
    const [tab, settab] = useState('1');

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE',name,value))  
    }
      
    const changesHandler = (event,name) => {                              
        const { value } = event ? event : '' 
        dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE',name,value))            
    }
   
    const changeSwitch = (checked,name) => {  
      console.log(checked)                
      console.log(name)                
      dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE',name,checked))  
    }
    
    const submitUpdate= event => {  
      event.preventDefault()  
      dispatch(crudActions.SET_UPDATE('ARTICULOS_ADD','articulos',item,'unit'))
    }  
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('ARTICULOS_ADD','articulos',item,'unit'))            
        }else{
          dispatch(crudActions.SET_ADD('ARTICULOS_ADD','articulos',item,'unit'))           
        }            
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'ARTICULOS_RESET_ITEM'})        
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

    const generarCodigo = () => {             
      let maxNumber = 1000000000;
      let randomNumber = Math.floor((Math.random() * maxNumber) + 3);
      dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE','codigo',randomNumber)) 
    }
    return (              
    <>
    <Row>        
      <Col md="3" className="btnBack">  
        <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> LISTA ARTICULOS
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
                    Inventario
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
              <Row>
                <Col md="12">
                <Form onSubmit={submitHandle}>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="codigoBarras">Código</Label>
                        <Input type="text" name="codigo" id="codigo"
                          placeholder="codigo"  value={item.codigo || ''}
                          onChange={ (e) => changeHandler(e)} 
                          onDoubleClick= {(e) => generarCodigo()}                          
                          maxLength={30}             
                          onInvalid={(e) => e.target.setCustomValidity('El campo código es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          maxLength={25}                          
                          required                                       
                        />    
                    </FormGroup>    
                  </Col>                  
                  <Col md={2}>
                    <FormGroup>
                      <Label for="estado">Estado</Label>
                      <Switch                         
                        className="mt-3"                         
                        onChange={ (e) =>{ changeSwitch(e,'estado')}}  
                        checked={item.estado} />
                    </FormGroup>   
                  </Col> 
                  <Col md={2}>
                    <FormGroup>
                      <Label for="einCatalogo">Catálogo</Label>
                      <Switch                         
                        className="mt-3"                         
                        onChange={ (e) =>{ changeSwitch(e,'inCatalogo')}}  
                        checked={item.inCatalogo} />
                    </FormGroup>   
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="einOferta">Oferta</Label>
                      <Switch
                        className="mt-3"                         
                        onChange={ (e) =>{ changeSwitch(e,'inOferta')}}  
                        checked={item.inOferta} />
                    </FormGroup>   
                  </Col>                
                </Row>
                <Row form>
                  <Col md={6}>
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
                  <Col md={3}>
                    <FormGroup>
                      <Label for="enombreCorto">Nombre Corto</Label>
                      <Input type="text" name="nombreCorto" id="enombreCorto"  value={item.nombreCorto || ''} 
                          onChange={ (e) => changeHandler(e)}  
                          maxLength={20}            
                          />
                    </FormGroup>   
                  </Col>
                  <Col md={3  }>
                  <FormGroup>
                      <Label for="precioVenta">Precio Venta {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(0)}</Label>
                      <Input type="number" name="precioVenta" id="precioVenta"  value={item.precioVenta || ''} 
                          onChange={ (e) => changeHandler(e)}  
                          onInvalid={(e) => e.target.setCustomValidity('El campo precio venta es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          maxLength={25}                          
                          required
                          />
                    </FormGroup> 
                  </Col>
                </Row> 

                <Row form>                  
                  <SelectCategoria/>                                
                  <Col md={3}>
                    <FormGroup>
                      <Label for="eEstado">Marca</Label>
                      <SelectMarca/>  
                    </FormGroup>   
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="eModelo">Modelo</Label>
                      <Input type="text" name="modelo" id="modelo" 
                          placeholder="modelo"  value={item.modelo || ''}
                          onChange={ (e) => changeHandler(e)} />  
                    </FormGroup>   
                  </Col>
                  <Col md={2}>
                  <FormGroup>
                      <Label for="eTipo">Tipo</Label>
                      <Select
                        defaultValue={[tiposServicio[0]]}                        
                        name="tipo"
                        id="tipo" 
                        options={tiposServicio}
                        styles={custom} 
                        value={defaultVal(tiposServicio,item.tipo)}  
                        onChange={ (e) => changesHandler(e,'tipo')}                         
                      />
                    </FormGroup>   
                  </Col>
                                    
                </Row> 
                <Row form>
                <Col md={4}>
                    <FormGroup>
                      <Label for="eMedida">Industria</Label>
                      <Input type="text" name="industria" id="industria" 
                          value={item.industria || ''}
                          onChange={ (e) => changeHandler(e)} />  
                    </FormGroup>   
                  </Col>
                <Col md={2}>
                    <FormGroup>
                      <Label for="eUnidad">Unidad</Label>
                      <SelectUnidad/>  
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="ePeso">Peso</Label>
                      <Input type="text" name="peso" id="peso" 
                          value={item.peso || ''}
                          onChange={ (e) => changeHandler(e)} />  
                    </FormGroup>    
                  </Col>                  
                 
                  <Col md={2}>
                  <FormGroup>
                      <Label for="eVolumen">Volumen</Label>
                      <Input type="text" name="volumen" id="volumen" 
                          value={item.volumen || ''}
                          onChange={ (e) => changeHandler(e)} />  
                    </FormGroup>   
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="eMedida">Medida</Label>
                      <Input type="text" name="medida" id="medida" 
                          value={item.medida || ''}
                          onChange={ (e) => changeHandler(e)} />  
                    </FormGroup>   
                  </Col>
                  
                                   
                </Row> 

                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="edescripcion">Descripción</Label>
                        <Input type="textarea" name="descripcion" id="edescripcion" 
                           value={item.descripcion || ''}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>                                  
                </Row>

                <Row form>
                  <Col md={4} className="mb-3">
                    <Button 
                      type="submit"
                      className={item.id ?"btn-md btn-warning mt-2" : "btn-md btn-info mt-2"}>
                      <FontAwesomeIcon icon={faSave} />  {' '} {item.id ? 'Actualizar': 'Guardar'} 
                    </Button>
                  </Col>
                </Row>
            </Form> 
                </Col>
              </Row>  
              </TabPane>
              <TabPane tabId="2">
              <Row>
                <Col md="4">
                <ArticuloImagen/>
                </Col>
                <Col md="4">
                <ArticuloImagen/>
                </Col>
                <Col md="4">
                <ArticuloImagen/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">              
              <Col md="12">
                <Form onSubmit={submitUpdate}>                
                <Row form>                                                   
                  <Col md={3}>
                    <FormGroup>
                      <Label for="timepoEntrega">Tiempo de Entrega</Label>
                        <Input type="number" name="te" id="te" 
                          value={item.te || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          maxLength={25}
                          required/>                          
                    </FormGroup>  
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="timepoEntrega">Tiempo de Entrega con Retraso</Label>
                        <Input type="number" name="ter" id="ter" 
                          value={item.ter || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          maxLength={25}
                          required/>                          
                    </FormGroup>  
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="consumoPromedio">Consumo Promedio</Label>
                        <Input type="number" name="cp" id="cp" 
                          value={item.cp || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          maxLength={25}
                          required/>                          
                    </FormGroup>  
                  </Col>   
                  <Col md={3}>
                    <FormGroup>
                      <Label for="eNiveles">Nivel Movimiento</Label>
                        <Select                                                               
                          defaultValue={niveles[0]}
                          name="nm"    
                          id="nm"                    
                          options={niveles}     
                          styles={custom}                                               
                          value={defaultVal(niveles,item.nm)}  
                          onChange={ (e) => changesHandler(e,'nm')}                                               
                        />
                    </FormGroup>   
                  </Col>
                  <Col md={1}>
                    <FormGroup>
                      <Label for="eClasificacion">Clasificación</Label>
                        <Select                                                               
                          defaultValue={clasificaciones[0]}
                          name="nv"    
                          id="nv"                    
                          options={clasificaciones}     
                          styles={custom}                                               
                          value={defaultVal(clasificaciones,item.nv)}  
                          onChange={ (e) => changesHandler(e,'nv')}                                               
                        />
                    </FormGroup>   
                  </Col>        
                </Row>  

                <Row form>                
                  <Col md={3}>
                    <FormGroup>
                      <Label for="stockMaximo">Stock Máximo</Label>
                        <Input type="text" name="sma" id="sma" 
                          value={ (item.te * item.cp) + (item.te * item.cp)}                          
                          onChange={ (e) => changeHandler(e)}                           
                          maxLength={25}
                          readOnly={true}
                          />                          
                    </FormGroup>  
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="minSeguridad">Mínimo de Seguridad</Label>
                        <Input type="number" name="ms" id="ms" 
                          value={ (item.ter - item.te) * item.cp}                          
                          onChange={ (e) => changeHandler(e)}                           
                          maxLength={25}
                          readOnly={true}
                          />                          
                    </FormGroup>  
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="stockMaximo">Stock Mínimo</Label>
                        <Input type="text" name="smi" id="smi" 
                          value={ item.te * item.cp}                          
                          onChange={ (e) => changeHandler(e)}                           
                          maxLength={25}
                          readOnly={true}
                          />                          
                    </FormGroup>  
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="puntoReorden">Punto de Reorden</Label>
                        <Input type="text" name="pr" id="pr" 
                          value={ (item.te * item.cp) + ((item.ter - item.te) * item.cp) }
                          onChange={ (e) => changeHandler(e)}                           
                          maxLength={25}
                          readOnly={true}
                          />                          
                    </FormGroup>  
                  </Col>
                </Row> 
                      
                <Row form>
                  <Col md={3} className="mb-3">
                    <Button 
                      type="submit"
                      className={item.id ?"btn-md btn-warning mt-2" : "btn-md btn-info mt-2"}>
                      <FontAwesomeIcon icon={faSave} />  {' '} {item.id ? 'Actualizar': 'Guardar'} 
                    </Button>
                  </Col>
                </Row>
                </Form>
              </Col>                          
            </TabPane>
          </TabContent>
          </CardBody>
          </Card>  
       </Col>
      </Row>
    </>                                            
    );
};
export default EditArticulos;
