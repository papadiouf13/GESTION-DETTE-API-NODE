export const supportedMethods = ["post", "put", "patch", "delete"];

export interface ResponseValidator {
    status: boolean,
    errors: any
}