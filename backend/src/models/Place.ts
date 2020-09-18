import { uuid } from 'uuidv4';

export default class Place {    
    id: string;

    name: string;
    
    lat: number;

    lng: number;

    constructor(name: string, lat: number, lng: number) {
        this.id = uuid();
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    };
};