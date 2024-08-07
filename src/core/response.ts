import { StatusCodes } from "http-status-codes"

interface RestResponseInterface <T> {
    status: StatusCodes,
    data: T,
    message: string
}

export class RestResponse {
    static response <T>(data: T, httpCode: StatusCodes , message: string = "Traitement effectué avec succes"): RestResponseInterface<T> {
        return {
            status: httpCode,
            data,
            message
        } as RestResponseInterface<T>
    }
}