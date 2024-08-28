const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/Auth_middleware');
const { addNote, EditNote, GetNotes, DeleteNote,EditPinnedNote,SearchNotes } = require('../controllers/notes_controllers');

// Add note route
router.post('/add-note', authenticateToken, addNote);

// Edit note route
router.put('/edit-note/:noteId', authenticateToken, EditNote);

// Get all note route
router.get('/get-all-notes/', authenticateToken, GetNotes);

//Delete note route
router.delete('/delete-note/:noteId', authenticateToken, DeleteNote);

//edit Pinned note route
router.put('/update-note-pinned/:noteId', authenticateToken, EditPinnedNote);

//Search note route
router.get('/search-notes', authenticateToken,SearchNotes );

module.exports = router;