const express = require("express");

const router = express.Router();

const events = [
    {
        id: 1,
        title: "asdasd"
    },
    {
        id: 2,
        title: "asdasd"
    },
    {
        id: 3,
        title: "asdasd"
    },
    {
        id: 4,
        title: "asdasd"
    },
    {
        id: 5,
        title: "asdasd"
    },
    {
        id: 6,
        title: "asdasd"
    },
    {
        id: 7,
        title: "asdasd"
    },
    {
        id: 8,
        title: "asdasd"
    },
    {
        id: 9,
        title: "asdasd"
    },
    {
        id: 10,
        title: "asdasd"
    },
    {
        id: 11,
        title: "asdasd"
    },
    {
        id: 12,
        title: "asdasd"
    },
    {
        id: 13,
        title: "asdasd"
    },
    {
        id: 14,
        title: "asdasd"
    }
];

/* GET users listing. */
// eslint-disable-next-line no-unused-vars
router.get("/", (req, res, next) => {
    res.json(events);
});

const description =
    "Lorem ipsum dolor sit amet, ius meis nihil in, sea et oratio pertinax corrumpit. Nam eu nibh vocibus percipit. Nam duis tota percipit in, tamquam civibus ut vel. Per latine officiis quaestio id, duo ea perfecto postulant voluptatibus, mel iuvaret nonumes ei. Accusamus conclusionemque te ius, at postulant similique duo.";

router.get("/:id", (req, res, next) => {
    res.json({
        id: req.params.id,
        title: "asdasd",
        description,
        time: new Date().toISOString()
    });
});

module.exports = router;
