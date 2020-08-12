
export class KeyValueDto {

    constructor(key:string, value:string) {
        this.key = key;
        this.value = value;
    }

    public key : string;

    public value : string;

    public toJson() {
        return {
            key : this.key,
            value : this.value
        };
    }
}

export class KeyValueColorDto {
    constructor(key:string, value:string, color?:string) {
        this.key = key;
        this.value = value;
        this.color = color || '';
    }

    public key : string;

    public value : string;

    public color? : string;

    public toJson() {
        return {
            key : this.key,
            value : this.value,
            color : this.color
        };
    }
}