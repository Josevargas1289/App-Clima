import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react';

const Clima = () => {
    const [wheater, setWeather] = useState({})


    useEffect(() => {
        function success(pos) {
            const crd = pos.coords;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=f6d945db6562a0ae2f08c9577775bf32`)
                .then(res => setWeather(res.data));
                
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
        }
       

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
      

        navigator.geolocation.getCurrentPosition(success, error);

    }, [])
    

 
  const [isCentigrados, setIsCentigrados] = useState(true)
  const GradosF = Math.floor((wheater.main?.temp -273.15)* 9/5 + 32);
  const GradosC = Math.floor((GradosF - 32) * 5/9)

  const changeWheater = ()=>{
    setIsCentigrados(!isCentigrados)
  }

    return (
        <div className='card-container'>
            <div className='card'>
                <div className='title'>
                    <h1>Weather App</h1>
                    <h3>{`${wheater.name}, ${wheater.sys?.country}`}</h3>
                    <br />
                    <hr />
                </div>
                <div className='allData'>
                    <div className='temp'>
                    <h5 className='temp'>
                        <p>Temperatura:</p>  {" "}
                        {isCentigrados ? GradosF : GradosC}
                        {" "}
                        {isCentigrados ?   "°F" : "°C"}
                    </h5>
                    <img  src={`http://openweathermap.org/img/wn/${wheater.weather?.[0].icon}@2x.png`} alt="icon" className='imgWheather'/>
                    </div>
                    <div className='data'>
                        <span>"scattered clouds"</span>

                        <span>
                            <i className='bx bx-wind'></i>Wind speed: <small className='text-color-data'>{`${" "}${wheater.wind?.deg}m/s`}</small>  
                        </span>

                        <span> <i className='bx bxs-cloud' ></i> Clouds:<small className='text-color-data'>{`${" "}${wheater.clouds?.all}%`}</small>
                        </span>


                        <span> <i className='bx bxs-thermometer'></i> Pressure:<small className='text-color-data'>{`${" "}${wheater.main?.pressure}mb`}</small>
                        
                        </span>
                    </div>

                </div>
                <hr />
                <br />
                <div className='container-btn'>
                <button className='btn' onClick={changeWheater}>
                    <i className='bx bxs-file-find'></i> Degrees °F/°C
                </button>
                </div>
            </div>

        </div>
    );
};

export default Clima;
