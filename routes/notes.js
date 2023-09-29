const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  readAndDelete,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI note
notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
      const newNote = {
          title,
          text,
          id: uuidv4(),
      };

      readAndAppend(newNote, './db/db.json');

      const response = {
          status: 'success',
          body: newNote,
      }

      res.json(response);
  } else {
      res.error('Error added new Note');
  }
})

// DELETE Route for a specific note
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readAndDelete(noteId,'./db/db.json');
  res.json(`Item ${noteId} has been deleted 🗑️`);
});

module.exports = notes;