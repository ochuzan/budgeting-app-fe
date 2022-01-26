import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

function TransactionEditForm(){
    const [ transaction, setTransaction ] = useState({
        date: "",
        name: "",
        amount: 0,
        from: "",
        category: ""
    });
    const [ transactions, setTransactions ] = useState([]);

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
        });

        axios.get(`${API_URL}/transactions`)
        .then((res) => {
            setTransactions(res.data);
        }).catch((err) => {
            throw err;
        });
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

    const handleDelete = () => {
        axios.delete(`${API_URL}/transactions/${id}`)
        .then((res) => {
            navigate("/transactions");
        }).catch((err) => {
            console.log(err);
        })
    };

    let categories = transactions.map((transaction, index) => {
        return <option key={index} value={transaction.category} >{transaction.category}</option>
    })
    return (
        <div>
            <h2>Edit Transaction</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>Transaction Date</Form.Label>
                    <Form.Control 
                        id="date"
                        name="date"
                        value={transaction.date}
                        onChange={handleTextChange}
                        type="date"
                        placeholder="Date..."
                        required
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
                    <Form.Label>Category</Form.Label>
                    <Form.Select id="category" name="category" onChange={handleTextChange}>
                        <option value={transaction.category}>{transaction.category}</option>
                        {/* {categories} */}
                        <option>Food</option>
                        <option>Income</option>
                        <option>Subscriptions</option>
                        <option>Transportation</option>
                    </Form.Select>
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
                <Button as={Link} to={`/transactions/${id}`} variant="secondary">Back</Button>{' '}
                <Button onClick={handleDelete} variant="danger">Delete</Button>
            </Form>
        </div>
        
    )
}

export default TransactionEditForm;