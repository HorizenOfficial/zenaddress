import React, { Component }             from 'react';
import { Tabs, Tab, Row, Col, Grid }    from 'react-bootstrap';

import Single   from "./Single";
import Brain    from "./Brain";
import Bulk     from "./Bulk";
import Details  from "./Details";
import Multisig from "./Multisig";
import Paper    from "./Paper";

export default class MainPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeNavTab: 0
        };
    }

    getCategories() {
        return [
            { id: 0,    title: "Single Address",        content: Single },
            { id: 1,    title: "Paper",             content: Paper },
            { id: 2,    title: "Brain Wallet",          content: Brain },
            { id: 3,    title: "Multisig Wallet",       content: Multisig },
            { id: 4,    title: "Bulk Wallet",           content: Bulk },
            { id: 5,    title: "Wallet Details",        content: Details }
        ];
    }

    renderContent(id) {
        const Comp = this.getCategories()[id].content;
        return <Comp />;
    }

    renderNav() {
        return (
            <Tabs id="nav" bsStyle="pills" justified
                activeKey={this.state.activeNavTab}
                onSelect={(key) => this.setState({activeNavTab: key})}
                className = "zenTabsWrap"
            >
                {this.getCategories().map((category) => (
                    <Tab key={category.id}
                        eventKey={category.id}
                        title={category.title}
                        className="zenTabs clearfix"
                    >
                        {this.renderContent(category.id)}
                    </Tab>
                ))}
            </Tabs>
        );
    }


    render() {
        return (
            <div id="body">
                <Grid>
                    <Row>
                        <Col sm={12}>
                            {this.renderNav()}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
