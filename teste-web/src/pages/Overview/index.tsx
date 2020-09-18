import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import apiClient from '../../services/apiClient';

import { 
  MapCanvas, 
  Header, 
  MainContainer, 
  IconsContainer } from './styles';

import { FiMapPin } from 'react-icons/fi'
import { BiAlarm, BiCar } from 'react-icons/bi'
import homeIcon from './assets/home.png';
import backIcon from './assets/undo.png';

import { Button } from '../Registry/styles';

import GlobalStyle from './styles/global';

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

const OverviewMap: React.FunctionComponent<any> = ({ match }) => {

  const [deliveryLocations, setDeliveryLocations] = useState<Location>();

  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  
  useEffect(() => {
      try {
        if (!deliveryLocations) {
          apiClient.get(`deliveries/${match.params.id}`).then(response => {
            setDeliveryLocations(response.data);
          })  
        }
      } catch (error) {
        console.log('ERROR!')
        };   
    
    const googleScript = document.createElement('script');
    googleScript.defer = true;
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDERfpi8KgAkDgSI66dK4tuolryHl9zDZA`;
    window.document.body.append(googleScript);
    googleScript.addEventListener('load', () => {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

      const map = new google.maps.Map(
      document.getElementById('map_canvas'), 
      {
        center: { 
          lat: deliveryLocations?.origin.lat,
          lng: deliveryLocations?.origin.lng
         },
        zoom: 13,
        //styles: mapStyles,
      })

      directionsRenderer.setMap(map);
    
      new google.maps.Marker({
        position: { 
          lat: deliveryLocations ? deliveryLocations.origin.lat : -22.9035, 
          lng: deliveryLocations ? deliveryLocations.origin.lng : -43.2096
        },
        map: map
      })
    
      new google.maps.Marker({
        position: {
          lat: deliveryLocations ? deliveryLocations.destination.lat : -22.9035, 
          lng: deliveryLocations ? deliveryLocations.destination.lng : -43.2096
        },
        map: map
      })

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
          console.log(response)
          setDistance(response.routes[0].legs[0].distance.text);
          setDuration(response.routes[0].legs[0].duration.text);
          directionsRenderer.setDirections(response);
        };
      });

    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryLocations])
  
  return (
    <>
      <MainContainer>
        <Header>
          <div><FiMapPin size={20} color={'white'}/><span>{deliveryLocations?.origin.name}</span></div>
          <div><FiMapPin size={20} color={'white'}/><span>{deliveryLocations?.destination.name}</span></div>
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
};

export default OverviewMap;













