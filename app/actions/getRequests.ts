import prisma from '@/app/libs/prismadb';

interface IPrams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getRequests(params: IPrams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      //Object.assign(query, { listingId });
      query['listingId'] = listingId;
    }

    if (userId) {
      //Object.assign(query, { userId });
      query['userId'] = userId;
    }

    if (authorId) {
      //Object.assign(query, { authorId });
      query.listing = { userId: authorId };
    }

    const requests = await prisma.request.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeRequests = requests.map(request => ({
      ...request,
      createdAt: request.createdAt.toISOString(),
      listing: {
        ...request.listing,
        createdAt: request.listing.createdAt.toISOString(),
      },
    }));

    return safeRequests;
  } catch (error: any) {
    throw new Error(error);
  }
}
