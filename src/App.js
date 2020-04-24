import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Card, CardContent, Typography, FormControl, InputLabel, Select , TextField} from '@material-ui/core';
import selectComponent from './components/selectComponent';
import NativeSelects from './components/selectComponent';
import { makeStyles } from '@material-ui/core/styles';
import UnitTypeSelect from './components/UnitTypeSelect';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


function App() {

  const classes = useStyles();

  const [mainUnits, setMainUnits] = React.useState([]);
  const [units, setUnits] = React.useState([]);
  const [mainUnit, setMainUnit] = React.useState('');
  const [firstSubUnit, setFirstSubUnit] = React.useState('');
  const [secondSubUnit, setSecondSubUnit] = React.useState('');
  const [firstValue, setFirstValue] = React.useState(1);
  const [secondValue, setSecondValue] = React.useState(1);


  useEffect(() => {
    var index = 0;
    getUnits(index)
  }, [])

  const getUnits = (index) => {
    axios.get('http://localhost:8083/unit/type')
    .then(response => {
      console.log(response)
      setMainUnits(response.data.data)
      setMainUnit(response.data.data[index])
      console.log(mainUnit);
      axios.get(`http://localhost:8083/unit/type/subunit/${response.data.data[index]}`)
      .then(response => {
        console.log(response);
        setUnits(response.data.data)
        setFirstSubUnit(response.data.data[index])
        setSecondSubUnit(response.data.data[index])
      }).catch(error => {
        console.log(error);
      })
    }).catch(error => {
      console.log(error);
    })
  }

  const mainUnitChange = (value) => {
    var index = mainUnits.indexOf(value)
    getUnits(index)
  }

  const firstUnitTypeChange = () => {
    convertFromFirstValueToSecondValue(firstValue)
  }

  const secondUnitTypeChange = () => {
    convertFromSecondValueToFirstValue(secondValue)
  }

  useEffect(() => { 
    firstUnitTypeChange()
  }, [firstSubUnit])


  useEffect(() => { 
    secondUnitTypeChange()
  }, [secondSubUnit])


  const convertFromFirstValueToSecondValue = (value) => {
    let requestBody = {
      firstUnitType : firstSubUnit,
      secondUnitType : secondSubUnit,
      inputValue : value
    }

    axios.post('http://localhost:8083/unit/type/convert', requestBody)
         .then((response) => {
           console.log(response);
           setFirstValue(value)
           setSecondValue(response.data.data)
         }).catch((error) => {
           console.log(error);
         })
  }

  const convertFromSecondValueToFirstValue = (value) => {
    let requestBody = {
      firstUnitType : secondSubUnit,
      secondUnitType : firstSubUnit,
      inputValue : value
    }

    axios.post('http://localhost:8083/unit/type/convert', requestBody)
         .then((response) => {
            console.log(response);
            setFirstValue(response.data.data)
            setSecondValue(value)
          }).catch((error) => {
           console.log(error);
         })
  }

  return (
    <div className="App">
    <header className="App-header">
    <h1>Quantity Measurement</h1>
      <Card className="card">
        <CardContent>

          <UnitTypeSelect name="Main Unit" width="450px" unitTypes={mainUnits} onChangeInUnit={mainUnitChange} unitValue={mainUnit}/>
        
          <div style={{display: "flex",  justifyContent: "space-around", alignContent: "center", marginTop: "8%"}}>
            <TextField id="outlined-basic" label="Value" variant="outlined" value={firstValue}
            onChange={(event) => {
              setFirstValue();
              convertFromFirstValueToSecondValue(event.target.value)
            }}/>
            <TextField id="outlined-basic" label="Value" variant="outlined" value={secondValue}
            onChange={(event) => {
              setSecondValue();
              convertFromSecondValueToFirstValue(event.target.value);
            }}/>
          </div>

          <div>
            =
          </div>
         
          <div style={{display: "flex",  justifyContent: "space-around", alignContent: "center"}}>
            <UnitTypeSelect name="Sub Unit" width="250px" unitTypes={units} onChangeInUnit={setFirstSubUnit} unitValue={firstSubUnit}/>
            <UnitTypeSelect name="Sub Unit" width="250px" unitTypes={units} onChangeInUnit={setSecondSubUnit} unitValue={secondSubUnit}/>
          </div>

        </CardContent>
      </Card>     
    </header>
    </div>
  );
}

export default App;
