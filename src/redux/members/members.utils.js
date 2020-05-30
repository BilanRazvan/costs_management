export const addMember = (members, member) => {
    return [member, ...members]
}

export const deleteMember = (members, member) => {
    return members.filter(member1 => member1.id!==member.id);
}