import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

// GET: List orders (admin: all, user: own)
export async function GET(req) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const filter = session.user.role === "admin" ? {} : { user: session.user.id || session.user._id };
    const orders = await Order.find(filter).populate('items.product').populate('user', 'email');
    return NextResponse.json(orders);
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 });
  }
}

// POST: Create new order
export async function POST(req) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    // Buat order di database
    const order = await Order.create({
      user: session.user.id,
      items: body.items,
      paymentMethod: body.paymentMethod,
      status: 'pending',
    });
    // Kirim notifikasi ke WhatsApp admin (ganti nomor sesuai kebutuhan)
    try {
      const adminWa = '6289655445219';
      const produkList = order.items.map(item => `- ${item.product} x${item.quantity}`).join('%0A');
      const waMsg =
        `Ada order baru dari ${session.user.email}%0A` +
        `Metode: ${order.paymentMethod}%0A` +
        `Produk:%0A${produkList}`;
      const waUrl = `https://wa.me/${adminWa}?text=${waMsg}`;
      return NextResponse.json({ order, waUrl });
    } catch (e) {
      // Jika gagal, tetap return order
      return NextResponse.json({ order });
    }
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 });
  }
}

// PATCH: Update order status (admin only)
export async function PATCH(req) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { orderId, status } = await req.json();
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    return NextResponse.json(order);
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 });
  }
}
