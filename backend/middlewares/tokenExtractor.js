const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (!(authorization && authorization.startsWith('Bearer '))) {
        return response.status(401).json({ message: 'Cannot Process WithOut Token, Please Login!' })
    }
    request.token = authorization.replace('Bearer ', '')
    next()
}

module.exports = tokenExtractor