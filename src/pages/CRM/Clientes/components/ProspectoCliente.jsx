import React,{useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { crudActions } from '../../../../actions'  
import { Row,Col,Card,CardBody,Form,Button, FormGroup, Input, Modal, ModalBody, Table } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faArrowRight } from "@fortawesome/free-solid-svg-icons";


const ProspectoCliente = () => {
    const dispatch = useDispatch()   
    const [modalView, setmodalView] = useState(false); 
    const { data  } = useSelector(state => state.clientes) 
    const itt  = useSelector(state => state.prospectos.item) 
    const [prop, setProp] = useState('nombres');
    const [value, setValue] = useState("");
   
    const toggleModalView = () => {    
        let est = modalView === true ? false : true;             
        setmodalView(est)                          
    };    
    const asignar = (item) => {  
        let niok={
            clienteId: item.id,
            prospectoId: itt.id,
            nroMensajes: 0,
            nroEmail: 0,
            estado: true
        }
        dispatch(crudActions.SET_ADD_LOAD('PROSPECTOS_ITEMS_ADD','prospectosc',niok,'unit'))       
      }
    const submitHandle = event => {       
        event.preventDefault()  
        let iok = {}               
        iok.value = value
        iok.prop  = prop
        dispatch(crudActions.GET_SEARCH('CLIENTES_DATA','clientes',iok))              
     } 

    useEffect(() => {        
    
        return () => {
          dispatch({type:'CLIENTES_RESET'})   
        };
      }, []);

    return (                      
      <>
        <Row form>          
            <Col md={9} className="text-left ml-2">                     
                <h6>Participantes</h6>
            </Col>
            <Col md={2} className="text-right">                     
                <Button className="btn-rd btn-info" onClick={() => toggleModalView()}>
                    <FontAwesomeIcon icon={faSearch} />                          
                </Button>
            </Col>
        </Row>
       <Modal isOpen={modalView} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
          <Row>
            <Col >
              <Card>
              <CardBody>
                <Form onSubmit={ submitHandle}> 
                  <FormGroup row>                                                          
                    <Col sm={10}>
                    <Input 
                        type="text" 
                        name="value"                                 
                        id="value"  
                        value={ value || '' }  
                        onChange={(e) =>{setValue(e.target.value)}} />
                        {
                          value ? 
                          <Button className="volatils" onClick={(e) => {setValue('')}}>
                            <FontAwesomeIcon icon={faTimes}   />
                          </Button>
                          : null
                        }
                    </Col>    
                    <Button className="btn-sm btn-primary" sm={1}>
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    </FormGroup>       
                </Form>  
                </CardBody>
              </Card>  
            </Col>
          </Row>

           <Row>
            <Col>
            <div className="table-single">     
                    <Table className="table-simple">
                    <thead>
                        <tr>                              
                            <th width="50%">Nombres</th>
                            <th width="40%">Email</th>          
                            <th width="10%"></th>                
                        </tr>
                    </thead>
                    {data && (
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>                                                          
                                    <td>{item.nombres}</td>
                                    <td>{item.email}</td>                                    
                                    <td>
                                    <Button className="btn btn-success" 
                                    onClick={() => { asignar(item)}}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                    </Button>              
                                    </td>
                                </tr>  
                                ))}
                        </tbody>
                    )}
                    </Table>
            </div>
            </Col>
          </Row>  
          </ModalBody>
        </Modal>

       </>
    );
};
export default ProspectoCliente;
