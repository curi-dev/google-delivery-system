import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'

import apiClient from '../../services/apiClient';
import GOOGLE_API_KEY from '../../key';

import { 
  MapCanvas, 
  Header, 
  MainContainer, 
  IconsContainer} from './styles';

import { FiMapPin } from 'react-icons/fi'
import { BiAlarm, BiCar } from 'react-icons/bi'
import homeIcon from './assets/home.png';
import backIcon from './assets/undo.png';

import GlobalStyle from './globalStyles/global';

declare var google: any;

interface Location {
  origin: {
      name: string,
      lat: number,
      lng: number
  },
  destination: {
      name: string,
      lat: number,
      lng: number
  }
};

const OverviewMap: React.FunctionComponent<any> = ({ match }): any => {

  const [deliveryLocations, setDeliveryLocations] = useState<Location | null>(null);

  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    
    apiClient.get(`deliveries/${match.params.id}`).then(response => {
      setDeliveryLocations(response.data);
    })
    
    const googleScript = document.createElement('script');
    googleScript.defer = true;
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`;
    window.document.body.append(googleScript);
      
    googleScript.addEventListener('load', () => {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

    const map = new google.maps.Map(
      document.getElementById('map_canvas'), 
        {
          center: { 
            lat: deliveryLocations ? deliveryLocations.origin.lat : 0,
            lng: deliveryLocations ? deliveryLocations.origin.lng : 0
          },
          zoom: 13,
          //styles: mapStyles, // optional
        })
        
    directionsRenderer.setMap(map);

    const request = {
      origin: new google.maps.LatLng(
        deliveryLocations?.origin.lat,
        deliveryLocations?.origin.lng
      ),
      destination: new google.maps.LatLng(
        deliveryLocations?.destination.lat,
        deliveryLocations?.destination.lng
      ),
      travelMode: 'DRIVING'
      }

      directionsService.route(
        request,
        function(response: any, status: string) {
          if (status === 'OK') {
            setDistance(response.routes[0].legs[0].distance.text);
            setDuration(response.routes[0].legs[0].duration.text);
            directionsRenderer.setDirections(response);
          };
        });
    })
  }, [])
  
  if (deliveryLocations) {
    return (
      <>
      <MainContainer>
        <Header>
          <div><FiMapPin size={20} color={'white'}/><span>{deliveryLocations.origin.name}</span></div>
          <div><FiMapPin size={20} color={'white'}/><span>{deliveryLocations.destination.name}</span></div>
          <div><BiCar size={20} color={'white'}/><span>{distance}</span></div>
          <div><BiAlarm size={20} color={'white'}/><span>{duration}</span></div>
        </Header>
        <IconsContainer>
          <div>
            <Link to='/deliveries'>
              <img src={backIcon} alt='Voltar'/>
            </Link>  
          </div>
          <div>
            <Link to='/'>
              <img src={homeIcon} alt="Home"/>  
            </Link>
          </div>
        </IconsContainer>
        <MapCanvas id='map_canvas'>
        </MapCanvas>
      </MainContainer>
      <GlobalStyle />
      </>
    );
  } 
};

export default OverviewMap;













