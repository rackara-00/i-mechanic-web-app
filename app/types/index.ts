import { Listing, Request, User } from "@prisma/client";

export type SafeListing = Omit<Listing, 'createdAt'> & {
    createdAt: string;
  };

export type SafeRequests = Omit<
  Request,
  'createdAt' | 'listing'
> & {
  createdAt: string;
  listing: SafeListing;
};

export type SafeUser= Omit<
    User,
    "createdAt" | "updatedAt" | 'emailVerified'
> &{
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};