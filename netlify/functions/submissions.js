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
  const SITE_ID = 'unique-toffee-1b6e64';

  if (!NETLIFY_TOKEN) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'NETLIFY_TOKEN not set' }) };
  }

  try {
    // GET — fetch all submissions
    if (event.httpMethod === 'GET') {
      const res = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/submissions?per_page=50`, {
        headers: { 'Authorization': `Bearer ${NETLIFY_TOKEN}` }
      });
      if (!res.ok) throw new Error('Netlify API error: ' + res.status);
      const submissions = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(submissions) };
    }

    // DELETE — dismiss a submission
    if (event.httpMethod === 'DELETE') {
      const { submissionId } = JSON.parse(event.body || '{}');
      if (!submissionId) throw new Error('No submissionId provided');
      const res = await fetch(`https://api.netlify.com/api/v1/submissions/${submissionId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${NETLIFY_TOKEN}` }
      });
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  } catch(e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
