import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row,Col,FormGroup, Input, Label,Card,CardBody,ListGroup, ListGroupItem  } from "reactstrap"
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";

const SearchArticuloProspecto = ({getComponent}) => {
    const dispatch = useDispatch()   
    const { data  } = useSelector(state => state.articulos)   
    const almacenId = JSON.parse(localStorage.getItem('@userAlmacen'))  
    const [open, setOpen] = useState(false); 
    const [name, setName] = useState('');
    
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

    const handleAsignar = (articulo) =>{                   
      dispatch({type:'ARTICULOS_SINGLE_ITEM',response:articulo}) 
      clearInput()
    }

    const clearInput = () => {
      setName('')
      setOpen(false)      
    }


    return (   
      <>           
      <Row form>                      
        <Col md={11}>
        <FormGroup>   
          <Label for="eNombre">Producto</Label>                 
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
      </Row>                  
      
      { open ?              
        <Card className="resultArt">           
          <CardBody>
            {data &&
              <ListGroup>
                {data.map(item =>(
                <ListGroupItem key={item.id} onClick={() => handleAsignar(item) }>
                  <b>{item.codigo}</b> - {item.nombre})  
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
export default SearchArticuloProspecto;
