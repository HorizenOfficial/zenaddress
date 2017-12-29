import React, { Component }     from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import logoFull from "../logo_full.png";

export default class Header extends Component {

    render() {
        return (

            <Navbar id="header" className="zenHeader" fluid={true}>
                <div className="container">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <img src={logoFull} />
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                        <NavItem href="https://myzenwallet.io/" className="headerLeftOption">WEB WALLET</NavItem>
                        <Navbar.Text>|</Navbar.Text>
                        <NavItem href="http://getzen.cash/" className="headerLeftOption">FAUCET</NavItem>
                    </Nav>
                </div>
            </Navbar>

        );
    }
}
