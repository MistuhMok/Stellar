const router = require('express').Router();
const snippets = { '1': { data: 'Test Format', likes: 0 } };
const EXPIRE_TIME = 10000;

function expireData(id) {
  snippets[id] = { data: 'Data has expired' };
}

// router.get('/', (req, res) => {
//   console.log(snippets);
//   res.json(snippets);
// });

router.get('/:id', (req, res) => {
  const id = req.params.id;
  let expireFunction = snippets[id].expire;
  if (expireFunction) {
    clearTimeout(expireFunction);

    expireFunction = setTimeout(() => expireData(id), EXPIRE_TIME);
    snippets[id].expire = expireFunction;
  }

  res.json({ data: snippets[id].data, like: snippets[id].likes });
});

router.post('/', (req, res) => {
  let length = Object.keys(snippets).length + 1;
  const newSnippet = req.body;
  newSnippet.likes = 0;

  const expireFunction = setTimeout(() => expireData(length), EXPIRE_TIME);
  newSnippet.expire = expireFunction;

  snippets[length] = newSnippet;

  const newURL = `http://localhost:8000/api/snippets/${length}`;
  res.json({ newURL });
});

router.put('/like/:id', (req, res) => {
  const id = req.params.id;

  snippets[id].likes++;

  res.json(snippets[id]);
});

module.exports = router;
