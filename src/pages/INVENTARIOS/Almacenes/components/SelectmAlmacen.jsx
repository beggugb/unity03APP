import React,{useEffect, useCallback} from "react";
import { Col, FormGroup, Label } from "reactstrap"
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { customi } from '../../../../helpers/customStyles'
import Select from "react-select";
import { defaultVal } from "../../../../helpers/funciones";

const SelectmAlmacen = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.almacenes)    
    const { item } = useSelector(state => state.movimientos)

    const makeHttpRequestWithPage = useCallback(() =>{        
        dispatch(crudActions.GET_LIST('ALMACENES_LISTA','almacenes','nombre','asc'))   
      },[])
    
    const changeHandler = (event,name,names) => {    
        let iok = event ? event.value : 0
        let ikk = event ? event.label : ""
        dispatch(crudActions.SET_CHANGE('MOVIMIENTOS_CHANGE',name,iok))  
        dispatch(crudActions.SET_CHANGE('MOVIMIENTOS_CHANGE',names,ikk))
    }     

    useEffect(() => {
        makeHttpRequestWithPage()
        return () => {
            
        };
    }, []);


    return (
        <>     
        <Col md={2}>
            <FormGroup>
            <Label for="forigen">{item.tipo === 'Traspaso' ? 'Origen' : 'Almacen'}</Label>
                <Select
                    defaultValue={data[0]}
                    name="origenId"    
                    id="origenId"                                
                    value={defaultVal(data,item.origenId)} 
                    options={data}
                    onChange={ (e) => changeHandler(e,'origenId','origen') }                                  
                    styles={customi} />    
            </FormGroup>
        </Col>         
        {item.tipo === 'Traspaso' ?
        <Col md={2}>
            <FormGroup>
            <Label for="fdestino">Destino</Label>   
                <Select
                    defaultValue={data[0]}
                    name="destinoId"    
                    id="destinoId"                    
                    value={defaultVal(data,item.destinoId)} 
                    options={data}                  
                    onChange={ (e) => changeHandler(e,'destinoId','destino') }                                  
                    styles={customi} />    
            </FormGroup>
        </Col> :null}        
        </>      
                                                 
    );
};
export default SelectmAlmacen;

