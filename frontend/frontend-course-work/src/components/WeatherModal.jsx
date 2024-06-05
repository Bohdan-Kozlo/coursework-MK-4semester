import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import {Alert, Stack} from "@mui/material";

const StyledCard = styled(Card)({
  maxWidth: 400,
  margin: 'auto',
  borderRadius: 16,
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  backgroundColor: '#bbdefb',
});

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState({});
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [intervalId, setIntervalId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4444/api/data");
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const newIntervalId = setInterval(fetchData, refreshInterval * 1000);
    setIntervalId(newIntervalId);
    return () => clearInterval(newIntervalId);
  }, [refreshInterval]);


  return (
    <div>
      {weatherData.isRaining ? (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="warning">Warning it's raining now</Alert>
        </Stack>
      ) : null}

      <StyledCard>
        <CardMedia
            component="img"
            height="180"
            image="https://wmo.int/sites/default/files/styles/featured_image_x1_768x512/public/2023-12/thumbnails_5.jpg?h=d1cb525d&itok=aZ4qUGTc"
            alt="Weather image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
            Weather Information
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: 'center' }}>
            {Date(weatherData.date).toString()}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                Temperature: {weatherData.temperature} °C
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                Heat Index: {weatherData.heatIndex} °C
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                Humidity: {weatherData.humidity} %
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                Rain: {weatherData.isRaining ? 'Yes' : 'No'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', fontSize: 15 }}>
                Pressure: {weatherData.pressure} hPa
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                Wind: {weatherData.windSpeed} km/h
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                Wind Direction: {weatherData.windDirection}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                Light: {weatherData.lightIntensity} lux
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            Last updated: {new Date().toLocaleTimeString()}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
            <TextField
                label="Refresh rate (seconds)"
                variant="filled"
                size="small"
                type="number"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
            />
          </div>
        </CardContent>
      </StyledCard>
    </div>
  );
};

export default WeatherCard;
