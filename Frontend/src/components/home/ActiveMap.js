import {useState} from "react"
// import "./Map.css"
import { Row, Col,Form, FormLabel, Button, Card } from "react-bootstrap";
import { WorldMap } from "react-svg-worldmap";
import axios from 'axios';
import apiHost from '../../apiHost';

export default function ActiveMap() {
  const [data, setData] = useState([])

    const predictiondate=async()=>{
      const date=localStorage.getItem('date');
      const send={
        date:date
      }
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
      const xdata= await axios.post(`${apiHost}/api/prediction/active`,send);
      console.log(xdata)
      if (xdata.status === 200){
        setData(xdata.data.data.set)
      }
    }
  console.log("mapDta.....", data)
  return (
    <div>
        <Button variant="info" onClick={predictiondate}>
          Top 20 Active cases by country
        </Button>
       <WorldMap color="red" value-suffix="people" size="responsive" data={data} />
    </div>
  )
}