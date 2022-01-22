import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function NavigationBar(){
    const [ total, setTotal ] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;

    // let totalBalance;

    useEffect(() => {
        axios.get(`${API_URL}/transactions`)
        .then((res) => {
            let totalBalance = res.data.reduce((sum, { amount }) => sum + amount, 0)
            // console.log(totalBalance)
            setTotal(totalBalance);
        }).catch((err) => {
            throw err;
        });
    }, []);

    return (
        <div>
            <Navbar bg="primary" variant="dark" expand={false}>
                <Container fluid>
                    <Navbar.Toggle bg="light" aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">INAB</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/transactions/new">Add Transaction</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    <Navbar.Brand as={Link} to="/transactions" className="m-auto"><h1>INAB</h1></Navbar.Brand>
                    <Nav className="justify-content-end">
                        <Navbar.Text>
                            Total Balance: {total} 
                        </Navbar.Text>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar;