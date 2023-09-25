const { bookshelfData } = require("../data");
const { bookshelfResponse } = require("./response");
const { nanoid } = require("nanoid");

exports.addBooks = {
	method: "POST",
	path: "/books",
	handler: (request, h) => {
		const {
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			reading,
		} = request.payload;

		const id = nanoid(16);
		const updatedAt = new Date().toISOString();
		const insertedAt = updatedAt;

		const newBook = {
			id,
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			reading,
			finished: readPage === pageCount,
			insertedAt,
			updatedAt,
		};

		if (name === "" || !name) {
			return bookshelfResponse(
				h,
				null,
				false,
				"Gagal menambahkan buku. Mohon isi nama buku",
				400
			);
		}

		if (readPage > pageCount) {
			return bookshelfResponse(
				h,
				null,
				false,
				"Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
				400
			);
		}

		bookshelfData.push(newBook);

		return bookshelfResponse(
			h,
			{ bookId: id },
			true,
			"Buku berhasil ditambahkan",
			201
		);
	},
};
