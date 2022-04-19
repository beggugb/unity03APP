const initialState = {    
    item:{
      id:'',
      nombre:'',
      direccion:'',
      web:'',
      email:'',
      filename:'',
      nit:'',
      registro:'',
      smtpHost:'',
      smtpUser:'',
      smtpPassword:'',
      smtpSecure:'',
      smtpPort:'',
      licencia:'',
      labelCotizacion:'',
      garantiaCotizacion:'',
      politicaCotizacion:'',
      pais:'',
      moneda:'',
      labelMoneda:'',

    }
  };
  
export function empresa(state = initialState, action) {
    switch (action.type) {
      case "EMPRESA_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };      
      case "EMPRESA_ITEM":
          return {
            ...state,
            item: action.response
          };        
      case "EMPRESA_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };      
      default:
        return state;
    }
  }
  