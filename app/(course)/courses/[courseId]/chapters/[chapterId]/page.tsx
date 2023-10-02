import { getChapter } from "@/actions/getChapter";
import { Banner } from "@/components/Banner";
import VideoPlayer from "./_components/VideoPlayer";
import CourseEnrollButton from "./_components/CourseEnrollButton";
import { Separator } from "@/components/ui/separator";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Preview from "@/components/Preview";
import { File } from "lucide-react";

const ChapterIdPage = async ({
	params,
}: {
	params: { courseId: string; chapterId: string };
}) => {
	const { userId } = auth();
	if (!userId) return redirect("/");

	const {
		chapter,
		course,
		muxData,
		attachments,
		nextChapter,
		userProgress,
		purchase,
	} = await getChapter({
		userId,
		chapterId: params.chapterId,
		courseId: params.courseId,
	});

	if (!chapter || !course) return redirect("/");

	const isLocked = !chapter.isFree && !purchase;
	const completeOnEnd = !!purchase && !userProgress?.isCompleted;

	return (
		<div>
			{userProgress?.isCompleted && (
				<Banner label="You already completed this chapter." variant="success" />
			)}
			{isLocked && (
				<Banner
					label="You need to purchase this course to watch this chapter."
					variant="warning"
				/>
			)}
			<div className="flex flex-col max-w-4xl mx-auto pb-20">
				<div className="p-4 ">
					<VideoPlayer
						chapterId={params.chapterId}
						title={chapter.title}
						courseId={params.courseId}
						nextChapterId={nextChapter?.id}
						playbackId={muxData?.playbackId!}
						isLocked={isLocked}
						completeOnEnd={completeOnEnd}
					/>
				</div>

				{/* Chapter title & Enroll Btn */}
				<div className="">
					<div className="p-4 flex flex-col md:flex-row items-center justify-between">
						<h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>

						{purchase ? (
							<></>
						) : (
							<CourseEnrollButton
								courseId={params.courseId}
								price={course.price!}
							/>
						)}
					</div>

					<Separator />
					<div className="">
						<Preview value={chapter.description!} />
					</div>

					{!!attachments.length && (
						<>
							<Separator />
							<div className="p-4">
								{attachments.map((attachment) => (
									<a
										href={attachment.url}
										key={attachment.id}
										target="_blank"
										className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
									>
										<File className=""/>
										<p className="line-clamp-1">{attachment.name}</p>
									</a>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChapterIdPage;
