module.exports = objectRepository => async (req, res, next) => {
    try {
        const {
            date, // string
            isPublic, // boolean
            title,
            description,
            location, // string
            length,
            lowestSkillPoint,
            highestSkillPoint,
            categoryId,
            sportId,
            maxAttending,
            memberLimit,
            closed
        } = req.body;

        if (!title) {
            return next(new Error('title must be specified'));
        }

        if (!categoryId) {
            return next(new Error('category id must by specified!'));
        }
        const category = await objectRepository.models.category.findOne({
            where: { id: categoryId }
        });
        if (!category) {
            return next(new Error('no such category!'));
        }

        if (!sportId) {
            return next(new Error('sport id must by specified!'));
        }

        if (typeof closed === 'undefined') {
            return next(new Error('closed must by specified!'));
        }
        if (closed !== 1 && closed !== 0) {
            return next(new Error('closed moust be either 0 or 1'));
        }

        const sport = await objectRepository.models.sport.findOne({
            where: { id: sportId }
        });
        if (!sport) {
            return next(new Error('no such sport!'));
        }

        if (typeof maxAttending === 'undefined') {
            return next(new Error('maxAttending required'));
        }

        await objectRepository.models.event.create({
            date: date || new Date(),
            public: isPublic ? 1 : 0,
            title,
            description: description || 'No description',
            location: location || 'No location',
            length: length || 60,
            lowestSkillPoint: lowestSkillPoint || 0,
            highestSkillPoint: highestSkillPoint || 10000,
            creatorId: req.user.id,
            categoryId,
            sportId,
            maxAttending,
            memberLimit,
            closed
        });

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }
    return next();
};
