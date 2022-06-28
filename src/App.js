import { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import Select from 'react-select';
import moment from "moment";

function App() {

  const apiUrl = `https://worldtimeapi.org/api/timezone`;
  const [timezone, setTimezones] = useState([])
  const [choice, setChoice] = useState('Asia/Yekaterinburg');
  // const [selectedTimeZone, setSelectedTimeZone] = useState();
  const selectedApi = `https://worldtimeapi.org/api/timezone/${choice.label}`;
  const [localtime, setLocaltime] = useState(null);
  const [timeInterval, setTimeInterval] = useState(0);

setTimeout(() => {
  setTimeInterval(timeInterval + 1);
}, 5000);


  useEffect(() => {
    axios.get(apiUrl)
    .then(res => {
      setTimezones(res.data);
    })
    .catch(error => {
      console.log("there was an error with connecting to database")
    })

  }, []);

  useEffect(() => {
    axios.get(selectedApi)
    .then(res => {
      setLocaltime(res.data.datetime);
    })
    .catch(error => {
      console.log("there was an error with connecting to database")
    })

  }, [choice, selectedApi, timeInterval]);

  const options = timezone.map(str => ({label: str}));
  const date = localtime?.substring(0,19).replace('T',' ');


  return (
    <div className="App">
      <p> Please choose your timezone </p>
      <Select className="select" options={options} onChange={setChoice}></Select>
      <p><strong>Current:</strong> {JSON.stringify(choice?.label).replace("_", " ").replace('"', ' ').replace('"', ' ').replace("/", " / ")}</p>
      <p><strong>Time: </strong>{localtime ? [date] : null}</p>
    </div>
  );
}

export default App;
