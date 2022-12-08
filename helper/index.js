const formatDate = (value) => {
    let yourDate=value
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset*60*1000))
    return yourDate.toISOString().split('T')[0]
}
module.exports={formatDate}