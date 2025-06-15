import { randomUUID } from "node:crypto";

export class DataBaseMemory {
  #videos = new Map(); //! private

  list(search) {
    return (
      Array.from(this.#videos.entries())
        .map((videoArray) => {
          const id = videoArray[0];
          const body = videoArray[1];
          return {
            id,
            ...body,
          };
        })
        //! busca por título, descrição e duração
        .filter((video) => {
          if (search) {
            return video.title.includes(search);
          }
          return true;
        })
    );
  }

  create(video) {
    const videoId = randomUUID();
    this.#videos.set(videoId, video);
  }

  update(id, video) {
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}
