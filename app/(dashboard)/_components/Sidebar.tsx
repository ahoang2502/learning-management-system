
import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

const Sidebar = () => {
	return (
		<div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm ">
			<div className="p-6 flex justify-center gap-4">
				<Logo />
				<p className="font-bold text-[#0569a0] py-6">LMS</p>
			</div>

			<div className="flex flex-col w-full">
				<SidebarRoutes />
			</div>
		</div>
	);
};

export default Sidebar;
