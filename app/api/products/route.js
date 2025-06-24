import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

// GET: List all products or get by id
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id) {
      const product = await Product.findById(id);
      return NextResponse.json(product);
    }
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 });
  }
}

// POST: Create new product (admin only)
export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();
    const product = await Product.create(body);
    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 });
  }
}

// PUT: Update product (admin only)
export async function PUT(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();
    const product = await Product.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 });
  }
}

// DELETE: Delete product (admin only)
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 });
  }
}
