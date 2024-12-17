const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
        .resolve(requestHandler(req, res, next()))
        .catch((error)=>next(error))//we can also use reject on place of catch
    }
}

export{asyncHandler}