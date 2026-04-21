const Content = require('../models/Content');

exports.getContent = async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
      await content.save();
    }
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateSection = async (req, res) => {
  const { section } = req.params;
  const updateData = req.body;

  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
    }

    content[section] = updateData;
    await content.save();
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
