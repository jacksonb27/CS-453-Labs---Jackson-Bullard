export default function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => { // logs the method, path, status code, and time taken of a res/req
    const method = req.method;
    const path = req.path;
    const statusCode = res.statusCode;
    const timeTaken = Date.now() - start;

    console.log(method + " " + path + " " + statusCode + " " + timeTaken + "ms");
  });

  next();
}