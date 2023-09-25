import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
	req: Request,
	{ params }: { params: { courseId: string; chapterId: string } }
) {
	try {
		const { userId } = auth();
		const {isPublished, ...values} = await req.json();

		if (!userId) return new NextResponse("Unauthorized", { status: 401 });

		const course = await db.course.findUnique({
			where: {
				id: params.courseId,
				userId,
			},
		});

		if (!course) return new NextResponse("Unauthorized", { status: 401 });

		const chapter = await db.chapter.update({
			where: {
				id: params.chapterId,
				courseId: params.courseId,
			},
			data: { ...values },
		});

		// Handle video-upload

        return NextResponse.json(chapter)
	} catch (error) {
		console.log("[CHAPTER_ID]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
