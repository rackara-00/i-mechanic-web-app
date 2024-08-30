import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.error(); // Or redirect to login if preferred
  }

  const { listingId } = await request.json();

  if (!listingId) {
    return NextResponse.error();
  }

  try {
    const listingAndRequest = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        requests: {
          create: {
            userId: user.id, 
          },
        },
      },
    });

    return NextResponse.json(listingAndRequest);
  } catch (error) {
    console.error('Error creating request:', error);
    return NextResponse.error();
  }
}
