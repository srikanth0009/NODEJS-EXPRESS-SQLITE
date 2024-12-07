const express = require("express");
const router = express.Router();
const tutorials = require("../controllers/tutorials.controller");


router.post("/", tutorials.create);

router.get("/", (req, res) => {
    const title = req.query.title;
    
    if (title) {
        tutorials.getMatchedTitles(title, (err, rows) => {
            if (err) {
                res.status(500).send("Error with matching files");
            } else {
                if (rows.length === 0) {
                    res.status(404).send("No tutorials found with the given title");
                } else {
                    res.json(rows);
                }
            }

        });

    } else {
        tutorials.findAll((err, rows) => {
            if (err) {
                res.status(500).send("Error with fetching tutorials");
            } else {
                if (rows.length === 0) {
                    res.status(404).send("No tutorials found with the given title");
                } else {
                    res.json(rows);
                }
            }
        });
    }
})

router.get("/published", tutorials.findPublished);
router.get("/:id", tutorials.findById);
router.put("/:id", tutorials.update);
router.delete("/:id", tutorials.delete);
router.delete("/", tutorials.deleteAll);

module.exports = router;
