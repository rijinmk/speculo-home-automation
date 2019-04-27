import RPi.GPIO as GPIO
import time

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

MOT = 4
GPIO.setup(MOT, GPIO.OUT)
p = GPIO.PWM(MOT, 50)

print("reading file")
f = open('garage_info/garage_door_state.txt', 'r')
state = f.read()
f.close()

print("------>", state)
if(int(state)):
	print(12.5)
	p.start(12.5)
else:
	print(3)
	p.start(3)

while True: 
	f = open('garage_info/garage_door_state.txt', 'r')
	state = f.read()
	f.close()
	print(int(state))
	if(int(state)):
		p.ChangeDutyCycle(12.5)
	else:
		p.ChangeDutyCycle(3)
		
	time.sleep(1)
