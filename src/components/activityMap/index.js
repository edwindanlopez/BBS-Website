import React, { useEffect, useRef } from "react";
import "twin.macro";
import { Loader } from "@googlemaps/js-api-loader";
import mapPin from "../../images/pinMarker.svg";

const loader = new Loader({
  apiKey: process.env.GATSBY_GOOGLE_MAP_KEY,
  version: "weekly",
  libraries: ["places"],
});

const mapOptions = {
  center: {
    lat: 28.698201,
    lng: -81.385324,
  },
  zoom: 10,
  mapId: "e9bfa2e1008f3bad",
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

export default function ActivityMap() {
  const mapWrapper = useRef();

  function addMarkers(map, google) {
    const markers = [];
    for (const location in locations) {
      const markerOptions = {
        map: map,
        position: locations[location],
        icon: mapPin,
      };
      const marker = new google.maps.Marker(markerOptions);
      markers.push(marker);
    }
    return markers;
  }

  useEffect(() => {
    console.log("Maps JS API loaded");
    const displayMap = mapWrapper.current;

    loader
      .load()
      .then((google) => {
        const map = new google.maps.Map(displayMap, mapOptions);
        addMarkers(map, google);
      })
      .catch((err) => {
        console.log("There was an error loading the map: ", err);
      });
  }, []);

  return (
    <div tw='mb-3'>
      <h2 tw='mt-6 mb-6'>Serving the Central Orlando FL Region</h2>
      <div
        tw='w-full h-80 bg-neutral rounded-md'
        ref={mapWrapper}
        className='map-wrapper'
      />
    </div>
  );
}
