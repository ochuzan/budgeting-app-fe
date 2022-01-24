import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

function TransactionEditForm(){
    const [ transaction, setTransaction ] = useState({
        date: "",
        name: "",
        amount: 0,
        from: ""
    });

    let { id } = useParams();
    const API_URL = process.env.REACT_APP_API_URL;
    let navigate = useNavigate();

    const handleTextChange = (e) => {
        setTransaction({ ...transaction, [e.target.id]: e.target.value });
    };

    useEffect(() => {
        axios.get(`${API_URL}/transactions/${id}`)
        .then((res) => {
            setTransaction(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`${API_URL}/transactions/${id}`, transaction)
        .then((res) => {
            setTransaction(res.data);
            navigate(`/transactions/${id}`);
        }).catch((err) => {
            console.log(err.response.data);
        })
    };

    return (
        <div>
            <h2>Edit Transaction</h2>
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
                </Button> {""}
                <Button as={Link} to={`/transactions/${id}`} variant="secondary">Back</Button>
            </Form>
        </div>
        
    )
}

export default TransactionEditForm;