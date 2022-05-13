import React,{useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { crudActions } from '../../actions'
import { Form, Label, FormGroup, Row, Col, Button, Card, CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import SubMenu from '../../components/subConsolidado.jsx';
import { ConsolidadoRouter } from '../../routes'
import Cajas  from './Cajas';
import DatePicker from  "react-datepicker";
import SelectUsuarios from "../SECURITY/Usuarios/components/SelectUsuarios";

                
const CajasView = () => {
  const dispatch = useDispatch() 
  const { item  } = useSelector(state => state.users)      
  const [value1, onChange1] = useState(new Date());    
  const [value2, onChange2] = useState(new Date()); 
  
  const submitHandle = event => {       
    event.preventDefault()       
    const itt = {
      desde     : value1,
      hasta     : value2,      
      usuarioId : item.id
    }    
    dispatch(crudActions.GET_INFORMES('INFORMES_CAJAS','cajas',itt))          
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
      <SubMenu items={ConsolidadoRouter} prop='Cajas'/>  
        <Row>
        <Col md="3">
          <Card>        
              <CardBody>
              <Form onSubmit={ submitHandle}>
                <Row form>
                 <Col>INFORME DE CAJAS</Col>
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
                <Row>
                  <Col md="12"> 
                  <FormGroup >
                    <Label for="eusuario">Usuario : </Label>
                    <SelectUsuarios/>
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
          <Cajas/>
        </Col>
      </Row> 
      </div>    
    </div>   
    </>
  )

};
export default CajasView;
