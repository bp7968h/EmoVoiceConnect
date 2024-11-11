const MatchRouter = require('express').Router();
const User = require('../models/user');
const Like = require('../models/likes');
const Match = require('../models/matches');
const getOppositeEmotion = require('../utils/getOppositeEmotion');
const { connectedUsers, getIo } = require('../socket')


MatchRouter.get('/', async (request, response, next) => {
    try {
        console.log('Whats up')
        const currentUserId = request.user.id
        const matches = await Match.find({ users: currentUserId }).select('users -_id')

        // Extract the IDs of the other users in these matches
        let matchedUserIds = []
        matches.forEach(match => {
            matchedUserIds = matchedUserIds.concat(match.users.filter(id => !id.equals(currentUserId)))
        })

        matchedUserIds = [...new Set(matchedUserIds)]

        const matchedUsers = await User.find({ _id: { $in: matchedUserIds } }).select('picture name')
        // const matchedUsers = await User.find({ _id: { $in: matchedUserIds } }).select('id picture name -_id')

        response.json(matchedUsers)

    } catch (error) {
        console.log('Error: ', error)
        next(error)
    }
})

MatchRouter.get('/users', async (request, response, next) => {
    try {
        // console.log('Whatsss')
        // console.log('Query Params: ', request.query)
        const { emotion } = request.query;
        console.log('Body Emotion: ', emotion)
        const oppEmotion = getOppositeEmotion(emotion);
        console.log('Opp Emotion: ', oppEmotion)
        const currentUserId = request.user.id;

        const likes = await Like.find({ user: currentUserId }).select('likedUser -_id')
        console.log('Likes: ', likes)
        const likedUserIds = likes.map(doc => doc.likedUser.toString())
        console.log('Liked: ', likedUserIds)

        const matches = await Match.find({ users: currentUserId }).select('users -_id')
        console.log('Matches: ', matches)
        let matchedUserIds = []
        matches.forEach(match => {
            matchedUserIds = matchedUserIds.concat(match.users.filter(id => !id.equals(currentUserId)).map(id => id.toString()))
            console.log('Matched: ', matchedUserIds)
        })

        const excludedUserIds = [...new Set([...likedUserIds, ...matchedUserIds])];
        console.log('Excluded Users: ', excludedUserIds)

        const potentialMatches = await User.find({
            emotion: oppEmotion,
            _id: { $ne: currentUserId, $nin: excludedUserIds }
        });
        console.log('PotentialMatches: ', potentialMatches)
        response.json(potentialMatches);
    } catch (error) {
        next(error);
    }
});

MatchRouter.post('/like', async (request, response, next) => {
    try {
        const likedUser = request.body.likedUserId
        const user = request.user.id
        console.log('likedUser: ', likedUser, ' user: ', user)
        if (!(likedUser && user)) {
            return response.status(422).json({ message: 'Unprocessable Request!' })
        }

        const isSelfLiked = await Like.find({ user: likedUser, likedUser: user })
        console.log('Is Am LIked By Other User: ', isSelfLiked)
        if (isSelfLiked.length > 0) {
            const matched = new Match({
                users: [likedUser, user]
            })

            const io = getIo()
            const userSocketId = connectedUsers.get(user)
            const likedUserSocketId = connectedUsers.get(likedUser)

            if (userSocketId) {
                const matchedUserDetails = await User.findById(likedUser)
                console.log('Check User Socker: ', matchedUserDetails)
                io.to(userSocketId).emit('match', {
                    id: likedUser,
                    name: matchedUserDetails.name,
                    imgSrc: matchedUserDetails.picture
                })
            }

            if (likedUserSocketId) {
                const matchedUserDetails = await User.findById(user)
                console.log('Check Liked User Socker: ', matchedUserDetails)
                io.to(likedUserSocketId).emit('match', {
                    id: likedUser,
                    name: matchedUserDetails.name,
                    imgSrc: matchedUserDetails.picture
                })
            }

            const savedMatch = await matched.save()
            console.log('Users Matched: ', savedMatch)
            return response.status(200).json({ message: `You Got A Match`, match: likedUser })

        } else {
            const like = new Like({
                user,
                likedUser
            })

            const savedLike = await like.save()
            console.log('Saved Like: ', savedLike)
            if (savedLike) {
                return response.status(200).json({ likedUser: likedUser })
            }
        }
        return response.status(500).json({ message: 'Something went wrong cannot like user' })

    } catch (error) {
        console.log('Error Matchhh', error)
        next(error)
    }
})


module.exports = MatchRouter;
