import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function TransactionNewForm(){
    const [ transaction, setTransaction ] = useState({
        date: "",
        name: "",
        amount: 0,
        from: ""
    });

    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const handleTextChange = (e) => {
        setTransaction({ ...transaction, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${API_URL}/transactions`, transaction)
        .then((res) => {
            navigate("/transactions");
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <h2>Enter New Transaction</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>Transaction Date</Form.Label>
                    <Form.Control 
                        id="date"
                        name="transactionDate"
                        value={transaction.date}
                        onChange={handleTextChange}
                        type="text"
                        placeholder="Date..." 
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        id="name"
                        name="name"
                        value={transaction.name}
                        onChange={handleTextChange}
                        type="text"
                        placeholder="Name..."
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>From</Form.Label>
                    <Form.Control
                        type="text"
                        id="from"
                        name="from"
                        value={transaction.from}
                        onChange={handleTextChange}
                        placeholder="From..."
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        id="amount"
                        name="amount"
                        value={transaction.amount}
                        onChange={handleTextChange}
                        type="number"
                        placeholder="Transaction Amount..."
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default TransactionNewForm;