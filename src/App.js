import React from 'react';
import "./assets/css/erp.css";
import { Router , Route, Switch, Redirect } from 'react-router-dom'
import AdminLayout from './layout/Compras/Compras.jsx'
import PostLayout from './layout/Post/Post.jsx'
import CrmLayout from './layout/Crm/Crm.jsx'
import InicioLayout from './layout/Inicio/Inicio.jsx'
import FichaLayout from './layout/Inicio/Ficha.jsx'
import FinanzasLayout from './layout/Finanzas/Finanzas.jsx'
import TpdvLayout from './layout/Tpdv/Tpdv.jsx'
import ToolLayout from './layout/Tool/Tool.jsx'
import RRhhLayout from './layout/Rrhh/Rrhh.jsx'
import InventariosLayout from './layout/Inventarios/Inventario.jsx'
import VentasLayout from './layout/Ventas/Ventas.jsx'
import ConsolidadoLayout  from './layout/Consolidado/Consolidado.jsx';

import { Provider } from "react-redux";
import { store, history } from "./helpers";
import { PrivateRoute } from "./PrivateRoute";
import ReduxToastr from 'react-redux-toastr'

import './assets/css/core/main.css';
import './assets/css/daygrid/main.css';
import './assets/css/timegrid/main.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import "react-datepicker/dist/react-datepicker.css";


function App() {
  
  return (    
      <Provider store={store}>  
       <ReduxToastr
        timeOut={1100}
        newestOnTop={false}
        preventDuplicates
        progressBar={true}
        position="top-center"
        getState={(state) => state.toastr} // This is the default
        transitionIn="fadeIn"
        transitionOut="fadeOut"        
        closeOnToastrClick/>   
        <Router history={history}>
          <Switch>      
            <Route
              exact
              path="/login"
              render={(props) => <PostLayout {...props} />}
            />            
            <Route
              exact
              path="/"
              render={() => <Redirect to="/inicio/dashboard" />}
            />        
            <Route
              exact
              path="/inicio"
              render={() => <Redirect to="/inicio/dashboard" />}
            />              
            <PrivateRoute path="/compras" component={AdminLayout} />            
            <PrivateRoute path="/ventas" component={VentasLayout} />
            <PrivateRoute path="/inicio" component={InicioLayout} />
            <PrivateRoute path="/fichas" component={FichaLayout} />            
            <PrivateRoute path="/crm" component={CrmLayout} />
            <PrivateRoute path="/finanzas" component={FinanzasLayout} />
            <PrivateRoute path="/tpdv" component={TpdvLayout} />
            <PrivateRoute path="/tools" component={ToolLayout} />
            <PrivateRoute path="/rrhh" component={RRhhLayout} />
            <PrivateRoute path="/inventarios" component={InventariosLayout} />
            <PrivateRoute path="/consolidado" component={ConsolidadoLayout} />
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;
