const initialState = {
    data: [],
    item:{
      id:'',
      title:'',
      start:'',
      end:'',      
      backgroundColor:'',
      selectable:false,
      usuarioId:0,
      detalle:''      
    },
  };
  
  export function tareas(state = initialState, action) {
    switch (action.type) {
      case "TAREAS_ADD":
        return {
          ...state,
            data: action.response,
            item: initialState.item
        };
      case "TAREAS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
              [action.props]: action.value
          }
       };  
      case "TAREAS_ITEM":
          return {
            ...state,
            item: action.response
          }; 
      case "TAREAS_DATA":
        return {
          ...state,
          data: action.response
        };          
      case "TAREAS_RESET":
        return {
          ...state,
          data: [],
          item: initialState.item
        };
      case "TAREAS_ITEM_RESET":
          return {
            ...state,            
            item: initialState.item
          };  
      default:
        return state;
    }
  }
  