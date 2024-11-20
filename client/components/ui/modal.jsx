import React from "react";

const Modal = ({ isOpen, closeModal, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<button
					onClick={closeModal}
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
				>
					&times;
				</button>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
