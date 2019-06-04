const knex = require('knex');

const router = require('express').Router();

// 1. npm install knex and driver 
// 2. configure knex, after importing up above, and get a connection to database
// 3. Configure knexConfig object

const knexConfig = {
  client: 'sqlite3', 
  connection: {
    filename: './data/Rolex.db3'
  },
  useNullAsDefault: true, // required only for sqlite3 
  // debug: true, 
}

const db = knex(knexConfig); 

router.get('/', (req, res) => {
  db('roles').then(roles => {
    res.status(200).json(roles);
  })
  .catch(error=> {
    res.status(500).json(error); 
  })
});

router.get('/:id', (req, res) => {
  // In SQL: select * from roles where id = 123 

  db('roles').where({ id: req.params.id })
  .first()
  .then(role => {
    // return 404 if record is not found 
    if(role) {
      res.status(200).json(role);
    }else {
      res.status(404).json({message: "Role not found, boo!"})
    }
  }).catch(error => {
    res.status(500).json(error); 
  })
});

// Always getting to get an array with the id of the last thing you inserted
router.post('/', (req, res) => {
  db('roles').insert(req.body, 'id').then(ids => {
    res.status(201).json(ids);

  }).catch(error => {
    res.status(500).json(error); 
  })
});

router.put('/:id', (req, res) => {
  // In SQL: Use put and where
  const changes = req.body; 
  db('roles').where({ id: req.params.id }).update(changes).then(count => {
    if (count > 0) {
      res.status(200).json({message: `${count} records updated`})
    } else {
      res.status(404).json({message: "Role not found, boo!"})
    }
  }).catch( error => {
    res.status(500).json(error); 
  })
});

router.delete('/:id', (req, res) => {
  // remove roles (inactivate the role)
  res.send('Write code to remove a role');
});


module.exports = router;
