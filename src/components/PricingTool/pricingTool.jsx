import React, {Component} from 'react'
import {Grid, Container, Header, Item, Image, Checkbox, Divider, List, Segment} from 'semantic-ui-react';
import mergeImages from 'merge-images';
import logo from '../../Images/TempLogo.JPG';
import background from '../../Images/background.png';
import blank from '../../Images/Frame Blank.png';
import A1 from '../../Images/A Frame 1.png';
import A2 from '../../Images/A Frame 2.png';
import A3 from '../../Images/A Frame 3.png';
import A4 from '../../Images/A Frame 4.png';
import A5 from '../../Images/A Frame 5.png';
import B1 from '../../Images/B Frame 1.png';
import B2 from '../../Images/B Frame 2.png';
import B3 from '../../Images/B Frame 3.png';
import B4 from '../../Images/B Frame 4.png';
import B5 from '../../Images/B Frame 5.png';
import C1 from '../../Images/C Frame 1.png';
import C2 from '../../Images/C Frame 2.png';
import C3 from '../../Images/C Frame 3.png';
import C4 from '../../Images/C Frame 4.png';
import C5 from '../../Images/C Frame 5.png';
import D1 from '../../Images/D Frame 1.png';
import D2 from '../../Images/D Frame 2.png';
import D3 from '../../Images/D Frame 3.png';
import D4 from '../../Images/D Frame 4.png';
import D5 from '../../Images/D Frame 5.png';
import E1 from '../../Images/E Frame 1.png';
import E2 from '../../Images/E Frame 2.png';
import E3 from '../../Images/E Frame 3.png';
import E4 from '../../Images/E Frame 4.png';
import E5 from '../../Images/E Frame 5.png';
import smallPlant from '../../Images/smallPlant.jpg';
import largePlant from '../../Images/largePlant.jpg';
import Tree from '../../Images/Tree.jpeg';
import Grass from '../../Images/Grass.jpg';
import Hardscape from '../../Images/Hardscape.jpg';
import PlantToggle from './Components/PlantToggle/PlantToggle';
import FeatureKey from './Components/FeatureKey/FeatureKey';

class pricingTool extends Component {
    constructor(props){
        super(props);
        this.state = {
            total: 0,
            Amount1: 25,
            Amount2: 50,
            Amount3: 125,
            Amount4: 150,
            Amount5: 100,
            key1: [true, false, false, false],
            key2: [true, false, false, false],
            key3: [true, false, false, false],
            key4: [true, false, false, false],
            key5: [true, false, false, false],
            checked1: true,
            checked2: true,
            checked3: true,
            checked4: true,
            checked5: true,
            FeatureImage1: A1,
            FeatureImage2: B1,
            FeatureImage3: C1,
            FeatureImage4: D1,
            FeatureImage5: E1,
            overlay: ['', '', '', '', '',],
            Max: [100, 200, 300, 500, 1000],
            Min: [25, 50, 100, 125, 300],
            info: [true, false, false, false, false],
            disabled: [false, false, false, false, false],
            state: 'Hello',
            image: '',
            blurb: '',
        }
        this.handleChange1=this.handleChange1.bind(this)
        this.handleChange2=this.handleChange2.bind(this)
        this.handleChange3=this.handleChange3.bind(this)
        this.handleChange4=this.handleChange4.bind(this)
        this.handleChange5=this.handleChange5.bind(this)
    }
    
    componentDidMount() {
        this.info_Show();
        this.totals();
    }

    handleChange1 = (e, Amount1) => {
        console.log('value 1 =', this.state.Amount1)
        this.setState({Amount1})
        this.info_Show();
        this.totals();
        if(this.state.checked1 === true){
            this.overLay_1();
        }
        this.state.info[0] = true;
        this.state.info[1] = false;
        this.state.info[2] = false;
        this.state.info[3] = false;
        this.state.info[4] = false;
    }

