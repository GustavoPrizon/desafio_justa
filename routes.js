import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main/index';
import Tabela from './pages/Tabela';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/tabela" component={Tabela} />
      </Switch>
    </BrowserRouter>
  );
}
