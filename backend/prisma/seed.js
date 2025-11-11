const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function upsertGenre(name) {
  const g = await prisma.genre.findUnique({ where: { name } });
  if (!g) return prisma.genre.create({ data: { name } });
  return g;
}

async function upsertMediaByTitle(title, data) {
  const m = await prisma.media.findFirst({ where: { title } });
  if (!m) return prisma.media.create({ data });
  return m;
}

async function ensureMediaGenre(mediaId, genreId) {
  // comprobar si existe la relación
  const rel = await prisma.mediaGenre.findFirst({
    where: { mediaId, genreId }
  });
  if (!rel) {
    return prisma.mediaGenre.create({ data: { mediaId, genreId } });
  }
  return rel;
}

async function main() {
  const genres = ['Acción','Drama','Comedia','Ciencia Ficción','Terror','Documental'];
  const genreRecords = {};
  for (const name of genres) {
    const g = await upsertGenre(name);
    genreRecords[name] = g;
  }

  const s1 = await upsertMediaByTitle('Stranger Things', {
    title: 'Stranger Things',
    description: 'Kids face supernatural events',
    type: 'SERIES',
    year: 2016
  });

  const m1 = await upsertMediaByTitle('The Matrix', {
    title: 'The Matrix',
    description: 'Neo discovers the truth',
    type: 'MOVIE',
    year: 1999
  });

  // Relacionar géneros (si existen)
  const scifi = genreRecords['Ciencia Ficción'];
  const drama = genreRecords['Drama'];

  if (scifi) {
    await ensureMediaGenre(s1.id, scifi.id);
    await ensureMediaGenre(m1.id, scifi.id);
  }
  if (drama) {
    await ensureMediaGenre(s1.id, drama.id);
  }

  console.log('Seed completado');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
