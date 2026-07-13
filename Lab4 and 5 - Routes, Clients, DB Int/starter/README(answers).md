Reflection Prompts

Answer these in starter/README.md:

    1. What changed when the API moved from in-memory data to Postgres?
    2. When should you use PUT instead of PATCH?
    3. What kinds of validation belong in the API even if the browser client also validates input?
    4. How does the browser client help you test the API differently than curl alone?
    5. If you added an extension, what did you add and why?

------------------------------------------------------

1. By moving from in-memory data to Postgres, it allows the information to be stored even after the server shuts down or restarts.
2. PUT should be used instead of PATCH when adding all new data or replacing existing data. PATCH is used to update a piece of data, but not all of it.
3. API validation is important because it checks the to make sure the data is up to a standard before it is sent to the browser client.
4. The browser client has different ways of testing that can help, such as using buttons, pages, icons, images, links, etc.
5. I did not add an extension because I did not have enough time to comfortably add one.