import { fastify } from "fastify";
import { DataBasePostgres } from "./database-postgres.js";

const server = fastify();
const database = new DataBasePostgres();

// Tratamento de erros global
server.setErrorHandler((error, request, reply) => {
  console.error("Erro no servidor:", error);
  reply.status(500).send({ error: "Erro interno no servidor" });
});

// Rota para criar vídeos
server.post("/videos", async (request, reply) => {
  try {
    const { title, duration, describe } = request.body;
    await database.create({
      title,
      duration,
      describe,
    });

    return reply.status(201).send({
      message: "Vídeo criado com sucesso",
    });
  } catch (error) {
    reply.status(500).send({ error: "Erro ao criar vídeo" });
  }
});

// Rota para listar vídeos
server.get("/videos", async (request, reply) => {
  try {
    const search = request.query.search;
    const videos = await database.list(search);
    return reply.send(videos);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao listar vídeos" });
  }
});

// Rota para atualizar vídeos
server.put("/videos/:id", async (request, reply) => {
  try {
    const videosId = request.params.id;
    const { title, describe, duration } = request.body;
    await database.update(videosId, {
      title,
      describe,
      duration,
    });

    return reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: "Erro ao atualizar vídeo" });
  }
});

// Rota para deletar vídeos
server.delete("/videos/:id", async (request, reply) => {
  try {
    const videoId = request.params.id;
    await database.delete(videoId);
    return reply.status(204).send({});
  } catch (error) {
    reply.status(500).send({ error: "Erro ao deletar vídeo" });
  }
});

// Iniciar o servidor
server.listen({ port: process.env.port ?? 3333 }, (err, address) => {
  if (err) {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
