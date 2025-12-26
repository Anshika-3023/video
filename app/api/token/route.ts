import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.STREAM_API_SECRET;

export async function POST(request: NextRequest) {
  // Validate required environment variables
  if (!secret) {
    console.error('STREAM_API_SECRET is not configured');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const token = jwt.sign(
      {
        user_id: userId,
      },
      secret,
      {
        expiresIn: '24h',
        algorithm: 'HS256',
      }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json({ error: 'Failed to generate token' }, { status: 500 });
  }
}