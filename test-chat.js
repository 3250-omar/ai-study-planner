const fetch = require('node-fetch');

async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'test' }] })
    });
    
    if (!res.ok) {
      const text = await res.text();
      console.error('Failed with status:', res.status);
      console.error('Error body:', text);
    } else {
      console.log('Success!', res.status);
      const text = await res.text();
      console.log('Response body snippet:', text.slice(0, 100));
    }
  } catch (e) {
    console.error('Network error:', e);
  }
}

test();
