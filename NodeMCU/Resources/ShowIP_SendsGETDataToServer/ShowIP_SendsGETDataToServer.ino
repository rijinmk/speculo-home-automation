#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h> 
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
 
/* Set these to your desired credentials. */
const char *ssid = "RMK";  //ENTER YOUR WIFI SETTINGS
const char *password = "1fb10a2048";
 
//Web/Server address to read/write from 
const char *host = "http://192.168.1.3";   //https://circuits4you.com website or IP address of server

// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x3F, 16, 2);
 
//=======================================================================
//                    Power on setup
//=======================================================================
 
void setup() {
  delay(1000);
  Serial.begin(115200);
  WiFi.mode(WIFI_OFF);        //Prevents reconnection issue (taking too long to connect)
  delay(1000);
  WiFi.mode(WIFI_STA);        //This line hides the viewing of ESP as wifi hotspot
  
  WiFi.begin(ssid, password);     //Connect to your WiFi router
  Serial.println("");
 
  Serial.print("Connecting");
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 
  //If connection successful show IP address in serial monitor
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //IP address assigned to your ESP

  lcd.begin();
  // Turn on the blacklight and print a message.
  lcd.backlight();
  lcd.print(WiFi.localIP());
}
 
//=======================================================================
//                    Main Program Loop
//=======================================================================
void loop() {

   int reading = analogRead(0); 
   // measure the 3.3v with a meter for an accurate value
   //In particular if your Arduino is USB powered
   float voltage = reading * 3.3; 
   voltage /= 1024.0; 
   
   // now print out the temperature
   float temperatureC = (voltage - 0.5) * 100;
   Serial.print(temperatureC); 
   Serial.println(" degrees C");
  
  HTTPClient http;    //Declare object of class HTTPClient
 
  //GET Data
  String getData = "?temp=" + String(temperatureC);  //Note "?" added at front
  String Link = "http://192.168.1.3:3010/get_sensor_data" + getData;
  
  http.begin(Link);     //Specify request destination
  
  int httpCode = http.GET();            //Send the request
  String payload = http.getString();    //Get the response payload
 
  Serial.println(httpCode);   //Print HTTP return code
  Serial.println(payload);    //Print request response payload
 
  http.end();  //Close connection
  
  delay(1000);  //GET Data at every 5 seconds
}
