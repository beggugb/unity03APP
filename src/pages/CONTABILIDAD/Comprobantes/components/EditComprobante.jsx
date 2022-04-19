import React  from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Label, FormGroup, Input, Row, Col, Card, CardBody, Button } from "reactstrap"

import SearchsPuc from '../../Pucs/components/SearchsPuc'
import ListaComprobantes from "./ListaComprobantes";
import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { crudActions } from '../../../../actions'
import writtenNumber from 'written-number'


const EditComprobante = ({getComponent}) => {
  const dispatch = useDispatch() 
  const { item } = useSelector(state => state.comprobantes)  
  const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))


  const changeHandler = event => {        
    const { name, value } = event.target  
    dispatch(crudActions.SET_CHANGE('COMPROBANTES_CHANGE',name,value))  
}

  var d = new Date();
    return (      
      <>
      <Row>        
        <Col md="3" className="btnBack">  
          <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> LISTA CLIENTES
          </Button>              
        </Col>  
      </Row>      

      <Row>
        <Col className="mt-3 ml-2">
        <h6>Comprobante de {item.tipoComprobante} Nº {item.numComprobante}</h6>
        </Col>
      </Row>

      <Row>        
        <Col md="4">
          <Card className="card-cmd">       
          <FormGroup>
            <Row form>    
                <Col md={4}>                  
                  <Label for="fecha">Fecha : </Label>
                </Col>
                <Col md={8}>                  
                <Moment format="DD/MM/YYYY">{d}</Moment>  
                </Col>                
            </Row>
          </FormGroup>     
            
            <FormGroup>
              <Row form>    
                <Col md={4}>                  
                  <Label for="mTotal">Total</Label>
                </Col>
                <Col md={8}>                  
                  <Input type="number" name="montoTotal" id="montoTotal" 
                          value={item.montoTotal}                          
                          onChange={ (e) => changeHandler(e)} 
                          min="0.00"
                          step="0.001"
                          max="1.00"
                          presicion={2}                          
                          />
                  </Col>
              </Row>
            </FormGroup> 
            { item.tipoComprobante === 'Ingreso' || item.tipoComprobante === 'Egreso' ?    
              <> 
                <FormGroup>
                  <Row form>    
                    <Col md={4}>                  
                      <Label for="mTotal">{ item.tipo === 'Ingreso' ? 'Recibimos de': 'Pagamos a'} :</Label>
                    </Col>
                    <Col md={8}>                  
                      <Input type="text" name="label" id="label" 
                          value={item.label || ''}                          
                          onChange={ (e) => changeHandler(e)} />
                    </Col>
                  </Row>
                </FormGroup>  
                <FormGroup>
                  <Row form>    
                    <Col md={4}>                  
                      <Label for="mTotal">La suma de :</Label>
                    </Col>
                    <Col md={8}>                                                                    
                      <p className="letter">{writtenNumber(item.montoTotal, {lang: 'es'})}   { item.montoTotal.toString().split('.')[1]} / 100 
                      {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda}).format(0)}
                      </p>                                                 
                    </Col>
                  </Row>
                </FormGroup> 
                
                <FormGroup>
                    <Row form>    
                      <Col md={4}>                  
                        <Label for="mGlosa">Por concepto de :</Label>
                      </Col>
                      <Col md={8}>                  
                        <Input type="text" name="glosaComprobante" id="glosaComprobante" 
                          value={item.glosaComprobante || ''}                          
                          onChange={ (e) => changeHandler(e)} />
                      </Col>
                    </Row>
                  </FormGroup>   
                  <FormGroup>
                    <Row form>    
                      <Col md={4}>                  
                        <Label for="mCheque">N º de Cheque :</Label>
                      </Col>
                      <Col md={8}>                  
                        <Input type="text" name="nCheque" id="nCheque" 
                          value={item.nCheque || ''}                          
                          onChange={ (e) => changeHandler(e)} />
                      </Col>
                    </Row>
                  </FormGroup>  
                  <FormGroup>
                    <Row form>    
                      <Col md={4} className="text-right">                  
                        <Label for="mBanco">Banco :</Label>
                      </Col>
                      <Col md={8}>                  
                        <Input type="text" name="nBanco" id="nBanco" 
                          value={item.nBanco || ''}                          
                          onChange={ (e) => changeHandler(e)} />
                      </Col>
                    </Row>
                  </FormGroup> 
              </>:
               <FormGroup>
               <Row form>    
                 <Col md={2}>                  
                   <Label for="mTotal">Son :</Label>
                 </Col>
                 <Col md={9}>                                                                    
                   <p className="letter">{writtenNumber(item.montoTotal, {lang: 'es'})}   { item.montoTotal.toString().split('.')[1]} / 100 
                   {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda}).format(0)}</p>                          
                 </Col>
               </Row>
             </FormGroup> 
            }  
            
          </Card>
        </Col>
        <Col md="8">
          <Card> 
            <SearchsPuc/>
            <ListaComprobantes/>
          </Card>
        </Col>                  
      </Row>
      </>
    );
};
export default EditComprobante;
