import React,{useState} from "react";
import { Form, FormGroup, Label, Table, Row, Col, Button, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import Pagination from '../../../../components/Pagination'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave   } from "@fortawesome/free-solid-svg-icons";

const ItemsTickets = () => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   let fecha = new Date()
   const {item, items,ipagina,ipaginas}= useSelector(state => state.tickets)         
   const [detalle, setdetalle] = useState("");

   const submitHandle = event => {       
    event.preventDefault()              
    let loki = {
        descripcion: detalle,
        ticketId: item.id,
        fecha : fecha
    }
    dispatch(crudActions.SET_ADD('TICKETS_ITEMS_ADD','ticketsitem',loki,'unit'))                 
    setdetalle('')
   } 

   const makeHttpRequestWithPage = (page,num) => {  
    dispatch(crudActions.GET_DATA('TICKETS_ITEMS_ADD','ticketsitem',page, num,item.id,item.id))  
  }
 
  return(
    <>    
    <Row>
      <Col>
        <Form onSubmit={ submitHandle}>   
            <Row form>                        
                <Col md={10}>
                          <FormGroup>
                            <Label for="codigo">
                              Descripción
                            </Label>
                            <Input
                              id="detalle"
                              name="detalle"                    
                              type="textarea"
                              value={detalle}
                              onChange={ (e) => setdetalle(e.target.value)}                                 
                              onInvalid={(e) => e.target.setCustomValidity('El campo código es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                              required 
                            />
                          </FormGroup>
                </Col>
                <Col md={2}>            
                    <Button 
                       type="submit"
                       className={detalle ?"btn-md btn-warning mt-3" : "btn-md btn-info mt-3"}>
                        <FontAwesomeIcon icon={faSave} />  
                        Registrar
                    </Button>
                </Col>
            </Row>    
        </Form>    
      </Col>
    </Row>  
    <Row>
      <Col>      
        <Table className="table-simple">
              <thead>
                  <tr>  
                      <th width="5%">#</th>                      
                      <th width="10%">Fecha</th>
                      <th width="85%">Descripción</th> 
                  </tr>
              </thead>
              {items && (
              <tbody>
                  {items.map((item) => (
                      <tr key={item.id}>                                                                 
                        <td>{item.id}</td>
                        <td>{item.fecha}</td>
                        <td>{item.descripcion}</td>
                      </tr>  
                      ))}
              </tbody>
          )}
            </Table>  
        
      </Col>
    </Row>  
    <Row>  
        <Col md={6} >
            <Pagination
                    makeHttpRequestWithPage={ makeHttpRequestWithPage }              
                    paginas={ipaginas}
                    current= {ipagina} 
                    pagina= {pag}
            />
        </Col>          
    </Row>
</>      
  )

};
export default ItemsTickets;
