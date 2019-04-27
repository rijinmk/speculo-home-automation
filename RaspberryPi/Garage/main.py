import RPi.GPIO as GPIO
import json
import time
import random
import urllib
import os

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

PIR = 14
LED = 23
MOT = 4

# ---------------------ULTRASONIC-------------------------
UTR = 15
UEC = 18
GPIO.setup(UTR, GPIO.OUT)
GPIO.setup(UEC, GPIO.IN)


def distance():
    # set Trigger to HIGH
    print(1)
    GPIO.output(UTR, True)

    # set Trigger after 0.01ms to LOW
    time.sleep(0.00001)
    print(2)
    GPIO.output(UTR, False)

    print(3)
    StartTime = time.time()
    print(4)
    StopTime = time.time()

    # save StartTime
    print(5)
    while GPIO.input(UEC) == 0:
        StartTime = time.time()

    # save time of arrival
    print(6)
    while GPIO.input(UEC) == 1:
        StopTime = time.time()

    # time difference between start and arrival
    print(7)
    TimeElapsed = StopTime - StartTime
    # multiply with the sonic speed (34300 cm/s)
    # and divide by 2, because there and back
    print(8)
    distance = (TimeElapsed * 34300) / 2

    print(9)
    return distance

# ---------------------------------------------------------


GPIO.setup(PIR, GPIO.IN)  # Read output from PIR motion sensor
GPIO.setup(LED, GPIO.OUT)  # LED output pin
GPIO.setup(MOT, GPIO.OUT)  # Motor output pin

p = GPIO.PWM(MOT, 50)
f = open('garage_info/garage_door_state.txt', 'w')
f.write('0')
f.close()
p.start(3)


def ret_num_plate():
    # os.system('sudo fswebcam number_plate.jpg')
    time.sleep(1)
    os.system('sudo curl -X POST "https://api.openalpr.com/v2/recognize?secret_key=sk_be2a90aac4659f2a66e063f6&recognize_vehicle=1&country=ae&return_image=0&topn=10" -F image=@/home/pi/Desktop/Garage/number_plate.jpg > ~/Desktop/Garage/result.json')

    f = open('result.json', 'r')
    result = f.read()
    f.close()

    j = json.loads(result)
    num_plate = j['results'][0]['plate']
    return num_plate


while True:
    i = GPIO.input(PIR)
    if i == 0:  # When output from motion sensor is LOW
        print("No intruders", i)
        time.sleep(0.1)
    elif i == 1:  # When output from motion sensor is HIGH
        print("Intruder detected", i)
        break
        time.sleep(0.1)

for i in range(3):
    try:
        np = ret_num_plate()
        break
    except:
        pass
try:
    print(np)
except:
    p.stop()
    GPIO.cleanup()

n = np.split('-')[1]

f = open('garage_info/curr_np.txt', 'w')
f.write(n)
f.close()

f = open('garage_info/allowed_np.txt', 'r')
allowed_np = f.read()
f.close()

print(allowed_np)

if(n in allowed_np.split(',')):
    print("OPEN GARAGE")
    # MOTOR
    time.sleep(1)
    f = open('garage_info/garage_door_state.txt', 'w')
    f.write('1')
    f.close()
    p.ChangeDutyCycle(12.5)
    time.sleep(1)

else:
    print("WRONG CAR")
    GPIO.output(LED, 1)
    time.sleep(1)

p.stop()
