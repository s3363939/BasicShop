import React, { Component } from 'react';
import { Route } from 'react-router';
import { FixedMenuLayout } from './components/Navigation'
import { CustomerView } from './components/CustomerView'
import { ProductView } from './components/ProductView'
import { StoreView } from './components/StoreView'
import { SaleView } from './components/SaleView'

export default class App extends Component {
  displayName = App.name

  render() {
      return (
        <FixedMenuLayout>
              <Route exact path='/' component={CustomerView} />
              <Route path='/CustomerView' component={CustomerView} />
              <Route path='/ProductView' component={ProductView} />
              <Route path='/StoreView' component={StoreView} />
              <Route path='/SaleView' component={SaleView} />
        </FixedMenuLayout>
    );
  }
}
