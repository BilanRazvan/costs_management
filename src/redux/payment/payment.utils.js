export const updateStatus = (payments, payment) => {
    return payments.map(pay=> pay.id===payment.id ? {...pay,status:true} : pay) ;
}