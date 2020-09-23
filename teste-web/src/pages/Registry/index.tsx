import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { 
    Form, 
    Title, 
    ErrorContainer, 
    Button, 
    ButtonsContainer } from './styles';

import apiCLient from '../../services/apiClient';

import Header from '../../components/Header/index';

import deliveryTruckIcon from './assets/delivery-truck.png';

declare var google: any;

const defaultOptions = {
    types: [('address')],
};

const Registry: React.FunctionComponent = () => { 
    const [originInfo, setOriginInfo] = useState({name: '', lat: 0, lng: 0});
    const [destinationInfo, setDestinationInfo] = useState({name: '', lat: 0, lng: 0});

    useEffect(() => {
        const googleScript = document.createElement('script');
        googleScript.defer = true;
        googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDERfpi8KgAkDgSI66dK4tuolryHl9zDZA&libraries=places`;
        window.document.body.append(googleScript);

        googleScript.addEventListener('load', () => {
            const originAutoField = document.getElementById('origin-auto-complete')
            const destinationAutoField = document.getElementById('destination-auto-complete')
            
            const originAutocomplete = new google.maps.places.Autocomplete(
              originAutoField, 
              defaultOptions
            )
            const destinationAutocomplete = new google.maps.places.Autocomplete(
                destinationAutoField,
                defaultOptions
            )      

            originAutocomplete.addListener('place_changed', () => {
                const { name, geometry } = originAutocomplete.getPlace();
                let lat = geometry.location.lat();
                let lng = geometry.location.lng();
                setOriginInfo({ 
                    name, 
                    lat, 
                    lng 
                });
            });

            destinationAutocomplete.addListener('place_changed', () => {
                const { name, geometry } = destinationAutocomplete.getPlace();
                let lat = geometry.location.lat();
                let lng = geometry.location.lng();
                setDestinationInfo({ 
                    name, 
                    lat, 
                    lng 
                });
            });
        });  
    }, []);

    const [companyName, setCompanyName] = useState('');
    const [date, setDate] = useState('');

    const [error, setError] = useState('');

    async function handleCreateDelivery(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        
        if (!companyName || !date || !originInfo.name || !destinationInfo.name) {
            setError('* Todos os campos são obrigatórios.');
            setTimeout(() => {
                setError('');
            }, 3500)
            return;
        }
        
        if (!originInfo.lat || !originInfo.lng) {
            setError('Ponto de coleta inválido. Escolha um local da lista.')
            setTimeout(() => {
                setError('');
            }, 3500)
            return;
        }
        
        if (!destinationInfo.lat || !destinationInfo.lng) {
            setError('Ponto de entrega inválido. Escolha um local da lista.');
            setTimeout(() => {
                setError('');
            }, 3500)
            return;
        };
        
        try {
            const response = await apiCLient.post('/deliveries', {
                companyName,
                date,
                originInfo,
                destinationInfo
            });
                    
            console.log(response.data)
                    
            const delivery = response.data;
            console.log(delivery);
                
            setCompanyName('');
            setDate('');
            setOriginInfo({ name: '', lat: 0, lng: 0 });
            setDestinationInfo({ name: '', lat: 0, lng: 0 });
                    
            window.alert(`A sua entrega foi registrada com sucesso.`)          
        } catch (err) {
            const { data } = err.response;
            setError(data.message);
            setTimeout(() => {
                setError('');
            }, 3500)
        };
    };


    return (
        <>
            <Header />
            <Title><i>Registre entregas com segurança.</i></Title>
            <Form onSubmit={handleCreateDelivery}>
                <img src={deliveryTruckIcon} alt='Caminhão de entrega'/>
                <ErrorContainer hasError={ !! error }>
                    <span>{ error }</span>
                </ErrorContainer>
                <input 
                type="text" 
                placeholder='Nome da empresa'
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                />
                <input 
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                />
                <input 
                type="text" 
                id='origin-auto-complete'
                placeholder='Local de coleta'
                value={originInfo.name}
                onChange={e => setOriginInfo({ ...originInfo, name: e.target.value })}            
                />
                <input 
                type="text" 
                id='destination-auto-complete'
                placeholder='Local de entrega'
                value={destinationInfo.name}
                onChange={e => setDestinationInfo({...destinationInfo, name: e.target.value })}
                />
                <ButtonsContainer>
                    <Button btnColor={'#4169e1'}>Cadastrar entrega</Button>
                    <Link to='/deliveries'>
                        <Button btnColor={'#ffa500'}>Visualizar entregas</Button>
                    </Link>
                </ButtonsContainer> 
            </Form>
        </>
    );
}

export default Registry;