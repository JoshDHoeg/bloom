// import React, {Component} from 'react'
// import {Grid, Container, Header, Item, Image, Checkbox, Divider} from 'semantic-ui-react';
// import smallPlantToggle from './Components/SmallPlantToggle/smallPlantToggle';

// class pricingTool extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             Amount1: 0,
//             Amount2: 0,
//             Amount3: 0,
//             Amount4: 0,
//             Amount5: 0,
//             amount: [0, 0, 0, 0, 0],
//             overlay: ['', '', '', '', '',],
//             Max: [100, 0, 0, 0, 0],
//             state: 'Hello',
//             image: '',
//             info: '',
//         }
//     }

//     handleChange1 = e => this.setState({ Amount1: e.target.value })
//     handleChange2 = e => this.setState({ Amount2: e.target.value })
//     handleChange3 = e => this.setState({ Amount3: e.target.value })
//     handleChange4 = e => this.setState({ Amount4: e.target.value })
//     handleChange5 = e => this.setState({ Amount5: e.target.value })

//     // info_Show = () => {
//     //     let total1;
//     //     let total2;
//     //     let total3;
//     //     let total4;
//     //     let total5;
//     //     total1 = (this.state.Amount2 + this.state.Amount3 + this.state.Amount4 + this.state.Amount5);
//     //     total2 = (this.state.Amount1 + this.state.Amount3 + this.state.Amount4 + this.state.Amount5);
//     //     total3 = (this.state.Amount1 + this.state.Amount2 + this.state.Amount4 + this.state.Amount5);
//     //     total4 = (this.state.Amount1 + this.state.Amount2 + this.state.Amount3 + this.state.Amount5);
//     //     total5 = (this.state.Amount1 + this.state.Amount2 + this.state.Amount3 + this.state.Amount4);
//     //     if(total1 > (this.state.Amount1*4)){
//     //         this.setState({
//     //             state: 'Feature 1',
//     //             info: 'this is the information about feature 1',
//     //             image: 'image1'
//     //         })
//     //     }else if(total2 > (this.state.Amount2*4)){
//     //         this.setState({
//     //             state: 'Feature 2',
//     //             info: 'this is the information about feature 2',
//     //             image: 'image2'
//     //         })
//     //     }else if(total3 > (this.state.Amount3*4)){
//     //         this.setState({
//     //             state: 'Feature 3',
//     //             info: 'this is the information about feature 3',
//     //             image: 'image3'
//     //         })
//     //     }else if(total4 > (this.state.Amount4*4)){
//     //         this.setState({
//     //             state: 'Feature 4',
//     //             info: 'this is the information about feature 4',
//     //             image: 'image 4'
//     //         })
//     //     }else if(total5 > (this.state.Amount5*4)){
//     //         this.setState({
//     //             state: 'Feature 5',
//     //             info: 'this is the information about feature 5',
//     //             image: 'image 5'
//     //         })
//     //     }
//     // }


//     overLay_1 = () => {
//         let total;
//         let Division;
//         let amount;
//         let feature1_image1 = '';
//         let feature1_image2 = '';
//         let feature1_image3 = '';
//         let feature1_image4 = '';
//         let feature1_image5 = '';
//         total = this.state.Max[0];
//         Division = total/5;
//         if (this.state.Amount[0] === 1){
//             amount = (Division * this.state.Amount[0]);
//             this.state.amount[0] = amount;
//             this.state.overlay[0] = feature1_image1;
//         }else if(this.state.Amount[0] === 2){
//             amount = (Division * this.state.Amount[0]);
//             this.state.amount[0] = amount;
//             this.state.overlay[0] = feature1_image2;
//         }else if(this.state.Amount[0] === 3){
//             amount = (Division * this.state.Amount[0]);
//             this.state.amount[0] = amount;
//             this.state.overlay[0] = feature1_image3;
//         }else if(this.state.Amount[0] === 4){
//             amount = (Division * this.state.Amount[0]);
//             this.state.amount[0] = amount;
//             this.state.overlay[0] = feature1_image4;
//         }else{
//             amount = (Division * this.state.Amount[0]);
//             this.state.amount[0] = amount;
//             this.state.overlay[0] = feature1_image5;
//         }
//     }

