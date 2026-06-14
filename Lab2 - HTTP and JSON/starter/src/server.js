import http from "node:http";

const PORT = process.env.PORT || 3000;

let requestNum = 0;

function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(data));
}

function readRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            resolve(body);
        });

        req.on("error", error => {
            reject(error);
        });
    });
}

function resetState() {
    requestNum = 0;
}

function handleCalculate(parsedBody) {
    const operation = parsedBody.operation;
    const a = parsedBody.a;
    const b = parsedBody.b;

    if (operation === undefined || a === undefined || b === undefined) {
        return {
            statusCode: 400,
            response: {
                error: "Missing fields"
            }
        };
    }

    if (typeof a !== "number" || typeof b !== "number") {
        return {
            statusCode: 400,
            response: {
                error: "Values must be numbers"
            }
        };
    }

    let result = null;

    if (operation === "add") {
        result = a + b;
    } else if (operation === "subtract") {
        result = a - b;
    } else if (operation === "multiply") {
        result = a * b;
    } else if (operation === "divide") {
        if (b === 0) {
            return {
                statusCode: 400,
                response: {
                    error: "Cannot divide by zero"
                }
            };
        }

        result = a / b;
    } else {
        return {
            statusCode: 400,
            response: {
                error: "Unsupported operation"
            }
        };
    }

    return {
        statusCode: 200,
        response: {
            result: result
        }
    };
}

async function handleRequest(req, res) {
    console.log(`${req.method} ${req.url}`);

    requestNum += 1;

    if (req.method === "GET" && req.url === "/health") {
        sendJson(res, 200, {
            status: "ok"
        });
        return;
    }

    if (req.method === "GET" && req.url === "/hello") {
        sendJson(res, 200, {
            message: "Hello from the HTTP JSON server"
        });
        return;
    }

    if (req.method === "POST" && req.url === "/echo") {
        const rawBody = await readRequestBody(req);

        try {
            const parsedBody = JSON.parse(rawBody);

            sendJson(res, 200, parsedBody);
        } catch {
            sendJson(res, 400, {
                error: "Invalid JSON"
            });
        }

        return;
    }

    if (req.method === "POST" && req.url === "/calculate") {
        const rawBody = await readRequestBody(req);

        try {
            const parsedBody = JSON.parse(rawBody);

            const result = handleCalculate(parsedBody);

            sendJson(res, result.statusCode, result.response);
        } catch {
            sendJson(res, 400, {
                error: "Invalid JSON"
            });
        }

        return;
    }

    if (req.method === "GET" && req.url === "/requests") {
        sendJson(res, 200, {
            count: requestNum
        });
        return;
    }

    sendJson(res, 404, {
        error: "Not found"
    });
}

function createServer() {
    return http.createServer(handleRequest);
}

if (process.env.NODE_ENV !== "test") {
    const server = createServer();

    server.listen(PORT, () => {
        console.log(`HTTP JSON example server listening on port ${PORT}`);
    });
}

export {
    createServer,
    resetState,
    handleCalculate
};