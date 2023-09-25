const { bookshelfData } = require("../data");
const { bookshelfResponse } = require("./response");

exports.deleteBooksById = {
	method: "DELETE",
	path: "/books/{id}",
	handler: (request, h) => {
		const { id } = request.params;

		const book = [...bookshelfData].find((val) => val.id === id);
		if (!book) {
			return bookshelfResponse(
				h,
				undefined,
				false,
				"Buku gagal dihapus. Id tidak ditemukan",
				404
			);
		}

		bookshelfData.splice(bookshelfData.indexOf(book), 1);

		return bookshelfResponse(
			h,
			undefined,
			true,
			"Buku berhasil dihapus",
			200
		);
	},
};
