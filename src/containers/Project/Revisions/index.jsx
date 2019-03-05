// BLOOMTIME DESIGN 2019
import React from 'react';

//Figma Embed import
import FigmaEmbed from 'react-figma-embed';

//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';

//IMPROT UTILITIES
import { withAuthorization } from '../../../utilities/Session';

import backgroundTemp from '../../../Images/TempBackground.PNG';

const ClientRevisions = () => (
    <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat',  marginLeft: "-14px", paddingLeft: "14px" }}>
        <div class="ui stackable grid container" >
        <div class="row" style={{ paddingTop: "40px" }}>
                <h1>Revisions</h1>
                <button type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "380px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><a target="_blank" href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{ textDecoration: 'none', color: "white" }}>Media</a></button>
            </div>
            <div class="row">
                <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                    <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                    <FigmaEmbed url="https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File" style={{ width: "540px", margin: "30px" }} />
                </span>
            </div>
            <div class="row">
                {/*Typeform being a bitch again, using a hidden youtube video to keep the span's shape*/}
                <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                    <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px" , borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
                    <ReactTypeformEmbed popup={false} url="https://demo.typeform.com/to/njdbt5" style={{ width: "600px", height: "375px", padding: "30px", paddingTop: "90px" }} />
                    <YoutubeEmbedVideo suggestions={false} style={{ width: "600px", padding: "30px", visibility: "hidden" }} />
                </span>
            </div>
        </div>
    </div>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(ClientRevisions);
