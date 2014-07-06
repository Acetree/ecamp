import datetime
import time
import random

def CreateOrderId():
	timeStamp = time.time()
	timeArray = time.localtime(timeStamp)
	timeInt = int(time.strftime("%Y%m%d%H%M%S", timeArray))
	randomInt = random.randint(100000,999999)
	orderId = timeInt * 1000000 + randomInt
	return str(orderId)

