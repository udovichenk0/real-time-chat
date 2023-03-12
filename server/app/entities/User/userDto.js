function userDto(user){
    return {
        username: user.username,
        userId: user.userId,
        __v: user.__v
    }
}

module.exports = userDto