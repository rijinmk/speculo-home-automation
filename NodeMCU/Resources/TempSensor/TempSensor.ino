#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

int sensorPin = 0;

// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x3F, 16, 2);
 
void setup()
{
 Serial.begin(9600);
  // initialize the LCD
  lcd.begin();

  // Turn on the blacklight and print a message.
  lcd.backlight();
  lcd.print("Hello, world!");
}
 
void loop()
{
 
 int reading = analogRead(sensorPin); 
 // measure the 3.3v with a meter for an accurate value
 //In particular if your Arduino is USB powered
 float voltage = reading * 3.3; 
 voltage /= 1024.0; 
 
 // now print out the temperature
 float temperatureC = (voltage - 0.5) * 100;
 Serial.print(temperatureC); 
 Serial.println(" degrees C");
 lcd.print(temperatureC);
 delay(1000);
 lcd.clear();
}
