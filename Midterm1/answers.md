# ----- PART 1 ----- #

1. Sockets vs. HTTP
    A socket is a basic way of connecting two devices or programs over a network. The type of information doesn't matter because the socket it just
    providing the basic connection. HTTP takes those sockets and "formats" them so that incoming and outgoing data meets specific standars and so
    the data can be properly organized. APIs use HTTP because it standardizes data across all programs that use it.


2. Request/Response
    The typical request/response pattern is: client requests from a server and then the server sends a response back to the client. In a TCP command
    server, the client sends a command to the server and the server sends a response back. In an HTTP API, the client usually sends HTTP requests and 
    the server replies with an HTTP code. In an Express route handler, the client sends a specific object and the server replies with a different object
    or JSON data.


3. Statelessness
    An API is stateless when it does not retain information from previous requests. Two benefits is that it is easier to implemt and also ideally more
    secure compared to an API which has memory of other data transfers. One disadvantages is that it takes longer to send requests/replies because you
    are having to send more data.


4. HTTP Status Codes
    A new resource was created --> 201 Created --> A new resource was created.
    The client requested an item that does not exist --> 404 Not Found --> The resource that was requested was not found.
    The client sent JSON missing a required field --> 400 Bad Request --> The client did not provide all required fields of JSON data.
    The server had an unexpected error --> 500 Internal Server Error --> The server had some issue.
    A successful request returns JSON data --> 200 OK --> The request was sent and the response was successfully returned.


# ----- PART 2 ----- #

1. Resource URIs
    Getting all tasks --> /api/tasks
    Getting task by one ID --> /api/tasks/id
    Creating a task --> /api/tasks
    Replacing a task --> /api/tasks/id
    Partially updating a task --> /api/tasks/id
    Deleting a task --> /api/tasks/id

2. Method Semantics
    GET --> SAFE, IDEMPOTENT --> it only reads data
    POST --> NEITHER --> creates data
    PUT --> IDEMPOTENT --> replaces the data with the same data
    PATCH --> NEITHER --> data is updated in specified location
    DELETE --> IDEMPOTENT --> deletes the data

3. JSON Representation
    {
    "title": "Study for midterm",
    "course": "CS453",
    "completed": true
    }


# ----- PART 4 ----- #

1. Middleware Concerns
        Logging all of the back-and-forth is good to keep track of what data is going where and when. Is it good to put it in the middleware category
    because it is more of a "background" function as opposed to more direct functions. This saves time and energy rather than having this code in the
    main function.
        Validating tasks is good as middleware because it is used in multiple functions, thus needing to be called mulitple times. By separating
    the code, it prevents redundant code, saves times, and allows the function that called for task validation to focus on what it is doing.



# ----- PART 7 ----- #

1. Code vs. Contract
    Express routes actual perform the instructions that are being sent to them. This part is the actual code and is responsible for correctly
    executing what is being requested. The OpenAPI part tells how the instructions are to be executed by the Express route.

2. Drift
    One example of how the code and documentation could drift apart would be if the code's syntax recieved updates and changed the way it operates.
    Another example could be that the developer added something into the code that was not added to the OpenAPI documentation.


3. Client Impact
    Inaccurate API documentation could cause many issues for the client. Missing field, bad requests, or incorrect data could all be problems that 
    could stem from inaccurate documentation.