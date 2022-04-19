import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { custom } from '../../../../helpers/customStyles'
import Select from "react-select";
import { FormGroup, Label } from "reactstrap"
const defaultVal = (options, valor) =>{
    return options.filter(item =>
        item.value === valor
      )
  
  }

const SelectSalario = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.salarios)
    const { item } = useSelector(state => state.contratos)

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.GET_LIST('SALARIOS_LISTA','salarios','nombre','asc'))          
      },[])
    
    const changeHandler = event => {    
        let io = event ? event.value: 0    
        dispatch(crudActions.SET_CHANGE('CONTRATOS_CHANGE','salarioId',io))        
    }     
    
    useEffect(() => {
       makeHttpRequestWithPage()
        return () => {
            
        };
    }, []);


    return (              
        <FormGroup>
        <Label for="salarios">Salarios</Label>
        <Select
            defaultValue={data[0]}
            name="salarioId"    
            id="salarioId"                    
            options={data}      
            
            styles={custom}
            onChange={ (e) => changeHandler(e) }                         
            value={defaultVal(data,item.salarioId)} 
        />    
        </FormGroup> 
    );
};
export default SelectSalario;
