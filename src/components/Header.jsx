import React, { Component }     from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Header extends Component {

    render() {
        return (

            <Navbar id="header" fluid={true}>
                <Navbar.Header>
                    <Navbar.Brand>
                        ZenAddress.org
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Text>
                    paper wallet generator
                </Navbar.Text>
                <Nav pullRight>
                    <NavItem href="https://myzenwallet.io/">WEB WALLET</NavItem>
                    <Navbar.Text>|</Navbar.Text>
                    <NavItem href="http://getzen.cash/">FAUCET</NavItem>
                </Nav>
            </Navbar>

        );
    }
}
