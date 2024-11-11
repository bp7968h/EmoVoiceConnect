const unkownEndPoint = (request, response) => {
    return response.status(404).send({ message: 'No Such EndPoint!!!!' })
}

module.exports = unkownEndPoint