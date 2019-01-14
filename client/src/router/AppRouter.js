import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import BookList from '../components/BookList';
import CreateBookPage from '../components/CreateBookPage';
import BookDetail from '../components/BookDetail';
import EditBookPage from '../components/EditBookPage';
import AddBook from '../components/AddBook';
import BookForm2 from '../components/BookForm2';
import Header from '../components/Header';

import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={BookList} exact={true} />
        <Route path="/books/new" component={CreateBookPage} />
        <Route path="/books/:id" component={BookDetail} />
        <Route path="/edit/:id" component={EditBookPage} />
        <Route path="/add" component={AddBook} />
        <Route path="/form" component={BookForm2} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;