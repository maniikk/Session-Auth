export const parseError = err =>{
    if (err.isJoi) return JSON.stringify({"message":err.details[0].message});
    return JSON.stringify(err, Object.getOwnPropertyNames(err))
}
export const sessionizeUser = user => {
    return {userId: user.id, username: user.username}
}