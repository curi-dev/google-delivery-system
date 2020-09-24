import { Router } from 'express';

import DeliveryRepository from '../repositories/DeliveryRepository';
import CreateDeliveryService from '../services/CreateDeliveryService';
import CreatePlaceService from '../services/CreatePlaceService';
import DeleteDeliveryService from '../services/DeleteDeliveryService';

import { parseISO } from 'date-fns';


const deliveries = Router();

const deliveryRepository = new DeliveryRepository();

deliveries.get('/', (request, response) => {
    const deliveries = deliveryRepository.all();

    return response.json(deliveries);
});

deliveries.get('/:id', (request, response) => {
    const { id } = request.params;
    
    // erros ficarão por conta do GlobalError

    const filteredDelivery = deliveryRepository.find(id);
    return response.json(filteredDelivery);
});

deliveries.post('/', (request, response) => {
    
    const { companyName, date, originInfo, destinationInfo } = request.body;
    
    if (!companyName || !date || !originInfo || !destinationInfo) {
        throw new Error('Todos os dados são obrigatórios.')
    }
    
    const createPlace = new CreatePlaceService();
    const origin = createPlace.run(originInfo)
    
    const destination = createPlace.run(destinationInfo)

    const parsedDate = parseISO(date)
    
    const createDelivery = new CreateDeliveryService(deliveryRepository);
    const delivery = createDelivery.run({
        companyName,
        date: parsedDate,
        origin,
        destination
    })

    return response.status(200).json(delivery);    
});                                                     

deliveries.delete('/:id', (request, response) => {
    const { id } = request.params;

    const deleteDelivery = new DeleteDeliveryService(deliveryRepository);
    const allDeliveriesUpdated = deleteDelivery.run(id);

    return response.status(200).json(allDeliveriesUpdated)
})

export default deliveries;