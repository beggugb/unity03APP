import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Row,Col, Button, FormGroup, Input, Label,Card,CardBody,ListGroup, ListGroupItem  } from "reactstrap"
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowDown, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import {toastr} from 'react-redux-toastr'

const SearchsArticulos = ({getComponent}) => {
    const dispatch = useDispatch()   
    const { data  } = useSelector(state => state.articulos)  
    const { items, item  } = useSelector(state => state.compras)  
    const [open, setOpen] = useState(false); 
    const [name, setName] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [valor, setValor] = useState(0);
    const [articulo, setArticulo] = useState({});
  
    
    const changeHandler = event => {    
      const { value } = event.target                        
      setName(value)
    } 
    
    const search = () =>{ 
      if (!name) {      
        clearInput();
        return;
      } 
      else{
        setOpen(true)
        dispatch(crudActions.GET_SEARCH_ITEMS('ARTICULOS_DATA_ITEMS','tpv',name))   
      }
      
  
      /*if (name) {
        dispatch(crudActions.GET_SEARCH_ITEMS('ARTICULOS_DATA_ITEMS','tpv',searchTerm))   
      } 
      */
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
    const upValor = (e) => {
      const { value } = e.target 
      setValor(value)      
    } 

    const add = () =>{     
      if(cantidad > 0 && valor > 0 && articulo.id > 0){
        let ites = [...items]
      let cTotal = item.nroItems   
      let gTotal = item.totalGeneral      
      let sTotal = item.subTotal
      let gImp   = item.impuesto  
            
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
      let itemCompra = {
        cantidad     : cantidad,          
        articuloId   : articulo.id,
        codigo       : articulo.codigo,          
        nombre       : articulo.nombre,
        unidad       : articulo.unidad, 
        compraId     : item.id,
        valor        : valor,
        subTotal     : parseFloat(cantidad) * parseFloat(valor)       
      }  
      ites.push(itemCompra);   
        cTotal = parseFloat(cTotal) +parseFloat(cantidad);      
        gTotal = parseFloat(gTotal) +parseFloat(itemCompra.subTotal)                  
        gImp   = gTotal * parseFloat(item.iva / 100)
        sTotal = gTotal - parseFloat(gImp)                        
        dispatch({type:'COMPRAS_SET_ITEMS',values:ites, cantidad: cTotal, subTotal: sTotal, totalGeneral: gTotal,impuesto:gImp })
      }
      clearInput()
      }else{
        toastr.error('Error','Datos faltantes')  
      }      
    }

    const handleAsignar = (articulo) =>{     
      console.log(articulo)   
      setArticulo(articulo)  
      setName(articulo.nombre)    
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
                            onChange={(e) => upValor(e)} />
                        </FormGroup>
                      </Col>
                                      
                      <Col md={1}>
                        <Button className="btn btn-rd btn-danger mt-3"
                          onClick={() => add() }>
                         <FontAwesomeIcon icon={faPlus} />                          
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
                        <b>{item.codigo}</b> - {item.nombre}  
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
export default SearchsArticulos;
