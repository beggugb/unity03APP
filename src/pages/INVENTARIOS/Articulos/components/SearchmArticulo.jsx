import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Row,Col, Button, FormGroup, Input, Label,Card,CardBody,ListGroup, ListGroupItem  } from "reactstrap"
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import {toastr} from 'react-redux-toastr'

const SearchmArticulos = ({getComponent}) => {
    const dispatch = useDispatch()   
    const { data  } = useSelector(state => state.articulos)  
    const { items, item  } = useSelector(state => state.movimientos)  
    const almacenId = JSON.parse(localStorage.getItem('@userAlmacen'))  
    const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
    const [open, setOpen] = useState(false); 
    const [name, setName] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [valor, setValor] = useState(0);
    const [articulo, setArticulo] = useState({});
    const [message, setmessage] = useState('')

  
    
    const changeHandler = event => {    
      const { value } = event.target                        
      setName(value)
    } 
    
    const search = () =>{ 
      setOpen(true)  
      let iok ={      
      nombre    : name,
      almacenId : item.origenId
      }  
      dispatch(crudActions.GET_SEARCHS_ITEMS('ARTICULOS_DATA_ITEMS','tpv',iok))
    }  

    const clearInput = () => {
      setName('')
      setOpen(false)
      setCantidad(0)
      setValor(0)      
      /*setprevStock(0)*/
    } 
    
    const upCantidad = (e) => {
      const { value } = e.target 

      if(articulo.stock >= parseInt(value) && parseInt(value) > 0)
      {
        setCantidad(value)      
      }else{
        toastr.error('Stock', 'La cantidad es mayor al STOCK')
        setCantidad(0)      
      }            
    }
    const upValor = (e) => {
      const { value } = e.target 
      setValor(value)      
    } 

    const add = () =>{         
    
          let ites = [...items]
          let cTotal = item.nroItems   
          let gTotal = item.totalGeneral            
                      
          let repeat = false      
          ites.map((item, index) =>{                        
            if(item.articuloId === articulo.id)
            { 
              repeat = true;
            }
            return null
          }) 
        
          if(!repeat)
          {
          let itemMovimiento = {
            cantidad     : cantidad,          
            articuloId   : articulo.id,
            codigo       : articulo.codigo,          
            nombre       : articulo.nombre,
            unidad       : articulo.unidad, 
            movimientoId : item.id,
            valor        : articulo.costo,
            subTotal     : parseFloat(cantidad) * parseFloat(articulo.costo)       
          }  
          ites.push(itemMovimiento);   
            cTotal = parseFloat(cTotal) +parseFloat(cantidad);      
            gTotal = parseFloat(gTotal) +parseFloat(itemMovimiento.subTotal)                                  
            dispatch({type:'MOVIMIENTOS_SET_ITEMS',values:ites, cantidad: cTotal, subTotal: 0, totalGeneral: gTotal,impuesto:0 })
          }
          clearInput()
                

    }

    const handleAsignar = (articulo) =>{           
      setArticulo(articulo)        
      setName(articulo.nombre +' / Stock : '+  articulo.stock + '/ Costo'+ new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(articulo.costo))    
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
                          <Button 
                            className={item.origenId === 0 ? "btn-primary disabled btn-search mt-3":"btn-primary btn-search mt-3"  }
                            onClick={search}
                            >
                            <FontAwesomeIcon icon={faSearch} />
                          </Button>  
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>   
                        <Label for="eNombre">Cantidad </Label>                 
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
                            type="text" 
                            name="valor"                             
                            id="valor"    
                            value={new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(articulo.costo) || 0}                          
                            onChange={(e) => upValor(e)} 
                            readOnly={true}
                            />
                        </FormGroup>
                      </Col>
                                      
                      <Col md={1}>
                        <Button className={cantidad === 0 ? "btn-rdd btn-disabled mt-3":"btn-rdd btn-danger mt-3"}
                          onClick={() => add() }>
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
                        <b>{item.codigo}</b> - {item.nombre}/{item.marca} - (Stock: {item.stock}) - {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.costo)}                     
                        ) 
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
export default SearchmArticulos;
