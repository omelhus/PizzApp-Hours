import {
  Box,
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from '@mui/material';
import * as React from 'react';
import './style.css';

function nextDay(x: number) {
  var now = new Date();
  now.setDate(now.getDate() + ((x + (7 - now.getDay())) % 7));
  return now;
}

function diff_hours(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}

function getSaturday() {
  let saturday = new Date();
  if (saturday.getDay() !== 6) {
    saturday = nextDay(7 - saturday.getDay());
  }
  saturday.setHours(20);
  saturday.setMinutes(0);
  saturday.setSeconds(0);
  return saturday;
}

export default function App() {
  const [usePoolish, setUsePoolish] = React.useState(true);
  const today = new Date();
  today.setHours(21);
  const saturday = getSaturday();
  const hours = diff_hours(today, saturday);

  return (
    <Container>
      <h1>{saturday.toDateString()} 20:00</h1>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={usePoolish}
              onChange={() => setUsePoolish(!usePoolish)}
            />
          }
          label="Poolish (12t)"
        />
      </FormGroup>
      <div>
        RT: 2t
        <br />
        CT: {hours - 2 - 10 - (usePoolish ? 12 : 0)}t
        <br />
        RT Bulk: 2t
        <br />
        RT: 8t
      </div>
    </Container>
  );
}
