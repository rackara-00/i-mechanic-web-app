import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.error();
        }

        const body = await request.json();
        const {
            title,
            description,
            contact,
            imageSrc,
            category,
            location,
            car_model,
        } = body;

        // Ensure that all required fields are present
        if (!title || !description || !contact || !imageSrc || !category || !location || !car_model) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Log the location to see what data is being passed
        console.log("Location data:", location);

        const listing = await prisma.listing.create({
            data: {
                title,
                description,
                contact,
                imageSrc,
                category,
                car_model,
                locationValue: location.value, // Make sure this is the correct data type
                userId: currentUser.id,
            }
        });

        return NextResponse.json(listing);

    } catch (error) {
        console.error("Failed to create listing:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