//     overLay_2 = () => {
//         let total;
//         let Division;
//         let amount;
//         let feature2_image1 = '';
//         let feature2_image2 = '';
//         let feature2_image3 = '';
//         let feature2_image4 = '';
//         let feature2_image5 = '';
//         total = this.state.Max[1];
//         Division = total/5;
//         if (this.state.Amount[1] === 1){
//             amount = (Division * this.state.Amount[1]);
//             this.state.amount[1] = amount;
//             this.state.overlay[1] = feature2_image1;
//         }else if(this.state.Amount[1] === 2){
//             amount = (Division * this.state.Amount[1]);
//             this.state.amount[1] = amount;
//             this.state.overlay[1] = feature2_image2;
//         }else if(this.state.Amount[1] === 3){
//             amount = (Division * this.state.Amount[1]);
//             this.state.amount[1] = amount;
//             this.state.overlay[1] = feature2_image3;
//         }else if(this.state.Amount[1] === 4){
//             amount = (Division * this.state.Amount[1]);
//             this.state.amount[1] = amount;
//             this.state.overlay[1] = feature2_image4;
//         }else{
//             amount = (Division * this.state.Amount[1]);
//             this.state.amount[1] = amount;
//             this.state.overlay[1] = feature2_image5;
//         }
//     }

//     overLay_3 = () => {
//         let total;
//         let Division;
//         let amount;
//         let feature3_image1 = '';
//         let feature3_image2 = '';
//         let feature3_image3 = '';
//         let feature3_image4 = '';
//         let feature3_image5 = '';
//         total = this.state.Max[2]
//         Division = total/5;
//         if (this.state.Amount[2] === 1){
//             amount = (Division * this.state.Amount[2]);
//             this.state.amount[2] = amount;
//             this.state.overlay[2] = feature3_image1;
//         }else if(this.state.Amount[2] === 2){
//             amount = (Division * this.state.Amount[2]);
//             this.state.amount[2] = amount;
//             this.state.overlay[2] = feature3_image2;
//         }else if(this.state.Amount[2] === 3){
//             amount = (Division * this.state.Amount[2]);
//             this.state.amount[2] = amount;
//             this.state.overlay[2] = feature3_image3;
//         }else if(this.state.Amount[2] === 4){
//             amount = (Division * this.state.Amount[2]);
//             this.state.amount[2] = amount;
//             this.state.overlay[2] = feature3_image4;
//         }else{
//             amount = (Division * this.state.Amount[2]);
//             this.state.amount[2] = amount;
//             this.state.overlay[2] = feature3_image5;
//         }
//     }

//     overLay_4 = () => {
//         let total;
//         let Division;
//         let amount;
//         let feature4_image1 = '';
//         let feature4_image2 = '';
//         let feature4_image3 = '';
//         let feature4_image4 = '';
//         let feature4_image5 = '';
//         total = this.state.Max[3];
//         Division = total/5;
//         if (this.state.Amount[3] === 1){
//             amount = (Division * this.state.Amount[3]);
//             this.state.amount[3] = amount;
//             this.state.overlay[3] = feature4_image1;
//         }else if(this.state.Amount[3] === 2){
//             amount = (Division * this.state.Amount[3]);
//             this.state.amount[3] = amount;
//             this.state.overlay[3] = feature4_image2;
//         }else if(this.state.Amount[3] === 3){
//             amount = (Division * this.state.Amount[3]);
//             this.state.amount[3] = amount;
//             this.state.overlay[3] = feature4_image3;
//         }else if(this.state.Amount[3] === 4){
//             amount = (Division * this.state.Amount[3]);
//             this.state.amount[3] = amount;
//             this.state.overlay[3] = feature4_image4;
//         }else{
//             amount = (Division * this.state.Amount[3]);
//             this.state.amount[3] = amount;
//             this.state.overlay[3] = feature4_image5;
//         }
//     }

