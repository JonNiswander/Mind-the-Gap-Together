exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const NETLIFY_TOKEN = process.env.NETLIFY_TOKEN;
  const SITE_ID = 'ecb41d3a-bc77-43e9-b3fe-6b39ec92683f';

  // Debug: log what we have (without exposing token value)
  console.log('NETLIFY_TOKEN present:', !!NETLIFY_TOKEN);
  console.log('NETLIFY_TOKEN length:', NETLIFY_TOKEN ? NETLIFY_TOKEN.length : 0);
  console.log('Method:', event.httpMethod);

  if (!NETLIFY_TOKEN) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'NETLIFY_TOKEN environment variable not set' }) };
  }

  try {
    // GET — fetch all submissions
    if (event.httpMethod === 'GET') {
      const url = `https://api.netlify.com/api/v1/sites/${SITE_ID}/submissions?per_page=50`;
      console.log('Fetching:', url);
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${NETLIFY_TOKEN}` }
      });
      console.log('Netlify API status:', res.status);
      const body = await res.text();
      console.log('Netlify API response preview:', body.substring(0, 200));
      if (!res.ok) throw new Error(`Netlify API error: ${res.status} — ${body.substring(0, 100)}`);
      return { statusCode: 200, headers, body };
    }

    // DELETE — dismiss a submission
    if (event.httpMethod === 'DELETE') {
      const { submissionId } = JSON.parse(event.body || '{}');
      if (!submissionId) throw new Error('No submissionId provided');
      const res = await fetch(`https://api.netlify.com/api/v1/submissions/${submissionId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${NETLIFY_TOKEN}` }
      });
      console.log('Delete status:', res.status);
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  } catch(e) {
    console.log('Error:', e.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
