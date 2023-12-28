import axios from 'axios'

const getLocationDetailsByLonLat = async (longitude, latitude) => {
    axios.get(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`).then( res => {
        currentTempCountryValue = res.data.address?.country
    }).catch(err => {
        console.log('Error: ', err.message);
    });
}

export let currentTempCountryValue = '';
export {getLocationDetailsByLonLat};