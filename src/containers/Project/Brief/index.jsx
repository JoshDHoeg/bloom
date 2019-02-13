// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPROT UTILITIES
import { withAuthorization } from '../../../utilities/Session';

import tempLogo from '../../../Images/TempLogo.JPG';

class ClientDesignBrief extends Component {

    render() {

        const ColoredLine = ({ }) => (
            <hr
                style={{
                    color: 'black',
                    backgroundColor: 'black',
                    height: 1,
                    bottom: 0,
                }}
            />
        );

        const MailFunction = () => {

            var ClientName = "[Client Name]";
            var Address = "[Client Address]";
            var email = "mailto:info@bloomtimedesign.co?subject=" + { ClientName } + '\'s Design Brief at ' + { Address };
            return <a href={email}> Here</a>

        }

        const ProjectHeader = () => {
            var ClientName = "[Client Name]";
            var Address = "[Client Address]";
            return <h3>{ClientName} Project at {Address}</h3>;
        }

        const GoalList = () => {
            var goalOne = "Goal 1";
            var goalTwo = "Goal 2";
            var goalThree = "Goal 3";
            return (
                <ul>
                    <li>{goalOne}</li>
                    <li>{goalTwo}</li>
                    <li>{goalThree}</li>
                </ul>
            )
        };


        const DetailList = () => {
            var PropertyLocation = "[Location on property]";
            var BudgetRange = "[budget range]";
            var GoogleMapsURL = "https://www.google.com/maps";
            return (
                <ul>
                    <li>Located on the {PropertyLocation}<br />See it on <a href={GoogleMapsURL}>Google Maps</a></li>
                    <br></br> {/*Temp break until the gap is styled with css*/}
                    <li>Budget: {BudgetRange}</li>
                </ul>
            )
        }

        var MediaList = () => {
            var GoogleDocsURL = "https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing";
            return (
                <a href={GoogleDocsURL}>Click here for site plan, sun map, photos, etc.</a>
            );
        }

        var Narrative = () => {
            var NarrativeText = "[Narrative Text]";
            return (
                <p>{NarrativeText}</p>
            );
        }

        var TasteProfile = () => {

            return (
                <div style={{ width: 270, fontSize: 10 }}>

                    <li style={{ fontSize: 13, listStyle: 'none' }}>
                        <h5>Spacing</h5>
                        <p>Wide &nbsp; | &nbsp; Medium &nbsp; | &nbsp; Full &nbsp; | &nbsp; Lush
                    </p>

                        <h5>Spacing</h5>
                        <p>Repetitive &nbsp; | &nbsp; Massings &nbsp; | &nbsp; Groups &nbsp; | &nbsp; Mixed
                    </p>

                        <h5>Spacing</h5>
                        <p>V. Straight &nbsp; | &nbsp; Straight &nbsp; | &nbsp; Curious &nbsp; | &nbsp; V. Curved
                    </p>
                    </li>
                    <li style={{ paddingTop: 20, float: 'left', listStyle: 'none' }}>
                        <h5>Ground Cover</h5>
                        <input type="checkbox"></input>
                        <label style={{ paddingRight: "10px" }}> Rocks &amp; Stone</label>
                        <input type="checkbox"></input>
                        <label style={{ paddingRight: "10px" }}> Mulch</label>
                        <input type="checkbox"></input>
                        <label style={{ paddingRight: "10px" }}> Spreading</label>
                        <input type="checkbox"></input>
                        <label style={{ paddingRight: "10px" }}> Mix</label>
                    </li>

                    <li style={{ paddingTop: 20, flexWrap: 'wrap', float: 'left', listStyle: 'none' }}>
                        <h5>Plant Form</h5>
                        <input type="checkbox"></input>
                        <label style={{ paddingRight: "10px" }}> Flat &amp; Spreading</label>
                        <input type="checkbox"></input>
                        <label style={{ paddingRight: "10px" }}> Small</label>
                        <input type="checkbox"></input>
                        <label style={{ paddingRight: "10px" }}> Medium/Upright</label>
                        <br /> {/*Temp break until styling*/}
                        <input type="checkbox"></input>
                        <label style={{ paddingRight: "10px" }}> Shrubs &amp; Hedges</label>
                        <input type="checkbox"></input>
                        <label style={{ paddingRight: "10px" }}> Climbing</label>
                    </li>
                </div>
            );

        }

        return (

            <div class="ui stackable grid container" style={{ paddingTop: "40px", float: 'left', height: "100vh" }}>
                <div style={{ paddingLeft: '40px' }}>
                    <ProjectHeader />
                    <div style={{ float: 'right' }}>
                        <img src={tempLogo} />
                    </div>
                    <h1>Bloomtime Design Brief</h1>
                    <div style={{ width: '600px' }}>
                        <div style={{ float: 'left' }}>
                            <h3>Goals</h3>
                            <GoalList />
                        </div>
                        <div style={{ float: 'right' }}>
                            <h3>Details</h3>
                            <DetailList />
                            <h3>Media</h3>
                            <MediaList />
                        </div>
                    </div>
                    <div style={{ float: 'left', width: '600px' }}>
                        <ColoredLine />
                        <div style={{ width: '600px' }}>
                            <div style={{ float: 'left' }}>
                                <h3>Narrative</h3>
                                <Narrative />
                            </div>
                            <div style={{ float: 'right' }}>
                                <h3>Taste Profile</h3>
                                <TasteProfile />
                                <div style={{ paddingTop: 200 }}>
                                    <h3>Comments? Click <MailFunction /></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ClientDesignBrief);
