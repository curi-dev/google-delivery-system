import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Registry from '../pages/Registry/index';
import Deliveries from '../pages/Deliveries/index';
import Overview from '../pages/Overview/index';

const Routes: React.FunctionComponent = () => (
    <Switch>
        <Route path='/' exact component={Registry} />
        <Route path='/deliveries' component={Deliveries} />
        <Route path='/overview/:id' component={Overview} />
    </Switch> 
);

export default Routes;
