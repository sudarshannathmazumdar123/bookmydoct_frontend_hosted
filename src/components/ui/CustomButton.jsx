'usee client';
const CustomButton = ({ children, className, handleClick }) => {
	return (
		<div
			className={`bg-primary max-w-[150px] hover:opacity-80 text-white font-bold py-2 px-4 rounded-3xl ${className} hover:cursor-pointer flex justify-center`}
			onClick={handleClick}
		>
			{children}
		</div>
	);
};

export default CustomButton;
