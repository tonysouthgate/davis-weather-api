export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Davis weather function executing...');
    
    // Davis API credentials
    const API_KEY = 'bvgu5bfmm99lvfrqhlffy3l8pmpbq26v';
    const API_SECRET = 'lhcttqhmgxipv3zy8xgupadhbgowwcs1';
    const STATION_ID = '92193';

    // WeatherLink API URL
    const apiUrl = `https://api.weatherlink.com/v2/current/${STATION_ID}?api-key=${API_KEY}`;
    
    console.log('Making request to WeatherLink API...');
    
    // Make request to WeatherLink API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Api-Secret': API_SECRET,
        'Accept': 'application/json',
        'User-Agent': 'Weather-Dashboard/1.0'
      }
    });

    console.log('WeatherLink API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('WeatherLink API error:', errorText);
      throw new Error(`WeatherLink API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Successfully retrieved weather data');
    
    // Return successful response
    return res.status(200).json({
      success: true,
      data: data,
      timestamp: new Date().toISOString(),
      station_id: STATION_ID
    });

  } catch (error) {
    console.error('Function error:', error.message);
    
    // Return error response
    return res.status(200).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      station_id: '92193'
    });
  }
}
