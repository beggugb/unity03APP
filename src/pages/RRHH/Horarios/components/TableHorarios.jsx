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


const TableHorarios = () => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   const {data,pagina,paginas}= useSelector(state => state.horarios)

   const makeHttpRequestWithPage = useCallback((page, num) =>{
    dispatch(crudActions.GET_DATA('HORARIOS_DATA','horarios',page, num,'nombre','asc'))      
    console.log('segui1')
  },[]) 

  const deleteItem = (pky) => {                
    dispatch(crudActions.GET_DELETE('HORARIOS_ADD','horarios',pky,'lista'))
  };
  const getItem = (pky) => {                
    dispatch(crudActions.GET_ITEM('HORARIOS_ITEM','horarios',pky))
  };

  useEffect(() => {
      makeHttpRequestWithPage(1,12)
      return () => {
        dispatch({type:'HORARIOS_RESET_DATA'})   
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
                  <th width="5%">Código</th>
                  <th width="25%">Nombre</th>
                  <th width="15%">Ingreso-I</th>
                  <th width="15%">Salida-I</th>
                  <th width="15%">Ingreso-T</th>
                  <th width="15%">Salida-T</th>                  
                  <th width="10%"></th>
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}>                      
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.d1}</td>
                        <td>{item.d2}</td>
                        <td>{item.d3}</td>
                        <td>{item.d4}</td>
                        <td>
                        <ButtonGroup>
                          <Button className="btn-tb bg-default text-white"
                            onClick={() => { getItem(item.id)}}>
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button className="btn-tb bg-defaults text-white"
                            onClick={() => { deleteItem(item.id)}}>
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
export default TableHorarios;
