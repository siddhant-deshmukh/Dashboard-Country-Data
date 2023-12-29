class APIError(Exception):
    pass

class APIInternelServerError(APIError):
    code = 500
    description = "Internal server error occured!"

class APIBadRequestError(APIError):
    code = 400
    description = "The required paramters wasn't correct"

class APINotFoundError(APIError):
    code = 404
    description = "Requested thing not found"