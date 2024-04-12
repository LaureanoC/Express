import express from 'express'
import { Character } from './character.js'


const app = express()

app.use(express.json())

const characters = [
    new Character(
      'Darth Vader',
      'Sith',
      10,
      100,
      20,
      10,
      ['Lightsaber', 'Death Star'],
      'a02b91bc-3769-4221-beb1-d7a3aeba7dad',
    ),
  ]


app.use('/', (req, res) =>{
    res.json({data: characters})
})

app.get('/api/characters/:id', (req, res) => {

    const character = characters.find((character) => character.id === req.params.id)
    if (!character) {
      return res.status(404).send({ message: 'Character not found' })
    }
    res.json({ data: character })
  
  })

  app.post('/api/characters', (req, res) =>{

    const {name, characterClass, level, hp, mana, attack, items} = req.body
    const character = new Character(name, characterClass, level, hp, mana, attack, items)
    
    characters.push(character)
    return res.status(201).send({ message: 'Character created', data: character })
  })


app.listen(3000, () =>{
    console.log('Server running on http://localhost:3000/')
})