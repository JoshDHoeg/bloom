// BLOOMTIME DESIGN 2019
import React from 'react';

//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';

import backgroundTemp from '../../../Images/TempBackground.PNG';

//IMPROT UTILITIES
import { withAuthorization } from '../../../utilities/Session';

const ClientConcept = () => (
    <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat' }}>
        <div class="ui stackable grid container">
            <div class="row">
                <span id="test" style={{ backgroundColor: "white"}}>
                    <h1 style={{backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px"}}>The Design</h1>
                    <YoutubeEmbedVideo videoId="ygggcqKmUts" suggestions={false} style={{ width: "600px", padding: "30px" }} />
                </span>
            </div>
            <div class="row" style={{ height: 400 }}>
                {/*Typeform being a bitch again*/}
                <span style={{ backgroundColor: "white", padding: "30px", width: "600px" }}>
                    <ReactTypeformEmbed popup={false} url="https://demo.typeform.com/to/njdbt5" style={{ width: 'inherit' }} />
                </span>
            </div>
            <div class="row">
                <button type="button"><a href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{ textDecoration: 'none', color: "black" }}>Google Drive Folder</a></button>
            </div>
        </div>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ClientConcept);

