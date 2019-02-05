// BLOOMTIME DESIGN 2019
import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';

//IMPROT UTILITIES
import { withAuthorization } from '../../utilities/Session';
import * as ROUTES from "../../utilities/constants/routes";

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
    <button type="button"><a href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{textDecoration: 'none', color: "black"}}>
        Google Drive Folder</a></button>
   {/* <ReactTypeformEmbed id="form" popup={true} autoOpen={true} url="https://demo.typeform.com/to/njdbt5" /> */}
  </ul>
);

const HomePageWithSideBar = () => (
    <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} icon='labeled' inverted vertical visible width='thin'>
            <Menu.Item as={Link} to={ROUTES.DESIGN_BRIEF}>
                <Icon name='clipboard' />
                DBrief
            </Menu.Item>
            <Menu.Item as={Link} to={ROUTES.CONCEPT}>
                <Icon name='bullseye' />
                Concept
            </Menu.Item>
            <Menu.Item as={Link} to={ROUTES.FINAL}>
                <Icon name='file' />
                Final
            </Menu.Item>
            <Menu.Item as={Link} to={ROUTES.REVISIONS}>
                <Icon name='folder' />
                Revisions
            </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
            <Segment basic>
                <HomePage/>
            </Segment>
        </Sidebar.Pusher>
    </Sidebar.Pushable>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePageWithSideBar);
