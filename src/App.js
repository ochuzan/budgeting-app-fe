import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import TransactionDetails from './components/TransactionDetail';
import TransactionEditForm from './components/TransactionEditForm';
import TransactionNewForm from './components/TransactionNewForm';
import Transactions from './components/Transactions';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/transactions" element={<Transactions />}/>
        <Route path="/transactions/new" element={<TransactionNewForm />}/>
        <Route path="/transactions/:id" element={<TransactionDetails />}/>
        <Route path="/transactions/:id/edit" element={<TransactionEditForm />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
