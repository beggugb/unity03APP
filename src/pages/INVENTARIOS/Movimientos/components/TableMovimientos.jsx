import React,{useEffect,  useState} from "react";
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

const TableMovimientos = ({getComponent}) => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   const {data,pagina,paginas,indicador }= useSelector(state => state.movimientos)
 
   const usuario = JSON.parse(localStorage.getItem('@userUnity'))
   const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
 

   const makeHttpRequestWithPage = (page, num) =>{
    dispatch(crudActions.GET_DATA('MOVIMIENTOS_DATA','movimientos',page, num,usuario.id,usuario.rolId))     
  }

  const changeSelect = (pky) => {        
    const {value, label} = pky
    setpag(value)
    makeHttpRequestWithPage(1,value)
  };

  useEffect(() => {
    makeHttpRequestWithPage(1,pag)
      return () => {
        dispatch({type:'MOVIMIENTOS_RESET_DATA'})
      };
  }, []);

  const setIndicador = (pky,est,monto,nroItems) => {            
    let iok = pky === indicador  ? 0 : pky
    dispatch({type:'MOVIMIENTOS_INDICADOR',value:iok,estado:est,indicadorTotal:monto,cantidad:nroItems})  
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
                  <th width="5%">Nº</th>
                  <th width="8%">Fecha</th>                  
                  <th width="20%">Motivo</th>
                  <th width="7%">Tipo</th>
                  <th width="15%">Origen</th>
                  <th width="15%">Destino</th>                  
                  <th width="10%">Cantidad</th>
                  <th width="10%">Total</th>
                  <th width="5%"></th>
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item, index) => (
                      <tr key={index}>                                            
                        <td >                       
                        <Input type="checkbox" 
                        onChange={() => { setIndicador(item.id, item.estado, item.totalGeneral, item.nroItems) }} 
                        checked={ item.id === indicador ? true : false}
                        /></td>
                        <td>{item.id}</td>
                        <td><Moment format="DD-MM-YYYY">{item.fecha}</Moment></td>
                        <td>{item.motivo}</td>
                        <td>{item.tipo}</td>                        
                        <td>{item.origen}</td>
                        <td>{item.destino}</td>
                        <td>{item.nroItems}</td>
                        <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.totalGeneral)}</td>                                   
                        <td className="text-center">
                          { item.estado === 'cerrado' ? 
                          <FontAwesomeIcon icon={faLock} className="text-verde"/>
                          :
                          <FontAwesomeIcon icon={faLockOpen} className="text-rojo"/>
                          }                        
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
export default TableMovimientos;
