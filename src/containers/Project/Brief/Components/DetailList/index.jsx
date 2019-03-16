// BLOOMTIME DESIGN 2019
import React from 'react';

const DetailList = (props) => (
    <div>
        {props.edit ? (
        <DetailListEdit />
        ) : (
        <DetailListView />
        )}
    </div>
);

const DetailListView = () => {
    return (
        <div>this is the Detail view </div>
    )
}

const DetailListEdit = () => {
    return (
        <div>this is the Detail Edit </div>
    )
}

export default DetailList;