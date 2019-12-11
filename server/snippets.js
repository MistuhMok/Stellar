const router = require('express').Router();
const snippets = { '1': { data: 'Test Format', likes: 0 } };

router.get('/', (req, res) => {
  res.json(snippets);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  res.json(snippets[id]);
});

router.post('/', (req, res) => {
  let length = Object.keys(snippets).length + 1;
  const newSnippet = req.body;
  newSnippet.likes = 0;

  snippets[length] = newSnippet;

  const newURL = `http://localhost:8000/api/snippets/${length}`;
  res.json({ newURL });
});

router.put('/like/:id', (req, res) => {
  const id = req.params.id;

  //Would normally be a server put request
  snippets[id].likes++;

  res.json(snippets[id]);
});

module.exports = router;
