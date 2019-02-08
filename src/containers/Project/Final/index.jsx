// BLOOMTIME DESIGN 2019
import React from 'react';

//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';

//Figma Embed import
import FigmaEmbed from 'react-figma-embed';

//IMPROT UTILITIES
import { withAuthorization } from '../../../utilities/Session';

const ClientFinal = ({ }) => (
    <div class="ui stackable grid container" >
        <div class="row">

            <FigmaEmbed url="https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File" />
        </div>
        <div class="row">
            <YoutubeEmbedVideo videoId="3YG4h5GbTqU" suggestions={false} />
        </div>
        <div class="row">
            <button type="button"><a href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{ textDecoration: 'none', color: "black" }}>Google Drive Folder</a></button>
        </div>
        <div class="row" style={{ height: 400 }}>
            <ReactTypeformEmbed popup={false} url="https://demo.typeform.com/to/njdbt5" />
        </div>
    </div >

);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(ClientFinal);
