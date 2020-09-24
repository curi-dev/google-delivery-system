import DeliveryRepository from '../repositories/DeliveryRepository';

export default class DeleteDeliveryService {
    deliveryRepository: DeliveryRepository;

    constructor(deliveryRepository: DeliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    public run(id: string) {    
        const allDeliveries = this.deliveryRepository.delete(id);

        return allDeliveries;
    }

}