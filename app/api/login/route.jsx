import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(req) {
  await dbConnect();
  const { username, password } = await req.json();

  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    return new Response(JSON.stringify({ success: true, token }), {
      status: 200,
      headers: { 'Set-Cookie': `token=${token}; HttpOnly; Path=/` }
    });
  } else {
    return new Response(JSON.stringify({ success: false }), { status: 401 });
  }
}
