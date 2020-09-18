import Delivery from '../models/Delivery';
import DeliveryRepository from '../repositories/DeliveryRepository';
import Place from '../models/Place';
import GlobalError from '../Errors/GlobalError';

import { isAfter, add } from 'date-fns';

interface Request {
    companyName: string,
    date: Date,
    origin: Place,
    destination: Place
}

export default class CreateNewDeliveryService {
    private deliveryRepository: DeliveryRepository;

    constructor(deliveryRepository: DeliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    public run({ companyName, date, origin, destination }: Request): Delivery {
        const goodDate = add(new Date(), { days: 3 });
        if (!isAfter(date, goodDate)) {
            throw new GlobalError('O prazo mínimo para uma nova entrega é de 3 dias.')          
        }

        const newDelivery = this.deliveryRepository.create({
            companyName,
            date,
            origin,
            destination
        });
        
        return newDelivery;
    };
};