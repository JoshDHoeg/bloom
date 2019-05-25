import React, { Component } from 'react';
//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';

//Figma Embed import
import FigmaEmbed from 'react-figma-embed';

import backgroundTemp from '../../../../../Images/TempBackground.PNG';
import { withAuthorization } from '../../../../../utilities/Session/index';

class Completed extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            tempURL: 'www.google.com',
            figmaTempURL: 'https://www.figma.com/file/ggEHJtusFHITsrjRhvjtJZY5/Bloomtime-Platform-v2?node-id=0%3A1',
            tempYoutube: 'LwZI1isnvPQ',
            feedback: 'Enter feedback here!',
            showVideo: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.videoToggle = this.videoToggle.bind(this);
    }

    handleChange(event) {
        this.setState({
            feedback: event.target.value
        });
    }

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.feedback);
        event.preventDefault();
    }

    videoToggle(event) {
        this.setState({
            showVideo: !this.state.showVideo
        })
    }

    render() {
        let videoPortion;
        let buttonPortion;
        
        if(this.state.showVideo){
            videoPortion = <div className="row">
                <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                    <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Video Explanation</h1>
                    <YoutubeEmbedVideo videoId={this.state.tempYoutube} suggestions={false} style={{ width: "600px", padding: "30px" }} />
                </div>
            </div>;

            buttonPortion = <div className="row">
                <button>MEDIA WHAT AM I DOING????</button>
                <button onClick={this.videoToggle}>Hide Video</button>
            </div>;
        } else {
            buttonPortion = <div className="row">
                <button>MEDIA WHAT AM I DOING????</button>
                <button onClick={this.videoToggle}>Show Video</button>
            </div>;
        }

    




        return (
                <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat',  marginLeft: "-14px", paddingLeft: "14px" }}>
                    <div className="ui stackable grid container" >
                        <div className="row" style={{ paddingTop: "40px" }}>
                            <h1>Rough Draft</h1>
                        </div>
                        <div className="row">
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                                <FigmaEmbed url={this.state.figmaTempURL} style={{ width: "540px", margin: "30px" }}/>
                            </span>
                        </div>
                        {buttonPortion}
                        {videoPortion}
                        <div className="row">
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", 
                                paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px", 
                                width: "600px"}}>Feedback</h1>
                                <form onSubmit={this.handleSubmit} style={{padding: "30px", width: "600px"}}>
                                    <textarea value={this.state.feedback} 
                                    onChange={this.handleChange} style={{padding: "30px", width: "540px"}} />
                                    <input type="submit" value="Submit" />
                                </form>
                            </span>
                        </div>
                    </div >
                </div>
        );
    }

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Completed);