import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';

const StatsPage = () => {
  const [statsData, setStatsData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2024-05-27');
  const [loading, setLoading] = useState(false);

  const fetchStatsData = async (date) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4444/api/data/${date}`);
      const data = await response.json();
      setStatsData(data);
    } catch (error) {
      console.error('Error fetching stats data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatsData(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleRefreshClick = () => {
    fetchStatsData(selectedDate);
  };

  return (
      <div>
        <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#29b6f6',
              marginTop: '20px',
            }}
        >
          Weather Statistics for {selectedDate}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <TextField
              id="date"
              label="Select Date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ marginRight: '20px' }}
          />
          <Button variant="contained" color="primary" onClick={handleRefreshClick}>
            Refresh
          </Button>
        </div>
        {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <CircularProgress />
            </div>
        ) : statsData.length === 0 ? (
            <Typography variant="h6" component="p" sx={{ textAlign: 'center', marginTop: '40px', fontWeight: 'bold', fontSize: '30px' }}>
              Data for {selectedDate} not found
            </Typography>
        ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="weather stats table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Time (HH:MM:SS)</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Temperature (°C)</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Humidity (%)</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Heat Index</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Rain</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Pressure (hPa)</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Light (lux)</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Wind Speed (km/h)</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Wind Direction</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {statsData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{new Date(row.date).toLocaleTimeString()}</TableCell>
                        <TableCell align="center">{row.temperature !== null ? row.temperature.toFixed(2) : 'N/A'}</TableCell>
                        <TableCell align="center">{row.humidity !== null ? row.humidity.toFixed(2) : 'N/A'}</TableCell>
                        <TableCell align="center">{row.heatIndex !== null ? row.heatIndex.toFixed(2) : 'N/A'}</TableCell>
                        <TableCell align="center">{row.isRaining ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="center">{row.pressure !== null ? row.pressure.toFixed(2) : 'N/A'}</TableCell>
                        <TableCell align="center">{row.lightIntensity !== null ? row.lightIntensity.toFixed(2) : 'N/A'}</TableCell>
                        <TableCell align="center">{row.windSpeed !== null ? row.windSpeed.toFixed(2) : 'N/A'}</TableCell>
                        <TableCell align="center">{row.windDirection}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        )}
      </div>
  );
};
export default StatsPage;
