import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.STREAM_SECRET_KEY!;

export async function POST(request: NextRequest) {
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