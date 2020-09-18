import Place from '../models/Place';

interface Request {
    name: string,
    lat: number,
    lng: number
};

export default class CreatePlaceService {

    public run(placeInfo: Request): Place {
        const { name, lat, lng } = placeInfo; 
        
        const place = new Place(
            name,
            lat,
            lng
        );

        return place;
    };
};