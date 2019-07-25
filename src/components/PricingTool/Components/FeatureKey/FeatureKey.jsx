import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import {Header} from 'semantic-ui-react';

const FeatureInfo = (props) => {
    let Feature1Key;
    let Feature2Key;
    let Feature3Key;
    let Feature4Key;
    let Feature5Key;
    let cost = [10, 30, 200, 100, 400, 1000]
    if(props.key1[0]){
        Feature1Key =
        <div>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar style={{backgroundColor:'#F90D0D'}}/>
                    </ListItemAvatar>
                    <ListItemText primary='Red Petunia' secondary={'$'+cost[0]+'/plant'} />
                </ListItem>
            <Divider/>
        </div>
    }
    if(props.key2[0]){
        Feature2Key =
        <div>
            <ListItem>
                <ListItemAvatar>
                    <Avatar style={{backgroundColor:'#4449C3'}} />
                </ListItemAvatar>
                <ListItemText primary='Blue Hydrangea' secondary={'$'+cost[2]+'/tree'} />
            </ListItem>
            <Divider/>
        </div>
    }
    if(props.key3[0]){
        if(props.key3[0] && !props.key3[1]){
            console.log(props.key3);
            Feature3Key =
            <div>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar style={{backgroundColor:'#14CB1C'}} />
                    </ListItemAvatar>
                    <ListItemText primary='Narrowleaf Cottonwood' secondary={'$'+cost[2]+'/tree'} />
                </ListItem>
                <Divider/>
            </div>
        }else if(props.key3[0] && props.key3[1] && !props.key3[2]){
            Feature3Key =
            <div>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar style={{backgroundColor:'#14CB1C'}} />
                    </ListItemAvatar>
                    <ListItemText primary='Narrowleaf Cottonwood' secondary={'$'+cost[2]+'/tree'} />
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar style={{backgroundColor:'#1B9820'}} />
                    </ListItemAvatar>
                    <ListItemText primary='Rocky Mountain Juniper' secondary={'$'+cost[2]+'/tree'} />
                </ListItem>
                <Divider/>
            </div>
        }else if(props.key3[0] && props.key3[1] && props.key3[2] && !props.key3[3])
        Feature3Key =
        <div>
            <ListItem>
                <ListItemAvatar>
                    <Avatar style={{backgroundColor:'#6FE374'}} />
                </ListItemAvatar>
                <ListItemText primary='Quaking Aspen' secondary={'$'+cost[3]+'/tree'} />
            </ListItem>
            <Divider/>
            <ListItem>
                <ListItemAvatar>
                    <Avatar style={{backgroundColor:'#1B9820'}} />
                </ListItemAvatar>
                <ListItemText primary='Rocky Mountain Juniper' secondary={'$'+cost[2]+'/tree'} />
            </ListItem>
            <Divider/>
        </div>
    }else{
        Feature3Key = null;
    }
    if(props.key4[0]){
        Feature4Key =
        <div>
            <ListItem>
                <ListItemAvatar>
                    <Avatar style={{backgroundColor:'#63C791'}} />
                </ListItemAvatar>
                <ListItemText primary='Kentucky Bluegrass' secondary={'$'+cost[4]+'/square foot'} />
            </ListItem>
            <Divider/>
        </div>
    }
    if(props.key5[0]){
        Feature5Key =
        <div>
            <ListItem>
                <ListItemAvatar>
                    <Avatar style={{backgroundColor:'#966F33'}} />
                </ListItemAvatar>
                <ListItemText primary='Hardwood Patio' secondary={'$'+cost[5]+'/square foot'} />
            </ListItem>
        </div>
    }
    return(
        <List>
            <Header as='h3'>
                Key:
            </Header>
            {Feature1Key}
            {Feature2Key}
            {Feature3Key}
            {Feature4Key}
            {Feature5Key}
        </List>
        // <div>
        // {Feature1Key}
        // {Feature2Key}
        // {Feature3Key}
        // {Feature4Key}
        // {Feature5Key}
        // </div>
    );
}

export default(FeatureInfo)