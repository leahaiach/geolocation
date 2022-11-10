const axios = require("axios");
const {InvalidArgumentError} = require('./errors/costum_error');
module.exports = {

    getDistanceBetween2Points: (point1, point2)=>{
        const { getDistance } = require('geolib');
        const distance = getDistance(
            point1,point2
        )
        return distance / 1000;
    },
    //Given text address return coordinate
    getCoordinate: async (adress)=>{
        try{
            let result = await axios.request({
                url: `https://nominatim.openstreetmap.org/search?q=${adress}&limit=1&format=json`,
                method: 'get',
                format :'json'

            })
            if(result.data.length === 0){
                throw new InvalidArgumentError('Your adress is unknown ', 'address',adress) ;
            }
            let {lat , lon } = result.data[0];//result is always an array
            return {"lat":lat, "lon": lon};
        }
        catch(e){
            throw e;
        }

    }}