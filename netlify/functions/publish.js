exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // CORS headers so admin.html can call this function
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const { content } = JSON.parse(event.body);
    if (!content) throw new Error('No content provided');

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO = 'JonNiswander/Mind-the-Gap-Together';
    const FILE = 'data.json';

    if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN environment variable not set');

    // Step 1: Get current file SHA
    const getRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json'
      }
    });

    if (!getRes.ok) {
      const err = await getRes.json();
      throw new Error('GitHub GET failed: ' + (err.message || getRes.status));
    }

    const fileData = await getRes.json();
    const sha = fileData.sha;

    // Step 2: Push updated content
    const encoded = Buffer.from(content).toString('base64');
    const putRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Admin portal update – ' + new Date().toISOString(),
        content: encoded,
        sha: sha
      })
    });

    if (!putRes.ok) {
      const err = await putRes.json();
      throw new Error('GitHub PUT failed: ' + (err.message || putRes.status));
    }

    const result = await putRes.json();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, commit: result.commit?.sha })
    };

  } catch(e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: e.message })
    };
  }
};
