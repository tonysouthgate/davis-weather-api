// api/davis-weather.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    console.log('Davis API function called');
    
    const API_KEY = 'bvgu5bfmm99lvfrqhlffy3l8pmpbq26v';
    const API_SECRET = 'lhcttqhmgxipv3zy8xgupadhbgowwcs1';
    const STATION_ID = '92193';

    const apiUrl = `https://api.weatherlink.com/v2/current/${STATION_ID}?api-key=${API_KEY}`;
    
    console.log('Fetching from WeatherLink API...');
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Api-Secret': API_SECRET,
        'Accept': 'application/json',
        'User-Agent': 'Weather-Dashboard/1.0'
      }
    });

    console.log('WeatherLink response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('WeatherLink API error:', errorText);
      throw new Error(`WeatherLink API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Successfully fetched weather data, sensors:', data.sensors ? data.sensors.length : 0);
    
    res.status(200).json({
      success: true,
      data: data,
      timestamp: new Date().toISOString(),
      station_id: STATION_ID
    });

  } catch (error) {
    console.error('Error in Davis API function:', error.message);
    
    res.status(200).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      station_id: '92193'
    });
  }
};
