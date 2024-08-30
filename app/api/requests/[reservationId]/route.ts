import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
  requestId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
): Promise<Response> {
  const currentUser = await getCurrentUser();

  console.log('currentUser', currentUser);

  if (!currentUser) {
    return NextResponse.error();
  }

  const { requestId } = params;

  if (!requestId || typeof requestId !== 'string') {
    throw new Error('Invalid ID');
  }

  const requests = await prisma.request.deleteMany({
    where: {
      id: requestId,
      OR: [
        { userId: currentUser.id },
        { listing: { userId: currentUser.id } },
      ],
    },
  });

  return NextResponse.json(requests);
}
