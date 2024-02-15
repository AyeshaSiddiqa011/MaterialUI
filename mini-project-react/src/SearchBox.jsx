import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';


export default function SearchBox({updateInfo}) {

let [city, setCity] = useState("")
let [error, setError]= useState(false)

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "b5e9aed7e99f00e9b6960acfede2447d";

let getWeather = async() => {
    try {
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
         console.log(jsonResponse)
         let result = {
             city: city,
             temp: jsonResponse.main.temp,
             tempMin: jsonResponse.main.temp_min,
             tempMax: jsonResponse.main.temp_max,
             humidity: jsonResponse.main.humidity,
             feelsLike: jsonResponse.main.feels_like,
             weather: jsonResponse.weather[0].description,
         }
         console.log(result);
         return result;
    } catch(err) {
      throw err;
    }
  
}


let handelChange = (evt) => {
    setCity(evt.target.value)
}

let handelSubmit = async (evt) => {
    try {
        evt.preventDefault();
        console.log(city);
        setCity("");
        let newinfo = await getWeather();
        updateInfo(newinfo)
    } catch(err){
        setError(true)
    }
   
}
    return (
            <div className="SearchBox">

            <form onSubmit={handelSubmit}>
            <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handelChange}/>
            <br /><br />
            <Button variant="contained" type="submit">Search</Button>
            {error && <p style={{color: "red"}}>No such place exists in our data!</p>}
            </form>

            </div>
    
    )
}