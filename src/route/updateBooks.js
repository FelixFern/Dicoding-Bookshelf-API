const { bookshelfResponse } = require("./response");
const { bookshelfData } = require("../data");

exports.updateBooksById = {
	method: "PUT",
	path: "/books/{id}",
	handler: (request, h) => {
		const { id } = request.params;
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

		const book = [...bookshelfData].find((val) => val.id === id);

		if (name === "" || !name) {
			return bookshelfResponse(
				h,
				undefined,
				false,
				"Gagal memperbarui buku. Mohon isi nama buku",
				400
			);
		}

		if (readPage > pageCount) {
			return bookshelfResponse(
				h,
				undefined,
				false,
				"Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
				400
			);
		}

		if (!book) {
			return bookshelfResponse(
				h,
				undefined,
				false,
				"Gagal memperbarui buku. Id tidak ditemukan",
				404
			);
		}

		const updatedBook = {
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
			insertedAt: book.insertedAt,
			updatedAt: new Date().toISOString(),
		};

		bookshelfData[bookshelfData.indexOf(book)] = updatedBook;

		return bookshelfResponse(
			h,
			undefined,
			true,
			"Buku berhasil diperbarui",
			200
		);
	},
};
