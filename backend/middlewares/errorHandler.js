const errorHandler = (error, request, response, next) => {
    console.log('Error Name: ', error.name)
    console.log('Error Message: ', error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        //pass
        return response.status(400).json({ message: `User with Email Address ${request.body.email} already Exists!, Choose a different Email or Login with the Same.` })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' })
    } else if (error.name === 'ReferenceError') {
        return response.status(500).json({ message: 'Something Went Wrong' })
    } else if (error.name === 'TypeError') {
        return response.status(400).json({ message: 'Some Fields are Missing and Cannot Process Request' })
    } else if (error.name === 'UploadError') {
        return response.status(415).json({ message: 'Uploaded unsupported file, use any image type and wav for audio type' })
    } else if (error.name === 'UserCreationFailed') {
        return response.status(500).json({ message: 'Something went wrong while registering user.' })
    }

    next(error)
}

module.exports = errorHandler