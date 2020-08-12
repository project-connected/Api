interface _links {
    self : string;
}

export class Response {

    public status : number;

    public message? : string;

    public _links? : _links;

    public result?: any;
}