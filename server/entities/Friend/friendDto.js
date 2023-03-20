async function friendDto(requesterFriend){

    requesterFriend = await requesterFriend
        .populate({
            path: 'recipient',
            select: '-friends -passhash -_id'
        })

    return {
        _id: requesterFriend._id,
        recipient: requesterFriend.recipient,
        status: requesterFriend.status
    }
}

module.exports = friendDto