import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Line} from "react-chartjs-2";
import {
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField
} from "@mui/material";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const WeatherChartPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState({});
  const [period, setPeriod] = useState('day'); // 'day', 'month'
  const [loading, setLoading] = useState(false);

  const fetchDataForDate = async (date) => {
    try {
      const response = await fetch(`http://localhost:4444/api/data/${date}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return [];
    }
  };

  const fetchAverageDataForMonth = async (month) => {
    try {
      const response = await fetch(`http://localhost:4444/api/data/average/${month}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching average weather data:', error);
      return [];
    }
  };

  const fetchWeatherData = async () => {
    setLoading(true);
    let weatherData = [];
    if (period === 'day') {
      const date = selectedDate.toISOString().split('T')[0];
      weatherData = await fetchDataForDate(date);
    } else if (period === 'month') {
      const month = selectedDate.toISOString().slice(0, 7); // Get YYYY-MM format
      weatherData = await fetchAverageDataForMonth(month);
    }

    if (weatherData.length > 0) {
      const labels = weatherData.map(entry => new Date(entry.date).toLocaleTimeString());
      const temperatures = weatherData.map(entry => entry.temperature || entry.averageTemperature);
      const humidities = weatherData.map(entry => entry.humidity || entry.averageHumidity);
      const heatIndexes = weatherData.map(entry => entry.heatIndex || entry.averageHeatIndex);
      const pressures = weatherData.map(entry => entry.pressure || entry.averagePressure);
      const lightIntensities = weatherData.map(entry => entry.lightIntensity || entry.averageLightIntensity);
      const windSpeeds = weatherData.map(entry => entry.windSpeed || entry.averageWindSpeed);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperatures,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
          {
            label: 'Humidity (%)',
            data: humidities,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
          },
          {
            label: 'Heat Index (°C)',
            data: heatIndexes,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: 'Pressure (hPa)',
            data: pressures,
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
          },
          {
            label: 'Light Intensity (lux)',
            data: lightIntensities,
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
          },
          {
            label: 'Wind Speed (m/s)',
            data: windSpeeds,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
          }
        ]
      });
    } else {
      setChartData({});
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeatherData();
  }, [selectedDate, period]);

  return (
      <div>
        <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold', color: '#29b6f6', marginTop: '20px' }}>
          Weather Data Chart
        </Typography>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
            <InputLabel id="period-label">Period</InputLabel>
            <Select
                labelId="period-label"
                id="period"
                value={period}
                label="Period"
                onChange={(e) => setPeriod(e.target.value)}
            >
              <MenuItem value="day">Day</MenuItem>
              <MenuItem value="month">Month</MenuItem>
            </Select>
          </FormControl>
          {period === 'day' ? (
              <TextField
                  id="date"
                  label="Select Date"
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
          ) : (
              <TextField
                  id="month"
                  label="Select Month"
                  type="month"
                  value={selectedDate.toISOString().slice(0, 7)}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
          )}
        </Paper>
        {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <CircularProgress />
            </div>
        ) : chartData.labels && chartData.labels.length > 0 ? (
            <Paper sx={{ padding: 2 }}>
              <Line data={chartData} />
            </Paper>
        ) : (
            <Typography variant="h6" component="p" sx={{ textAlign: 'center', marginTop: '20px' }}>
              Data for {period === 'day' ? selectedDate.toISOString().split('T')[0] : selectedDate.toISOString().slice(0, 7)} not found
            </Typography>
        )}
      </div>
  );
};
export default WeatherChartPage;