    handleChange2 = (e, Amount2) => {
        console.log('value 2 =', this.state.Amount2)
        this.setState({Amount2})
        this.info_Show();
        this.totals();
        if(this.state.checked2 === true){
            this.overLay_2();
        }
        this.state.info[0] = false;
        this.state.info[1] = true;
        this.state.info[2] = false;
        this.state.info[3] = false;
        this.state.info[4] = false;
    }

    handleChange3 = (e, Amount3) => {
        console.log('value 3 =', this.state.Amount3)
        this.setState({Amount3})
        this.info_Show();
        this.totals();
        if(this.state.checked3 === true){
            this.overLay_3();
        }
        this.state.info[0] = false;
        this.state.info[1] = false;
        this.state.info[2] = true;
        this.state.info[3] = false;
        this.state.info[4] = false;
    }

    handleChange4 = (e, Amount4) => {
        console.log('value 4 =', this.state.Amount4)
        this.setState({Amount4})
        this.info_Show();
        this.totals();
        if(this.state.checked4 === true){
            this.overLay_4();
        }
        this.state.info[0] = false;
        this.state.info[1] = false;
        this.state.info[2] = false;
        this.state.info[3] = true;
        this.state.info[4] = false;
    }

    handleChange5 = (e, Amount5) => {
        console.log('value 5 =', this.state.Amount5)
        this.setState({Amount5})
        this.info_Show();
        this.totals();
        if(this.state.checked5 === true){
            this.overLay_5();
        }
        this.state.info[0] = false;
        this.state.info[1] = false;
        this.state.info[2] = false;
        this.state.info[3] = false;
        this.state.info[4] = true;
    }

    toggle1 = () => {
        this.setState(prevState => ({ checked1: !prevState.checked1 }));
        this.state.disabled[0] = !this.state.disabled[0];
        this.state.key1[0] = !this.state.key1[0];
        if(this.state.checked1 === false){
            this.overLay_1();
            this.state.Amount1 = this.state.Min[0];
            this.totals();
        }else{
            this.state.FeatureImage1 = blank;
            this.newImage();
            this.state.Amount1 = 0;
            this.totals();
        }
    }

    toggle2 = () => {
        this.setState(prevState => ({ checked2: !prevState.checked2 }));
        this.state.disabled[1] = !this.state.disabled[1];
        this.state.key2[0] = !this.state.key2[0];
        if(this.state.checked2 === false){
            this.overLay_2();
            this.state.Amount2 = this.state.Min[1];
            this.totals();
        }else{
            this.state.FeatureImage2 = blank;
            this.newImage();
            this.state.Amount2 = 0;
            this.totals();
        }

    }

    toggle3 = () => {
        this.setState(prevState => ({ checked3: !prevState.checked3 }));
        this.state.disabled[2] = !this.state.disabled[2];
        this.state.key3[0] = !this.state.key3[0];
        if(this.state.checked3 === false){
            this.overLay_3();
            this.state.Amount3 = this.state.Min[2];
            this.totals();
        }else{
            this.state.FeatureImage3 = blank;
            this.newImage();
            this.state.Amount3 = 0;
            this.totals();
        }
    }

    toggle4 = () => {
        this.setState(prevState => ({ checked4: !prevState.checked4 }));
        this.state.disabled[3] = !this.state.disabled[3];
        this.state.key4[0] = !this.state.key4[0];
        if(this.state.checked4 === false){
            this.overLay_4();
            this.state.Amount4 = this.state.Min[3];
            this.totals();
        }else{
            this.state.FeatureImage4 = blank;
            this.newImage();
            this.state.Amount4 = 0;
            this.totals();
        }
    }

    toggle5 = () => {
        this.setState(prevState => ({ checked5: !prevState.checked5 }));
        this.state.disabled[4] = !this.state.disabled[4];
        this.state.key5[0] = !this.state.key5[0];
        if(this.state.checked5 === false){
            this.overLay_5();
            this.state.Amount5 = this.state.Min[4];
            this.totals();
        }else{
            this.state.FeatureImage5 =  blank;
            this.newImage();
            this.state.Amount5 = 0;
            this.totals();
        }
    }

