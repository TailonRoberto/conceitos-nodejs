const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { 
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,

  }

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
   const {id } = request.params.id;
   const { url, title,  techs } = request.body;
   const repository = repositories.find(repo => repo.id === id );   
   

   if (!repository) 
   {   return response.status(400).send().json({ error: 'Repositório Inexistente'});      }
   
   
   repository.url = url;
   repository.title = title;
   repository.techs = techs;

   return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const {id } = request.params.id;  
  const repositoryIndex = repositories.findIndex(repo => repo.id === id );  
  if (repositoryIndex < 0) 
  {   
    return response.status(400).send().json({ error: 'Repositório Inexistente'});
  }   
  
  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  /// encontrando o repositorio dentro do array pelo id no params
  const repository = repositories.find(repo => repo.id === id );
  
  if (!repository) 
   {   return response.status(400).send();      }

  repository.likes++;
  
  return response.json(repository);


});

module.exports = app;
