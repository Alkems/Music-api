exports.getBaseurl = (request) => {
    return (request.connection && request.connection.encrypted ? "https" : "http")
        + "://" + request.headers.host
}