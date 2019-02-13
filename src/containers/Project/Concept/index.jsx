// BLOOMTIME DESIGN 2019
import React from 'react';

//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';


//IMPROT UTILITIES
import { withAuthorization } from '../../../utilities/Session';

const ClientConcept = ({ }) => (
    <div class="ui stackable grid container" >
        <div class="row">
            <YoutubeEmbedVideo videoId="ygggcqKmUts" suggestions={false} />
        </div>
        <div class="row" style={{ height: 400 }}>
            <ReactTypeformEmbed popup={false} url="https://demo.typeform.com/to/njdbt5" />
        </div>
        <div class="row">
            <button type="button"><a href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{ textDecoration: 'none', color: "black" }}>Google Drive Folder</a></button>
        </div>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ClientConcept);

