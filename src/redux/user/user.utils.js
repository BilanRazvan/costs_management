export const setUsers = (users) => {
    return users.map(user=>
        user!==null ? {id:user.id, name: user.firstName + ' ' + user.lastName} : null
        )
};

export const addUser = (users, user) => {
    return [user, ...users]
}

