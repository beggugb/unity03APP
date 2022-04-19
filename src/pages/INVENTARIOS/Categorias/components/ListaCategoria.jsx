import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { ListGroup, ListGroupItem, Badge  } from "reactstrap";


const ListaCategoria = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.categorias)   
    const almacenId = JSON.parse(localStorage.getItem('@userAlmacen'))  

    const makeHttpRequestWithPage = () =>{
        dispatch(crudActions.GET_LIST('CATEGORIAS_LISTA','categorias','nombre','asc'))          
      }
    
    const changeHandler = (io) => {           
      let iok ={
        "almacenId": almacenId.id,
        "pagina":1,
        "num":20,
        "name":"",
        "codigo":"",
        "categoriaId":io,
        "stock":3
      } 
      dispatch(crudActions.GET_SEARCH('ARTICULOS_DATA','almacenes',iok))  
    }     
    
    useEffect(() => {
        makeHttpRequestWithPage()
        return () => {            
        };
    }, []);
    
    return (   
      <>
      <h6>Categorías</h6>           
      <ListGroup className="categoriasLst justify-content-between">
         <ListGroupItem 
         onClick={() => changeHandler(0)}
         className="categoriasItem justify-content-between">
            TODAS
          </ListGroupItem>
        {data.map((item, index) => (
          <ListGroupItem key={index} 
          onClick={() => changeHandler(item.value)}
          className="categoriasItem justify-content-between">
            {item.label}            
          </ListGroupItem>    
        ))}    
    </ListGroup>
    </>
    );
};
export default ListaCategoria;
