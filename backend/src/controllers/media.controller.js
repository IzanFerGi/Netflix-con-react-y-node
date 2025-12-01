const prisma = require('../prismaClient');

// GET /api/media?type=MOVIE|SERIES
async function listMedia(req, res) {
  try {
    const { type } = req.query;
    const where = {};

    if (type === 'MOVIE' || type === 'SERIES') {
      where.type = type;
    }

    const items = await prisma.media.findMany({
      where,
      include: {
        genres: {
          include: {
            genre: true, // trae el objeto Genre
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(items);
  } catch (error) {
    console.error('listMedia error:', error);
    res.status(500).json({ error: 'Error al obtener contenido' });
  }
}

module.exports = { listMedia };