//     overLay_5 = () => {
//         let total;
//         let Division;
//         let amount;
//         let feature5_image1 = '';
//         let feature5_image2 = '';
//         let feature5_image3 = '';
//         let feature5_image4 = '';
//         let feature5_image5 = '';
//         total = this.state.Max[4];
//         Division = total/5;
//         if (this.state.Amount[4] === 1){
//             amount = (Division * this.state.Amount[4]);
//             this.state.amount[4] = amount;
//             this.state.overlay[4] = feature5_image1;
//         }else if(this.state.Amount[4] === 2){
//             amount = (Division * this.state.Amount[4]);
//             this.state.amount[4] = amount;
//             this.state.overlay[4] = feature5_image2;
//         }else if(this.state.Amount[4] === 3){
//             amount = (Division * this.state.Amount[4]);
//             this.state.amount[4] = amount;
//             this.state.overlay[4] = feature5_image3;
//         }else if(this.state.Amount[4] === 4){
//             amount = (Division * this.state.Amount[4]);
//             this.state.amount[4] = amount;
//             this.state.overlay[4] = feature5_image4;
//         }else{
//             amount = (Division * this.state.Amount[4]);
//             this.state.amount[4] = amount;
//             this.state.overlay[4] = feature5_image5;
//         }
//     }

//     // setState = () => {
//     //     const state = {
//     //         Amount: this.Amount,
//     //         amount: this.amount,
//     //         overlay: this.overlay,
//     //         Max: this.Max,
//     //         image: this.image,
//     //         info: this.info,
//     //         state: this.state
//     //     }
//     //     this.setState(state);
//     //     return state;
//     // }

//     render() {
//         const { Amount1, Amount2, Amount3, Amount4, Amount5 } = this.state;
//         console.log('state', this.state)
//         return(
//             <Grid>
//                 <Container fluid textAlign='center' text='true'>
//                     <Header>Pricing Tool</Header>
//                 </Container>
//                 <Grid.Row>
//                     <Grid columns={2}>
//                         <Grid.Column>

//                         </Grid.Column>
//                         <Grid.Column>
//                             <Grid.Row>
//                                 {/* <Header>{this.state.state}</Header> */}
//                             </Grid.Row>
//                             <Grid.Row>
//                                 {/* <Image>{this.state.image}</Image> */}
//                             </Grid.Row>
//                             <Grid.Row>
//                                 {/* <Item>{this.state.info}</Item> */}
//                             </Grid.Row>
//                         </Grid.Column>
//                     </Grid>
//                 </Grid.Row>
//                 <Grid.Row>
//                     <div>hello?</div>
//                     <smallPlantToggle amount={this.state.amount[0]} Amount={Amount1} Max={this.state.Max[0]} />
//                 </Grid.Row>
//                 <Divider/>
//                 <Grid.Row>
//                     <Grid columns={2}>
//                         <Grid.Row>
//                             <Grid.Column>
//                                 <Checkbox label='Feature 2' defaultChecked/>
//                             </Grid.Column>
//                             <Grid.Column>
//                                 <input type='range' min={1} max={5} value={Amount2} onChange={this.handleChange2} />
//                             </Grid.Column>
//                         </Grid.Row>
//                     </Grid>
//                 </Grid.Row>
//                 <Divider/>
//                 <Grid.Row>
//                     <Grid columns={2}>
//                         <Grid.Row>
//                             <Grid.Column>
//                                 <Checkbox label='Feature 3' defaultChecked/>
//                             </Grid.Column>
//                             <Grid.Column>
//                                 <input type='range' min={1} max={5} value={Amount3} onChange={this.handleChange3} />
//                             </Grid.Column>
//                         </Grid.Row>
//                     </Grid>
//                 </Grid.Row>
//                 <Divider/>
//                 <Grid.Row>
//                     <Grid columns={2}>
//                         <Grid.Row>
//                             <Grid.Column>
//                                 <Checkbox label='Feature 4' defaultChecked/>
//                             </Grid.Column>
//                             <Grid.Column>
//                                 <input type='range' min={1} max={5} value={Amount4} onChange={this.handleChange4} />
//                             </Grid.Column>
//                         </Grid.Row>
//                     </Grid>
//                 </Grid.Row>
//                 <Divider/>
//                 <Grid.Row>
//                     <Grid columns={2}>
//                         <Grid.Row>
//                             <Grid.Column>
//                                 <Checkbox label='Feature 5' defaultChecked/>
//                             </Grid.Column>
//                             <Grid.Column>
//                                 <input type='range' min={1} max={5} value={Amount5} onChange={this.handleChange5} />
//                             </Grid.Column>
//                         </Grid.Row>
//                     </Grid>
//                 </Grid.Row>
//             </Grid>
//         );
//     }
// }

// export default(pricingTool)