const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

function startSerialDataListening() {
  return new Promise((resolve, reject) => {
    const serialPort = new SerialPort({
      path: "COM2",
      baudRate: 57600
    });

    let dataObject = {
      temperature: null,
      humidity: null,
      heatIndex: null,
      pressure: null,
      isRaining: false,
      lightIntensity: null,
      windSpeed: null,
      windDirection: null
    };

    const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    serialPort.write("Start Data", (err) => {
      if (err) {
        reject(err);
      }
    });

   parser.on("data", (data) => {
     console.log(data);
     const dataArr = data.split(" ");
     dataObject.temperature = dataArr[0];
     dataObject.humidity = dataArr[1];
     dataObject.heatIndex = dataArr[2];
     dataObject.pressure = dataArr[3];
     dataObject.isRaining = dataArr[4] === "1";
     dataObject.lightIntensity = dataArr[5];
     dataObject.windSpeed = dataArr[6];
     dataObject.windDirection = dataArr[7];
     resolve(dataObject);
     serialPort.close(e => console.log(e));
   })
  });
}

module.exports = {startSerialDataListening}
