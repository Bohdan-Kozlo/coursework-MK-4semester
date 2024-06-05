#include <DHT.h>
#include <FreqCount.h>

#define kpa2atm 0.00986923267

DHT dht1(2, DHT11);

// Pin definitions
int pressurePin = 0;
int rainPin = PD3;
int ldrPin = 1;
int sensorPin = A2;



// Variables
int val;
float pkPa; // Pressure in kPa
float pAtm; // Pressure in Atm
int ldr;
float light;
unsigned long count;
String windDirection;
int value = 0;


void sendSensorData() {
  int t4 = dht1.readTemperature();
  int h4 = dht1.readHumidity();
  int hic4 = dht1.computeHeatIndex(t4, h4, false);

  int val = analogRead(pressurePin);
  float pkPa = ((float)val / 1023.0 + 0.095) / 0.009 - 1.5;
  float pAtm = kpa2atm * pkPa;

  int rain = digitalRead(rainPin);
  int ldr = analogRead(ldrPin);
  readWindWaneData();
  
  String data = String(t4) + " " + String(h4) + " " + String(hic4) + " " + String(pkPa) + " " + String(rain) + " " + String(ldr) + " " + String(count * 2) + " " + windDirection;

  Serial.println(data);
}

void readWindWaneData() {
  value = analogRead(sensorPin);
  
  if (value == 238) {
    windDirection = "North";
  } else if (value == 618) {
    windDirection = "North-Northeast";
  } else if (value == 563) {
    windDirection = "Northeast";
  } else if (value == 940) {
    windDirection = "East-Northeast";
  } else if (value == 931) {
    windDirection = "East";
  } else if (value == 958) {
    windDirection = "East-Southeast";
  } else if (value == 839) {
    windDirection = "Southeast";
  } else if (value == 897) {
    windDirection = "South-Southeast";
  } else if (value == 737) {
    windDirection = "South";
  } else if (value == 779) {
    windDirection = "South-Southwest";
  } else if (value == 394) {
    windDirection = "Southwest";
  } else if (value == 424) {
    windDirection = "West-Southwest";
  } else if (value == 79) {
    windDirection = "West";
  } else if (value == 196) {
    windDirection = "West-Northwest";
  } else if (value == 137) {
    windDirection = "Northwest";
  } else if (value == 321) {
    windDirection = "North-Northwest";
  }

}


void setup() {
  Serial.begin(57600);
  dht1.begin();
  pinMode(rainPin, OUTPUT);
  FreqCount.begin(500);
}

void loop() {
  if (Serial.available() > 0) {
    String input = Serial.readStringUntil('\n');
    if (input == "Start Data") {
      sendSensorData();
    }
  }

  if (FreqCount.available()) {
    count = FreqCount.read();
  } 
 
}

