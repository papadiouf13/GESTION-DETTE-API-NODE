"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestResponse = void 0;
class RestResponse {
    static response(data, httpCode, message = "Traitement effectué avec succes") {
        return {
            status: httpCode,
            data,
            message
        };
    }
}
exports.RestResponse = RestResponse;
