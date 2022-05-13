import React,{useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Mapas = () =>{
  const dispatch = useDispatch()
  const { item } = useSelector(state => state.clientes)  

  const LocationPin = ({ text }) => (
    <>      
    <FontAwesomeIcon icon={faMapMarkerAlt} className="pini"/>    
    </>
    
  )
    
  const mapClicked = (event) =>{          
    dispatch({type:'CLIENTES_CHANGE_LOCATION',latitude:event.lat,longitude:event.lng})     
  }
 


return(      
    <div style={{ height: '580px', width: '100%' }}>  
     { item.latitude  && item.longitude ?       
              <GoogleMapReact
              bootstrapURLKeys={{ 
                  key: 'AIzaSyAF83DBU51q3idSspsd7f4DtTk7vNwHpR8',
                  libraries:['places', 'geometry', 'drawing', 'visualization'] 
                }}
              defaultCenter={{        
                lat: parseFloat(item.latitude),
                lng: parseFloat(item.longitude)
                }}
              defaultZoom={17}
              onClick={(e) => mapClicked(e)}
              
              >
                <LocationPin           
                lat={parseFloat(item.latitude)}
                lng={parseFloat(item.longitude)}
                text={item.direccion}
                />
          
              </GoogleMapReact>
            : null }       
    </div>  
    )
}     
  
export default Mapas;
