import React,{ useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Button, Form, FormGroup, Input, Label, Card, CardBody } from "reactstrap"
import Select from 'react-select'  
import { crudActions } from '../../../../actions'
import TicketCliente from '../../Clientes/components/TicketCliente'
import { custom } from '../../../../helpers/customStyles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft   } from "@fortawesome/free-solid-svg-icons";
import DatePicker, { registerLocale } from  "react-datepicker";
import ItemsTickets from "./ItemsTickets";
import { defaultVal } from "../../../../helpers/funciones";
import es from 'date-fns/locale/es';
registerLocale('es', es)


const tipos     = [
                  {"value":"llamada","label":"llamada"},
                  {"value":"reclamo","label":"reclamo"},
                  {"value":"soporte","label":"soporte"},                  
                  {"value":"servicio","label":"servicio"}                  
                  ];

const estados   = [
                    {"value":"abierto","label":"abierto"},
                    {"value":"anulado","label":"anulado"},
                    {"value":"cerrado","label":"cerrado"},
                    {"value":"rechazado","label":"rechazado"},                  
                    {"value":"servicio","label":"servicio"}                  
                    ];                  
                     
const EditTickets = ({getComponent}) => {
    const dispatch = useDispatch()  
    const { item } = useSelector(state => state.tickets)       
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))
    
    const changeHandler = event => {          
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('TICKETS_CHANGE',name,value))  
    }
      
    const changesHandler = event => {                    
        const {value} = event ? event : ''        
        dispatch(crudActions.SET_CHANGE('TICKETS_CHANGE','tipo',value))          
    }

    const changetHandler = event => {                  
      const {value} = event ? event : ''        
      dispatch(crudActions.SET_CHANGE('TICKETS_CHANGE','estado',value))          
  }
  
    const submitHandle = event => {       
        event.preventDefault()      
        let loki = item
        loki.usuarioId = usuario.id  
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('TICKETS_ADD','tickets',loki,'unit'))        
        }else{
          dispatch(crudActions.SET_ADD('TICKETS_ADD','tickets',loki,'unit'))           
        }            
        console.log(item)
     }  
    useEffect(() => {      
      return () => {
       /* dispatch({type:'TICKETS_RESET_ITEM'})        */
      };
    }, []); 

    const onChange1 = (value) => {          
      console.log(value)
      dispatch(crudActions.SET_CHANGE('TICKETS_CHANGE','fechaRegistro',value)) 
    }


     
    return (              
      <>
      <Row>
      <Col>
        <Card>
            <CardBody>
             <Row>
               <Col md="7">
               <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
                 <FontAwesomeIcon icon={faArrowLeft} /> LISTA TICKETS
               </Button>
               </Col> 
               
              </Row>  
            </CardBody>   
        </Card>       
      </Col>  
      </Row>

      <Row>
        <Col md={4}>
          <Card className="registroTicket">   
          <TicketCliente/>     
          <Form onSubmit={ submitHandle}>   
                      <Row form>                        
                        <Col md={6}>
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
                        <Col md={6}>
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
                        <Col md={6}>
                          <FormGroup>
                            <Label for="nombres">
                              Fecha Registro
                            </Label>
                            { item.id ? 
                             <Input
                             id="fechaRegistro"
                             name="fechaRegistro"                    
                             type="text"
                             value={item.fechaRegistro}                             
                             readOnly={true}
                           />: 
                            <DatePicker 
                              locale="es" 
                              selected={item.fechaRegistro || ''} 
                              onChange={(date) => onChange1(date)} 
                            />}                    
                          </FormGroup>
                        </Col>   
                       
                        <Col md={6}>
                          <FormGroup>
                            <Label for="estado">
                              Estado
                            </Label>
                              <Select                                                               
                                defaultValue={estados[0]}
                                styles={custom} 
                                name="estado"    
                                id="estado"                    
                                options={estados}      
                                isClearable={false}                          
                                value={defaultVal(estados,item.estado)}
                                onChange={ (e) => changetHandler(e)}      
                                
                              />
                          </FormGroup>
                        </Col>        
                      </Row>
                      <Row form>
                      <Col md={12}>
                          <FormGroup>
                            <Label for="detalle"> Detalle     </Label>
                            <Input
                              id="detalle"
                              name="detalle"                    
                              type="textarea"
                              value={item.detalle || ''}
                              onChange={ (e) => changeHandler(e)}
                            />
                        </FormGroup>
                        </Col>                                  
                      </Row>
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
          </Card>
        </Col>          
        <Col md={8}>
          <Card className="registroTicket">      
             <ItemsTickets/>                 
          </Card>
        </Col>          
      </Row>
    </>
    );
};
export default EditTickets;
