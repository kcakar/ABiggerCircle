# ABiggerCircle

**Usage**
cd to weather-app folder then use "npm install" command. 
After that you can view it with "npm start" command.

**Mood calculation logic:**
The mood has the value between 0 and 100 and is calculated using 3 different variables.
1. Temperature
2. Weather codes
3. Wind

After calculating contribution of each variable we reach our final mood value for the given time.

Since we have data for 5 days, and for every 3 hours for each day, I calculate the average mood value for all these data and reach the final mood value.

The mood calculating logic is in the MoodCalculator.js file and abstracted from everything else except the weather data so it is easy to replace it with new logic if necessary.

### 1) Temperature
Temperature can give up to 80 points to the mood value.

I have accepted -30 as the minimum mood value and +30 as the maximum mood value.

Therefore if the weather is -40 degrees it gives 0 mood value. If the weater is 33 degrees it gives +80 mood value.

0 degrees gives 50 mood value.

### 2) Weather Codes

* 2xx: Thunderstorm: -20 mood value
* 3xx: Drizzle: -5 mood value
* 5xx: Rain: -10 mood value
* 6xx: Snow: -15 mood value
* 7xx: Atmosphere: -5 mood value
* 800: Clear: 10 mood value
* 80x: Clouds: 10 mood value

### 3) Wind
- 0-5 m/s = +5 mood value
- 3-6 m/s = 0 mood value
- 6-8 m/s = -5 mood value
- 8-10 m/s = -10 mood value
- More than 10 m/s = -20 mood value
