import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Button, FormGroup, Input, Label } from "reactstrap"
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'  
import { custom } from '../../../../helpers/customStyles'
import {  tipoPromociones } from "../../../../helpers/dataLoad";
import { defaultVal } from "../../../../helpers/funciones";

const FormProspecto = () => {
    const dispatch = useDispatch()  
    const { item } = useSelector(state => state.prospectos)
    const itt = useSelector(state => state.articulos.item)
    
    const changeHandler = event => {    
        const { name, value } = event.target          
        dispatch(crudActions.SET_CHANGE('PROSPECTOS_CHANGE',name,value)) 
    }
    const changesHandler = event => {            
      console.log(event)       
      const {value} = event ? event : ''        
      dispatch(crudActions.SET_CHANGE('PROSPECTOS_CHANGE','tipo',value))          
  }
    const submitHandle = () => {       
      let dato = item                    
      dato.articuloId = itt.id ? itt.id : null       
      dispatch(crudActions.SET_UPDATE('PROSPECTOS_ADD','prospectos',dato,'unit'))                    
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'PROSPECTOS_RESET_ITEM'})        
      };
    }, []); 



  
     
    return (              
        <>                                  
          <h6>Datos promoción</h6>  
            <FormGroup>
              <Label for="fnombre">Titulo</Label>
              <Input type="text" name="nombre" id="nombre" 
                    value={item.nombre || ''}                          
                    onChange={ (e) => changeHandler(e)} />
            </FormGroup>              
            <FormGroup>                            
              <Label for="tipoi">Tipo</Label>
                <Select                                                               
                  defaultValue={tipoPromociones[0]}
                  styles={custom} 
                  name="tipo"    
                  id="tipo"                    
                  options={tipoPromociones}      
                  isClearable={false}                          
                  value={defaultVal(tipoPromociones,item.tipo)}
                  onChange={ (e) => changesHandler(e)}/>
            </FormGroup>    
                                            
        
            <FormGroup>
              <Label for="observaciones">Observaciones</Label>
              <Input type="textarea" name="observaciones" id="observaciones" 
                value={item.observaciones || ''}                          
                onChange={ (e) => changeHandler(e)} />
            </FormGroup>  
       
            <Button
              className={item.id ?"btn-md btn-warning mt-4" : "btn-md btn-info mt-4"}
              onClick={() => submitHandle()}
            >
            <FontAwesomeIcon icon={faSave} />  
             {' '} {item.id ? " Actualizar" : " Guardar"}
            </Button>    

        </>


                                      
    );
};
export default FormProspecto;
