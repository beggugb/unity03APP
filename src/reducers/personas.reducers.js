const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    modalView: false,
    indicador:0,
    item:{      
      codigo:'',
      tipo:'personal',
      nit:'',
      nombres: '',      
      direccion:'',   
      filename:'default.png',   
      pais:'',
      ciudad:'',
      email:'',
      web:'',
      telefono:'',
      observaciones:''               
    }    
  };
  
export function personas(state = initialState, action) {
    switch (action.type) {      
        case "PERSONAS_INDICADOR":
        return {
          ...state,
          indicador: action.value
        };
       case "PERSONAS_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
        case "PERSONAS_ITEM":
          return {
            ...state,
            item: action.response
        };  
        case "PERSONAS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
        }; 
        case "PERSONAS_CHANGE":
          return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "PERSONAS_ADD":
        return {
          ...state,
          item: action.response
        };       
      case "PERSONAS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item,
          indicador: 0
        };
      case "PERSONAS_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0
        };  

      case "PERSONAS_RESET_DATA":
          return {
            ...state,            
            data: [],            
            pagina: 0,
            paginas: 0,
            total: 0,
            indicador:0
          };  
        
      default:
        return state;
    }
  }
  