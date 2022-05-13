import React,{useState, useEffect } from "react";
import { ButtonGroup, Table, Row, Col, Button, Card, CardBody, CardFooter  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../../components/Pagination'

const TableUsuarios = () => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   const {data,pagina,paginas}= useSelector(state => state.users)

   const makeHttpRequestWithPage = (page, num) =>{
    dispatch(crudActions.GET_DATA('USUARIOS_DATA','usuarios',page, num,'nombres','asc'))          
   } 


  const getItem = (pky) => {                
    dispatch(crudActions.GET_ITEM('USUARIOS_ITEM','usuarios',pky))
  };

  useEffect(() => {
      makeHttpRequestWithPage(1,12)
      return () => {
        dispatch({type:'USUARIOS_RESET_DATA'})   
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
                  <th width="5%">#</th>
                  <th width="35%">Nombres</th>
                  <th width="10%">Estado</th>
                  <th width="25%">Sucursal</th>
                  <th width="10%">Rol</th>                             
                  <th width="5%"></th>                
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}>                                              
                        <td>{item.id}</td>
                        <td>{item.nombres}</td>
                        <td>{item.estado ? "habilitado": "no habilitado"}</td>
                        <td>{item.almacen.nombre || ''}</td>
                        <td>{item.rol.nombre || ''}</td>
                        <td>
                        <ButtonGroup>
                          <Button className="btn-tb bg-defaults text-white"
                            onClick={() => { getItem(item.id)}}>
                            <FontAwesomeIcon icon={faEdit} />
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
            <Col md={10} >
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
export default TableUsuarios;
