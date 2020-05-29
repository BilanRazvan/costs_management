export const  initRooms = (room, roomsToAdd) => {
    const modificatedRooms = roomsToAdd.map(
        room1 => room1!== null ? {...room1, linkUrl: `/${room1.id}`, empty: false}
        : null
    );

    return [ ...modificatedRooms, room]
};

export const addRoom = (rooms, room) => {
    return [{...room, linkUrl: `/${room.id}`, empty: false}, ...rooms]
}

export const deleteRoom = (rooms, room)=>{
    return rooms.filter(el=> el!==room);
}