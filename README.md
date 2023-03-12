This is an example of how to setup SSE using node with express. (The example also includes some cors middleware, this is irrelevant for the demo)


How to test the example: 
1. npm install + run the backend
2. Open a webbrowser, and go to: localhost:3000/events
3. Open a API testing tool, like Postmand, and make a Post request.
    3.a The endpoint for the Post req should be: localhost:3000/fact
    3.b The content of the body should be json, and be of format: {"info": "Write some random fact here"}
4. After sending the Post request, the browser will now update the content, displaying the fact that was posted