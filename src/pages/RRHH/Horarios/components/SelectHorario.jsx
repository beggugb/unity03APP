import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { custom } from '../../../../helpers/customStyles'
import { FormGroup, Label } from "reactstrap"
import Select from "react-select";
const defaultVal = (options, valor) =>{
    return options.filter(item =>
        item.value === valor
      )
  
  }

const SelectHorario = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.horarios)
    const { item } = useSelector(state => state.contratos)

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.GET_LIST('HORARIOS_LISTA','horarios','nombre','asc'))          
      },[])
    
    const changeHandler = event => {    
        let io = event ? event.value: 0    
        dispatch(crudActions.SET_CHANGE('CONTRATOS_CHANGE','horarioId',io))        
    }     
    
    useEffect(() => {
       makeHttpRequestWithPage()
        return () => {
            
        };
    }, []);


    return (              
        <FormGroup> 
        <Label for="horarios">Horarios</Label>
        <Select
            defaultValue={data[0]}
            name="horarioId"    
            id="horarioId"                    
            options={data}      
          
            styles={custom}
            onChange={ (e) => changeHandler(e) }                         
            value={defaultVal(data,item.horarioId)} 
        />    
        </FormGroup>                                             
    );
};
export default SelectHorario;
