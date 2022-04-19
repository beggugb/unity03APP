import React,{useState, useEffect} from "react";
import { crudActions } from '../../../actions'
import { Form, Label, FormGroup, Row, Col, Button, Card, CardBody  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import SubMenu from '../../../components/subCliente.jsx';
import { InformeClientesRouter } from '../../../routes'
import DatePicker, { registerLocale } from  "react-datepicker";
import { useDispatch } from 'react-redux'
import Prospectos  from './Prospectos';
import es from 'date-fns/locale/es';
registerLocale('es', es)

const ProspectosView = () => {
  const dispatch = useDispatch() 
  const [value1, onChange1] = useState(new Date());    
  const [value2, onChange2] = useState(new Date());    
  
  const submitHandle = event => {       
    event.preventDefault()       
    const item = {}
    item.desde = value1
    item.hasta = value2             
    dispatch(crudActions.GET_INFORMES('INFORMES_PROSPECTOS_RANGOS','prospectorango',item))                 
    
  }
  

  useEffect(() => {
    return () => {
      console.log('descarga cliente')
    };
  }, []);

  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
        <SubMenu items={InformeClientesRouter} prop={'Prospectos'}/>
        <Row>
        <Col md="3">
          <Card>        
              <CardBody>
              <Form onSubmit={ submitHandle}>
                <Row form>
                 <Col><h6><b>FILTRO DE BUSQUEDA</b></h6></Col>
                </Row>
                <Row form>
                  <Col md="12">
                  <FormGroup >
                    <Label for="eDesde">Desde :</Label>                    
                    <DatePicker locale="es"selected={value1} onChange={(date) => onChange1(date)} />
                  </FormGroup> 
                  </Col>
                </Row>
                <Row form>            
                  <Col md="12">
                  <FormGroup >
                    <Label for="eHasta">Hasta : </Label>
                    <DatePicker locale="es"selected={value2} onChange={(date) => onChange2(date)} />
                  </FormGroup>  
                  </Col>
                </Row>
                <Row form>                  
                  <Col md="5">
                  <FormGroup> 
                  <Button 
                      type="submit"
                      className="btn-md btn-info mt-4">
                      <FontAwesomeIcon icon={faSave} />  
                      {' '} Generar
                  </Button>
                  </FormGroup> 
                  </Col>                                                                   
                </Row>
               </Form>   
              </CardBody>                        
            </Card>         
        </Col>            
        <Col md="9">
          <Prospectos
            value1={value1}
            value2={value2}                     
          />
        </Col>
      </Row> 
      </div>    
    </div>    
    </>
  )

};
export default ProspectosView;
