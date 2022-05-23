import React,{ useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row,Col,Form, FormGroup, Input, Label,Card, CardBody, Button  } from "reactstrap"
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { custom } from '../../../helpers/customStyles'
import EmpresaImagen from "./EmpresaImagen"
import { paises, monedas } from "../../../helpers/locations";
import Select from 'react-select'  
import { defaultVal } from "../../../helpers/funciones";
const EditEmpresa = () => {
    const dispatch = useDispatch()  
    const {item } = useSelector(state => state.empresa)  
    const [tipo, settipo] = useState('password');
    const [iok1, setiok1] = useState(true);
    const [iok2, setiok2] = useState(false);
    const [iok3, setiok3] = useState(false);

  
    const [tab, settab] = useState('1');
    
    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('EMPRESA_CHANGE',name,value))  
    }
        
    const changesPaises = event => {                  
      const {value, indice} = event ? event : ''                  
      dispatch(crudActions.SET_CHANGE('EMPRESA_CHANGE','pais',value))   
      let datc = monedas.filter(d => (d.indice === indice) )   
      let iok  = datc[0].label + ' ('+datc[0].value+')'     
      dispatch(crudActions.SET_CHANGE('EMPRESA_CHANGE','moneda',datc[0].value)) 
      dispatch(crudActions.SET_CHANGE('EMPRESA_CHANGE','labelMoneda',iok))
  }
    
    const submitHandle = event => {       
        event.preventDefault()    
        let iok  ={
          id:          item.id,
          labelMoneda: item.labelMoneda,
          moneda:      item.moneda,
          nombre:      item.razonSocial,
          pais:        item.pais
        }
        /*localStorage.setItem("@userEmpresa", JSON.stringify(iok));*/
        dispatch(crudActions.SET_UPDATE('EMPRESA_ITEM','empresas',item,'dato'))            
     }

    useEffect(() => {      
        dispatch(crudActions.GET_ITEM('EMPRESA_ITEM','empresas',1)) 
      return () => {          
        dispatch({type:'EMPRESA_RESET_ITEM'})        
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
        case '2':
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
      <div className="content">        
        <div className="main-contenido">               
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
                   Configuraciones
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={iok3 ? 'active':''}  onClick={ () => {setChange('3')}} >
                  Licencia
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
            <Col md="9">
            <Form onSubmit={ submitHandle}>  
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="enombre">Razon Social</Label>
                        <Input type="text" name="nombre" id="nombre" 
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
                      <Label for="enombre">Dirección</Label>
                        <Input type="text" name="direccion" id="direccion" 
                          value={item.direccion || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo direccion es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                          />    
                    </FormGroup>    
                  </Col>                                    
                </Row>    
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="enombre">Web</Label>
                        <Input type="text" name="web" id="web" 
                          value={item.web || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo web es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                          />    
                    </FormGroup>    
                  </Col>  
                  <Col md={4}>
                    <FormGroup>
                      <Label for="enombre">Email</Label>
                        <Input type="text" name="email" id="email" 
                          value={item.email || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo email es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                          />    
                    </FormGroup>    
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="etelefono">Teléfono</Label>
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
                  <Col md={4}>
                    <FormGroup>
                      <Label for="enombre">Nit</Label>
                        <Input type="text" name="nit" id="nit" 
                          value={item.nit || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo nit es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                          />    
                    </FormGroup>    
                  </Col>                    
                  <Col md={4}>
                    <FormGroup>
                      <Label for="fpais">Pais</Label>
                      <Select                                                               
                        defaultValue={paises[0]}
                        styles={custom} 
                        name="pais"    
                        id="pais"                    
                        options={paises}                                               
                        value={defaultVal(paises,item.pais)}   
                        onChange={ (e) => changesPaises(e)}/>
                    </FormGroup>
                  </Col>  
                  <Col md={4}>
                    <FormGroup>
                      <Label for="emoneda">Moneda</Label>
                        <Input type="text" name="moneda" id="moneda" 
                          value={item.labelMoneda || ''}                          
                          onChange={ (e) => changeHandler(e)}                           
                          readOnly={true}
                          />    
                    </FormGroup>    
                  </Col>                                               
                </Row>  
               
                <Row form>                  
                  <Col md={2}>
                    <Button     
                    type="submit"
                    className="btn-md btn-warning mt-2">
                    <FontAwesomeIcon icon={faSave} />  
                    {' '} Actualizar
                    </Button> 
                  </Col>
                </Row> 
            </Form>
            </Col>
            <Col md="3">
              <EmpresaImagen/>
            </Col>
            </Row> 

            </TabPane>  
            <TabPane tabId="2">
              <Row>
                <Col md="12">
                <Form onSubmit={ submitHandle}>                 
                
                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="enombre">SmtpHost</Label>
                        <Input type="text" name="smtpHost" id="smtpHost" 
                          value={item.smtpHost || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo smtpHost es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                          />    
                    </FormGroup>    
                  </Col>  
                  <Col md={3}>
                    <FormGroup>
                      <Label for="enombre">SmtpHost</Label>
                        <Input type="text" name="smtpHost" id="smtpHost" 
                          value={item.smtpHost || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo smtpHost es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                          />    
                    </FormGroup>    
                  </Col>  
                  <Col md={3}>
                    <FormGroup>
                      <Label for="smtpUser">SmtpUser</Label>
                        <Input type="text" name="smtpUser" id="smtpUser" 
                          value={item.smtpUser || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo smtpUser es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                          />    
                    </FormGroup>    
                  </Col>  
                  <Col md={3}>
                    <FormGroup>
                      <Label for="smtpPassword">SmtpPassword</Label>
                        <Input type={tipo} name="smtpPassword" id="smtpPassword" 
                          value={item.smtpPassword || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo smtpPassword es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          onClick={(e) => settipo(tipo === 'password' ? 'text' : 'password')}
                          required
                          />    
                    </FormGroup>    
                  </Col> 
                  <Col md={3}>
                    <FormGroup>
                      <Label for="smtpPort">SmtpPort</Label>
                        <Input type="text" name="smtpPort" id="smtpPort" 
                          value={item.smtpPort || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo smtpPort es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                          />    
                    </FormGroup>    
                  </Col>                         
                </Row>
                <Row form>                  
                  <Col md={2}>
                    <Button     
                    type="submit"
                    className="btn-md btn-warning mt-2">
                    <FontAwesomeIcon icon={faSave} />  
                    {' '} Actualizar
                    </Button> 
                  </Col>
                </Row> 
            </Form>
                </Col>          
              </Row>
            </TabPane> 
            <TabPane tabId="3">
              <Row>
                <Col md="4">
                  
                </Col>          
              </Row>
            </TabPane>     
          </TabContent> 
          </CardBody>
        </Card>  
       </Col>
      </Row> 
        </div>
    </div>                              
    );
};
export default EditEmpresa;
