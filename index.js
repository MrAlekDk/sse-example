import express from "express";
import bodyParser from "body-parser";
import cors from "cors"

const app = express();

let clients = [];
let facts = [];

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.get("/status", (req,res)=>{
    res.json({clients: clients.length})
});

const PORT = 3000;


// cors middleware, prob. not needed for this example, besides saving the client for use later
function eventsHandler(request, response, next) {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);
  
    const data = `data: ${JSON.stringify(facts)}\n\n`;
  
    response.write(data);
  
    const clientId = Date.now();
  
    const newClient = {
      id: clientId,
      response
    };
  
    clients.push(newClient);
  
    request.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(client => client.id !== clientId);
    });
  }

  app.get('/events', eventsHandler);



  function sendEventsToAll(newFact) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
  }
  
  async function addFact(request, respsonse, next) {
    const newFact = request.body;
    facts.push(newFact);
    respsonse.json(newFact)
    return sendEventsToAll(newFact);
  }
  
  app.post('/fact', addFact);


  app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
});


