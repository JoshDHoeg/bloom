// BLOOMTIME DESIGN 2019
import React from 'react';

//Figma Embed import
import FigmaEmbed from 'react-figma-embed';

//IMPROT UTILITIES
import { withAuthorization } from '../../../utilities/Session';

const ClientRevisions = ({ }) => (
    <div>

        <ul>
            <FigmaEmbed
                url="https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File" />
            <button type="button"><a href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{ textDecoration: 'none', color: "black" }}>Google Drive Folder</a></button>
        </ul>
    </div>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(ClientRevisions);
