import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { customi } from '../../../../helpers/customStyles'
import { FormGroup, Label  } from "reactstrap"
import Select from "react-select";
import { defaultVal } from "../../../../helpers/funciones";

const SelectAlmacenes = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.almacenes)    
    const { item } = useSelector(state => state.users)

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.GET_LIST('ALMACENES_LISTA','almacenes','nombre','asc'))   
      },[])
    
    const changeHandler = event => {    
        let io = event ? event.value: 0       
        let lb = event ? event.label: '--Todas--'                 
        /*dispatch({type:'INFORME_SET_ALMACEN_ID',almacenId:io,labelAlmacen: lb})*/
        dispatch(crudActions.SET_CHANGE('USUARIOS_CHANGE','almacenId',io    ))  
    }    
    /*
    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('USUARIOS_CHANGE',name,value))  
    }*/
    
    useEffect(() => {
        makeHttpRequestWithPage()
        return () => {
            
        };
    }, []);


    return ( 
        <FormGroup>             
        <Label for="enombreCorto">Sucursal</Label>      
        <Select
            defaultValue={data[0]}
            name="almacenId"    
            id="almacenId"                    
            options={data}      
            value={defaultVal(data,item.almacenId)} 
            onChange={ (e) => changeHandler(e) }                                  
            styles={customi} 
        />  
        </FormGroup>  
                                                 
    );
};
export default SelectAlmacenes;

