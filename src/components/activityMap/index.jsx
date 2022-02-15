import React, { useEffect, useRef } from 'react';
import 'twin.macro';
import { Loader } from '@googlemaps/js-api-loader';
import mapPin from '../../images/pin-marker.svg';

const loader = new Loader({
  apiKey: process.env.GATSBY_GOOGLE_MAP_KEY,
  version: 'weekly',
  libraries: ['places'],
});

const mapOptions = {
  center: {
    lat: 28.698201,
    lng: -81.385324,
  },
  zoom: 10,
  mapId: 'e9bfa2e1008f3bad',
};

const locations = {
  AltamonteSprings: { lat: 28.663125, lng: -81.366088 },
  Apopka: { lat: 28.709506, lng: -81.462748 },
  Daytona: { lat: 29.209724, lng: -81.022261 },
  Deltona: { lat: 28.901607, lng: -81.263697 },
  Heathrow: { lat: 28.786256, lng: -81.362923 },
  Kissimmee: { lat: 28.337361, lng: -81.403744 },
  LakeMary: { lat: 28.756081, lng: -81.333416 },
  Longwood: { lat: 28.699983, lng: -81.327208 },
  MtDora: { lat: 28.824001, lng: -81.643968 },
  Oviedo: { lat: 28.671473, lng: -81.208297 },
  WinterPark: { lat: 28.59877, lng: -81.339132 },
};

function ActivityMap() {
  const mapRef = useRef();

  function addMarkers(map, google) {
    Object.keys(locations).forEach((location) => {
      const markerOptions = {
        map,
        position: locations[location],
        icon: mapPin,
      };
      return new google.maps.Marker(markerOptions);
    });
  }

  useEffect(() => {
    loader
      .load()
      .then((google) => {
        const map = new google.maps.Map(mapRef.current, mapOptions);
        addMarkers(map, google);
      })
      .catch((err) => {
        // console.log('There was an error loading the map: ', err);
        throw new Error(err);
      });
  }, []);

  return (
    <div tw="mb-3">
      <h2 tw="mb-6">Serving the Central Orlando FL Region</h2>
      <div
        tw="w-full h-80 bg-neutral rounded-md"
        ref={mapRef}
        className="map-wrapper"
      />
    </div>
  );
}

export default ActivityMap;
