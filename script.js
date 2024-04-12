'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map;
let mapEvent;

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;

      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', function (mapE) {
        mapEvent = mapE;

        form.classList.remove('hidden');
      });
    },
    function () {
      alert('Could not get your current location');
    }
  );

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Hello Map')
    .openPopup();
});

inputType.addEventListener('change', function (e) {
  e.preventDefault();
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
});
