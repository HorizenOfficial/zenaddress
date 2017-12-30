import React, { Component } from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl, ProgressBar }
from 'react-bootstrap';

import {randomBytes} from 'crypto-browserify';

class Entropy extends Component {
    constructor(props) {
        super(props);
        this.state = {
          random: randomBytes(1),
          isStillSeeding: true,
          seedLimit: 200 + Math.floor(randomBytes(12)[11]),
          seedCount: 0,
          lastInputTime: new Date().getTime(),
          seedPoints: []
        };
    }

    seed(e){
        const timeStamp = new Date().getTime();
        const timeDiff = timeStamp - this.state.lastInputTime;
        // seeding is over now we generate and display the address
        if (this.state.seedCount === this.state.seedLimit) {
            this.state.seedCount++;

            console.log(this.state.random.toString('hex'));
            this.removePoints();
        }
        // seed mouse position X and Y when mouse movements are greater than 40ms apart.
        else if ((this.state.seedCount < this.state.seedLimit)
                && e
                && (timeDiff) > 40) {

            this.setState({random: this.mergeTypedArrays(
                this.state.random,
                randomBytes(((timeDiff + e.clientX + e.clientY) % 65535 ) | 0)
            )});

            this.showPoint(e.clientX, e.clientY);

            this.state.seedCount++;
            this.setState({lastInputTime: timeStamp});
        }
    }

    mergeTypedArrays(a, b) {
        // Checks for truthy values on both arrays
        if(!a && !b) console.error('Please specify valid arguments for parameters a and b.');

        // Checks for truthy values or empty arrays on each argument
        // to avoid the unnecessary construction of a new array and
        // the type comparison
        if(!b || b.length === 0) return a;
        if(!a || a.length === 0) return b;

        // Make sure that both typed arrays are of the same type
        if(Object.prototype.toString.call(a) !== Object.prototype.toString.call(b))
            console.error('The types of the two arguments passed for parameters a and b do not match.');

        var c = new a.constructor(a.length + b.length);
        c.set(a);
        c.set(b, a.length);

        return c;
    }

    seedKeyPress(e) {
        if (this.state.seedCount === this.state.seedLimit) {
            this.state.seedCount++;

            console.log(this.state.random.toString('hex'));
            this.removePoints();
        }
        else if ((this.state.seedCount < this.state.seedLimit) && e.key) {
            const timeStamp = new Date().getTime();
            const timeDiff = timeStamp - this.state.lastInputTime;
            const keyCode = e.key.charCodeAt(0);

            this.setState({random: this.mergeTypedArrays(
                this.state.random,
                randomBytes(((timeDiff + keyCode) % 65535 ) | 0)
            )});

            this.state.seedCount++;
            this.setState({lastInputTime: timeStamp});
        }
    }

    getSeedingProgress(){
      return(
        Math.trunc((this.state.seedCount * 100) / this.state.seedLimit)
      );
    }

    showPoint(x, y) {
        var div = document.createElement("div");
        div.setAttribute("class", "seedpoint");
        div.style.top = y + "px";
        div.style.left = x + "px";
        document.body.appendChild(div);
        this.state.seedPoints.push(div);
    }

    removePoints() {
        for (let i = 0; i < this.state.seedPoints.length; i++) {
            document.body.removeChild(this.state.seedPoints[i]);
        }
        this.setState({seedPoints: []});
    }

    render() {
        return (
          <Col md={12} id="Entropy">
              <Row className="r3">
                  <Col>
                      <ProgressBar
                        now={this.getSeedingProgress()}
                        label={`${this.getSeedingProgress()}%`} />
                      <div id="seedMouseBox"
                          onMouseMove={e => this.seed(e)}
                      ><p>Move your mouse randomly in this area</p></div>
                      <p>
                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Type random keys from your keyboard here :</ControlLabel>
                            <FormControl
                                type="text"
                                onKeyPress={e => this.seedKeyPress(e)}
                            />
                        </FormGroup>
                      </p>
                      <p>
                          You can choose how many people has a key, and how many keys are needed to manage the funds.
                      </p>
                  </Col>
              </Row>
          </Col>
        );
    }
}

export default Entropy;
