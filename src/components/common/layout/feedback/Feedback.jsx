import React, { Suspense } from "react";
import "./Feedback.css";
import { Await } from "react-router-dom";

const Feedback = ({ fallback, resolve, errorelement, children }) => {
	return (
		<Suspense fallback={fallback}>
			<Await resolve={resolve} errorElement={errorelement}>
				{(resolvedLoaderData) => children(resolvedLoaderData)}
			</Await>
		</Suspense>
	);
};

export default Feedback;
