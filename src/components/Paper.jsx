import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { QRCode }           from 'react-qr-svg';
import zencashjs            from 'zencashjs';

// import art1 from '../zen_paper_front.png';
// import art2 from '../zen_paper_back.png';
import art3 from '../zen_paper_sidebyside.png';

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
        const priv      = zencashjs.address
            .mkPrivKey(this.props.entropy + new Date().getTime());
        const privWIF   = zencashjs.address.privKeyToWIF(priv, true);
        const pubKey    = zencashjs.address.privKeyToPubKey(priv, true);
        const znAddr    = zencashjs.address.pubKeyToAddr(pubKey);

        this.setState({
            priv: priv,
            wif: privWIF,
            addr: znAddr
        });
    }

    render() {
        return (
            <div id="Paper">
                <hr />
                <Row className="r1">
                    <Col md={2}>
                        <Button onClick={() => this.genAddress()}>
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
                        <Col md={12} className="max-width">

                            <h2>Overview</h2>

                            <img alt="art1"
                            className="print-only"
                            id="art1" src={art3} />

                            <div id="art-area">


                                <span id="wif-QR">
                                    <QRCode
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        level="L"
                                        value={this.state.wif}
                                    />
                                </span>

                                <b id="wif-str">
                                    {this.state.wif}
                                </b>

                                <span id="addr-QR">
                                    <QRCode
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        level="L"
                                        value={this.state.addr}
                                    />
                                </span>

                                <b id="addr-str">
                                    {this.state.addr}
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
                          A paper wallet is a piece of paper containing a public address and a private key. It allows you to store some ZENs offline.
                        </p>
                        <p>
                          These kind of wallets are vulnerable to loss and theft. You should keep it safe like jewels or cash. Therefore it is recommended either to have a backup or to generate it only for a temporary use.
                        </p>
                        <p>
                          <b>Image Quality:</b> print this wallet with Chrome for a better quality. Some elements can be misplaced with Firefox
                        </p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Paper;
