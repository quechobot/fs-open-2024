import {useEffect, useState} from "react";
import axios from 'axios';
const Countries = ({countries, handlerShow}) => {
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
    }else if (countries.length ===1){
        const countriFound = countries[0];
        let languages=[];
        let i=0;
        for(const key in countries[0].languages){
            languages[i] = countries[0].languages[key];
            i++;
        }
        return(
            <>
                <h1>{countriFound.name.common}</h1>
                <p>capital {countriFound.capital}</p>
                <p>area {countriFound.area}</p>
                <p><strong>languages</strong></p>
                <ul>
                    {
                        languages.map((e, ekey) => <li key={ekey}>{e}</li>)
                    }
                </ul>
                <img src={countriFound.flags.svg} alt="Lamp" width="250" height="150"/>
            </>
        )
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
    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState([]);
    const countriesToShow = countries.filter(e=>e.name.common.toLowerCase().includes(country.toLowerCase()));
    useEffect(() => {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
                setCountries(response.data)
            })
    }, []);
    const handleChange = (event)=>{
        setCountry(event.target.value);
    }
    const handleShow = (countryToShow) =>{
        setCountry(countryToShow);
    }
  return (
    <div>
        <Form onChange={handleChange} country={country}/>
        <Countries countries={countriesToShow} handlerShow={handleShow}/>
    </div>
  )
}
export default App
