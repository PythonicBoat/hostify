import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { AiOutlineCopyrightCircle} from "react-icons/ai";

function FooterComponent(){
    return(
        <div>
        <Navbar bg="dark" variant="dark">
            <Navbar.Toggle />
            <Navbar.Collapse>
            <Nav className="justify-content-end" style={{ width: "100%" }}>
                <Nav.Link href="">Guides</Nav.Link>
                <Nav.Link href="">Term of Sale</Nav.Link>
                <Nav.Link href="">Term of Use</Nav.Link>
                <Nav.Link href="#"><AiOutlineCopyrightCircle style={{verticalAlign: "text-top"}}/>&ensp;2023</Nav.Link>

            </Nav>
            </Navbar.Collapse>


        </Navbar>
        </div>
    );
}
export default FooterComponent;