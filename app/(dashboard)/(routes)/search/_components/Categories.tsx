"use client";

import { Category } from "@prisma/client";
import { FcEngineering } from "react-icons/fc";
import {
	FaComputer,
	FaMobileRetro,
	FaGlobe,
	FaBookBookmark,
} from "react-icons/fa6";
import { GrVirtualMachine } from "react-icons/gr";
import { IconType } from "react-icons";

import CategoryItem from "./CategoryItem";

interface CategoriesProps {
	items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
	"Computer Science": FaComputer,
	"Data Science": FaBookBookmark,
	"Web Developer": FaGlobe,
	"Machine Learning": GrVirtualMachine,
	"Mobile Developer": FaMobileRetro,
	DevOps: FcEngineering,
};

const Categories = ({ items }: CategoriesProps) => {
	return (
		<div className="flex items-center gap-x-2 overflow-x-auto pb-2">
			{items.map((item) => (
				<CategoryItem
					key={item.id}
					label={item.name}
					icon={iconMap[item.name]}
                    value={item.id}
				/>
			))}
		</div>
	);
};

export default Categories;
