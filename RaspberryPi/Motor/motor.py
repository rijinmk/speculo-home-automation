import RPi.GPIO as GPIO
import time

servoPIN = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(servoPIN, GPIO.OUT)

p = GPIO.PWM(servoPIN, 50) # GPIO 17 for PWM with 50Hz
p.start(0) # Initialization
try:
  for i in range(0, 100, 1):
    p.ChangeDutyCycle(i)
    time.sleep(0.2)
except KeyboardInterrupt:
  p.stop()
  GPIO.cleanup()