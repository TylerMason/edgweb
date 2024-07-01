import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find({});
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Error fetching users' }), { status: 500 });
  }
}
