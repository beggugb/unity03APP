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



const TableCotizaciones = ({getComponent}) => {
  const dispatch = useDispatch() 
  const [pag, setpag] = useState(15);
  const {data,pagina,paginas,indicador }= useSelector(state => state.cotizaciones)
  const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
  const makeHttpRequestWithPage = (page, num) =>{
   dispatch(crudActions.GET_DATA('COTIZACIONES_DATA','cotizaciones',page, num,'id','desc'))   
  }

 const changeSelect = (pky) => {        
   const {value} = pky
   setpag(value)
   makeHttpRequestWithPage(1,value)
 };

 useEffect(() => {
  makeHttpRequestWithPage(1,pag)
     return () => {
      dispatch({type:'COTIZACIONES_RESET_DATA'})   
     };
 }, []);

 const setIndicador = (itt) => {          
  /*.id, item.estado, item.total  */
   let iok = itt.id === indicador  ? 0 : itt.id
   dispatch({type:'COTIZACIONES_INDICADOR',value:iok,estado:itt.estado,indicadorTotal:itt.total,cliente:itt.cliente,email:itt.email}) 
   /*console.log(itt)*/
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
                <th width="40%">Glosa</th>                  
                <th width="10%">Total</th>
                <th width="10%">Estado</th>
                <th width="20%">Cliente</th>                                
                
            </tr>
        </thead>
        {data && (
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} >                      
                      <td >                       
                      <Input type="checkbox" 
                      onChange={() => { setIndicador(item) }} 
                      checked={ item.id === indicador ? true : false}
                      /></td>
                      <td>{item.id}</td>
                      <td><Moment format="DD-MM-YYYY">{item.fechaVenta}</Moment></td>                        
                      <td>{item.observaciones}</td>
                      <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.totalGeneral)}</td>
                      <td>{item.estado }</td>
                      <td>{item.cliente}</td>                      
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
export default TableCotizaciones;
