import React from 'react';
import {Route, Switch} from 'react-router-dom';
import TodoList from '../loadables/TodoLoadable';
import NotFound from "../loadables/NotFoundLoadable";
import Home from "../loadables/HomeLoadable";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/todo-list" component={TodoList} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
