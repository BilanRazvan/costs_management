import React from 'react';

import './rooms-hall.styles.scss';

import RoomPreview from '../room-preview/room-preview.component';

class RoomHall extends React.Component{
    constructor(){
        super();

        this.state = {
            sections: [
                {
                  title: 'Chirie',
                  imageUrl: 'https://i.ibb.co/jM4XWsV/room1.jpg',
                  id: 1,
                  empty: false,
                  linkUrl: ''
                },
                {
                  title: 'Fotbal',
                  imageUrl: 'https://i.ibb.co/9bt0SN4/room2.jpg',
                  id: 2,
                  empty: false,
                  linkUrl: ''
                },
                {
                  title: 'Vacanta',
                  imageUrl: 'https://i.ibb.co/2qkWFCC/room3.jpg',
                  id: 3,
                  empty: false,
                  linkUrl: ''
                },
                {
                  title: 'Plecare',
                  imageUrl: 'https://i.ibb.co/4m8kNsB/room4.jpg',
                  size: 'large',
                  id: 4,
                  empty: false,
                  linkUrl: ''
                },
                {
                  title: 'Chirie2',
                  imageUrl: 'https://i.ibb.co/DMZHhNQ/room5.jpg',
                  size: 'large',
                  id: 5,
                  empty: false,
                  linkUrl: ''
                },
                {
                  title: 'New room',
                  imageUrl: "https://i.ibb.co/ZdxM6Sr/empty-room.jpg",
                  size: 'large',
                  id: 9,
                  empty: true,
                  linkUrl: ''
                }
              ]
              
        }
    }

    render() {
        return (
        <div className = 'room-hall'>
            {
                this.state.sections.map(({id, ...otherSectionProps}) => (
                    <RoomPreview key ={ id } {...otherSectionProps}/>
                ))
            }
        </div>
        )
    }
}

export default RoomHall;