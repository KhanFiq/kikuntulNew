import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split('.').pop();
  // Konversi buffer ke base64
  const base64 = `data:image/${ext};base64,${buffer.toString('base64')}`;
  return new Response(JSON.stringify({ base64 }), { status: 200 });
}
