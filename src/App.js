import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import TransactionDetails from './components/TransactionDetail';
import TransactionEditForm from './components/TransactionEditForm';
import TransactionNewForm from './components/TransactionNewForm';
import Transactions from './components/Transactions';

function App() {
  const [ total, setTotal ] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  let getTotalBalance = (res) => {
    let totalBalance = res.data.reduce((sum, { amount }) => {
        return sum + Number(amount);
    }, 0)
    setTotal((Math.round(totalBalance * 100)/100));
  }

  useEffect(() => {
      axios.get(`${API_URL}/transactions`)
      .then((res) => {
          getTotalBalance(res);
      }).catch((err) => {
          throw err;
      });
  }, []);

  return (
    <div className="App">
      <NavigationBar total={total}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/transactions" element={<Transactions getTotalBalance={getTotalBalance} total={total}/>}/>
        <Route path="/transactions/new" element={<TransactionNewForm />}/>
        <Route path="/transactions/:id" element={<TransactionDetails />}/>
        <Route path="/transactions/:id/edit" element={<TransactionEditForm />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