    info_Show = () => {
        if(this.state.info[0]){
            this.setState({
                state: 'Small Plants',
                blurb: 'Small plants include flowers, small bushes, and types of large grasses. Small plants are a great way to create a border between the rest of your space and the large plants.',
                image: smallPlant
            })
        }else if(this.state.info[1]){
            this.setState({
                state: 'Large Plants',
                blurb: 'Large plants include larger bushes such as Hydrangeas or English Boxwoods. Large plants are an excellent way to cover up a fence or property line.',
                image: largePlant
            })
        }else if(this.state.info[2]){
            this.setState({
                state: 'Trees',
                blurb: 'Trees take up a lot of space and water! They are great for shade and to buffer out the city noise. They can cover sections of your property line or provide shade to community areas in your yard.',
                image: Tree
            })
        }else if(this.state.info[3]){
            this.setState({
                state: 'Ground Cover',
                blurb: 'this is the information about ground cover',
                image: Grass
            })
        }else if(this.state.info[4]){
            this.setState({
                state: 'Hardscape',
                blurb: 'this is the information about hardscape',
                image: Hardscape
            })
        }
    }


    overLay_1 = () => {
        console.log('overlay 1 =',this.state.FeatureImage1)
        let FeatureImage1;
        let total;
        let Division;
        total = this.state.Max[0] - this.state.Min[0];
        Division = total/4;
        if (this.state.Amount1 < (Division+this.state.Min[0])){
            this.state.FeatureImage1 = A1;
            this.state.key1 = [true, false, false, false]
        }else if(this.state.Amount1 < ((Division * 2)+this.state.Min[0])){
            this.state.FeatureImage1 = A2;
            this.state.key1 = [true, false, false, false]
        }else if(this.state.Amount1 < (Division * 3)+this.state.Min[0]){
            this.state.FeatureImage1 = A3;
            this.state.key1 = [true, false, false, false]
        }else if(this.state.Amount1 < (Division * 4)+this.state.Min[0]){
            this.state.FeatureImage1 = A4;
            this.state.key1 = [true, false, false, false]
        }else{
            this.state.FeatureImage1 = A5;
            this.state.key1 = [true, false, false, false]
        }
        this.newImage();
    }

    overLay_2 = () => {
        console.log('overlay 2 =',this.state.FeatureImage2)
        let total;
        let Division;
        total = this.state.Max[1] - this.state.Min[1];
        Division = total/4;
        if (this.state.Amount2 < (Division+this.state.Min[1])){
            this.state.FeatureImage2 = B1;
        }else if(this.state.Amount2 < (Division*2)+this.state.Min[1]){
            this.state.FeatureImage2 = B2;
        }else if(this.state.Amount2 < (Division*3)+this.state.Min[1]){
            this.state.FeatureImage2 = B3;
        }else if(this.state.Amount2 < (Division*4)+this.state.Min[1]){
            this.state.FeatureImage2 = B4;
        }else{
            this.state.FeatureImage2 = B5;
        }
        this.newImage();
    }

    overLay_3 = () => {
        console.log('overlay 3 =',this.state.overlay[2]);
        console.log('key', this.state.key3)
        let total;
        let Division;
        total = this.state.Max[2] - this.state.Min[2];
        Division = total/4;
        if (this.state.Amount3 < (Division+this.state.Min[2])){
            this.state.FeatureImage3 = C1;
            this.state.key3 = [true, false, false, false];
        }else if(this.state.Amount3 < (Division*2)+this.state.Min[2]){
            this.state.FeatureImage3 = C2;
            this.state.key3 = [true, false, false, false];
        }else if(this.state.Amount3 < (Division*3)+this.state.Min[2]){
            this.state.FeatureImage3 = C3;
            this.state.key3 = [true, true, false, false];
        }else if(this.state.Amount3 < (Division*4)+this.state.Min[2]){
            this.state.FeatureImage3 = C4;
            this.state.key3 = [true, true, true, false]
        }else{
            this.state.FeatureImage3 = C5;
        }
        this.newImage();
    }

