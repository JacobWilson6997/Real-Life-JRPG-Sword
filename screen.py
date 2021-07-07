

import json
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
BORDER = 10
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
    print(lines)
    #Since our input would only be having one line, parse our JSON data from that
    return lines[0]

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
    FONTSIZE = 10
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", FONTSIZE)
    draw.text(
    (width - BORDER - 6, height - BORDER - 5),
    "HP",
    font=font,
    fill=(255, 255, 255),
    )
    
    JSONob =  {#example object
        "smallText": {
            "lines": "small",
            "yStart": 10,
            "xStart": 0,
            "fontSize": 15,
            "lineSpacing": 0
        },
        "bigText": {
            "lines": "Big",
            "yStart": 10,
            "xStart": 10,
            "fontSize": 20,
            "lineSpacing": 14
        },
        "percentHP": 75
     }
    JSON = read_in()
    smallText = json.loads(JSON)["smallText"]
    bigText = json.loads(JSON)["bigText"]

    percentHP = json.loads(JSON)["percentHP"]

    draw.rectangle(
        (BORDER, 115, BORDER + percentHP, height - 5), fill=(0, 128, 0)
    )
    #smallText
    lines = smallText["lines"]
    yStart = smallText["yStart"]
    xStart = smallText["xStart"]
    fontSize = smallText["fontSize"]
    lineSpacing = smallText["lineSpacing"]
    multiLines = lines.split("%")

    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", fontSize)
    res = max(multiLines, key = len)
    (font_width, font_height) = font.getsize(res)
    x = width // 2 - font_width // 2
    y =  font_height // 2 - 10 + yStart
    for line in multiLines:
        font_width = font.getsize(line)[0]
        x = width // 2 - font_width // 2 + xStart
        draw.text((x, y), line, font=font, fill="#FFFFFF")
        y += font.getsize(line)[1] + lineSpacing

    #bigText
    lines = bigText["lines"]
    yStart = bigText["yStart"]
    xStart = bigText["xStart"]
    fontSize = bigText["fontSize"]
    lineSpacing = bigText["lineSpacing"]
    multiLines = lines.split("%")
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", fontSize)
    res = max(multiLines, key = len)
    (font_width, font_height) = font.getsize(res)

    x = width // 2 - font_width // 2
    y =  font_height // 2 - 10 + yStart
    for line in multiLines:
        font_width = font.getsize(line)[0]
        x = width // 2 - font_width // 2 + xStart
        draw.text((x, y), line, font=font, fill="#FFFFFF")
        y += font.getsize(line)[1] + lineSpacing
    # draw.text((x, y), CPU, font=font, fill="#FFFF00")
    # y += font.getsize(CPU)[1]
    # draw.text((x, y), MemUsage, font=font, fill="#00FF00")
    # y += font.getsize(MemUsage)[1]
    # draw.text((x, y), Disk, font=font, fill="#0000FF")
    # y += font.getsize(Disk)[1]
    # draw.text((x, y), Temp, font=font, fill="#FF00FF")
    # Display image.
    # Draw a smaller inner purple rectangle

    disp.image(image)

#start process
if __name__ == '__main__':
    main()



 