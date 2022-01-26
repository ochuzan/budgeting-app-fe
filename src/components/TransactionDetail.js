import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from "react-bootstrap";

function TransactionDetails(){
    const [ transaction, setTransaction ] = useState([]);

    let { id } = useParams();
    let navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${API_URL}/transactions/${id}`)
        .then((res) => {
            setTransaction(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const handleDelete = () => {
        axios.delete(`${API_URL}/transactions/${id}`)
        .then((res) => {
            navigate("/transactions");
        }).catch((err) => {
            console.log(err);
        })
    };


    let amountColor = transaction.amount<0 ? 'danger' : 'success';

    return (
        <div>
            {/* <h2></h2> */}
            <Card bg="light" text="dark" border="dark "className="text-center" >
                <Card.Header>Transaction Details</Card.Header>
                <Card.Body>
                    <Card.Title>{transaction.name}</Card.Title>
                    <Card.Text>
                        {transaction.from}
                    </Card.Text>
                    <Card.Text>
                        {transaction.category}
                    </Card.Text>
                    <Card.Text className={`text-${amountColor}`}>
                        {transaction.amount}
                    </Card.Text>
                    <Button as={Link} to="/transactions" variant="secondary">Back</Button>{' '}
                    <Button as={Link} to={`/transactions/${id}/edit`} variant="warning">Edit</Button>{' '}
                    <Button onClick={handleDelete} variant="danger">Delete</Button>
                </Card.Body>
                <Card.Footer className="text">{transaction.date}</Card.Footer>
            </Card>
        </div>
    )
}

export default TransactionDetails;