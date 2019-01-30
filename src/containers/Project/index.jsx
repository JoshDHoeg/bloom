// BLOOMTIME DESIGN 2019
import React from 'react';

//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';

//IMPROT UTILITIES
import { withAuthorization } from '../../utilities/Session';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <ClientConcept/>
  </div>
);

const ClientConcept = ({ }) => (
  <ul>
    <YoutubeEmbedVideo videoId="ygggcqKmUts" suggestions={false}/>
    <button type="button"><a href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{textDecoration: 'none', color: "black"}}>Google Drive Folder</a></button>
   {/* <ReactTypeformEmbed id="form" popup={true} autoOpen={true} url="https://demo.typeform.com/to/njdbt5" /> */}
  </ul>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
