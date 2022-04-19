import React,{useEffect, useCallback, useState} from "react";
import { CardBody, CardFooter,  Table, Row, Col, Input, FormGroup, Label, Card  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import Pagination from '../../../../components/Pagination'
import Select from 'react-select'  
import Moment from 'react-moment'
import { customStyles } from '../../../../helpers/customStyles'
import { defaultVal } from "../../../../helpers/funciones";
import { pages } from "../../../../helpers/dataLoad";



const TableProspectos = ({getComponent}) => {
  const dispatch = useDispatch() 
  const [pag, setpag] = useState(15);
  const {data,pagina,paginas,indicador }= useSelector(state => state.prospectos)
 
  const makeHttpRequestWithPage = useCallback((page, num) =>{
   dispatch(crudActions.GET_DATA('PROSPECTOS_DATA','prospectos',page, num,'id','desc'))  
   console.log('segui1')
 },[]) 

 const changeSelect = (pky) => {        
   const {value} = pky
   setpag(value)
   makeHttpRequestWithPage(1,value)
 };

 useEffect(() => {
  makeHttpRequestWithPage(1,pag)
     return () => {
     /*    cleanup*/
     console.log('clean table inventario')
     };
 }, []);

 const setIndicador = (pky,est,monto) => {            
   let iok = pky === indicador  ? 0 : pky
   dispatch({type:'PROSPECTOS_INDICADOR',value:iok,estado:est,indicadorTotal:monto}) 
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

                <th width="5%"></th>
                <th width="5%">Id</th>
                <th width="10%">Fecha</th>
                <th width="50%">Nombre</th>                  
                <th width="10%">Tipo</th>
                <th width="10%">Vencimiento</th>
                <th width="10%">Estado</th>                                
                
            </tr>
        </thead>
        {data && (
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} >                      
                      <td >                       
                      <Input type="checkbox" 
                      onChange={() => { setIndicador(item.id, item.estado, item.total) }} 
                      checked={ item.id === indicador ? true : false}
                      /></td>
                      <td>{item.id}</td>
                      <td><Moment format="DD-MM-YYYY">{item.fecha}</Moment></td>                        
                      <td>{item.nombre}</td>
                      <td>{item.tipo}</td>
                      <td>{item.vencimiento }</td>
                      <td>{item.estado ? "aprobado":"transcripción"}</td>                      
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
export default TableProspectos;
