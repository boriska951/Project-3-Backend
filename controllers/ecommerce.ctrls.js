const db = require('../models');

const index = (req, res) => {
  db.Item.find({}, (error, items) => {
    if(error) return res.status(400).json({ error: error.message });

    return res.status(200).json(items)
  })
}

const show = (req, res) => {
    db.Item.findOne({_id:req.params.id}, (error, item) => {
      if(error) return res.status(400).json({ error: error.message });
  
      return res.status(200).json(item)
    })
  }

const create = (req, res) => {
  db.Item.create(req.body, (error, createdItem ) => {
    if(error) return res.status(400).json({ error: error.message });
    
    return res.status(201).json(createdItem);
  });
}

const update = (req, res) => {
  db.Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    },
    (error, updatedItem) => {
      if(error) return res.status(400).json({ error: error.message });

      return res.status(200).json(updatedItem);
  })
}

const destroy = (req, res) => {
  db.Item.findByIdAndDelete(req.params.id, (error, deletedItem) => {
    if(error) return res.status(400).json({ error: error.message });

    return res.status(200).json({
      message: `Item ${deletedItem.name} deleted successfully`
    })
  })
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
}