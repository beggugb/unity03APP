import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { custom } from '../../../../helpers/customStyles'
import Select from "react-select";

const defaultVal = (options, valor) =>{
    return options.filter(item =>
        item.value === valor
      )
  
  }

const SelectSubCategoria = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.categorias)
    const { item } = useSelector(state => state.articulos)
   

 

    const changeHandler = event => {    
      let io = event ? event.value: 0    
      dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE','categoriaId',io))        
  }     
  
         
    
    useEffect(() => {
        dispatch(crudActions.GET_LIST('CATEGORIAS_LISTA','categorias','nombre','asc')) 
        return () => {
            dispatch({type:'CATEGORIAS_RESET_DATA'})  
        };
    }, []);


    return (              
        <>
        <Select
            defaultValue={data[0]}
            name="categoriaId"    
            id="categoriaId"                    
            options={data}              
            styles={custom}
            onChange={ (e) => changeHandler(e) }                         
            value={defaultVal(data,item.categoriaId)} 
        /> 
        </>                                             
    );
};
export default SelectSubCategoria;
