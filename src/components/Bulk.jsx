import React, { Component }     from 'react';
import { Row, Col, Button, FormGroup, ControlLabel, FormControl, Table, Radio }
                                from 'react-bootstrap';
import { address, zaddress }    from 'zencashjs';
import { QRCode }               from 'react-qr-svg';

import art  from '../Horizen-Paper-Wallet-side-by-side.png';

class Bulk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startIndex: 1,
            nbRows: 1,
            type: 'T',
            paper: true,
            design: false,
            pairs: []
        };
    }

    updateInputValue(e) {
        const _value    = parseInt(e.target.value, 10);
        const _id       = e.target.id;
        const _state    = this.state;

        if(!Number.isInteger(_value)) {
            console.log(_value);
            return;
        }

        _state[_id] = _value;
        this.setState(_state);
    }

    genTAddress(print = false) {
        const _state    = this.state;
        let _pairs    = [];
        _state.pairs    = _pairs;

        for(let i = 0 ; i < this.state.nbRows ; i++) {
            const priv      = address
                .mkPrivKey(this.props.entropy + new Date().getTime() + i);
            const privWIF   = address.privKeyToWIF(priv, true);
            const pubKey    = address.privKeyToPubKey(priv, true);
            const znAddr    = address.pubKeyToAddr(pubKey);

            _pairs.push({
                index: _state.startIndex + i,
                priv: priv,
                wif: privWIF,
                addr: znAddr
            });
        }
        _state.pairs = _pairs;
        _state.type = "T";
        this.setState(_state, function(){
            if(print) window.print();
        });
      }

    genZAddress(print = false) {
        const _state    = this.state;
        let _pairs    = [];
        _state.pairs    = _pairs;

        for(let i = 0 ; i < this.state.nbRows ; i++) {
            const z_secretKey   = zaddress
                .mkZSecretKey(this.props.entropy + new Date().getTime() + i);
            const spendingKey   = zaddress
                                    .zSecretKeyToSpendingKey(z_secretKey);
            const a_pk          = zaddress
                                    .zSecretKeyToPayingKey(z_secretKey);
            const pk_enc        = zaddress
                                    .zSecretKeyToTransmissionKey(z_secretKey);
            const Zaddress      = zaddress.mkZAddress(a_pk, pk_enc);

            _pairs.push({
                index: _state.startIndex + i,
                priv: z_secretKey,
                wif: spendingKey,
                addr: Zaddress
            });
        }
        _state.pairs = _pairs;
        _state.type = "Z";
        this.setState(_state, function(){
          if(print) window.print();
        });
    }

    handleCheckRadio(key, value) {
        const _state = this.state;

        _state[key] = value;
        if(key === "type") _state.pairs = [];

        this.setState(_state);
    }

    handlePrint(paper) {
        const type = paper ? 'T' : this.state.type;
        this.setState({
            paper: paper,
            type: type
        }, function() {
            type === 'T' ? this.genTAddress(true) : this.genZAddress(true);
        });
    }

    render() {
        return (
            <Col md={12} id="Bulk">
                <hr />
                <Row className="r1">
                    <Col md={2}>
                        <FormGroup controlId="startIndex"
                            bsSize="sm"
                        >
                            <ControlLabel>Start Index</ControlLabel>
                            <FormControl type="text"
                                value={this.state.inputValue}
                                onChange={e => this.updateInputValue(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup controlId="nbRows"
                            bsSize="sm"
                        >
                            <ControlLabel>Rows to generate</ControlLabel>
                            <FormControl type="text"
                                value={this.state.inputValue}
                                onChange={e => this.updateInputValue(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Radio name="radioType"
                            onMouseDown={() => this.handleCheckRadio("type", 'T')}
                            checked={this.state.type === 'T'} inline>
                                T Address
                            </Radio>
                            <br />
                            <Radio name="radioType"
                            onMouseDown={() => this.handleCheckRadio("type", 'Z')}
                            checked={this.state.type === 'Z'} inline>
                                Z Address
                            </Radio>
                        </FormGroup>
                    </Col>
                    <Col md={1}>
                        <Button onClick={this.state.type === 'T' ?
                            () => this.genTAddress()
                            : () => this.genZAddress()}
                        >
                            Generate
                        </Button>
                    </Col>
                    <Col md={1}>
                        <Button onClick={() => this.handlePrint(false)}>
                            Print
                        </Button>
                    </Col>
                    <Col md={1}>
                        <Button onClick={() => this.handlePrint(true)}>
                            Paper Print
                        </Button>
                    </Col>
                    <Col md={1}>
                    <FormGroup>
                        <Radio name="radioDesign"
                        onMouseDown={() => this.handleCheckRadio("design", false)}
                        checked={this.state.design === false} inline>
                            Paper Simple
                        </Radio>
                        <br />
                        <Radio name="radioDesign"
                        onMouseDown={() => this.handleCheckRadio("design", true)}
                        checked={this.state.design === true} inline>
                            Paper Design
                        </Radio>
                    </FormGroup>
                    </Col>
                </Row>
                <hr />
                {this.state.pairs[0] ? (
                    <Row className="r2 page-break-after">
                        <Col className="max-width">
                            <Table striped bordered condensed hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Address</th>
                                        {
                                            this.state.type === 'Z' ?
                                                (<th>Spending Key</th>)
                                                : null
                                        }
                                        <th>Private Key</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.pairs.map((pair) => (
                                        <tr>
                                            <td>{pair.index}</td>
                                            <td>{pair.addr}</td>
                                            <td>{pair.wif}</td>
                                            {
                                                this.state.type === 'Z' ?
                                                (<td>{pair.priv}</td>)
                                                : null
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                ) : (
                    <Row className="r2 no-padding"></Row>
                )}

                {this.state.paper ?
                this.state.design ?
                    this.state.pairs.map((pair) => (
                        <div className="print-only bulk-paper paper-design">
                            <img alt="art" id="art" src={art} />

                            <span id="addr-QR">
                                <QRCode
                                    bgColor="#FFFFFF"
                                    fgColor="#000000"
                                    level="L"
                                    style={{ width: 96 }}
                                    value={pair.addr}
                                />
                            </span>

                            <b id="addr-str1">
                                {pair.addr}
                            </b>

                            <span id="wif-QR">
                                <QRCode
                                    bgColor="#FFFFFF"
                                    fgColor="#000000"
                                    level="L"
                                    style={{ width: 96 }}
                                    value={pair.wif}
                                />
                            </span>
                        </div>
                    ))

                :   // simple (no design, just QR codes)
                    this.state.pairs.map((pair) => (
                        <div className="print-only simple-paper">
                            <p>{pair.index}</p>
                            <div className="simple-paper-address">
                                <div>address</div>
                                <div id="addr-QR">
                                    <QRCode
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        level="L"
                                        style={{ width: 96 }}
                                        value={pair.addr}
                                    />
                                </div>
                            </div>
                            <div className="simple-paper-privkey">
                                <div>private key</div>
                                <div id="wif-QR">
                                    <QRCode
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        level="L"
                                        style={{ width: 96 }}
                                        value={pair.wif}
                                    />
                                </div>
                            </div>
                        </div>
                    ))

                :   // not paper
                    null
                }

                <hr />
                <Row className="r3">
                    <Col>
                        <p>
                            Generating several addresses at once can be useful for accepting ZEN payments on your website. You can import these addresses into your database and use a different address for each payment you receive. You can easily add more addresses into your database by choosing the right start index to complete your list of addresses.
                        </p>
                        <p>
                          <b>Image Quality:</b> print this wallet with Chrome for a better quality. Some elements can be misplaced with Firefox
                        </p>
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default Bulk;
