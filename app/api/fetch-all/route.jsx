import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

export async function GET() {
  if (!MONGODB_URI) {
    return new Response(JSON.stringify({ error: 'Please define the MONGODB_URI environment variable inside .env.local' }), { status: 500 });
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(); // This will use the database name from the URI

  try {
    const collections = await db.collections();
    const data = {};

    for (const collection of collections) {
      const collectionName = collection.collectionName;
      const documents = await collection.find({}).toArray();
      data[collectionName] = documents;
    }

    await client.close();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error fetching collections:', error);
    await client.close();
    return new Response(JSON.stringify({ error: 'Error fetching collections' }), { status: 500 });
  }
}
