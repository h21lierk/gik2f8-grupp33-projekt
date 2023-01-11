const express = require('express');
const app = express();
const fs = require('fs/promises');
const PORT = 5000;

app 
  .use(express.json())
  .use(express.urlencoded({ extended: false })) 
  .use((req, res, next) => { 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*'); 
    next();
  });

app.get('/friends', async (req, res) => {
  try { 
    const friends = await fs.readFile('./friends.json'); 
    res.send(JSON.parse(friends));
  } catch (error) { 
    res.status(500).send({ error });
  }
});



app.post('/friends', async (req, res) => {
	try { 
	  const friend = req.body; 
	  const listBuffer = await fs.readFile('./friends.json');
	  const currentFriends = JSON.parse(listBuffer);
	  let maxFriendId = 1;
	  if (currentFriends && currentFriends.length > 0) {  
		maxFriendId = currentFriends.reduce( 
		  (maxId, currentElement) =>  
			currentElement.id > maxId ? currentElement.id : maxId,
			maxFriendId
		);
	  }
	  const newFriend = { id: maxFriendId + 1, ...friend };
	  const newList = currentFriends ? [...currentFriends, newFriend] : [newFriend];
	  await fs.writeFile('./friends.json', JSON.stringify(newList));
	  res.send(newFriend);
	} catch (error) { 
	  res.status(500).send({ error: error.stack });
	}
  });











app.delete('./friends/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const listBuffer = await fs.readFile('./friends.json');
		const currentFriends = JSON.parse(listBuffer);
		if (currentFriends.lenght > 0) {
			await fs.writeFile('./friends.json', JSON.stringify(currentFriends.filter((friend) => friend.id != id))
		);
		res.send({ message: `Din vän med id ${id} har tagits bort`});
		}
			else {
				res.status(404).send({error: 'Ingen vän att ta bort.'});
		}}
		catch (error) {
			res.status(500).send({ error: error.stack});
	}
});


app.listen(PORT, () => console.log('Server running on http://localhost:5000'));