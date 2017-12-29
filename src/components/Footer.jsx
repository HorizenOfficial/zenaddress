import React, { Component } from 'react';
import { Grid, Row, Col }   from 'react-bootstrap';

import website from "../website.png";
import blogger from "../blogger.png";
import forum from "../forum.png";
import github from "../github.png";
import facebook from "../facebook.png";
import twitter from "../twitter.png";
import telegram from "../telegram.png";
import discord from "../discord.png";
import bitcointalk from "../bitcointalk.png";
import youtube from "../youtube.png";
import reddit from "../reddit.png";

export default class Footer extends Component {
    render() {
        return (
            <Grid fluid={true} id="footer">
                <br />
                <Row>
                    <Col md={12} className="footerSocialWrap">
                        <ul className="footerSocial">
                            <li>
                                <a href="https://zensystem.io">
                                    <img src={website} />
                                </a>
                            </li>
                            <li>
                                <a href="https://blog.zensystem.io/">
                                    <img src={blogger} />
                                </a>
                            </li>
                            <li>
                                <a href="https://forum.zensystem.io/">
                                    <img src={forum} />
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/ZencashOfficial">
                                    <img src={github} />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/zencash/">
                                    <img src={facebook} />
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/zencashofficial">
                                    <img src={twitter} />
                                </a>
                            </li>
                            <li>
                                <a href="https://t.me/zencash">
                                   <img src={telegram} />
                                </a>
                            </li>
                            <li>
                                <a href="https://discordapp.com/invite/9kXQFHx">
                                    <img src={discord} />
                                </a>
                            </li>
                            <li>
                                <a href="https://bitcointalk.org/index.php?topic=2047435.0">
                                    <img src={bitcointalk} />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/channel/UCQ0v_lUnZHIKUQUXJzfgqOg">
                                    <img src={youtube} />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.reddit.com/r/ZenSys/">
                                    <img src={reddit} />
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={12}>
                        <p className="footerCopyright">
                            If you have any question or suggestion, email me
                            <a href="https://gmail.com/Gniar@protonmail.com">Gniar@protonmail.com</a> or find me on slack/discord/telegram
                             <a href="https://twitter.com/@ Gniar.">@Gniar</a>.
                        </p>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