    overLay_4 = () => {
        console.log('overlay 4 =',this.state.overlay[3])
        let total;
        let Division;
        total = this.state.Max[3] - this.state.Min[3];
        Division = total/4;
        if (this.state.Amount4 < (Division+this.state.Min[3])){
            this.state.FeatureImage4 = D1;
        }else if(this.state.Amount4 < (Division*2)+this.state.Min[3]){
            this.state.FeatureImage4 = D2;
        }else if(this.state.Amount4 < (Division*3)+this.state.Min[3]){
            this.state.FeatureImage4 = D3;
        }else if(this.state.Amount4 < (Division*4)+this.state.Min[3]){
            this.state.FeatureImage4 = D4;
        }else{
            this.state.FeatureImage4 = D5;
        }
        this.newImage();
    }

    overLay_5 = () => {
        console.log('overlay 5 =',this.state.overlay[4])
        let total;
        let Division;
        total = this.state.Max[4] - this.state.Min[4];
        Division = total/4;
        if (this.state.Amount5 < (Division+this.state.Min[4])){
            this.state.FeatureImage5 = E1;
        }else if(this.state.Amount5 < (Division*2)+this.state.Min[4]){
            this.state.FeatureImage5 = E2;
        }else if(this.state.Amount5 < (Division*3)+this.state.Min[4]){
            this.state.FeatureImage5 = E3;
        }else if(this.state.Amount5 < (Division*4)+this.state.Min[4]){
            this.state.FeatureImage5 = E4;
        }else{
            this.state.FeatureImage5 = E5;
        }
        this.newImage();
    }

    newImage() {
        console.log('feature 1', background)
        let A = this.state.FeatureImage1;
        let B = this.state.FeatureImage2;
        let C = this.state.FeatureImage3;
        let D = this.state.FeatureImage4;
        let E = this.state.FeatureImage5;
        let F = background;
        mergeImages([
            F,
            C,
            A,
            B,
            D,
            E,
        ]).then((b64) => {
            document.querySelector('img.abc').src = b64;
            console.log('hello')
        }).catch(error => console.log(error))
    }
    
    totals() {
        // if(this.state.checked1 === false){
        //     this.state.Amount1 = 0;
        // }if(this.state.checked2 === false){
        //     this.state.Amount2 = 0;
        // }if(this.state.checked3 === false){
        //     this.state.Amount3 = 0;
        // }if(this.state.checked4 === false){
        //     this.state.Amount4 = 0;
        // }if(this.state.checked5 === false){
        //     this.state.Amount5 = 0;
        // }
        this.state.total = this.state.Amount1 + this.state.Amount2 + this.state.Amount3 + this.state.Amount4 + this.state.Amount5;
    }

