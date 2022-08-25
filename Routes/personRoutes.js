const router = require('express').Router();
//importando model
const Person = require('../Models/Person');

//create
router.post('/', async (request, responde) => {
  //{name: "Paulo", salary:"5000", approved:true}
  const { name, salary, approved } = request.body;

  //
  // if (!approved) {
  // return responde({
  // status: 400
  // })

  if (!name) {
    response.status(422).json({ error: "nome campo obrigatório" })
    return
  }
  if (!salary) {
    response.status(422).json({ error: "salario campo obrigatório" })
    return
  }

  const person = {
    name,
    salary,
    approved,
  };

  try {
    //criando registro
    await Person.create(person);
    response.status(201).json({ message: "Pessoa inserida com sucesso" });
  } catch (error) {
    response.status(500).json({ error: error });
  }


  //const person = await Person
});

//READ
router.get('/', async (request, response) => {
  try {
    const people = await Person.find();
    response.status(200).json({ people })
  } catch (error) {
    response.status(500).json({ error: error });
  }
})

//read by id
router.get('/:id', async (request, response) => {

  //extrair o dado da requisicao via url = request.params 
  const id = request.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      response.status(404).json({ error: "Person not found" });
      return
    }
    response.status(200).json({ person })
  } catch (error) {
    response.status(500).json({ error: error });
  }
})


//update (put/patch)
router.patch('/:id', async (request, response) => {
  //extrair o dado da requisicao via url = request.params 
  const id = request.params.id;

  const { name, salary, approved } = request.body;

  const person = {
    name,
    salary,
    approved,
  };


  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);
    //testa se houve atualização
    if (updatePerson.matchedCount === 0) {
      response.status(404).json({ error: "Person not updated" });
    }
    response.status(200).json({ Person });
  } catch (error) {
    response.status(500).json({ error: error });
  }

});



//delete
router.delete('/:id', async (request, response) => {
  //extrair o dado da requisicao via url = request.params 
  const id = request.params.id;

  const person = await Person.findeOne({ _id: id });

  if (!person) {
    response.status(404).json({ error: "Person not found" });
    return
  }

  try {
    await Person.deleteOne(_id, id);
    response.status(200).json({ success: "Person deleted" });

  } catch (error) {
    response.status(500).json({ error: error });
  }

});


module.exports = router;