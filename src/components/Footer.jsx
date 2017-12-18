import React, { Component } from 'react';
import { Grid, Row, Col }   from 'react-bootstrap';

export default class Footer extends Component {
    render() {
        return (
            <Grid fluid={true} id="footer">
                <br />
                <Row>
                    <Col md={8} style={{padding:'10px 15px'}}>
                        <p>
                            MAKE SURE YOU ARE ON <b>ZENPAPERWALLET.COM</b>
                        </p>
                        <br />
                        <p>
                            Sources are available <a href="https://github.com/ZencashOfficial/zenaddress">here</a>.
                        </p>
                        <br />
                        <p>
                            If you have any question or suggestion, email me Gniar at protonmail.com or find me on slack/discord/telegram @ Gniar.
                        </p>
                    </Col>
                    <Col md={4}>
                        <h4>Get involved</h4>
                        <ul>
                            <li>
                                <a href="https://zensystem.io">
                                    website
                                </a>
                            </li>
                            <li>
                                <a href="https://blog.zensystem.io/">
                                    blog
                                </a>
                            </li>
                            <li>
                                <a href="https://forum.zensystem.io/">
                                    forum
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/ZencashOfficial">
                                    github
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/zencash/">
                                    facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/zencashofficial">
                                    twitter
                                </a>
                            </li>
                            <li>
                                <a href="https://t.me/zencash">
                                    telegram
                                </a>
                            </li>
                            <li>
                                <a href="https://discordapp.com/invite/9kXQFHx">
                                    discord
                                </a>
                            </li>
                            <li>
                                <a href="https://bitcointalk.org/index.php?topic=2047435.0">
                                    bitcointalk
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/channel/UCQ0v_lUnZHIKUQUXJzfgqOg">
                                    youtube
                                </a>
                            </li>
                            <li>
                                <a href="https://www.reddit.com/r/ZenSys/">
                                    reddit
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <br />
            </Grid>
        );
    }
}
