process.on("uncaughtException", (err) => {
    console.log("uncaughtException 🔥");
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require("./app");

// Starting Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`listening to port ${port}..`);
});

process.on("unhandledRejection", (err) => {
    console.log("unhandledRejection 🔥");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
