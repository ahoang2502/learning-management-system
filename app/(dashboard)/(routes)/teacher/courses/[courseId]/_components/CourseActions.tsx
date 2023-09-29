"use client";

import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/useConfettiStore";

import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseActionsProps {
	disabled: boolean;
	courseId: string;
	isPublished: boolean;
}

const CourseActions = ({
	disabled,
	courseId,
	isPublished,
}: CourseActionsProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const confetti = useConfettiStore();
	const router = useRouter();

	const onDelete = async () => {
		try {
			setIsLoading(true);

			await axios.delete(`/api/courses/${courseId}`);

			toast.success("Course deleted!");
			router.refresh();
			router.push(`/teacher/courses/`);
		} catch (error) {
			toast.error("Something went wrong. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	const onClick = async () => {
		try {
			setIsLoading(true);

			if (isPublished) {
				await axios.patch(`/api/courses/${courseId}/unpublish`);
				toast.success("Course unpublished!");
			} else {
				await axios.patch(`/api/courses/${courseId}/publish`);
				toast.success("Course published!");
				confetti.onOpen();
			}

			router.refresh();
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex items-center gap-x-2 ">
			<Button
				disabled={disabled || isLoading}
				onClick={onClick}
				variant="outline"
				size="sm"
			>
				{isPublished ? "Unpublish" : "Publish"}
			</Button>

			<ConfirmModal onConfirm={onDelete}>
				<Button size="sm" disabled={isLoading}>
					<Trash className="h-4 w-4" />
				</Button>
			</ConfirmModal>
		</div>
	);
};

export default CourseActions;
