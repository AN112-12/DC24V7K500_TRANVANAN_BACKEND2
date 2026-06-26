const express = require("express");
const cors = require("cors");
const app = express();
const contactsRouter = require("./app/routes/contact.route");
const ApiError = express();


app.use(cors());
app.use(express.json());
app.get("/",(req, res)=>{
    res.json({message:"Welcome to contact book application."})
});
app.use("/api/contacts",contactsRouter);

//handle404 response
app.use((req, res, next) => {
    //Code o day chay khi khong co route duoc dinh nghia nao
    //khop voi yeu cau. Goi next() de chuyen sang middleware xu ly loi
    return next(new ApiError(404,"Resouce not found"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
// Middleware xử lý lỗi tập trung.
// Trong các đoạn code xử lý ở các route, gọi next(error) sẽ chuyển về middleware xửlý lỗi này
return res.status(error.statusCode || 500).json({
message: error.message || "Internal Server Error",
});s
});

module.exports = app;