import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { QRCode }           from 'react-qr-svg';
import zencashjs            from 'zencashjs';
import axios                from 'axios';

import art1 from '../zen_paper_front.png';
import art2 from '../zen_paper_back.png';

class Paper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'T',
            priv: '',
            wif: '',
            addr: ''
        };
    }

    genAddress() {

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

    render() {
        return (
            <Col md={12} id="Paper">
                <hr />
                <Row className="r1">
                    <Col md={6}>
                        <Button onClick={() => this.genAddress()}>
                            Generate a new wallet
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Button onClick={window.print}>
                            Print
                        </Button>
                    </Col>
                </Row>
                <hr />
                {this.state.addr ? (
                    <Row className="r2">
                        <Col md={12} className="max-width">

                            <h2>Overview</h2>

                            <img alt="art1"
                            className="print-only"
                            id="art1" src={art1} />
                            <img alt="art2"
                            className="print-only"
                            id="art2" src={art2} />

                            <div id="art-area">


                                <span id="addr-QR">
                                    <QRCode
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        level="L"
                                        style={{ width: 96 }}
                                        value={this.state.addr}
                                    />
                                </span>

                                <b id="addr-str1">
                                    {this.state.addr}
                                </b>
                                <b id="addr-str2">
                                    {this.state.addr}
                                </b>

                                <span id="wif-QR">
                                    <QRCode
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        level="L"
                                        style={{ width: 96 }}
                                        value={this.state.wif}
                                    />
                                </span>

                                <b id="wif-str1">
                                    {this.state.wif}
                                </b>
                                <b id="wif-str2">
                                    {this.state.wif}
                                </b>

                            </div>

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
                            <li>https://explorer.zensystem.io/</li>
                            <li>http://explorer.zenmine.pro/insight/</li>
                            <li>https://explorer.zen-solutions.io/</li>
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

export default Paper;
