const Tutorial = require("../models/tutorial.model");

exports.create = (req, res) => {
  const { title, description, published } = req.body;
  Tutorial.create({ title, description, published: published || false }, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send(data);
  });
}

exports.findAll = (callback) => {
  Tutorial.findAll((err, data) => {
    if (err){
        callback(err,null);
    } 
    else {
        callback(null,data);
    }
  });
};

exports.findById = (req, res) => {
  const id = req.params.id;
  Tutorial.findById(id, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else if (!data) res.status(404).send({ message: "find by id Tutorial not found" });
    else res.send(data);
  });
};

exports.findPublished = (req, res) => {
    //const bool = req.body;
    console.log(23)
    Tutorial.findPublished((err, data) => {
        console.log(data);
      if (err) res.status(500).send({ message: err.message });
      else if (!data) res.status(404).send({ message: "find published Tutorial not found" });
      else res.send(data);
    });
  };

  exports.getMatchedTitles = (title,callback) => {
    // const title = req.params.title;  
    console.log(title);
    Tutorial.getMatchedTitles(title,(err, data) => {
        if (err){
            callback(err,null);
        } 
        else {
            callback(null,data);
        }
      });
  };

exports.update = (req, res) => {
  const id = req.params.id;
  const title=req.query.title;
  const description = req.query.description;
  console.log(id + " " + title + " "+ description);
  Tutorial.update(id, req.body, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Tutorial.delete(id, (err) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: "Tutorial deleted successfully" });
  });
};

exports.deleteAll = (req, res) => {
    Tutorial.deleteAll((err) => {
      if (err) res.status(500).send({ message: err.message });
      else res.send({ message: "Tutorials deleted successfully" });
    });
};
