import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {
  Button, CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";

const MonthlyAveragePage = () => {
  const [averageData, setAverageData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [loading, setLoading] = useState(false);

  function getCurrentMonth() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  const fetchAverageData = async (month) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4444/api/data/average/${month}`);
      const data = await response.json();
      setAverageData(data);
    } catch (error) {
      console.error('Error fetching average data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAverageData(selectedMonth);
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleRefreshClick = () => {
    fetchAverageData(selectedMonth);
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
          Monthly Weather Averages
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <TextField
              id="month"
              label="Select Month"
              type="month"
              value={selectedMonth}
              onChange={handleMonthChange}
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
        ) : averageData.length === 0 ? (
            <Typography variant="h6" component="p" sx={{ textAlign: 'center', marginTop: '40px', fontSize: '30px' }}>
              Data for the selected month is not available
            </Typography>
        ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="monthly average table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Temperature (°C)</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Humidity (%)</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Heat Index (°C)</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Pressure (hPa)</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Light (lux)</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Wind Speed (km/h)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {averageData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{row.date || 'N/A'}</TableCell>
                        <TableCell align="center">{row.averageTemperature !== null ? row.averageTemperature.toFixed(2) : 'N/A'}</TableCell>
                        <TableCell align="center">{row.averageHumidity !== null ? row.averageHumidity.toFixed(2) : 'N/A'}</TableCell>
                        <TableCell align="center">{row.averageHeatIndex !== null ? row.averageHeatIndex.toFixed(2) : 'N/A'}</TableCell>
                        <TableCell align="center">{row.averagePressure !== null ? row.averagePressure.toFixed(2) : 'N/A'}</TableCell>
                        <TableCell align="center">{row.averageLightIntensity !== null ? row.averageLightIntensity.toFixed(2) : 'N/A'}</TableCell>
                        <TableCell align="center">{row.averageWindSpeed !== null ? row.averageWindSpeed.toFixed(2) : 'N/A'}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        )}
      </div>
  );
};

export default MonthlyAveragePage;