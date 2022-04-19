import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { custom } from '../../../../helpers/customStyles'
import { Label, FormGroup } from "reactstrap"
import Select from "react-select";
const defaultVal = (options, valor) =>{
    return options.filter(item =>
        item.value === valor
      )
  
  }

const SelectCargo = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.cargos)
    const { item } = useSelector(state => state.contratos)

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.GET_LIST('CARGOS_LISTA','cargos','nombre','asc'))          
      },[])
    
    const changeHandler = event => {    
        let io = event ? event.value: 0    
        dispatch(crudActions.SET_CHANGE('CONTRATOS_CHANGE','cargoId',io))        
    }     
    
    useEffect(() => {
       makeHttpRequestWithPage()
        return () => {
            
        };
    }, []);


    return (              
        <FormGroup> 
        <Label for="cargos">Cargos</Label>
        <Select
            defaultValue={data[0]}
            name="cargoId"    
            id="cargoId"                    
            options={data}      
          
            styles={custom}
            onChange={ (e) => changeHandler(e) }                         
            value={defaultVal(data,item.cargoId)} 
        />    
        </FormGroup>                                             
    );
};
export default SelectCargo;
