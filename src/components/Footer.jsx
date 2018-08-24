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
                                <a href="https://horizen.global">
                                    <img src={website} alt="website"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://blog.horizen.global/">
                                    <img src={blogger} alt="blogger"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://forum.horizen.global/">
                                    <img src={forum} alt="forum"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/ZencashOfficial">
                                    <img src={github} alt="github"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/horizenglobal/">
                                    <img src={facebook} alt="facebook"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/horizenglobal/">
                                    <img src={twitter} alt="twitter"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://horizen.global/invite/telegram">
                                   <img src={telegram} alt="telegram"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://discordapp.com/invite/Hu5mQxR">
                                    <img src={discord} alt="discord"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://bitcointalk.org/index.php?topic=2047435.0">
                                    <img src={bitcointalk} alt="bitcointalk"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/channel/UCQ0v_lUnZHIKUQUXJzfgqOg">
                                    <img src={youtube} alt="youtube"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.reddit.com/r/Horizen/">
                                    <img src={reddit} alt="reddit"/>
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={12}>
                        <p className="footerCopyright">
                            Addresses and Keys are generated client-side.
                            This project is <a href="https://github.com/ZencashOfficial/zenaddress">opensource</a> under MIT licence.
                        </p>
                        <p className="footerCopyright">
                            If you have any question or suggestion, email me <b>Gniar@pm.me</b> or find me on
                            slack/discord/telegram <b>@Gniar</b>.
                        </p>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
