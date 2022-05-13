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

const SelectUsuarios = () => {
    const dispatch = useDispatch()    
    const { data ,item } = useSelector(state => state.users)
    
    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.GET_LIST('USUARIOS_LISTA','usuarios',0,0))          
      },[])
    
    const changeHandler = (event) => {                            
        if(event)
        {
          const {label, value } = event  
          dispatch(crudActions.SET_CHANGE('USUARIOS_CHANGE','id',value))
          dispatch(crudActions.SET_CHANGE('USUARIOS_CHANGE','nombres',label))      
        }else{
          dispatch(crudActions.SET_CHANGE('USUARIOS_CHANGE','id',0))
          dispatch(crudActions.SET_CHANGE('USUARIOS_CHANGE','nombres',''))      
        }
        
        
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
            value={defaultVal(data,item.id)} 
        />    
        </>                                             
    );
};
export default SelectUsuarios;
