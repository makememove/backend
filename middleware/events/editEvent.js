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
            sportId
        } = req.body;

        if (categoryId) {
            const category = await objectRepository.models.category.findOne({
                where: { id: categoryId }
            });
            if (!category) {
                return next(new Error('no such category!'));
            }
        }

        if (sportId) {
            const sport = await objectRepository.models.sport.findOne({
                where: { id: sportId }
            });
            if (!sport) {
                return next(new Error('no such sport!'));
            }
        }

        const { event } = res.locals;

        await objectRepository.models.event.update(
            {
                date: date || event.date,
                public: typeof isPublic === 'undefined' ? event.public : isPublic ? 1 : 0,
                title: title || event.title,
                description: description || event.description,
                location: location || event.location,
                length: length || event.length,
                lowestSkillPoint: lowestSkillPoint || event.lowestSkillPoint,
                highestSkillPoint: highestSkillPoint || event.highestSkillPoint,
                categoryId: categoryId || event.categoryId,
                sportId: sportId || event.sportId
            },
            {
                where: { id: event.id }
            }
        );

        delete res.locals.event;

        res.locals.status = 'ok';
    } catch (err) {
        console.log(err);
        return next(err);
    }
    return next();
};
