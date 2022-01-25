import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Offcanvas, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar({total}){

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
                            <Nav.Link as={Link} to="/transactions">View All Transactions</Nav.Link>
                            <Nav.Link as={Link} to="/transactions/search">Search Transactions</Nav.Link>
                            <Nav.Link as={Link} to="/transactions/new">Add New Transaction</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    <Navbar.Brand as={Link} to="/transactions" className="m-auto"><h1>INAB</h1></Navbar.Brand>
                    <Nav className="justify-content-end">
                        <Navbar.Text className="nav-bar-text">
                            Total Balance: <Badge className="balance-badge"bg={backgroundColor}>${total}</Badge>
                        </Navbar.Text>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar;