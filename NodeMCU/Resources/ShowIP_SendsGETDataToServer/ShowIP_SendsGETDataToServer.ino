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
WiFiServer server(80); 
String i; 
 
//=======================================================================
//                    Power on setup
//=======================================================================
 
void setup() {
  pinMode(0, OUTPUT);
  pinMode(2, OUTPUT);
  
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
  server.begin();
}
 
//=======================================================================
//                    Main Program Loop
//=======================================================================
void loop() {
    WiFiClient client = server.available();
    if (!client) { return; }
    while(!client.available()){  delay(1); }
    i = (client.readStringUntil('\r'));
    Serial.println(i);
    i.remove(0, 5);
    Serial.println(i);
    i.remove(i.length()-9,9);
    Serial.println(i);

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
  digitalWrite(0, HIGH);
  // digitalWrite(2, HIGH);
  delay(1000);
  digitalWrite(0, LOW);
  // digitalWrite(2, LOW);
  delay(1000);
  
  String q = "?temp=" + String(temperatureC); //+ "&light_1=" + String(lightStatus);  //Note "?" added at front
  String Link = "http://192.168.1.3:3010/tx_rx_data" + q;
  
  http.begin(Link);     //Specify request destination
  
  int httpCode = http.GET();            //Send the request
  String payload = http.getString();    //Get the response payload
 
  Serial.println(httpCode);   //Print HTTP return code
  Serial.println(payload);    //Print request response payload
 
  http.end();  //Close connection
  
  delay(1000);  //GET Data at every 5 seconds
}
