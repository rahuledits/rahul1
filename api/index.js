// API proxy for backend
export default async function handler(req, res) {
  const { method, url, headers, body } = req;
  
  // Backend URL (you'll need to update this with your actual backend URL)
  const backendUrl = process.env.BACKEND_URL || 'https://your-backend-url.com';
  
  try {
    const response = await fetch(`${backendUrl}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: method !== 'GET' ? JSON.stringify(body) : undefined,
    });
    
    const data = await response.json();
    
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 