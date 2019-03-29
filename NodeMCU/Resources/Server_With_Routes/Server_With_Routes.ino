#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
 
// Replace with your network credentials
const char* ssid = "RMK";
const char* password = "1fb10a2048";
 
ESP8266WebServer server(80);   //instantiate server at port 80 (http port)
 
String page = "";
double tempratureData; 
void setup(void){

  // SETTING UP PINS
  pinMode(A0, INPUT);
  pinMode(16, OUTPUT);
  pinMode(2, OUTPUT);
  
  delay(1000);
  Serial.begin(115200);
  WiFi.begin(ssid, password); //begin WiFi connection
  Serial.println("");
  
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // ROUTE For Temprature Data
  server.on("/getTemprature", [](){
    server.send(200, "text/plain", String(tempratureData));
  });
  // --------------------------

  // Turn on/off the light : TEST
    // LIGHT #1 : LED
    server.on("/light/1/on", [](){
      digitalWrite(16, HIGH);
      server.send(200, "text/plain", "Light #1 ON");
    });

    server.on("/light/1/off", [](){
      digitalWrite(16, LOW);
      server.send(200, "text/plain", "Light #1 OFF");
    });

    // LIGHT #2 : RELAY
    server.on("/light/2/on", [](){
      digitalWrite(2, HIGH);
      server.send(200, "text/plain", "Light #1 ON");
    });

    server.on("/light/2/off", [](){
      digitalWrite(2, LOW);
      server.send(200, "text/plain", "Light #1 OFF");
    });
  // --------------------------
  
  server.begin();
  Serial.println("Web server started!");
}
 
void loop(void){
  //TEMP DATA-----------------------------------------------
  int reading = analogRead(0); 
  // measure the 3.3v with a meter for an accurate value
  //In particular if your Arduino is USB powered
  float voltage = reading * 3.3; 
  voltage /= 1024.0; 
  // now print out the temperature
  tempratureData = (voltage - 0.5) * 100;
  //---------------------------------------------------------
  
  delay(1000);
  server.handleClient();
}
