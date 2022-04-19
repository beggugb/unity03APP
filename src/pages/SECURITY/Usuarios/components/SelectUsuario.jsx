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

const SelectUsuario = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.users)
    const { item } = useSelector(state => state.articulos)

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.GET_LIST('USUARIOS_LISTA','usuarios',0,0))          
      },[])
    
    const changeHandler = event => {    
        let io = event ? event.value: 0    
        dispatch(crudActions.SET_CHANGE('ARTICULOS_CHANGE','usuarioId',io))        
    }     
    
    useEffect(() => {
       makeHttpRequestWithPage()
        return () => {
            
        };
    }, []);


    return (              
        <>
        <Select
            defaultValue={data[0]}
            name="usuarioId"    
            id="usuarioId"                    
            options={data}      
            isClearable={true} 
            styles={custom}
            onChange={ (e) => changeHandler(e) }                         
            value={defaultVal(data,item.usuarioId)} 
        />    
        </>                                             
    );
};
export default SelectUsuario;
