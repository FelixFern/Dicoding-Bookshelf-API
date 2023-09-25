exports.bookshelfResponse = (h, data, success, message, code) => {
	if (success) {
		let response;
		if (message) {
			response = h.response({
				status: "success",
				data: data,
				message: message,
			});
		} else {
			response = h.response({
				status: "success",
				data: data,
			});
		}
		response.code(code);
		return response;
	} else {
		const response = h.response({
			status: "fail",
			message: message,
		});
		response.code(code);
		return response;
	}
};
