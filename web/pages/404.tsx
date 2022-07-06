import Image from "next/image";

export default function Custom404() {
	return (
		<div className=" flex flex-col gap-4 m-8 align-middle items-center justify-center">
			<div className="w-full md:w-1/2 lg:w-1/3 h-auto relative">
				<img
					src={"/hal_orange.png"}
					height={100}
					width={100}
				/>
			</div>
			<div className="flex flex-col align-middle items-center justify-center p-4 gap-2">
				<p className="text-xl font-mono">
					I am sorry Dave, I am afraid that page cannot be found.
				</p>
				<p className="text-red-200-accent text-sm font-mono">
					Error Code - 404
				</p>
			</div>
		</div>
	);
}
