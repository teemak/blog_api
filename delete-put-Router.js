const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create('The Cat', 'spooky cats.', 'Mike Williams', 2000);
BlogPosts.create('The Red Cat', 'about a cats.', 'David Copper', 1997);

// delete blog post
router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted shopping list item \`${req.params.id}\``);
	res.status(204).end();
});

router.put('/:id', jsonParser, (req, res)=> {
	console.log(req.params);
	console.log(req.body);
	
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	for(let i = 0; i < requiredFields.length; i++) {
	  const field = requiredFields[i];
		if(!(field in req.body)) {
			const message = `You missing the ${field}`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
		if(req.params.id !== req.body.id) {
			const message = (`Request path id ${req.params.id} and request body id ${req.body.id} must match`);
   		console.error(message);
   		return res.status(400).send(message);
		}
		console.log(`Updating blog item ${req.params.id}`);
		const updatedItem = BlogPosts.update({
			id: req.params.id,
			title: req.body.title,
			content: req.body.content,
			author: req.body.author,
			publishDate: req.body.publishDate
		});
		res.status(204).json(updatedItem);
});


module.exports = router;