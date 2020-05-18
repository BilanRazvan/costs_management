import React from 'react';
import {withRouter} from 'react-router-dom';

import './room-preview.styles.scss';

const RoomPreview = ({title, imageUrl,size, history,empty, linkUrl, match}) => (
    <div className = {`${size} room-preview`} onClick={() => history.push(`${match.url}${linkUrl}`) }>
        <div className = 'background-image' style={{
            backgroundImage: `url(${imageUrl})`
        }}/>
        <div className = 'content'>
            <h1 className = 'title'> {title.toUpperCase()} </h1>
            <span className = 'subtitle'> {empty ? "CREATE" : "ENTER"} </span>
        </div>
    </div>
);

export default withRouter(RoomPreview);