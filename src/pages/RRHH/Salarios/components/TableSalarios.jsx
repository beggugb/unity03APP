import React,{useState, useEffect, useCallback} from "react";
import { ButtonGroup, Table, Row, Col, Button, Card, CardBody, CardFooter  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../../components/Pagination'

const TableSalarios = () => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   const {data,pagina,paginas}= useSelector(state => state.salarios)

   const makeHttpRequestWithPage = useCallback((page, num) =>{
    dispatch(crudActions.GET_DATA('SALARIOS_DATA','salarios',page, num,'nombre','asc'))      
    console.log('segui1')
  },[]) 

  const deleteItem = (pky) => {                
    dispatch(crudActions.GET_DELETE('SALARIOS_ADD','salarios',pky,'lista'))
  };
  const getItem = (pky) => {                
    dispatch(crudActions.GET_ITEM('SALARIOS_ITEM','salarios',pky))
  };

  useEffect(() => {
      makeHttpRequestWithPage(1,12)
      return () => {
        dispatch({type:'SALARIOS_RESET_DATA'})   
      };
  }, []);


  
  return(
    <>    
    <Row>
      <Col>
        <Card>
          <CardBody>    
        <Table className="table-simple">
          <thead>
              <tr>  
                  <th width="10%">Código</th>
                  <th width="55%">Nombre</th>
                  <th width="20%">Monto</th>                             
                  <th width="15%"></th>                
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}>                      
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.monto)}</td>
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
                
          </Row>
          </CardFooter> 
        </Card>  
      </Col>
    </Row>       
</>      
  )

};
export default TableSalarios;
