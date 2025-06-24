// api/davis-weather.js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const API_KEY = 'bvgu5bfmm99lvfrqhlffy3l8pmpbq26v';
    const API_SECRET = 'lhcttqhmgxipv3zy8xgupadhbgowwcs1';
    const STATION_ID = '92193';

    const apiUrl = `https://api.weatherlink.com/v2/current/${STATION_ID}?api-key=${API_KEY}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Api-Secret': API_SECRET,
        'Accept': 'application/json',
        'User-Agent': 'Weather-Dashboard/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`WeatherLink API Error: ${response.status}`);
    }

    const data = await response.json();
    
    res.status(200).json({
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(200).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
