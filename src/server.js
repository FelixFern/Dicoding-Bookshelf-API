const hapi = require("@hapi/hapi");
const { addBooks } = require("./route/addBooks");
const { getBooksRoutes } = require("./route/getBooks");
const { updateBooksById } = require("./route/updateBooks");
const { deleteBooksById } = require("./route/deleteBooks");

const PORT = 80;
const HOST = "0.0.0.0";

const init = async () => {
	const server = hapi.server({
		port: PORT,
		host: HOST,
	});

	await server.start();
	console.log(`Server is listening on port ${HOST}`);

	server.route([
		...getBooksRoutes,
		addBooks,
		updateBooksById,
		deleteBooksById,
	]);
};

init();
