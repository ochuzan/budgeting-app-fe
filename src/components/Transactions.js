import axios from "axios";
import Transaction from "./Transaction";
import { Badge, Table } from "react-bootstrap";
import { useEffect, useState } from "react";


function Transactions({ getTotalBalance, total} ){
    const [ transactions, setTransactions ] = useState([]);
    // const [ total, setTotal ] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;

    console.log(total)
    useEffect(() => {
        axios.get(`${API_URL}/transactions`)
        .then((res) => {
            setTransactions(res.data);
            getTotalBalance(res);
        }).catch((err) => {
            throw err;
        });
}, [getTotalBalance]);

    let backgroundColor;
    if(total>1000){
        backgroundColor = "success";
    } else if(total<0){
        backgroundColor = "danger";
    } else {
        backgroundColor = "secondary";
    }
    return (
        <div>
            <h2><Badge bg={backgroundColor}>All Transactions</Badge></h2>
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
                    <th>Edit</th>
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