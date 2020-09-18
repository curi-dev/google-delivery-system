import Place from './Place';
import { uuid } from 'uuidv4';

export default class Delivery {
    id: string;

    companyName: string;

    date: Date;

    origin: Place;

    destination: Place;

    constructor(companyName: string, date: Date, origin: Place, destination: Place) {
        this.id = uuid();
        this.companyName = companyName;
        this.date = date;
        this.origin = origin;
        this.destination = destination
    };
};