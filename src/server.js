const hapi = require("@hapi/hapi");
const { addBooks } = require("./route/addBooks");
const { getBooksRoutes } = require("./route/getBooks");
const { updateBooksById } = require("./route/updateBooks");
const { deleteBooksById } = require("./route/deleteBooks");

const PORT = 9000;
const HOST = "localhost";

const init = async () => {
	const server = hapi.server({
		port: PORT,
		host: HOST,
	});

	await server.start();
	console.log(`Server is listnening on port ${HOST}`);

	server.route([
		...getBooksRoutes,
		addBooks,
		updateBooksById,
		deleteBooksById,
	]);
};

init();