    render() {
        console.log(this.state.key1)
        let A = this.state.FeatureImage1;
        let B = this.state.FeatureImage2;
        let C = this.state.FeatureImage3;
        let D = this.state.FeatureImage4;
        let E = this.state.FeatureImage5;
        let F = background;
        mergeImages([
            F,
            A,
            B,
            C,
            D,
            E,
        ]).then((b64) => {
            document.querySelector('img.abc').src = b64;
        }).catch(error => console.log(error))
        console.log('first box', this.state.checked1)
        return(
            <Grid style={{paddingTop:'50px', marginTop:'10px', marginBottom:'50px', marginLeft:'20px', marginRight:'20px'}}>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Header as='h1'>Pricing Tool</Header>
                    </Grid.Column>
                    <Grid.Column style={{ position: 'relative', paddingRight: '9%', paddingLeft: '6px', width: '50%'}}>
                            <Image floated='right' src={logo} alt='blootime-logo'/> 
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Header as='h3'>{this.state.state}</Header>
                    </Grid.Column>
                </Grid.Row>
                <div style={{width:'50%'}}>
                    <Divider/>
                </div>
                <Grid.Row columns={2}>
                    <Grid.Column width={4}>
                        <Grid.Row>
                            <Image src={this.state.image} size='medium'/>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Grid.Row>
                                <Item>{this.state.blurb}</Item>
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
                <div style={{width:'50%'}}>
                    <Divider/>
                </div>
                <Grid.Row columns={3}>
                    <Grid.Column width={7}>
                        <Grid.Row>
                            <Segment>
                                <img class='abc' src='' width={'100%'} height={'50%'}/>
                            </Segment>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Segment>
                            <Grid.Row style={{paddingLeft:'20px', paddingRight:'20px'}}>
                            <Divider/>
                                <Checkbox label='Small Plants' onChange={this.toggle1} checked={this.state.checked1}/>
                                <PlantToggle disabled={this.state.disabled[0]} value={this.state.Amount1} handleChange={this.handleChange1} Max={this.state.Max[0]} Min={this.state.Min[0]} />
                            </Grid.Row>
                            <Grid.Row style={{paddingLeft:'20px', paddingRight:'20px'}} >
                            <Divider/>
                                <Checkbox label='Large Plants' onChange={this.toggle2} checked={this.state.checked2}/>
                                <PlantToggle disabled={this.state.disabled[1]} value={this.state.Amount2} handleChange={this.handleChange2} Max={this.state.Max[1]} Min={this.state.Min[1]}/>
                            </Grid.Row>
                            <Grid.Row style={{paddingLeft:'20px', paddingRight:'20px'}} >
                            <Divider/>
                            <Checkbox label='Trees' onChange={this.toggle3} checked={this.state.checked3}/>
                                <PlantToggle disabled={this.state.disabled[2]} value={this.state.Amount3} handleChange={this.handleChange3} Max={this.state.Max[2]} Min={this.state.Min[2]}/>
                            </Grid.Row>
                            <Grid.Row style={{paddingLeft:'20px', paddingRight:'20px'}} >
                            <Divider/>
                            <Checkbox label='Ground Cover' onChange={this.toggle4} checked={this.state.checked4}/>
                                <PlantToggle disabled={this.state.disabled[3]} value={this.state.Amount4} handleChange={this.handleChange4} Max={this.state.Max[3]} Min={this.state.Min[3]}/>
                            </Grid.Row>
                            <Grid.Row style={{paddingLeft:'20px', paddingRight:'20px'}} >
                            <Divider/>
                            <Checkbox label='Hardscape' onChange={this.toggle5} checked={this.state.checked5}/>
                                <PlantToggle disabled={this.state.disabled[4]} value={this.state.Amount5} handleChange={this.handleChange5} Max={this.state.Max[4]} Min={this.state.Min[4]}/>
                            </Grid.Row>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Grid.Row>
                            <Segment>
                                <Container>
                                    <Header as='h3'>Total Cost: ${this.state.total}</Header>
                                    <Item>Cost Breakdown</Item>
                                    <Divider/>
                                    <List bulleted>
                                        <Item>Small Plants: ${this.state.Amount1}</Item>
                                        <Item>Large Plants: ${this.state.Amount2}</Item>
                                        <Item>Trees: ${this.state.Amount3}</Item>
                                        <Item>Ground Cover: ${this.state.Amount4}</Item>
                                        <Item>Hardscape: ${this.state.Amount5}</Item>
                                    </List>
                                </Container>
                            </Segment>
                        </Grid.Row>
                        <Grid.Row style={{paddingTop:'30px'}}>
                            <Segment>
                                <Container>
                                    <FeatureKey
                                        key1={this.state.key1} 
                                        key2={this.state.key2}
                                        key3={this.state.key3}
                                        key4={this.state.key4}
                                        key5={this.state.key5}
                                    />
                                </Container>
                            </Segment>
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default(pricingTool)