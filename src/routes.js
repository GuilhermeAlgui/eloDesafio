import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Register from './pages/register';
import Leads from './pages/leads';
import Login from './pages/login';
import NewLead from './pages/novoLead'


function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login}/>
                <Route path='/leads' component={Leads}/>
                <Route path='/register' component={Register}/>
                <Route path='/newLead' component={NewLead}/>

            </Switch>
        </BrowserRouter>
    )   
}

export default Routes;


