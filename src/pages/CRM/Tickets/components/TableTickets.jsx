import React,{useEffect, useState} from "react";
import { FormGroup, Label, Table, Row, Col, Card, CardBody, CardFooter, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'  
import { customStyles } from '../../../../helpers/customStyles'
import { crudActions } from '../../../../actions'
import Pagination from '../../../../components/Pagination'
import { defaultVal } from "../../../../helpers/funciones";
import { pages } from "../../../../helpers/dataLoad";
   

const TableTickets = ({getComponent}) => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   const {data,pagina,paginas, indicador}= useSelector(state => state.tickets)
   

   const makeHttpRequestWithPage = (page, num) =>{
    dispatch(crudActions.GET_DATA('TICKETS_DATA','tickets',page, num,'id','ASC'))      
  }

 

  const changeSelect = (pky) => {        
    const {value} = pky
    setpag(value)
    makeHttpRequestWithPage(1,value)
  };

  const setIndicador = (pky) => {            
    let iok = pky === indicador  ? 0 : pky
    dispatch({type:'TICKETS_INDICADOR',value:iok}) 
  };

  useEffect(() => {
      makeHttpRequestWithPage(1,pag)
      return () => {
        dispatch({type:'TICKETS_RESET_DATA'})
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
                      <th width="5%"></th>                      
                      <th width="15%">Fecha Registro</th>
                      <th width="15%">Cliente</th>
                      <th width="45%">Detalle</th>                                                   
                      <th width="10%">Estado</th>    
                      <th width="10%">Fecha Cierre</th>                                       
                  </tr>
              </thead>
              {data && (
              <tbody>
                  {data.map((item,index) => (
                      <tr key={index}>                           
                        <td >                       
                          <Input type="checkbox" 
                          onChange={() => { setIndicador(item.id) }} 
                          checked={ item.id === indicador ? true : false}
                          />                       
                        </td>                                        
                        <td>{item.fechaRegistro}</td>
                        <td>{item.clients}</td>
                        <td>{item.detalle}</td>
                        <td>{item.estado}</td>
                        <td>{item.fechaCierre}</td>
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
export default TableTickets;
