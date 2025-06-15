import { randomUUID } from "node:crypto";
import sql from "./db.js";

export class DataBasePostgres {
  async list(search) {
    try {
      let videos;
      if (search) {
        videos = await sql`select * from videos where title ilike ${
          "%" + search + "%"
        }`;
      } else {
        videos = await sql`select * from videos`;
      }

      return videos;
    } catch (error) {
      console.error("Erro ao listar vídeos:", error);
      throw new Error("Erro ao listar vídeos");
    }
  }

  async create(video) {
    try {
      const videoId = randomUUID();
      const { title, describe, duration } = video;
      await sql`insert into videos (id, title, describe, duration) values (${videoId}, ${title}, ${describe}, ${duration})`;
    } catch (error) {
      console.error("Erro ao criar vídeo:", error);
      throw new Error("Erro ao criar vídeo");
    }
  }

  async update(id, video) {
    try {
      const { title, describe, duration } = video;
      await sql`update videos set title = ${title}, describe = ${describe}, duration = ${duration} WHERE id = ${id}`;
    } catch (error) {
      console.error("Erro ao atualizar vídeo:", error);
      throw new Error("Erro ao atualizar vídeo");
    }
  }

  async delete(id) {
    try {
      await sql`delete from videos WHERE id = ${id}`;
    } catch (error) {
      console.error("Erro ao deletar vídeo:", error);
      throw new Error("Erro ao deletar vídeo");
    }
  }
}
