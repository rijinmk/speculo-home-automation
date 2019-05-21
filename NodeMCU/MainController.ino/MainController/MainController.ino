#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Replace with your network credentials
const char* ssid = "MU-STUDENT-1";
const char* password = "mahedubai";

ESP8266WebServer server(80);   //instantiate server at port 80 (http port)

// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x3F, 16, 2);

double tempratureData;
String IP;
int curr_IP = 0;

void setup(void) {

  // PLAYGROUND ---------------------------------------------

  //---------------------------------------------------------

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

  // SHOW HOST IP
  IP = WiFi.localIP().toString();
  int sumDot = 0; int x;
  for (x = 0; x < IP.length(); x++) {
    if (IP[x] == '.') {
      sumDot++;
      if (sumDot == 3) {
        break;
      }
    }
  };

  String host_IP = "";
  for (x + 1; x < IP.length(); x++) {
    host_IP += IP[x];
  }

  // Turn on the blacklight and print a message.
  lcd.begin();
  lcd.clear();
  lcd.backlight();
  lcd.print("IP:");
  // Serial.println("Length of the IP" + String(IP.length()));
  lcd.print(WiFi.localIP());
  delay(2000);
  lcd.clear();

  // ROUTE For Temprature Data
  server.on("/getTemprature", []() {
    // Serial.println("Sending temprature data");
    server.send(200, "text/plain", String(tempratureData));
  });
  // --------------------------

  // Turn on/off the light
  // LIGHT #1 : LED ----------------------------------------------------
  server.on("/light/1/on", []() {
    digitalWrite(16, HIGH);
    Serial.println("Light #1 is ON");
    server.send(200, "text/plain", "Light #1 ON");
  });

  server.on("/light/1/off", []() {
    digitalWrite(16, LOW);
    Serial.println("Light #1 is OFF");
    server.send(200, "text/plain", "Light #1 OFF");
  });

  server.on("/light/1/status", []() {
    Serial.println("Sending light #1 status");
    server.send(200, "text/plain", String(digitalRead(16)));
  });

  // LIGHT #2 : RELAY ----------------------------------------------------
  server.on("/light/2/on", []() {
    digitalWrite(2, HIGH);
    Serial.println("Light #2 is ON");
    server.send(200, "text/plain", "Light #1 ON");
  });

  server.on("/light/2/off", []() {
    digitalWrite(2, LOW);
    Serial.println("Light #2 is OFF");
    server.send(200, "text/plain", "Light #1 OFF");
  });

  server.on("/light/2/status", []() {
    Serial.println("Sending light #2 status");
    server.send(200, "text/plain", String(digitalRead(2)));
  });
  // --------------------------

  // AC : LCD ----------------------------------------------------
  String ac_stat;
  server.on("/ac/1/on", []() {
    lcd.setCursor(0, 1);
    // ac_stat = "1"
    lcd.print("AC:ON ");
    Serial.println("AC is ON");
    server.send(200, "text/plain", "AC");
  });

  server.on("/ac/1/off", []() {
    lcd.setCursor(0, 1);
    // ac_stat = "0"
    lcd.print("AC:OFF");
    Serial.println("AC is OFF");
    server.send(200, "text/plain", "AC");
  });

  server.on("/ac/1/sch", []() {
    String timeSch = server.arg("time");
    Serial.print("Getting time for scheduling: ");
    Serial.println(timeSch);
    // SCHEDULING --------------------------------
    lcd.setCursor(5, 0);
    lcd.print(timeSch);
    //--------------------------------------------
    server.send(200, "text/plain", "SCHEDULING");
  });

  server.on("/ac/1/status", []() {
    lcd.setCursor(0, 1);
    lcd.print("AC:OFF");
    Serial.println("Sending AC data");
    server.send(200, "text/plain", "AC");
  });

  // ----------------------------------------------------

  // TEMP --------------------------------
  lcd.setCursor(13, 1);
  lcd.print("22C");
  //--------------------------------------------

  server.begin();
  Serial.println("Web server started!");
}

int val;

void loop(void) {
  // PLAYGROUND --------------------------------------------

  //---------------------------------------------------------

  //TEMP DATA-----------------------------------------------
  int reading = analogRead(0);
  // measure the 3.3v with a meter for an accurate value
  //In particular if your Arduino is USB powered
  float voltage = reading * 3.3;
  voltage /= 1024.0;
  // now print out the temperature
  tempratureData = (voltage - 0.5) * 100;
  //---------------------------------------------------------

  // SHOW TEMP ON LCD ---------------------------------------
  lcd.setCursor(7, 1);
  lcd.print(tempratureData);
  //---------------------------------------------------------

  // SHOW IP --------------------------------------------------
  //  lcd.setCursor(0,0);
  //  lcd.print(IP[curr_IP]);
  //  curr_IP++;
  //  if(curr_IP == IP.length()-1){
  //    curr_IP = 0;
  //  }
  //-----------------------------------------------------------


  server.handleClient();
  delay(200);
}
