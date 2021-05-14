export class StandardResponse<T> {
    statusCode: number;
    message: string;
    data?: T;
    constructor(statusCode: number, message: string, data?: T){
        this.statusCode = statusCode;
        this.message = message;
        if(data) this.data = data;
    }
}