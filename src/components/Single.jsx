import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Radio }
                            from 'react-bootstrap';
import { QRCode }           from 'react-qr-svg';
import zencashjs            from 'zencashjs';
import axios                from 'axios';

class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'T',
            priv: '',
            wif: '',
            addr: ''
        };
    }

    genTAddress() {

        axios.get(
            'https://www.random.org/cgi-bin/randbyte?nbytes=16&format=h'
        ).then(res => {
            const priv      = zencashjs.address.mkPrivKey(res.data);
            const privWIF   = zencashjs.address.privKeyToWIF(priv, true);
            const pubKey    = zencashjs.address.privKeyToPubKey(priv, true);
            const znAddr    = zencashjs.address.pubKeyToAddr(pubKey);

            this.setState({
                priv: priv,
                wif: privWIF,
                addr: znAddr
            });
        });
    }

    genZAddress() {
        axios.get(
            'https://www.random.org/cgi-bin/randbyte?nbytes=16&format=h'
        ).then(res => {
            const z_secretKey   = zencashjs.zaddress.mkZSecretKey(res.data);
            const spendingKey   = zencashjs.zaddress
                                    .zSecretKeyToSpendingKey(z_secretKey);
            const a_pk          = zencashjs.zaddress
                                    .zSecretKeyToPayingKey(z_secretKey);
            const pk_enc        = zencashjs.zaddress
                                    .zSecretKeyToTransmissionKey(z_secretKey);
            const Zaddress      = zencashjs.zaddress.mkZAddress(a_pk, pk_enc);

            this.setState({
                priv: z_secretKey,
                wif: spendingKey,
                addr: Zaddress
            });
        });
    }

    handleCheckRadio(type) {
        this.setState({
            type: type,
            priv: '',
            wif: '',
            addr: ''
        });
    }

    getZpriv() {
        if (this.state.type === 'Z')
            return("private key: " + this.state.priv);
    }

    render() {
        return (
            <Col md={12} id="Single">
                <hr />
                <Row className="r1">

                    <Col md={4}>
                        <FormGroup>
                            <Radio name="radioGroup"
                            onMouseDown={() => this.handleCheckRadio('T')}
                            checked={this.state.type === 'T'} inline>
                                T Address
                            </Radio>
                            <br />
                            <Radio name="radioGroup"
                            onMouseDown={() => this.handleCheckRadio('Z')}
                            checked={this.state.type === 'Z'} inline>
                                Z Address
                            </Radio>
                        </FormGroup>
                    </Col>

                    <Col md={2}>
                        <Button onClick={this.state.type === 'T' ?
                            () => this.genTAddress()
                            : () => this.genZAddress()}
                        >
                            Generate a new wallet
                        </Button>
                    </Col>
                    <Col md={2}>
                        <Button onClick={window.print}>
                            Print
                        </Button>
                    </Col>
                </Row>
                <hr />
                {this.state.addr ? (
                    <Row className="r2">
                        <Col md={3} className="max-width singleTabs col-sm-offset-3">
                            <h1 style={{color:'green'}}>Public</h1>
                            <h3>Zen Address</h3>
                            <div>
                                <QRCode
                                    bgColor="#FFFFFF"
                                    fgColor="#000000"
                                    level="L"
                                    style={{ width: 200 }}
                                    value={this.state.addr}
                                />
                            </div>
                            <div className="zentabcode">
                                {this.state.addr}
                            </div>
                        </Col>
                        <Col md={3} className="max-width singleTabs">
                            <h1 style={{color:'red'}}>Secret</h1>
                            <div>
                                {this.state.type === 'T' ? (
                                    <h3>Private Key</h3>
                                ) : (
                                    <h3>Spending Key</h3>
                                )}
                                <div>
                                    <QRCode
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        level="L"
                                        style={{ width: 200 }}
                                        value={this.state.wif}
                                    />
                                </div>
                                <div className="zentabcode">{this.state.wif}</div>
                            </div>
                            <p>{this.getZpriv()}</p>
                        </Col>
                    </Row>
                ) : (
                    <Row className="r2 no-padding"></Row>
                )}
                <hr />
                <Row className="r3">
                    <Col>
                        <p>
                            <b>A Zencash wallet</b> is as simple as a single pairing of a Zencash address with its corresponding Zencash private key. You can share your address to receive ZEN payments, however your private key is what allows you to unlock and manage your funds, keep it safe.
                        </p>
                        <p>
                            <b>To safeguard this wallet</b> you must print or otherwise record the Zencash address and private key. It is important to make a backup copy of the private key and store it in a safe location. This site does not have knowledge of your private key. If you leave/refresh the site or press the "Generate New Address" button then a new private key will be generated and the previously displayed private key will not be retrievable. Your Zencash private key should be kept a secret. Whomever you share the private key with has access to spend all the ZEN associated with that address. If you print your wallet then store it in a zip lock bag to keep it safe from water. Treat a paper wallet like cash.
                        </p>
                        <p>
                            <b>Add funds</b> to this wallet by instructing others to send ZEN to your Zen address.
                        </p>
                        <p>
                            <b>Check your balance</b> by entering your Zen address on one of these explorers :
                        </p>
                        <ul style={{listStyleType: 'none'}}>
                            <li><a href="https://explorer.zensystem.io/">https://explorer.zensystem.io/</a></li>
                            <li><a href="http://explorer.zenmine.pro/insight/">http://explorer.zenmine.pro/insight/</a></li>
                            <li><a href="https://explorer.zen-solutions.io/">https://explorer.zen-solutions.io/</a></li>
                        </ul>
                        <p>
                            <b>To spend your ZEN</b> you can download the <a href='https://github.com/ZencashOfficial/zencash-swing-wallet-ui/releases'>Zencash Swing Wallet</a> and import your private key to the p2p client wallet.
                        </p>
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default Single;
