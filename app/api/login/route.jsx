import bcrypt from 'bcrypt';
import clientPromise from '../../lib/mongodb';

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db();
  
  const { username, password } = await req.json();
  
  const user = await db.collection('users').findOne({ username });
  
  if (user && await bcrypt.compare(password, user.password)) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ success: false }), { status: 401 });
  }
}
