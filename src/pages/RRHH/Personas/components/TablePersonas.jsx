import React,{useEffect, useState} from "react";
import { FormGroup, Label, Table, Row, Col, Card, CardBody, CardFooter, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'  
import { customStyles } from '../../../../helpers/customStyles'
import { crudActions } from '../../../../actions'
import Pagination from '../../../../components/Pagination'

const page =[{"value":15,"label":"15"},
             {"value":30,"label":"30"},
             {"value":50,"label":"50"}             
            ];

            const defaultVal = (options, valor) =>{
              return options.filter(item =>
                  item.value === valor
                )
            
            }            

const TablePersonas = ({getComponent}) => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   const {data,pagina,paginas, indicador}= useSelector(state => state.personas)
   

   const makeHttpRequestWithPage = (page, num) =>{
    dispatch(crudActions.GET_DATA('PERSONAS_DATA','personas',page, num,'nombres','ASC'))      
  }

 

  const changeSelect = (pky) => {        
    const {value} = pky
    setpag(value)
    makeHttpRequestWithPage(1,value)
  };

  const setIndicador = (pky) => {            
    let iok = pky === indicador  ? 0 : pky
    dispatch({type:'PERSONAS_INDICADOR',value:iok}) 
  };

  useEffect(() => {
      makeHttpRequestWithPage(1,pag)
      return () => {
        dispatch({type:'PERSONAS_RESET_DATA'})
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
                      <th width="25%">Nombres</th>
                      <th width="25%">A.Paterno</th>
                      <th width="25%">A.Materno</th>
                      <th width="10%">Teléfono</th>
                      <th width="10%">Celular</th>
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
                        <td>{item.nombres}</td>
                        <td>{item.paterno}</td>
                        <td>{item.materno}</td>
                        <td>{item.telefono}</td>
                        <td>{item.celular}</td>
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
export default TablePersonas;
