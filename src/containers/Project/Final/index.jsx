// BLOOMTIME DESIGN 2019
import React from 'react';

//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';

//Figma Embed import
import FigmaEmbed from 'react-figma-embed';

//IMPROT UTILITIES
import { withAuthorization } from '../../../utilities/Session';

import ProjectSteps from '../../../components/ProjectNav';

const ClientFinal = ({ }) => (
    <div>
     
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
    </div>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(ClientFinal);

