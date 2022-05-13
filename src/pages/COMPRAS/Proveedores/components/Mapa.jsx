import React,{ useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Mapa = () =>{
  const dispatch = useDispatch()
  const { item } = useSelector(state => state.proveedores)  
  const [loading, setloading] = useState(false)
  
  const LocationPin = ({ text }) => (
    <>      
    <FontAwesomeIcon icon={faMapMarkerAlt} className="pini"/>    
    </>
    
  )
    
  const mapClicked = (event) =>{          
    dispatch({type:'PROVEEDORES_CHANGE_LOCATION',latitude:event.lat,longitude:event.lng})     
  }
 
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
    setloading(true)
  };
  

return(      
    <div style={{ height: '580px', width: '100%' }}>  
   
     { item.latitude  && item.longitude ?       
              <GoogleMapReact
              bootstrapURLKeys={{ 
                  key: 'AIzaSyAF83DBU51q3idSspsd7f4DtTk7vNwHpR8'               
                }}
              defaultCenter={{        
                lat: parseFloat(item.latitude),
                lng: parseFloat(item.longitude)
                }}
              defaultZoom={17}
              onClick={(e) => mapClicked(e)}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
              
              >
              {loading  &&
                <LocationPin           
                lat={parseFloat(item.latitude)}
                lng={parseFloat(item.longitude)}
                text={item.direccion}
                />      }
          
              </GoogleMapReact>
            : null }       
    </div>  
    )
}     
  
export default Mapa;
