import React from "react";
import { BallTriangle } from "react-loader-spinner";

const Spinner: React.FC = () => {
	return (
		<div className="flex justify-center h-[100vh] items-center">
			<BallTriangle
				height="100"
				width="100"
				color="#61dafb"
				ariaLabel="rotating-square-loading"
				// strokeWidth="3"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</div>
	);
};

export default Spinner;
