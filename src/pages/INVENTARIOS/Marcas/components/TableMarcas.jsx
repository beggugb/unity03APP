import React,{ useState, useEffect } from "react";
import { ButtonGroup, FormGroup, Label, Table, Row, Col, Button, Card, CardBody, CardFooter  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../../components/Pagination'
import { customStyles } from '../../../../helpers/customStyles'
import Select from 'react-select' 
import { defaultVal } from "../../../../helpers/funciones";
import { pages } from "../../../../helpers/dataLoad";
  


const TableMarcas = () => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   const {data,pagina,paginas}= useSelector(state => state.marcas)

   const makeHttpRequestWithPage = (page, num) =>{
    dispatch(crudActions.GET_DATA('MARCAS_DATA','marcas',page, num,'nombre','asc'))          
    }

  const deleteItem = (pky) => {                
    dispatch(crudActions.GET_DELETE('MARCAS_ADD','marcas',pky,'lista'))
  };
  const getItem = (pky) => {                
    dispatch(crudActions.GET_ITEM('MARCAS_ITEM','marcas',pky))
  };

  useEffect(() => {
      makeHttpRequestWithPage(1,pag)
      return () => {
        dispatch({type:'MARCAS_RESET_DATA'})   
      };
  }, []);

  const changeSelect = (pky) => {        
    const {value } = pky
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
                  <th width="10%">Código</th>
                  <th width="55%">Nombre</th>
                  <th width="20%">Abreviación</th>                             
                  <th width="15%"></th>                
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}>                      
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.abreviacion}</td>
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
                        defaultValue={pages[0]}
                        name="pag"    
                        id="pag"                    
                        options={pages}      
                        isClearable={false}                          
                        value={defaultVal(pages,pag)}    
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
export default TableMarcas;
