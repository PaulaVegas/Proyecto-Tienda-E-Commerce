const { Review, User } = require('../models');

const ReviewController = {
    getAllReviews: async (req, res) => {
        try {
            const reviews = await Review.findAll({
                include: [
                    {
                        model: User,
                        as: 'user', 
                        attributes: ['id', 'username', 'email'],
                    },
                ],
            });
            res.json(reviews);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    createReview: async (req, res) => {
        try {
            const { content, rating, UserId, ProductId } = req.body;
            if (!content || !rating || !UserId || !ProductId) {
                return res
                    .status(400)
                    .json({ error: 'Faltan campos obligatorios' });
            }

            const newReview = await Review.create({
                content,
                rating,
                UserId,
                ProductId,
            });
            res.status(201).json(newReview);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateReview: async (req, res) => {
        try {
            const { content, rating } = req.body;
            const [updated] = await Review.update(
                { content, rating },
                { where: { id: req.params.id } }
            );

            if (updated) {
                const updatedReview = await Review.findByPk(req.params.id, {
                    include: [
                        {
                            model: User,
                            as: 'user', // alias corregido
                            attributes: ['id', 'username', 'email'],
                        },
                    ],
                });
                return res.json(updatedReview);
            }
            res.status(404).json({ error: 'Review no encontrada' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteReview: async (req, res) => {
        try {
            const deleted = await Review.destroy({
                where: { id: req.params.id },
            });
            if (deleted) {
                return res.json({ message: 'Review eliminada' });
            }
            res.status(404).json({ error: 'Review no encontrada' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = ReviewController;
