// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPROT UTILITIES
import { withAuthorization } from '../../../utilities/Session';

import backgroundTemp from '../../../Images/TempBackground.PNG';
import AuthButton from '../../../components/AuthButton';

class ClientDesignBrief extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            project: null,
            brief: {
                goals: [],
                location: '',
                budget: ['', ''],
                narrative: ''
            },
            client: {
                name: '',
                client: false
            }
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.getProjectState();
        // this.setState(this.getProjectState());
    }

    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject('userAuthID', true);
        const briefs = await project.briefs;
        const client = await project.client;
        const state = await {
            project: project,
            brief: briefs[0],
            client: client,
            loading: false
        }
        this.setState(state);
        return state;
    }


    render() {

        const isDesigner = true ? this.state.client.isDesigner : false;

        const DesignerButton = () => (
            <div>
                <input id='ClientButton' type="button" value="View Client" onClick={ClientView} />
                <input id='DesignerButton' style={{ display: 'none' }} type="button" value="View Designer" onClick={DesignerView} />
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
        //dont need this yet
        /*
                const MailFunction = () => {
                    var Address = "[Client Address]";
                    var email = "mailto:info@bloomtimedesign.co?subject=" + this.state.client.name + '\'s Design Brief at ' + Address;
                    return <a href={email}> Here</a>
        
                }
        */
        const GoalList = () => {
            return (
                <div>
                    <div>
                        <ul id="goals">
                            {this.state.brief.goals.map((g, i) => (
                                <li key={i} id={`goal${i}`}>{g}</li>
                            ))}
                            
                        </ul>
                        
                        <div id='GoalsEdit' style={{ display: 'none', listStyleType: 'none', paddingBottom: "15px" }}>
                            {this.state.brief.goals.map((g, i) => (
                                <li key={i}>
                                    <input type="text" id={`Goal${i}Text`} defaultValue={g} style={{}} />
                                </li>
                            ))}
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <input id='GoalEditBtn' type="button" value="Edit" style={{ visibility: 'visible' }} onClick={GoalViewFunc.bind(this, false)} />
                            <input id='GoalSubmit' type="button" value="Submit" style={{ display: "none" }} onClick={GoalViewFunc.bind(this, true)} />
                        </div>
                    </div>
                </div>
            )
        };
        //note from Taylor to Taylor: Change all from visibility to display
        const GoalViewFunc = (submit = false, ) => {
            if (submit) {
                document.getElementById('goals').style.display = "inherit";
                document.getElementById('GoalSubmit').style.display = "none";
                document.getElementById('GoalEditBtn').style.display = "initial";
                document.getElementById('GoalsEdit').style.display = "none";
                console.log(document.getElementById('Goal0Text').value);
                updateGoals();
                

            } else {
                document.getElementById('goals').style.display = "none";
                document.getElementById('GoalSubmit').style.display = "inherit";
                document.getElementById('GoalEditBtn').style.display = "none";
                document.getElementById('GoalsEdit').style.display = "inherit";
            }
        }

        const updateGoals = () => {
                this.state.brief.goals = [document.getElementById('Goal0Text').value, document.getElementById('Goal1Text').value, document.getElementById('Goal2Text').value]
        }

        const DetailList = () => {
            var GoogleMapsURL = "https://www.google.com/maps";
            return (
                <div>
                    <ul>
                        <li id="LocationDisplay">Located on the {this.state.brief.location}<br />See it on <a target="_blank" rel="noopener noreferrer" href={GoogleMapsURL}>Google Maps</a></li>
                        <li id="LocationEdit" style={{ display: 'none' }}>Located on the <input type="text" id="LocationEditTxt" defaultValue={this.state.brief.location} style={{ width: '140px' }}></input><br />See it on <a href={GoogleMapsURL}>Google Maps</a></li>
                        <br></br> {/*Temp break until the gap is styled with css*/}
                        <li id='BudgetDisplay'>Budget: {this.state.brief.budget}</li>
                        <li id="BudgetEdit" style={{ display: 'none' }}>Budget: <input type="text" id="BudgetEditTxt" defaultValue={this.state.brief.budget} style={{ width: '140px' }} ></input></li>
                    </ul>
                    <div style={{ textAlign: "center" }}>
                        <input id="DetailEdit" type="button" value="Edit" onClick={DetailViewFunc} />
                        <input id="DetailSubmit" type="button" value="Submit" onClick={DetailViewFunc} style={{ display: 'none' }} />
                    </div>
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
                updateDetails()
            }
        }

        const updateDetails = () => {
            this.state.brief.location = document.getElementById('LocationEditTxt').value   
            this.state.brief.budget = document.getElementById('BudgetEditTxt').value           
    }

        var Narrative = () => {
            return (
                <div >
                    <p id="NarrativeTxt" style={{ visibility: 'visible' }}>{this.state.brief.narrative}</p>
                    <input type="text" id="EditNarrativeTxt" defaultValue={this.state.brief.narrative} style={{ display: "none" }} />
                    <br />
                    <input id="NarrativeEdit" type="button" value="Edit" onClick={NarrativeViewFunc} />
                    <input type="button" id="NarrativeTxtSubmit" value="Submit" style={{ display: "none" }} onClick={NarrativeEditFunc} />
                </div>
            );
        }
        //edit this shit
        const NarrativeViewFunc = () => {
            if (document.getElementById('NarrativeTxt').style.display === "none") {
                document.getElementById('NarrativeTxt').style.display = "inherit";
                document.getElementById('EditNarrativeTxt').style.display = "none";
                document.getElementById('NarrativeTxtSubmit').style.display = "none";
                document.getElementById('NarrativeEdit').style.display = "inherit";
                updateNarrative();
            } else {
                document.getElementById('NarrativeTxt').style.display = "none";
                document.getElementById('NarrativeEdit').style.display = "none";
                document.getElementById('EditNarrativeTxt').style.display = "inherit";
                document.getElementById('NarrativeTxtSubmit').style.display = "inherit";
            }

        }

        const updateNarrative = () => {
                this.state.brief.narrative = document.getElementById('EditNarrativeTxt').value         
        }


        //Not exactly Working Yet
        const NarrativeEditFunc = () => {
            NarrativeViewFunc();
        }

        var TasteProfile = () => {

            return (
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10 }}>
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
                        <li style={{ paddingTop: 20, listStyle: 'none' }}>
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

                        <li style={{ paddingTop: 20, flexWrap: 'wrap', listStyle: 'none' }}>
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
                    <div style={{ textAlign: "center" }}>
                        <input id="TasteEdit" type="button" value="Edit" />
                    </div>
                </div>
            );

        }

        return (
            <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px" }}>
                <div className="ui stackable grid container">
                    <div className="row" style={{ paddingTop: "40px" }}>
                        <h1>Design Brief</h1>
                        <button type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "346px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><a target="_blank" rel="noopener noreferrer" href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{ textDecoration: 'none', color: "white" }}>Media</a></button>
                    </div>

                    {/*designer button not being used yet*/}
                    <DesignerButton style={{ display: 'none' }} />

                    <div className="row">
                        <span style={{ marginRight: "25px", width: "275px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Goals</h1>
                            <GoalList />
                        </span>
                        <span style={{ marginLeft: "25px", width: "275px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F2C94C", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Details</h1>
                            <DetailList />
                        </span>
                    </div>
                    <div className="row">

                        <span style={{ width: "600px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Narrative</h1>
                            <Narrative />
                        </span>
                    </div>
                    <div className="row" >

                        <span style={{ width: "600px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Taste Profile</h1>
                            <TasteProfile />
                        </span>
                    </div>
                </div>
            </div>
        );

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ClientDesignBrief);
