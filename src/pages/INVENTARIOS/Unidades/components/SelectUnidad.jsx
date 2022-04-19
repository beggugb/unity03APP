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

const SelectUnidad = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.unidades)
    const { item } = useSelector(state => state.articulos)


    
    const changeHandler = event => {    
        let io = event ? event.value: 0    
        dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE','unidadId',io))        
    }     
    
    useEffect(() => {
        dispatch(crudActions.GET_LIST('UNIDADES_LISTA','unidades',0,0)) 
        return () => {
            
        };
    }, []);


    return (              
        <>
        <Select
            defaultValue={data[0]}
            name="unidadId"    
            id="unidadId"                    
            options={data}   
            styles={custom}
            onChange={ (e) => changeHandler(e) }                         
            value={defaultVal(data,item.unidadId)} 
        />    
        </>                                             
    );
};
export default SelectUnidad;
