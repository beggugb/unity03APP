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

const TableVentasCliente = ({getComponent}) => {
  const dispatch = useDispatch() 
  const [pag, setpag] = useState(12);
  const {data,pagina,paginas}= useSelector(state => state.ventaitems)
  const { item }= useSelector(state => state.clientes)
  const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
  const makeHttpRequestWithPage = (page, num) =>{
   dispatch(crudActions.GET_DATA('VENTAS_ITEM_DATA','ventaitems',page, num,item.id,'desc'))     
  }

 const changeSelect = (pky) => {        
   const {value} = pky
   setpag(value)
   makeHttpRequestWithPage(1,value)
 };

 useEffect(() => {     
     return () => {          
     dispatch({type:'VENTAS_ITEM_RESET'}) 
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
                <th width="10%">Id</th>
                <th width="10%">Fecha</th>
                <th width="50%">Glosa</th>                  
                <th width="20%">Total</th>
                <th width="10%">Estado</th>
            </tr>
        </thead>
        {data && (
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>                                            
                      <td>{item.id}</td>
                      <td><Moment format="DD-MM-YYYY">{item.fechaVenta}</Moment></td>                        
                      <td>{item.observaciones}</td>
                      <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.total)}</td>
                      <td>{item.estado }</td>                      
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
export default TableVentasCliente;
