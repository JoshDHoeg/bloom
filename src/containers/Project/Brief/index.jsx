// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPROT UTILITIES
import { withAuthorization } from '../../../utilities/Session';

import tempLogo from '../../../Images/TempLogo.JPG';
import backgroundTemp from '../../../Images/TempBackground.PNG';

class ClientDesignBrief extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            project: "",
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.props.firebase.project('randomkey').then(project => {
            this.setState({
                project: project,
            });
        });

    }


    render() {
        var NarrativeText = "[Narrative Text]";
        const ClientName = "[Client Name]";
        const isDesigner = false;

        const DesignerButton = () => (
            <div>
                <input id='ClientButton' type="button" value="Client" onClick={ClientView} />
                <input id='DesignerButton' style={{ display: 'none' }} type="button" value="Designer" onClick={DesignerView} />
            </div>
        )

        const ClientView = () => {

            //Make sure the page isnt editable when client
            if (document.getElementById('NarrativeTxt').style.visibility === "hidden") {
                NarrativeViewFunc();
            }
            if (document.getElementById('goals').style.display === "none") {
                GoalViewFunc();
            }

            if (document.getElementById('DetailEdit').style.display === "none") {
                DetailViewFunc();
            }

            if (!isDesigner) {
                document.getElementById('GoalEditBtn').style.display = "none";
                document.getElementById('NarrativeEdit').style.display = "none";
                document.getElementById('DetailEdit').style.display = "none";
                document.getElementById('TasteEdit').style.display = "none";
                document.getElementById('ClientButton').style.display = "none"
                document.getElementById('DesignerButton').style.display = "inherit"
            }

        }

        const DesignerView = () => {
            if (!isDesigner) {
                document.getElementById('GoalEditBtn').style.display = "inherit";
                document.getElementById('NarrativeEdit').style.display = "inherit";
                document.getElementById('DetailEdit').style.display = "inherit";
                document.getElementById('TasteEdit').style.display = "inherit";
                document.getElementById('ClientButton').style.display = "inherit"
                document.getElementById('DesignerButton').style.display = "none"
            }

        }

        const MailFunction = () => {
            var Address = "[Client Address]";
            var email = "mailto:info@bloomtimedesign.co?subject=" + ClientName + '\'s Design Brief at ' + Address;
            return <a href={email}> Here</a>

        }

        const GoalList = () => {
            var goalOne = "Goal 1";
            var goalTwo = "Goal 2";
            var goalThree = "Goal 3";
            return (
                <div>
                    <div >
                        <ul id='goals'>
                            <li id="goal1">{goalOne}</li>
                            <li id="goal2">{goalTwo}</li>
                            <li id="goal3">{goalThree}</li>
                        </ul>
                        <div id='GoalsEdit' style={{ display: 'none', listStyleType: 'none', paddingBottom: "15px" }}>
                            <li><input type="text" id="Goal1Text" placeholder={goalOne} style={{}} /></li>
                            <li><input type="text" id="Goal2Text" placeholder={goalTwo} style={{}} /></li>
                            <li><input type="text" id="Goal3Text" placeholder={goalThree} style={{}} /></li>
                        </div>
                        <input id='GoalEditBtn' type="button" value="Edit" style={{ visibility: 'visible' }} onClick={GoalViewFunc} />
                        <input id='GoalSubmit' type="button" value="Submit" style={{ display: "none" }} onClick={GoalViewFunc} />
                    </div>
                </div>
            )
        };
        //note from Taylor to Taylor: Change all from visibility to display
        const GoalViewFunc = () => {
            if (document.getElementById('goals').style.display === "none") {
                document.getElementById('goals').style.display = "inherit";
                document.getElementById('GoalSubmit').style.display = "none";
                document.getElementById('GoalEditBtn').style.display = "initial";
                document.getElementById('GoalsEdit').style.display = "none";
            } else {
                document.getElementById('goals').style.display = "none";
                document.getElementById('GoalSubmit').style.display = "inherit";
                document.getElementById('GoalEditBtn').style.display = "none";
                document.getElementById('GoalsEdit').style.display = "inherit";
            }

        }

        const DetailList = () => {
            var PropertyLocation = "[Location on property]";
            var BudgetRange = "[budget range]";
            var GoogleMapsURL = "https://www.google.com/maps";
            return (
                <div>
                    <ul>
                        <li id="LocationDisplay">Located on the {PropertyLocation}<br />See it on <a href={GoogleMapsURL}>Google Maps</a></li>
                        <li id="LocationEdit" style={{ display: 'none' }}>Located on the <input type="text" placeholder={PropertyLocation} style={{ width: '140px' }}></input><br />See it on <a href={GoogleMapsURL}>Google Maps</a></li>
                        <br></br> {/*Temp break until the gap is styled with css*/}
                        <li id='BudgetDisplay'>Budget: {BudgetRange}</li>
                        <li id="BudgetEdit" style={{ display: 'none' }}>Budget: <input type="text" placeholder={BudgetRange} style={{ width: '140px' }} ></input></li>
                    </ul>
                    <input id="DetailEdit" type="button" value="Edit" onClick={DetailViewFunc} />
                    <input id="DetailSubmit" type="button" value="Submit" onClick={DetailViewFunc} style={{ display: 'none' }} />
                </div>
            )
        }

        const DetailViewFunc = () => {
            if (document.getElementById('LocationEdit').style.display === "none") {
                document.getElementById('LocationEdit').style.display = "inherit";
                document.getElementById('BudgetEdit').style.display = "inherit";
                document.getElementById('LocationDisplay').style.display = "none";
                document.getElementById('BudgetDisplay').style.display = "none";
                document.getElementById('DetailEdit').style.display = "none";
                document.getElementById('DetailSubmit').style.display = "inherit";
            } else {
                document.getElementById('LocationEdit').style.display = "none";
                document.getElementById('BudgetEdit').style.display = "none";
                document.getElementById('LocationDisplay').style.display = "inherit";
                document.getElementById('BudgetDisplay').style.display = "inherit";
                document.getElementById('DetailEdit').style.display = "inherit";
                document.getElementById('DetailSubmit').style.display = "none";
            }
        }

        var MediaList = () => {
            var GoogleDocsURL = "https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing";
            return (
                <a href={GoogleDocsURL}>Click here for site plan, sun map, photos, etc.</a>
            );
        }

        var Narrative = () => {
            return (
                <div>
                    <input id="NarrativeEdit" type="button" value="Edit" onClick={NarrativeViewFunc} />
                    <br></br>
                    <input type="text" id="EditNarrativeTxt" placeholder={NarrativeText} style={{ visibility: 'hidden' }} />
                    <input type="button" id="NarrativeTxtSubmit" value="Submit" style={{ visibility: 'hidden' }} onClick={NarrativeEditFunc} />
                    <p id="NarrativeTxt" style={{ visibility: 'visible' }}>{NarrativeText}</p>

                </div>
            );
        }
        const NarrativeViewFunc = () => {
            if (document.getElementById('NarrativeTxt').style.visibility === "hidden") {
                document.getElementById('NarrativeTxt').style.visibility = "visible";
                document.getElementById('EditNarrativeTxt').style.visibility = "hidden";
                document.getElementById('NarrativeTxtSubmit').style.visibility = "hidden";
                document.getElementById('NarrativeEdit').style.visibility = "visible";
            } else {
                document.getElementById('NarrativeTxt').style.visibility = "hidden";
                document.getElementById('NarrativeEdit').style.visibility = "hidden";
                document.getElementById('EditNarrativeTxt').style.visibility = "visible";
                document.getElementById('NarrativeTxtSubmit').style.visibility = "visible";
            }

        }


        //Not exactly Working Yet
        const NarrativeEditFunc = () => {
            NarrativeViewFunc();
            NarrativeText = document.getElementById('NarrativeTxt').value;
        }

        var TasteProfile = () => {

            return (
                <div>
                    <div style={{ width: 270, fontSize: 10 }}>
                        <li style={{ fontSize: 13, listStyle: 'none' }}>
                            <h5>Spacing</h5>
                            <p>Wide &nbsp; | &nbsp; Medium &nbsp; | &nbsp; Full &nbsp; | &nbsp; Lush
                    </p>

                            <h5>Spacing</h5>
                            <p>Repetitive &nbsp; | &nbsp; Massings &nbsp; | &nbsp; Groups &nbsp; | &nbsp; Mixed
                    </p>

                            <h5>Spacing</h5>
                            <p>V. Straight &nbsp; | &nbsp; Straight &nbsp; | &nbsp; Curious &nbsp; | &nbsp; V. Curved
                    </p>
                        </li>
                        <li style={{ paddingTop: 20, float: 'left', listStyle: 'none' }}>
                            <h5>Ground Cover</h5>
                            <input type="checkbox"></input>
                            <label style={{ paddingRight: "10px" }}> Rocks &amp; Stone</label>
                            <input type="checkbox"></input>
                            <label style={{ paddingRight: "10px" }}> Mulch</label>
                            <input type="checkbox"></input>
                            <label style={{ paddingRight: "10px" }}> Spreading</label>
                            <input type="checkbox"></input>
                            <label style={{ paddingRight: "10px" }}> Mix</label>
                        </li>

                        <li style={{ paddingTop: 20, flexWrap: 'wrap', float: 'left', listStyle: 'none' }}>
                            <h5>Plant Form</h5>
                            <input type="checkbox"></input>
                            <label style={{ paddingRight: "10px" }}> Flat &amp; Spreading</label>
                            <input type="checkbox"></input>
                            <label style={{ paddingRight: "10px" }}> Small</label>
                            <input type="checkbox"></input>
                            <label style={{ paddingRight: "10px" }}> Medium/Upright</label>
                            <br /> {/*Temp break until styling*/}
                            <input type="checkbox"></input>
                            <label style={{ paddingRight: "10px" }}> Shrubs &amp; Hedges</label>
                            <input type="checkbox"></input>
                            <label style={{ paddingRight: "10px" }}> Climbing</label>
                        </li>
                    </div>
                    {/*Does nothing yet*/}
                    <input id="TasteEdit" type="button" value="Edit" />
                </div>
            );

        }

        return (
            <div style={{ paddingTop: "40px", float: 'left', height: "100vh", width: "100vw", backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat' }}>
                <div style={{ paddingLeft: '40px' }}>
                <div class="row" style={{ paddingTop: "40px" }}>
                <h1>Design Brief</h1>
                <button type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "242px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><a href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{ textDecoration: 'none', color: "white" }}>Media</a></button>
            </div>
                    <DesignerButton />
                    <div style={{ float: 'right' }}>
                        <img src={tempLogo} alt="logo" />
                    </div>
                    <div style={{ width: '600px' }}>
                        <div style={{ float: 'left', backgroundColor: "white" }}>
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Goals</h1>
                                <GoalList />
                            </span>
                        </div>
                        <div style={{ float: 'right', backgroundColor: "white" }}>
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#F2C94C", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Details</h1>
                                <DetailList />
                            </span>
                            <h3>Media</h3>
                            <MediaList />
                        </div>
                    </div>
                    <div style={{ float: 'left'}}>
                        <div style={{ width: '600px' }}>
                            <div style={{ float: 'left', backgroundColor: "white" }}>
                                <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                    <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Narrative</h1>
                                    <Narrative />
                                </span>
                            </div>
                            <div style={{ float: 'right', backgroundColor: "white" }}>
                                <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                    <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Taste Profile</h1>
                                    <TasteProfile />
                                    <div style={{ paddingTop: 40 }}>
                                        <h3>Comments? Click <MailFunction /></h3>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ClientDesignBrief);
