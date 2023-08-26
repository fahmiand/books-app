const express = require("express");
const { errorResp } = require("./src/utils/response");
const userRoutes = require("./src/routes/userRoutes");
const { authenticationsUserService } = require("./src/service/userService");
const {
  getBooksService,
  getBookByIdService,
  postBoooksService,
  updateBookByIdService,
  deleteBookByIdService,
} = require("./src/service/booksService");

const app = express();
const port = 8000;
const host = "localhost";

app.use(express.json());
app.use("/users", userRoutes);

app.get("/books", getBooksService);
app.get("/books/:id", getBookByIdService);
app.post("/books", postBoooksService);
app.put("/books/:id", updateBookByIdService);
app.delete("/books/:id", deleteBookByIdService);

app.post("/auth", authenticationsUserService);

app.use((error, request, response, next) => {
  const message = "internal server error";
  console.log(error.message);
  errorResp(response, message, 500);
});

app.listen(port, host, () => {
  console.log(`server berjalan pada http://${host}:${port}`);
});
