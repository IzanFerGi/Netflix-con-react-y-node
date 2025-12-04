const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Borrando datos antiguos…");

  await prisma.favorite.deleteMany();
  await prisma.mediaGenre.deleteMany();
  await prisma.season.deleteMany();
  await prisma.media.deleteMany();
  await prisma.genre.deleteMany();

  console.log("🌱 Creando géneros…");

  const genreNames = [
    "Acción",
    "Drama",
    "Terror",
    "Ciencia Ficción",
    "Comedia",
    "Romance",
    "Fantasia",
    "Aventura",
  ];

  const genreMap = {};

  for (const name of genreNames) {
    const g = await prisma.genre.create({ data: { name } });
    genreMap[name] = g.id;
  }

  console.log("🎬 Insertando películas…");

  const movies = [
    { title: "The Matrix", genres: ["Acción", "Ciencia Ficción"] },
    { title: "Inception", genres: ["Acción", "Ciencia Ficción"] },
    { title: "Interstellar", genres: ["Ciencia Ficción", "Drama"] },
    { title: "Gladiator", genres: ["Acción", "Drama"] },
    { title: "John Wick", genres: ["Acción"] },
    { title: "El Padrino", genres: ["Drama"] },
    { title: "El Conjuro", genres: ["Terror"] },
    { title: "Avatar", genres: ["Aventura", "Ciencia Ficción"] },
    { title: "Deadpool", genres: ["Acción", "Comedia"] },
    { title: "La La Land", genres: ["Romance", "Drama"] },
    { title: "Shrek", genres: ["Comedia", "Fantasia"] },
    { title: "Joker", genres: ["Drama"] },
    { title: "Fight Club", genres: ["Drama"] },
    { title: "Pulp Fiction", genres: ["Acción", "Drama"] },
    { title: "Frozen", genres: ["Fantasia", "Aventura"] },
    { title: "It", genres: ["Terror"] },
    { title: "Spider-Man 2", genres: ["Acción"] },
    { title: "Terminator 2", genres: ["Acción", "Ciencia Ficción"] },
    { title: "Coco", genres: ["Fantasia", "Aventura"] },
    { title: "Mad Max: Fury Road", genres: ["Acción", "Aventura"] },
  ];

  for (const m of movies) {
    await prisma.media.create({
      data: {
        title: m.title,
        type: "MOVIE",
        posterUrl: "/media/default_poster.jpg",
        genres: {
          create: m.genres.map((gName) => ({
            genreId: genreMap[gName],
          })),
        },
      },
    });
  }

  console.log("Insertando series…");

  const series = [
    { title: "Stranger Things", genres: ["Ciencia Ficción", "Drama"] },
    { title: "Breaking Bad", genres: ["Drama", "Acción"] },
    { title: "Dark", genres: ["Ciencia Ficción", "Drama"] },
    { title: "The Witcher", genres: ["Fantasia", "Acción"] },
    { title: "The Office", genres: ["Comedia"] },
    { title: "Peaky Blinders", genres: ["Drama"] },
    { title: "The Boys", genres: ["Acción", "Ciencia Ficción"] },
    { title: "The Walking Dead", genres: ["Terror", "Drama"] },
    { title: "Vikings", genres: ["Acción", "Aventura"] },
    { title: "Game of Thrones", genres: ["Fantasia", "Drama"] },
    { title: "Loki", genres: ["Fantasia", "Ciencia Ficción"] },
    { title: "Narcos", genres: ["Drama"] },
    { title: "Black Mirror", genres: ["Ciencia Ficción"] },
    { title: "You", genres: ["Drama"] },
    { title: "Money Heist", genres: ["Acción", "Drama"] },
    { title: "Lost", genres: ["Aventura", "Drama"] },
    { title: "How I Met Your Mother", genres: ["Comedia"] },
    { title: "Sherlock", genres: ["Drama"] },
    { title: "House of the Dragon", genres: ["Fantasia"] },
    { title: "The Mandalorian", genres: ["Aventura", "Ciencia Ficción"] },
  ];

  for (const s of series) {
    await prisma.media.create({
      data: {
        title: s.title,
        type: "SERIES",
        posterUrl: "/media/default_poster.jpg",
        genres: {
          create: s.genres.map((gName) => ({
            genreId: genreMap[gName],
          })),
        },
      },
    });
  }

  const moviesCount = await prisma.media.count({ where: { type: "MOVIE" } });
  const seriesCount = await prisma.media.count({ where: { type: "SERIES" } });

  console.log(`Películas creadas: ${moviesCount}`);
  console.log(`Series creadas: ${seriesCount}`);
  console.log("SEED COMPLETADO");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
