# import time
# import board
# import busio
# import adafruit_adxl34x

# i2c = busio.I2C(board.SCL, board.SDA)
# accelerometer = adafruit_adxl34x.ADXL345(i2c)
# accelerometer.enable_freefall_detection(threshold=10, time=22)
# accelerometer.enable_motion_detection(threshold=25)
# accelerometer.enable_tap_detection(tap_count=1, threshold=20, duration=50, latency=20, window=255)

# while True:
#     print("%f %f %f"%accelerometer.acceleration)
#     print("Dropped: %s"%accelerometer.events["freefall"])
#     print("Tapped: %s"%accelerometer.events['tap'])
#     print("Motion detected: %s"%accelerometer.events['motion'])
#     time.sleep(0.5)

# SPDX-FileCopyrightText: 2021 ladyada for Adafruit Industries
# SPDX-License-Identifier: MIT


import sys, json, numpy as np
import digitalio
import board
from PIL import Image, ImageDraw, ImageFont
import adafruit_rgb_display.ili9341 as ili9341
import adafruit_rgb_display.st7789 as st7789  # pylint: disable=unused-import
import adafruit_rgb_display.hx8357 as hx8357  # pylint: disable=unused-import
import adafruit_rgb_display.st7735 as st7735  # pylint: disable=unused-import
import adafruit_rgb_display.ssd1351 as ssd1351  # pylint: disable=unused-import
import adafruit_rgb_display.ssd1331 as ssd1331  # pylint: disable=unused-import

# First define some constants to allow easy resizing of shapes.
BORDER = 20
FONTSIZE = 24

# Configuration for CS and DC pins (these are PiTFT defaults):
cs_pin = digitalio.DigitalInOut(board.CE0)
dc_pin = digitalio.DigitalInOut(board.D25)
reset_pin = digitalio.DigitalInOut(board.D24)

# Config for display baudrate (default max is 24mhz):
BAUDRATE = 24000000

# Setup SPI bus using hardware SPI:
spi = board.SPI()

# pylint: disable=line-too-long
# Create the display:
disp = st7735.ST7735R(spi, rotation=0, height=128, x_offset=2, y_offset=3,   # 1.44" ST7735R
    cs=cs_pin,
    dc=dc_pin,
    rst=reset_pin,
    baudrate=BAUDRATE,
)
# pylint: enable=line-too-long

# Create blank image for drawing.
# Make sure to create image with mode 'RGB' for full color.
if disp.rotation % 180 == 90:
    height = disp.width  # we swap height/width to rotate it to landscape!
    width = disp.height
else:
    width = disp.width  # we swap height/width to rotate it to landscape!
    height = disp.height

image = Image.new("RGB", (width, height))

# Get drawing object to draw on image.
draw = ImageDraw.Draw(image)

# # Load a TTF Font
font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", FONTSIZE)

draw.rectangle((0, 0, width, height), fill=(0, 0, 0))
disp.image(image)
# Draw a green filled box as the background

# Draw a smaller inner purple rectangle
# draw.rectangle(
#     (BORDER, BORDER, width - BORDER - 1, height - BORDER - 1), fill=(170, 0, 136)
# )

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():
  # image = Image.open("homestusk.jpg")
 
  # # Scale the image to the smaller screen dimension
  # image_ratio = image.width / image.height
  # screen_ratio = width / height
  # if screen_ratio < image_ratio:
  #     scaled_width = image.width * height // image.height
  #     scaled_height = height
  # else:
  #     scaled_width = width
  #     scaled_height = image.height * width // image.width
  # image = image.resize((scaled_width, scaled_height), Image.BICUBIC)
  
  # # Crop and center the image
  # x = scaled_width // 2 - width // 2
  # y = scaled_height // 2 - height // 2
  # image = image.crop((x, y, x + width, y + height))
  
  # # Display image.
  # disp.image(image)


    # Draw Some Text

    text = read_in()
    lines = text #text.split("\n")
    (font_width, font_height) = font.getsize(text)
    if text == "2":
        first = ""
        second = ""
        third = ""
    elif text == "1": 
        first = "Player 3"
        second = "Player 2"
        third = "Dragon"
    elif text == "3":
        first = "Waiting"
        second = "For"
        third = "Swing"

    
    draw.text(
        (width // 2 - font_width // 2 - 30, height // 2 - font_height // 2 - 45),
        "" + first,
        font=font,
        fill=(255, 255, 255),
    )
    draw.text(
        (width // 2 - font_width // 2 - 30, height // 2 - font_height // 2 - 5),
        "" + second,
        font=font,
        fill=(255, 255, 255),
    )
    draw.text(
        (width // 2 - font_width // 2 - 30, height // 2 - font_height // 2 + 35),
        ""+ third,
        font=font,
        fill=(255, 255, 255),
    )
    # x = width // 2 - font_width // 2
    # y = height // 2 - font_height // 2
    # for line in lines:
    #     draw.text((x, y), line, font=font, fill="#FFFFFF")
    #     y += font.getsize(line)[1]
    # draw.text((x, y), CPU, font=font, fill="#FFFF00")
    # y += font.getsize(CPU)[1]
    # draw.text((x, y), MemUsage, font=font, fill="#00FF00")
    # y += font.getsize(MemUsage)[1]
    # draw.text((x, y), Disk, font=font, fill="#0000FF")
    # y += font.getsize(Disk)[1]
    # draw.text((x, y), Temp, font=font, fill="#FF00FF")
    # Display image.
    disp.image(image)

#start process
if __name__ == '__main__':
    main()



 