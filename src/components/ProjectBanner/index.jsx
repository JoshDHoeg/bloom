// BLOOMTIME DESIGN 2019
import React from 'react';
import { withAuthorization } from '../../utilities/Session';
import {Link} from "react-router-dom";
import * as ROUTES from "../../utilities/constants/routes";

const ProjectBanner = (props) => (
    <div className="row" style={{ paddingTop: "40px" }}>
        <h1>Design Brief</h1>
        {props.edit ? (
          <button type="button" style={{ backgroundColor: "#27AE60", marginLeft: "260px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_BRIEF} style={{ textDecoration: 'none', color: "white" }} >Done</Link></button>
        ) : (
          <button type="button" style={{ backgroundColor: "#27AE60", marginLeft: "260px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_BRIEF_EDIT} style={{ textDecoration: 'none', color: "white" }} >Edit</Link></button>
        )}
        <button type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "20px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><a target="_blank" rel="noopener noreferrer" href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{ textDecoration: 'none', color: "white" }}>Media</a></button>
    </div>
);


const condition = authUser =>
  authUser && !authUser._isDesigner;

export default withAuthorization(condition)(ProjectBanner);