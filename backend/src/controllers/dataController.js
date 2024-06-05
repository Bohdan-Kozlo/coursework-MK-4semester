const WeatherDataService = require("../services/weatherDataService");



class DataController {
  async getData(req, res) {
    try {
      const newData = await WeatherDataService.getWeatherData();
      res.send(newData)
      } catch (e) {
        console.log(e)
        res.sendStatus(500).json({message: "Error"})
      }
  }

  async getDataByDate(req, res) {
    try {
      const {date} = req.params
      const data = await WeatherDataService.getWeatherDataByDate(date)
      res.send(data)
    } catch (e) {
      console.log(e)
      res.sendStatus(500).json({message: "Error"})
    }
  }

  async getDataByWeek(req, res) {
    try {
      const data = await WeatherDataService.getWeatherDataByWeek()
      res.send(data)
    } catch (e) {
      console.log(e)
      res.sendStatus(500).json({message: "Error"})
    }
  }

  async getAverageDataByMonth(req, res) {
    try {
      const { month } = req.params; // month format should be 'YYYY-MM'
      const data = await WeatherDataService.getWeatherDataByMonth(month)
      res.send(data)
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Error" });
    }
  }
}



module.exports = new DataController()