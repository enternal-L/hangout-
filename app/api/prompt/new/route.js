import { connectDB } from "@utils/mongodb";
import Event from "@models/event";

export const POST = async (request) => {
    const {userId, subject, media, description, location, date, time, color} = await request.json();

    try{
        await connectDB();
        const newEvent = new Event({
            creator: userId,
            subject,
            media,
            description,
            location,
            date,
            time,
            color
        });

        await newEvent.save();

        return new Response(JSON.stringify(newEvent), {status: 201});
    }
    catch(error) {
        return new Response("Failed to create new prompt", {status: 500});
    }
}