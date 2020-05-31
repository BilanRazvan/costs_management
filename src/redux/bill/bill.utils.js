export const addBillMember = (billMembers, member) => {
    if(billMembers===null){
        return [{...member,amount:0, procent:0}]
    }else if((billMembers.find(member1=> member1.id===member.id)===void 0)===true && member.name!=='' && member.id!==''){
        return[...billMembers,{...member, amount:0, procent:0}]
    }else{
        return [...billMembers]
    }
}

export const deleteMember = (billMembers, member) => {
    return billMembers.filter(member1=> member1.id!==member.id);
}

export const setMemberAmount = (billMembers, member) => {
    return billMembers.map(member1=> (
        member.id===member1.id ? {...member1, amount: member.amount} : member1
    ));
}

export const setMemberProcent = (billMembers, member) => {
    return billMembers.map(member1=> (
        member.id===member1.id ? {...member1, procent: member.procent} : member1
    ));
}

export const modifyAmount = (billMembers, amountFinal) => {
    return billMembers.map(member1=> (
        member1!==null ? {...member1, amount: (amountFinal*member1.procent)/(100)} : null
    ));
}