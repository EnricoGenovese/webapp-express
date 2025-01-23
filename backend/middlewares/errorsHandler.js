export default function errorsHandler(err, req, res, next) {
    console.log(err.stack.split("\n")[0], "err" + err.stack.slit("\n")[1]);
    res.status(err.statusCode || 500);
    res.json({
        status: err.statusCode || 500,
        err: err.message,
    });
};