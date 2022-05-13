import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Row,Col,Button, FormGroup, Input, Label,Card,CardBody,ListGroup, ListGroupItem } from "reactstrap"
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";

const SearchcArticulos = ({getComponent}) => {
    const dispatch = useDispatch()   
    const { data  } = useSelector(state => state.articulos)  
    const { items, item } = useSelector(state => state.cotizaciones)  
    const almacenId = JSON.parse(localStorage.getItem('@userAlmacen'))  
 
    const [open, setOpen] = useState(false); 
    const [name, setName] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [valor, setValor] = useState(0.00);
    const [articulo, setArticulo] = useState({});
    
    const changeHandler = event => {    
      const { value } = event.target  
      setName(value)
    } 
    const search = () =>{    
      setOpen(true)  
      let iok ={      
      nombre    : name,
      almacenId : almacenId.id      
      }  
      dispatch(crudActions.GET_SEARCHS_ITEMS('ARTICULOS_DATA_ITEMS','tpv',iok))
    }  

    const clearInput = () => {
      setName('')
      setOpen(false)
      setCantidad(0)
      setValor(0)
    } 
    
    const upCantidad = (e) => {
      const { value } = e.target 
      setCantidad(value)      
    }
    const upValor = (value, name) => {            
      setValor(value)      
    } 

    const add = () =>{  
      let ites       = [...items]
      let cTotal     = item.nroItems     
      let gTotal     = item.totalGeneral      
      let sTotal     = item.subTotal
      let gImp       = item.impuesto
      let tDescuento = item.totalGeneral      
      let repeat     = false      
      ites.map((itt, index) =>{                        
        if(itt.articuloId === articulo.articuloId)
        { 
          repeat = true;
        }
        return null
      }) 
      if(!repeat)
      {
      let itemCotizacion = {
        cantidad     : cantidad,          
        articuloId   : articulo.articuloId,
        codigo       : articulo.codigo, 
        unidad       : articulo.unidad, 
        marca        : articulo.marca,
        valor        : parseFloat(valor),
        subTotal     : parseInt(cantidad) * parseFloat(valor),        
        nombre       : articulo.nombre,    
        cotizacionId : item.id    
      }  
      ites.push(itemCotizacion);   

      cTotal = parseInt(cTotal) + parseInt(cantidad);    
      gTotal = parseFloat(gTotal) + parseFloat(itemCotizacion.subTotal)              
      gImp   = parseFloat(gTotal) * parseFloat(item.iva / 100)
      
      sTotal = (gTotal - item.descuento) - parseFloat(gImp)      
      tDescuento = item.descuento ? parseFloat(gTotal) - parseFloat(item.descuento)  : 0
      dispatch({type:'COTIZACIONES_SET_ITEMS',values:ites, cantidad: cTotal, subTotal: sTotal, totalGeneral: gTotal,impuesto:gImp,totalDescuento : tDescuento })
      }
        clearInput()

    }

    const handleAsignar = (articulo) =>{        
      setArticulo(articulo)  
      setName(articulo.nombre)    
      setValor(articulo.precioVenta)    
      setOpen(false)
    }

    return (   
      <>           
        <Row form>                      
                    <Col md={6}>
                        <FormGroup>   
                        <Label for="eNombre">Nombres</Label>                 
                          <Input 
                            type="text" 
                            name="name"                             
                            id="name"  
                            value={name || ''}  
                            onChange={changeHandler} />
                            {
                              name ? 
                              <Button className="volatil" onClick={(e) => {clearInput()}}>
                                <FontAwesomeIcon icon={faTimes}   />
                              </Button>
                              : null
                            } 
                        </FormGroup>
                      </Col>
                      <Col md={1}>
                        <FormGroup>   
                          <Button className="btn-primary btn-search mt-3"
                          onClick={search}>
                            <FontAwesomeIcon icon={faSearch} />
                          </Button>  
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>   
                        <Label for="eNombre">Cantidad</Label>                 
                          <Input 
                            type="number" 
                            name="cantidad"                             
                            id="cantidad"    
                            value={cantidad}                          
                            onChange={(e) => upCantidad(e)} />
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>   
                        <Label for="eValor">Valor</Label>                 
                          <Input 
                            type="number" 
                            name="valor"                             
                            id="valor"    
                            value={valor}                          
                            onChange={(e) => upValor(e)} 
                            readOnly={true}
                          />
                        </FormGroup>
                      </Col>
                                      
                      <Col md={1}>
                        <Button className={cantidad === 0 ? "btn-rd btn-disabled mt-3":"btn-rd btn-danger mt-3"}
                          onClick={() => add() }
                        >
                         <FontAwesomeIcon icon={faArrowDown} />                          
                         </Button>
                      </Col>
                    </Row>                  
                    
           
              
              { open ?              
                <Card className="resultArt">           
                  <CardBody>
                    {data &&
                    <ListGroup>
                      {data.map(item =>(
                        <ListGroupItem
                          key={item.id}
                          onClick={() => handleAsignar(item) }
                        >
                        <b>{item.codigo}</b> - {item.nombre}/{item.marca} - (Stock: {item.stock})  
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                    }
                  </CardBody>  
                </Card>           
              : null}                

        </>                    
                         
    );
};
export default SearchcArticulos;
