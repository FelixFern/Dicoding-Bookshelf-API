const { bookshelfData } = require("../data");
const { bookshelfResponse } = require("./response");

const getBooks = {
	method: "GET",
	path: "/books",
	handler: (request, h) => {
		const { name, reading, finished } = request.query;
		let filteredBooks = [...bookshelfData];

		if (name) {
			filteredBooks = filteredBooks.filter((book) =>
				book.name.toLowerCase().includes(name.toLowerCase())
			);
		}

		if (reading) {
			filteredBooks = filteredBooks.filter(
				(book) => book.reading == reading
			);
		}

		if (finished) {
			filteredBooks = filteredBooks.filter(
				(book) => book.finished == finished
			);
		}

		const displayed = filteredBooks.map((book) => {
			return {
				id: book.id,
				name: book.name,
				publisher: book.publisher,
			};
		});

		return bookshelfResponse(h, { books: displayed }, true, null, 200);
	},
};

const getBooksById = {
	method: "GET",
	path: "/books/{id}",
	handler: (request, h) => {
		const { id } = request.params;
		const book = [...bookshelfData].find((val) => val.id === id);

		if (!book) {
			return bookshelfResponse(
				h,
				null,
				false,
				"Buku tidak ditemukan",
				404
			);
		}
		return bookshelfResponse(h, { book }, true, null, 200);
	},
};

exports.getBooksRoutes = [getBooks, getBooksById];
