import React,{useState, useEffect, useCallback} from "react";
import { ButtonGroup, FormGroup, Label, Table, Row, Col, Button, Card, CardBody, CardFooter  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../../components/Pagination'
import { customStyles } from '../../../../helpers/customStyles'
import Select from 'react-select' 
const page =[{"value":15,"label":"15"},
             {"value":30,"label":"30"},
             {"value":50,"label":"50"}             
            ];

            const defaultVal = (options, valor) =>{
              return options.filter(item =>
                  item.value === valor
                )
            
            }      


const TableExperiencias = () => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   const {data,pagina,paginas}= useSelector(state => state.experiencias)
   const { item } = useSelector(state => state.personas)

   const makeHttpRequestWithPage = (page, num) => {
      dispatch(crudActions.GET_DATA('EXPERIENCIAS_DATA','experiencias',page, num,item.id,'asc'))         
  }

  const deleteItem = (pky) => {                
    dispatch(crudActions.GET_DELETE('EXPERIENCIAS_ADD','experiencias',pky,item.id))
  };
  const getItem = (pky) => {                
    dispatch(crudActions.GET_ITEM('EXPERIENCIAS_ITEM','experiencias',pky))
  };

  useEffect(() => {      
      return () => {
        dispatch({type:'EXPERIENCIAS_RESET_DATA'})   
      };
  }, []);

  const changeSelect = (pky) => {        
    const {value, label} = pky
    setpag(value)
    makeHttpRequestWithPage(1,value)
  };
  
  return(
    <>    
    <Row>
      <Col>
        <Card>
          <CardBody>    
        <Table className="table-simple">
          <thead>
              <tr>  
                  <th width="10%">Desde</th>
                  <th width="10%">Hasta</th>
                  <th width="10%">Pais</th>                             
                  <th width="10%">Ciudad</th>
                  <th width="20%">Mot??vo</th>
                  <th width="20%">Contacto</th>
                  <th width="10%">Tel??fono</th>
                  <th width="10%"></th>
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}>                      
                        <td>{item.desde}</td>
                        <td>{item.hasta}</td>
                        <td>{item.pais}</td>
                        <td>{item.ciudad}</td>
                        <td>{item.motivo}</td>
                        <td>{item.contacto}</td>
                        <td>{item.telefono}</td>
                        <td>
                        <ButtonGroup>
                          <Button className="btn-tb bg-default text-white"
                            onClick={() => { getItem(item.id)}}                           >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button className="btn-tb bg-defaults text-white"
                            onClick={() => { deleteItem(item.id)}}                           >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>   
                        </ButtonGroup>                                         
                        </td>
                      </tr>  
                      ))}
              </tbody>
          )}
        </Table>
        </CardBody>    
        <CardFooter>
        <Row>                                            
              <Col md={6} >
                  <Pagination
                    makeHttpRequestWithPage={ makeHttpRequestWithPage }              
                    paginas={paginas}
                    current= {pagina} 
                    pagina= {pag}
                  />
              </Col>          
              <Col md={4}>                  
              </Col>
              <Col md={2}>   
                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>Mostrar</Label>
                  <Col sm={7}>
                      <Select                 
                        styles={customStyles}                                              
                        defaultValue={page[0]}
                        name="pag"    
                        id="pag"                    
                        options={page}      
                        isClearable={false}                          
                        value={defaultVal(page,pag)}    
                        onChange={ (e) => changeSelect(e)}                                             
                      />
                  </Col>
                  </FormGroup>
              </Col>    
          </Row>
          </CardFooter> 
        </Card>  
      </Col>
    </Row>       
</>      
  )

};
export default TableExperiencias;
