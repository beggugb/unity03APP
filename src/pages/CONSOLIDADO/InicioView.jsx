import React,{useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { crudActions } from '../../actions'
import { Form, Label, FormGroup, Row, Col, Button, Card, CardBody, Input  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import SubMenu from '../../components/subConsolidado.jsx';
import { ConsolidadoRouter } from '../../routes'
import Inicio  from './Inicio';
import ItemArticulo from '../INVENTARIOS/Articulos/components/ItemArticulo'
import SelectAlmacen from "../INVENTARIOS/Almacenes/components/SelectAlmacen";
import SelectCategorias from "../INVENTARIOS/Categorias/components/SelectCategorias"
import Select from 'react-select'
import { customi} from '../../helpers/customStyles'

const stocks =  [{"value":"2","label":"--Todas--"},{"value":"1","label":"Con Stock"},{"value":"0","label":"Sin Stock"}];
const rangos =  [{"value":"mayor","label":"Mayor/Igual a"},{"value":"menor","label":"Menor/Igual a"}];

  const defaultVal = (options, valor) =>{
            return options.filter(item =>
                   item.value === valor
                )}
                
const ExistenciasView = () => {
  const dispatch = useDispatch() 
  const { articuloId, almacenId, categoriaId  } = useSelector(state => state.informes)   
  const [stock, setstock] = useState('3');  
  const [rango, setRango] = useState("mayor");
  const [vrango, setVrango] = useState(0);
  
  const submitHandle = event => {       
    event.preventDefault()       
    const item = {            
      almacenId   : almacenId,
      articuloId  : articuloId, 
      categoriaId : categoriaId,
      value       : parseInt(stock),
      rango       : rango,
      vrango      : vrango
    }
    dispatch(crudActions.GET_INFORMES('INFORMES_EXISTENCIAS','existencias',item))      
    
  }  


  
  useEffect(() => {
    return () => {
      console.log('descarga cliente')
    };
  }, []);

  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
      <SubMenu items={ConsolidadoRouter} prop='Existencias'/>  
        <Row>
        <Col md="3">
          <Card>        
              <CardBody>
              <Form onSubmit={ submitHandle}>
                <Row form>
                 <Col>INFORME DE EXISTENCIAS</Col>
                </Row>
                <Row form>
                  <Col md="12">
                  <FormGroup >
                    <Label>Almacen: </Label>              
                    <SelectAlmacen/>
                  </FormGroup> 
                  </Col>                              
                </Row>
                <Row form>                             
                  <Col md="12">
                  <FormGroup >
                    <Label>Categoría: </Label>              
                    <SelectCategorias/>
                  </FormGroup>  
                  </Col>
                </Row>
                <Row form>
                  <Col md="12"> 
                    <FormGroup>   
                      <Label for="eHasta">Artículo : </Label>                 
                      <ItemArticulo/>
                    </FormGroup>
                  </Col> 
                </Row>  
                <Row>
                  <Col md="12"> 
                  <FormGroup>   
                  <Label for="eHasta">Stock: </Label>                 
                      <Select         
                          defaultValue={stock[0]}
                          name="stock"    
                          id="stock"                    
                          options={stocks}                                                    
                          value={defaultVal(stocks,stock)} 
                          onChange={ (e)=> { setstock(e.value)}} 
                          styles={customi}                   
                          />
                  </FormGroup>
                  </Col>                                                                                 
                </Row>

                <Row form>                  
                  <Col md="12"> 
                  <FormGroup>   
                  <Label for="eRango">Rango de Monto: </Label>                 
                    <Select         
                          defaultValue={rango[0]}
                          name="rango"    
                          id="rango"                    
                          options={rangos}                                                    
                          value={defaultVal(rangos,rango)} 
                          onChange={ (e)=> { setRango(e.value)}} 
                          styles={customi}                   
                          />
                  </FormGroup>
                  </Col>                                                                                                                                     
                </Row>
                <Row form>                                    
                  <Col md="12"> 
                  <FormGroup>
                  <Label for="eRango">Monto: </Label> 
                    <Input 
                      type="number" 
                      name="vrango" 
                      id="vrango" 
                      value={vrango}                          
                      onChange={ (e) => setVrango(e.target.value)} />
                  </FormGroup>    
                  </Col>                                                                                                                     
                </Row>
              
                <Row form>                  
                  <Col md="5">
                  <FormGroup> 
                  <Button 
                      type="submit"
                      className="btn-md btn-info mt-4">
                      <FontAwesomeIcon icon={faSave} />  
                      {' '} Generar
                  </Button>
                  </FormGroup> 
                  </Col>                                                                   
                </Row>
               </Form>   
              </CardBody>                        
            </Card> 
        </Col>    
        <Col md="9">
          <Inicio
            rango={rango}
            vrango={vrango}
            stock={stock}
          />
        </Col>
      </Row> 
      </div>    
    </div>   
    </>
  )

};
export default ExistenciasView;
