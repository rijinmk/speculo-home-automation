import RPi.GPIO as GPIO
import time

servoPIN = 14
GPIO.setmode(GPIO.BCM)
GPIO.setup(servoPIN, GPIO.OUT)

p = GPIO.PWM(servoPIN, 50) # GPIO 17 for PWM with 50Hz
p.start(0) # Initialization

i = 2.5
m = 12
c = 1 

try:
        while True: 
                print c
                if c:
                        p.ChangeDutyCycle(i)
                        c = 1
                else: 
                        p.ChangeDutyCycle(m)
                        c = 0

                time.sleep(1)

except KeyboardInterrupt:
        p.stop()
        GPIO.cleanup()