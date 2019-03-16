// BLOOMTIME DESIGN 2019
import React from 'react';

const TasteProfile = (props) => (
    <div>
        {props.edit ? (
        <TasteProfileEdit />
        ) : (
        <TasteProfileView />
        )}
    </div>
);

const TasteProfileView = () => {
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
    </div>
    )
}

const TasteProfileEdit = () => {
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
    </div>
    )
}

export default TasteProfile;