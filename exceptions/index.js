export class ApiError extends Error {

    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static unauthorizedError() {
        return new ApiError(401, 'Нет доступа')
    }

    static badRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }

    static forbidden() {
        return new ApiError(403, "Нет прав")
    }
}