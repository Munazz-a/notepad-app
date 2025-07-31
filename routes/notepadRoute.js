const express = require('express');
const route = express.Router();
const Note = require('../models/notepadmodel');
//Storing notes in MongoDB
route.post('/', async (req, res) => {
    try{
    const newNote = new Note({
        li : req.body.li,
        title: req.body.title,
        content: req.body.content
    })
    await newNote.save();
    return res.status(201).json(newNote);
    } catch (err) {
        return res.status(500).json({ error : 'Failed to create note' })
    }
})

//Fetching notes from MongoDB
route.get('/all', async(req, res) => {
    try{
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch(err){
        res.status(500).json({ message : 'Failed to fetch notes' });
    }
    
})

route.put('/:id', async(req, res) => {
    const {id} = req.params;
    const {li, title, content} = req.body;
    try{
        const updateFields = {};
        if(li !== undefined) updateFields.li = li;
        if(title !== undefined) updateFields.title = title;
        if(content !== undefined) updateFields.content = content;

        const updateNote = await Note.findByIdAndUpdate(id,updateFields,
             {new : true}
        );

        res.json(updateNote)
        console.log('Saving Note content ', req.body.content);
    } catch(err){
        res.status(500).json({ message : 'Failed to put notes : ', err });
    }
})

route.delete('/:id', async (req, res) =>{
    try {
        const noteDelete = await Note.findByIdAndDelete(req.params.id);
        if(!noteDelete){
           return res.status(404).json({ message : 'note not found'})
        }
        res.json({ message : 'deleted successfully '});
    } catch (error) {
        req.status(500).json({ message : 'failed to delete note '});
    }
})


route.get('/', (req, res) => {
    res.render('notePad')
})

module.exports = route;