const {startSerialDataListening} = require("./serialPort");
const DataModel = require("../DAO/dataModel");

class WeatherDataService {

  async getWeatherData() {
    const data = await startSerialDataListening()
    const newData = new DataModel(data)
    newData.date = new Date();
    await newData.save()
    return newData
  }

  async getWeatherDataByDate(date) {
    const startDate = new Date(date)
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date(date)
    endDate.setHours(23, 59, 59, 999)
    const data = await DataModel.find({date: {$gte: startDate, $lte: endDate}})
    return data
  }

  async getWeatherDataByWeek() {
    const nowDate = new Date();
    const startDate = new Date(nowDate);
    startDate.setDate(nowDate.getDate() - 7);
    const data = await DataModel.find({date: {$gte: startDate, $lte: nowDate}})
    return data
  }

  async getWeatherDataByMonth(month) {
    const [year, monthNumber] = month.split('-').map(Number);
    const startDate = new Date(year, monthNumber - 1, 1);
    const endDate = new Date(year, monthNumber, 0, 23, 59, 59, 999);

    const data = await DataModel.find({ date: { $gte: startDate, $lte: endDate } });

    // Group data by day
    const groupedData = data.reduce((acc, entry) => {
      const date = entry.date.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(entry);
      return acc;
    }, {});

    // Calculate average for each day
    const averageDataByDay = Object.keys(groupedData).map(date => {
      const dailyData = groupedData[date];
      return {
        date,
        averageTemperature: calculateAverage(dailyData.map(entry => entry.temperature)),
        averageHumidity: calculateAverage(dailyData.map(entry => entry.humidity)),
        averageHeatIndex: calculateAverage(dailyData.map(entry => entry.heatIndex)),
        averagePressure: calculateAverage(dailyData.map(entry => entry.pressure)),
        averageLightIntensity: calculateAverage(dailyData.map(entry => entry.lightIntensity)),
        averageWindSpeed: calculateAverage(dailyData.map(entry => entry.windSpeed)),
      };
    });

    return averageDataByDay.reverse();
  }
}

function calculateAverage(arr) {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, curr) => acc + curr, 0);
  return sum / arr.length;
}

module.exports = new WeatherDataService()