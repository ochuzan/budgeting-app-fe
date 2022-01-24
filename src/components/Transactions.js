import axios from "axios";
import Transaction from "./Transaction";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";


function Transactions(){
    const [ transactions, setTransactions ] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${API_URL}/transactions`)
        .then((res) => {
            setTransactions(res.data);
        }).catch((err) => {
            throw err;
        });
    }, []);

    return (
        <div>
            <h2>Total Balance: </h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Payee</th>
                    {/* <th>Category</th> */}
                    <th>Amount</th>
                    {/* <th>Memo</th> */}
                    {/* <th>Outflow</th> */}
                    {/* <th>Inflow</th> */}
                </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => {
                        return <Transaction key={index} transaction={transaction} id={index} />;
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Transactions;