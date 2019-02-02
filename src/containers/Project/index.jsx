// BLOOMTIME DESIGN 2019
import React from 'react';

//React Router Import
import { BrowserRouter, Route, Link } from 'react-router-dom';
import * as ROUTES from '../../utilities/constants/routes';
//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';


//Figma Embed import
import FigmaEmbed from 'react-figma-embed';

//IMPROT UTILITIES
import { withAuthorization } from '../../utilities/Session';

import tempLogo from '../../Images/TempLogo.JPG';

const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <BrowserRouter>
            <div>
                <li>
                    <Link to={ROUTES.CLIENT_CONCEPT}>Client Concept</Link>
                </li>
                <li>
                    <Link to={ROUTES.CLIENT_REVISIONS}>Client Revisions</Link>
                </li>
                <li>
                    <Link to={ROUTES.CLIENT_BRIEF}>Client Design Brief</Link>
                </li>
                <li>
                    <Link to={ROUTES.CLIENT_FINAL}>Client Final</Link>

                </li>
                <Route path={ROUTES.CLIENT_CONCEPT} component={ClientConcept} />
                <Route path={ROUTES.CLIENT_REVISIONS} component={ClientRevisions} />
                <Route path={ROUTES.CLIENT_BRIEF} component={ClientDesignBrief} />
                <Route path={ROUTES.CLIENT_FINAL} component={ClientFinal} />
            </div>
        </BrowserRouter>
    </div>
);
const ClientDesignBrief = ({ }) => (
    <div style={{ width: '800px' }}>
        <div style={{ float: 'right', paddingRight: 100 }}>
            <img src={tempLogo} />
        </div>
        <h3>Design Brief:</h3>

        <div style={{ height: '600px', paddingLeft: '100px' }}>
            <ProjectHeader />
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
);
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
//Creates the variables to use for the
var createReactClass = require('create-react-class');
var ProjectHeader = createReactClass({
    render: function () {
        var ClientName = "[Client Name]";
        var Address = "[Client Address]";
        return <h3>{ClientName} Project at {Address}</h3>;
    }

});

var MailFunction = createReactClass({
    render: function () {
        var ClientName = "[Client Name]";
        var Address = "[Client Address]";
        var email = "mailto:info@bloomtimedesign.co?subject=" + { ClientName } + '\'s Design Brief at ' + { Address };
        return <a href={email}> Here</a>
    }

});


var GoalList = createReactClass({
    render: function () {
        var goalOne = "Goal 1";
        var goalTwo = "Goal 2";
        var goalThree = "Goal 3";
        return (
            <ul>
                <li>{goalOne}</li>
                <li>{goalTwo}</li>
                <li>{goalThree}</li>
            </ul>
        );
    }

});

var DetailList = createReactClass({
    render: function () {
        var PropertyLocation = "[Location on property]";
        var BudgetRange = "[budget range]";
        var GoogleMapsURL = "https://www.google.com/maps";
        return (
            <ul>
                <li>Located on the {PropertyLocation}<br />See it on <a href={GoogleMapsURL}>Google Maps</a></li>
                <br></br> {/*Temp break until the gap is styled with css*/}
                <li>Budget: {BudgetRange}</li>
            </ul>
        );
    }

});

var MediaList = createReactClass({
    render: function () {
        var GoogleDocsURL = "https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing";
        return (
            <a href={GoogleDocsURL}>Click here for site plan, sun map, photos, etc.</a>
        );
    }

});

var Narrative = createReactClass({
    render: function () {
        var NarrativeText = "[Narrative Text]";
        return (
            <p>{NarrativeText}</p>
        );
    }

});

var TasteProfile = createReactClass({
    render: function () {

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

});


const ClientConcept = ({ }) => (
    <ul>
        <YoutubeEmbedVideo videoId="ygggcqKmUts" suggestions={false} />
        <button type="button"><a href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{ textDecoration: 'none', color: "black" }}>Google Drive Folder</a></button>
        <div style={{height: 300}}>
            {/*Typeform is wonky and overlapping other elements, put it at a fixed position for now*/}
            <ReactTypeformEmbed style={{ height: 550, marginLeft: 660, paddingTop: 300}} popup={false} url="https://demo.typeform.com/to/njdbt5" />
        </div>
    </ul>
);

const ClientFinal = ({ }) => (
    <ul>
        <FigmaEmbed
            url="https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File" />
        <YoutubeEmbedVideo videoId="3YG4h5GbTqU" suggestions={false} />
        <button type="button"><a href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{ textDecoration: 'none', color: "black" }}>Google Drive Folder</a></button>
        {/*Typeform is wonky and overlapping other elements, put it at a fixed position for now*/}
        <div style={{ height: 400 }}>
            <ReactTypeformEmbed style={{ height: 250, marginTop: 800 }} popup={false} url="https://demo.typeform.com/to/njdbt5" />
        </div>
    </ul>
);

const ClientRevisions = ({ }) => (
    <ul>
        <FigmaEmbed
            url="https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File" />
        <button type="button"><a href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{ textDecoration: 'none', color: "black" }}>Google Drive Folder</a></button>
    </ul>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);

