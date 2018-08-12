import React, { Component } from 'react';

import Header       from './components/Header';
import MainPanel    from './components/MainPanel';
import Footer       from './components/Footer';


import { QRCode }               from 'react-qr-svg';
import art1 from './zen_paper_front.png';
import art2 from './zen_paper_back.png';


class App extends Component {
    render() {
        return (
            <div id="layout">

            <Header />
            <MainPanel />
            <Footer />

            </div>
        );
    }
}

export default App;
