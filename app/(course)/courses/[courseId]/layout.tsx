import { db } from "@/lib/db";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CourseLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { courseId: string };
}) => {
	const { userId } = auth();
	if (!userId) return redirect("/");

	return <div>CourseLayout</div>;
};

export default CourseLayout;
