import React,{useEffect, useCallback, useState} from "react";
import { CardBody, CardFooter,  Table, Row, Col, Input, FormGroup, Label, Card  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import Pagination from '../../../../components/Pagination'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'  
import Moment from 'react-moment'
import { customStyles } from '../../../../helpers/customStyles'
import { defaultVal } from "../../../../helpers/funciones";
import { pages } from "../../../../helpers/dataLoad";


const TableVentas = ({getComponent}) => {
  const dispatch = useDispatch() 
  const [pag, setpag] = useState(15);
  const {data,pagina,paginas,indicador }= useSelector(state => state.ventas)
  const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
 
  const makeHttpRequestWithPage = (page, num) =>{
   dispatch(crudActions.GET_DATA('VENTAS_DATA','ventas',page, num,'id','desc'))     
  }

 const changeSelect = (pky) => {        
   const {value} = pky
   setpag(value)
   makeHttpRequestWithPage(1,value)
 };

 useEffect(() => {
    makeHttpRequestWithPage(1,pag)
     return () => {
      dispatch({type:'VENTAS_RESET_DATA'})
     };
 }, []);

 const setIndicador = (pky,est,monto) => {            
   let iok = pky === indicador  ? 0 : pky
   dispatch({type:'VENTAS_INDICADOR',value:iok,estado:est,indicadorTotal:monto}) 
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
                <th width="5%">Código</th>
                <th width="10%">Origen</th>
                <th width="10%">Fecha</th>
                <th width="35%">Glosa</th>                  
                <th width="10%">Total</th>
                <th width="5%">Estado</th>
                <th width="20%">Cliente</th>                       
                
            </tr>
        </thead>
        {data && (
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>                      
                      <td>                       
                      <Input type="checkbox" 
                      onChange={() => { setIndicador(item.id, item.estado, item.totalGeneral) }} 
                      checked={ item.id === indicador ? true : false}
                      /></td>
                      <td>{item.id}</td>
                      <td>{item.origen}</td>
                      <td><Moment format="DD-MM-YYYY">{item.fechaVenta}</Moment></td>                        
                      <td>{item.observaciones}</td>
                      <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.totalGeneral)}</td>
                      <td className="text-center">
                          { item.estado === 'cerrado' ? 
                          <FontAwesomeIcon icon={faLock} className="text-verde"/>
                          :
                          <FontAwesomeIcon icon={faLockOpen} className="text-rojo"/>
                          }                        
                        </td>
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
export default TableVentas;
