import {useEffect, useState} from "react";
import axios from 'axios';

const Country =({name, capital, area, languages, imgSrc, weatherInfo}) =>{
    const weatherIcon = `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`;
    return(
        <>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>area {area}</p>
            <p><strong>languages</strong></p>
            <ul>
                {
                    languages.map((e, ekey) => <li key={ekey}>{e}</li>)
                }
            </ul>
            <img src={imgSrc} alt={name} width="250" height="150"/>
            <h2>Weather in {weatherInfo.name}</h2>
            <p>temperature {weatherInfo.main.temp} Celcius</p>
            <img src={weatherIcon} alt="weatherIcon"/>
            <p>wind {weatherInfo.wind.speed} m/s</p>
        </>
    )
}
const Countries = ({countries, countryWeather, handlerShow}) => {
    if (countries){
        if (countries.length >10){
            return(
                <>
                    <p>Too many matches, specify another filter</p>
                </>
            )
        }else if(countries.length >1){
            return(
                <>
                    <ul>
                        {countries.map((element, ekey)=>
                            <li key={ekey}>
                                {element.name.common}
                                <button onClick={()=>handlerShow(element.name.common)}>show</button>
                            </li>
                        )}
                    </ul>
                </>
            )
        }else if (countries.length ===1 && countryWeather){
            const countriFound = countries[0];
            let languages=[];
            let i=0;
            for(const key in countries[0].languages){
                languages[i] = countries[0].languages[key];
                i++;
            }
            return(
                <>
                    <Country name={countriFound.name.common} capital={countriFound.capital} area={countriFound.area}
                             languages={languages} imgSrc={countriFound.flags.svg} weatherInfo={countryWeather}/>
                </>
            )
        }
    }else{
        return(<>
            <p>Type something!!</p>
        </>)
    }
}
const Form = ({onChange, country}) =>{
    return(
        <>
            <form>
                country:<input value={country} onChange={onChange}/>
            </form>
        </>
    )
}

function App() {
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);
    const [countryToShow, setCountryToShow] = useState(null);
    const [countryWeather, setCountryWeather] = useState(null)
    useEffect(() => {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
                setCountries(response.data)
            })
    }, []);
    useEffect(() => {
        if (countryToShow){
            if(countryToShow.length === 1){
                const newApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${countryToShow[0].capitalInfo.latlng[0]}&lon=${countryToShow[0].capitalInfo.latlng[1]}&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric`;
                axios.get(newApiURL)
                    .then(response => {
                        setCountryWeather(response.data);
                    })
            }
        }
    }, [countryToShow]);
    const handleChange = (event)=>{
        setCountry(event.target.value.toLowerCase());
        setCountryToShow(countries.filter(e=>e.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    }
    const handleShow = (countryToShow) =>{
        setCountry(countryToShow);
        setCountryToShow(countries.filter(e=>e.name.common.toLowerCase().includes(countryToShow.toLowerCase())))
    }
  return (
    <div>
        <Form onChange={handleChange} country={country}/>
        <Countries countries={countryToShow} countryWeather={countryWeather} handlerShow={handleShow}/>
    </div>
  )
}
export default App
