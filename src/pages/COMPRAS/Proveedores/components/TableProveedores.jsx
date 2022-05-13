import React,{ useState, useEffect } from "react";
import { FormGroup, Label, Table, Row, Col, Card, CardBody, CardFooter, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import Pagination from '../../../../components/Pagination'
import { customStyles } from '../../../../helpers/customStyles'
import Select from 'react-select' 
import { defaultVal } from "../../../../helpers/funciones";
import { pages } from "../../../../helpers/dataLoad";

const TableProveedores = ({getComponent}) => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   const {data,pagina,paginas,indicador}= useSelector(state => state.proveedores)

   const makeHttpRequestWithPage = (page, num) =>{
    dispatch(crudActions.GET_DATA('PROVEEDORES_DATA','proveedores',page, num,'razonSocial','asc'))      
  }



  const changeSelect = (pky) => {        
    const {value}  = pky
    setpag(value)
    makeHttpRequestWithPage(1,value)
  };

  const setIndicador = (pky) => {            
    let iok = pky === indicador  ? 0 : pky
    dispatch({type:'PROVEEDORES_INDICADOR',value:iok}) 
  };

  useEffect(() => {
      makeHttpRequestWithPage(1,pag)
      return () => {      
      dispatch({type:'PROVEEDORES_RESET_DATA'})
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
                  <th width="15%">Codigo</th>
                  <th width="50%">Razon Social</th>
                  <th width="15%">Tipo Fiscal</th>
                  <th width="15%">Nit</th>                                       
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}> 
                        <td >                       
                          <Input type="checkbox" 
                          onChange={() => { setIndicador(item.id) }} 
                          checked={ item.id === indicador ? true : false}
                          />                       
                        </td>                      
                        <td>{item.codigo}</td>
                        <td>{item.razonSocial}</td>
                        <td>{item.tipoFiscal}</td>
                        <td>{item.nit}</td>   
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
export default TableProveedores;
