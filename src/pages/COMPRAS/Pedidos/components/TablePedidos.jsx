import React,{useEffect, useCallback, useState} from "react";
import { FormGroup, Label, Table, Row, Col, Card, CardBody, CardFooter, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../../components/Pagination'
import Select from 'react-select'  
import Moment from 'react-moment'
import { customStyles } from '../../../../helpers/customStyles'
import { defaultVal } from "../../../../helpers/funciones";
import { pages } from "../../../../helpers/dataLoad";

const TableCompras = ({getComponent}) => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   const {data,pagina,paginas,indicador }= useSelector(state => state.compras)
   const usuario = JSON.parse(localStorage.getItem('@userUnity'))
   const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))


   const makeHttpRequestWithPage = (page, num) =>{
    dispatch(crudActions.GET_DATA('COMPRAS_DATA','pedidos',page, num,usuario.id,usuario.rolId))  
    }
  const changeSelect = (pky) => {        
    const {value, label} = pky
    setpag(value)
    makeHttpRequestWithPage(1,value)
  };

  useEffect(() => {
    makeHttpRequestWithPage(1,pag)
      return () => {
        dispatch({type:'COMPRAS_RESET_DATA'})
      };
  }, []);

  const setIndicador = (pky,est,monto) => {            
    let iok = pky === indicador  ? 0 : pky
    dispatch({type:'COMPRAS_INDICADOR',value:iok,estado:est,indicadorTotal:parseFloat(monto)}) 
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
                  <th width="10%">Código</th>
                  <th width="10%">Fecha</th>
                  <th width="30%">Glosa</th>                  
                  <th width="10%">Cantidad</th>
                  <th width="10%">Total</th>
                  <th width="5%">Estado</th>
                  <th width="5%">Tipo</th>
                  <th width="15%">Proveedores</th>                               
                  
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item, index) => (
                      <tr key={index}>                                            
                        <td >                       
                        <Input type="checkbox" 
                        onChange={() => { setIndicador(item.id, item.estado, item.totalGeneral) }} 
                        checked={ item.id === indicador ? true : false}
                        /></td>
                        <td>{item.id}</td>
                        <td><Moment format="DD-MM-YYYY">{item.fechaCompra}</Moment></td>                        
                        <td>{item.observaciones}</td>
                        <td>{item.nroItems}</td>
                        <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.totalGeneral)}</td>
                        <td className="text-center">
                          { item.estado === 'cerrado' ? 
                          <FontAwesomeIcon icon={faLock} className="text-verde"/>
                          :
                          <FontAwesomeIcon icon={faLockOpen} className="text-rojo"/>
                          }                        
                        </td>
                        <td>{item.tipo}</td>  
                        <td>{item.proveedor}</td>                                                                                 
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
export default TableCompras;
