import Delivery from '../models/Delivery';
import Place from '../models/Place';

interface DeliveryDTO {
    companyName: string,
    date: Date,
    origin: Place,
    destination: Place
}

export default class DeliveryRepository {
    deliveryRepository: Delivery[] = []

    constructor() {
        this.deliveryRepository = [];
    };

    public all() {
        return this.deliveryRepository;
    }

    public find(id: string) {
        const filteredRepository = this.deliveryRepository.find(delivery => delivery.id === id);
        console.log(filteredRepository);
        return filteredRepository;
    }

    public create({ companyName, date, origin, destination }: DeliveryDTO): Delivery {      
        const newDelivery = new Delivery(
            companyName,
            date,
            origin,
            destination 
        );
        
        this.deliveryRepository.push(newDelivery);

        return newDelivery;
    };
};