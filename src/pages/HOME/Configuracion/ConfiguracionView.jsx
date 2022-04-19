import React,{useState, useCallback, useEffect} from "react";
import { ConfiguracionRouter } from '../../routes'
import SubMenu from '../../components/subMenu'

const ConfiguracionView = () => {  
  const [component, setComponent] = useState('data');    
  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':   
          break;    
        case 'new':
          
          break;
        case 'edit':
          
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga articulos')
    };
  }, []);

  return(
    <div className="content">     
      <div className="main-contenido">        
       <SubMenu items={ ConfiguracionRouter } prop='Usuarios'/>
  
      </div>
    </div>    
  )

};
export default ConfiguracionView;
