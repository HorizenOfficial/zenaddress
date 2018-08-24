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
                            <img src={logoFull} alt="logo"/>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                        <NavItem href="https://myzenwallet.io/" className="headerLeftOption">WEB WALLET</NavItem>
                        <Navbar.Text>|</Navbar.Text>
                        <NavItem href="http://getzen.cash/" className="headerLeftOption">FAUCET</NavItem>
                        <Navbar.Text>|</Navbar.Text>
                        <NavItem href="https://support.horizen.global" className="headerLeftOption">SUPPORT</NavItem>
                    </Nav>
                </div>
            </Navbar>

        );
    }
}
