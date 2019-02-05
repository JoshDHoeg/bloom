// BLOOMTIME DESIGN 2019
import React from 'react';

//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';


//IMPROT UTILITIES
import { withAuthorization } from '../../../utilities/Session';

const ClientConcept = ({ }) => (
    <div>
        <YoutubeEmbedVideo videoId="ygggcqKmUts" suggestions={false} />
        <button type="button"><a href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{ textDecoration: 'none', color: "black" }}>Google Drive Folder</a></button>
        <div style={{height: 300}}>
            {/*Typeform is wonky and overlapping other elements, put it at a fixed position for now*/}
            <ReactTypeformEmbed style={{ height: 550, marginLeft: 660, paddingTop: 300}} popup={false} url="https://demo.typeform.com/to/njdbt5" />
        </div>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ClientConcept);

