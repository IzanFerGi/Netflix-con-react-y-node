// src/controllers/favorites.controller.js
const prisma = require('../prismaClient');

// Crea o obtiene el perfil "Principal" para un usuario
async function getDefaultProfile(userId) {
  let profile = await prisma.profile.findFirst({
    where: { userId },
    orderBy: { id: 'asc' },
  });

  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        userId,
        name: 'Principal',
      },
    });
  }

  return profile;
}

// GET /api/favorites
async function listFavorites(req, res) {
  try {
    const userId = req.userId;
    const profile = await getDefaultProfile(userId);

    const favorites = await prisma.favorite.findMany({
      where: { profileId: profile.id },
      include: {
        media: {
          include: {
            genres: {
              include: { genre: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(favorites);
  } catch (error) {
    console.error('listFavorites error:', error);
    res.status(500).json({ error: 'Error al obtener favoritos' });
  }
}

// POST /api/favorites/:mediaId
async function addFavorite(req, res) {
  try {
    const userId = req.userId;
    const mediaId = parseInt(req.params.mediaId, 10);

    if (Number.isNaN(mediaId)) {
      return res.status(400).json({ error: 'mediaId inválido' });
    }

    const profile = await getDefaultProfile(userId);

    const favorite = await prisma.favorite.upsert({
      where: {
        profileId_mediaId: {
          profileId: profile.id,
          mediaId,
        },
      },
      update: {},
      create: {
        profileId: profile.id,
        mediaId,
      },
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error('addFavorite error:', error);
    res.status(500).json({ error: 'Error al añadir a favoritos' });
  }
}

// DELETE /api/favorites/:mediaId
async function removeFavorite(req, res) {
  try {
    const userId = req.userId;
    const mediaId = parseInt(req.params.mediaId, 10);

    if (Number.isNaN(mediaId)) {
      return res.status(400).json({ error: 'mediaId inválido' });
    }

    const profile = await getDefaultProfile(userId);

    await prisma.favorite.delete({
      where: {
        profileId_mediaId: {
          profileId: profile.id,
          mediaId,
        },
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('removeFavorite error:', error);
    // si no existe igualmente devolvemos OK para no romper el flujo
    res.json({ success: true });
  }
}

module.exports = { listFavorites, addFavorite, removeFavorite };
