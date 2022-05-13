import React,{useEffect, useState, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { custom } from '../../../../helpers/customStyles'
import { defaultVal } from "../../../../helpers/funciones";
import { Col, FormGroup, Label  } from "reactstrap"
import Select from "react-select";
import { subcategorias } from "../../../../helpers/dataLoad";

const SelectCategoria = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.categorias)
    const { item } = useSelector(state => state.articulos)
    const [cats, setcats] = useState([])

 

    const changeHandler = event => {    
      let io = event ? event.value: 0    
      dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE','categoriaId',io)) 
      let datc = subcategorias.filter(d => (d.indice === io) )  
      setcats(datc)       
    }     
    const changesHandler = (event,name) => {                       
        const { value } = event ? event : ''              
        dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE',name,value))          
    }

  
         
    
    useEffect(() => {
        dispatch(crudActions.GET_LIST('CATEGORIAS_LISTA','categorias','nombre','asc')) 
        return () => {
            dispatch({type:'CATEGORIAS_RESET_DATA'})  
        };
    }, []);


    return (              
        <>
        <Col md={2}>
          <FormGroup>
            <Label for="eId">Categoría</Label>
            <Select
            defaultValue={data[0]}
            name="categoriaId"    
            id="categoriaId"                    
            options={data}              
            styles={custom}
            onChange={ (e) => changeHandler(e) }                         
            value={defaultVal(data,item.categoriaId)} 
            />
          </FormGroup>
        </Col> 
        <Col md={3}>
          <FormGroup>
            <Label for="esubs">Sub-Categoría</Label>
            <Select                                                               
                defaultValue={cats[0]}
                styles={custom} 
                name="subcategoria"    
                id="subcategoria"                    
                options={cats}                                                 
                value={defaultVal(cats,item.subcategoria)}     
                onChange={ (e) => changesHandler(e,'subcategoria')}/>
          </FormGroup>
        </Col>        
        </>                                             
    );
};
export default SelectCategoria;
