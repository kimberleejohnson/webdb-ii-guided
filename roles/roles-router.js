const router = require('express').Router();

const Roles = require('./roles-model.js'); 

router.get('/', (req, res) => {
  Roles.find().then(roles => {
    res.status(200).json(roles);
  })
  .catch(error=> {
    res.status(500).json(error); 
  })
});

router.get('/:id', (req, res) => {
  // In SQL: select * from roles where id = 123 

  Roles.findById(req.params.id)
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
  Roles.add(req.body, 'id').then(ids => {
    res.status(201).json(ids);
  }).catch(error => {
    res.status(500).json(error); 
  })
});

router.put('/:id', (req, res) => {
  // In SQL: Use put and where
  const changes = req.body; 
  Roles.update(req.params.id, changes).then(count => {
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
  Roles.remove(req.params.id)
  .then(count => {
    if(count > 0) {
      const unit = count > 1 ? 'records' : 'record';
      res.status(200).json({message: `${count} ${unit} deleted`})
    } else {
      res.status(404).json({ message: 'role not found'})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
});


module.exports = router;
