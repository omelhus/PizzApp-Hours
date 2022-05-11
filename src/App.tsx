import {
  AppBar,
  Box,
  Container,
  Grid,
  Switch,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table/Table";
import * as React from "react";
import { useEffect } from "react";
import "./style.css";

function nextDay(x: number) {
  var now = new Date();
  now.setDate(now.getDate() + ((x + (7 - now.getDay())) % 7));
  return now;
}

function diff_hours(dt2: Date, dt1: Date) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}

function getSaturday() {
  let saturday = new Date();
  do {
    saturday = nextDay(1);
  }
  while(saturday.getDay() !== 6);
  
  saturday.setHours(20);
  saturday.setMinutes(0);
  saturday.setSeconds(0);
  return saturday;
}

export default function App() {
  const [usePoolish, setUsePoolish] = React.useState(
    JSON.parse(localStorage.getItem("usePoolish") ?? "true")
  );
  useEffect(() => {
    localStorage.setItem("usePoolish", JSON.stringify(usePoolish));
  }, [usePoolish]);
  const today = new Date();
  if (usePoolish) today.setHours(21);
  const saturday = getSaturday();
  const hours = diff_hours(today, saturday);
  const ct = hours - 2 - 10 - (usePoolish ? 12 : 0);
  const rows = [
    {
      d: false,
      h: "RT",
      v: "10",
    },
    {
      d: false,
      h: "CT",
      v: `${ct}`,
    },
    {
      d: !usePoolish,
      h: "Poolish @ 21:00",
      v: "12",
    },
  ];

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            align="center"
          >
            Pizza @ {saturday.toDateString()} 20:00
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Box sx={{ marginTop: "12px" }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <strong>Preferences</strong>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Switch
                        checked={usePoolish}
                        size="small"
                        onChange={() => setUsePoolish(!usePoolish)}
                      />
                    </TableCell>
                    <TableCell align="right">Poolish</TableCell>
                    <TableCell>{usePoolish ? "12 h" : ""}</TableCell>
                  </TableRow>
                  {[
                    { h: "RT", v: "2" },
                    { h: "CT", v: `${ct}` },
                    { h: "RT Bulk", v: "2" },
                    { h: "RT", v: "8" },
                  ].map((item) => (
                    <TableRow>
                      <TableCell align="right" colSpan={2}>
                        {item.h}
                      </TableCell>
                      <TableCell width="75px">{item.v} h</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Total</strong>
              <Table>
                <TableBody>
                  {rows.map((item) => {
                    if (item.d) return;
                    return (
                      <TableRow>
                        <TableCell align="right">{item.h}</TableCell>
                        <TableCell width="75px">{item.v} h</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
