const Notes = require("../models/notes_model");

// Add Note API
exports.addNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const user = await req.user;

  if (!title || !content) {
    return res.status(400).json({
      error: true,
      message: "Title and Content are required",
    });
  }
  
  try {
    const note = new Notes({
      title,
      content,
      tags: tags || [],
      userId: user.user._id,
    });
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note Added Successfully...",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

// Edit Note API
exports.EditNote = async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags , isPinned} = req.body;
  const user = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({
      error: true,
      message: "No Changes provided",
    });
  }
  
  try {
    const note = await Notes.findOne({
      _id : noteId,
      userId: user.user._id,
    });

    if(!note){
      return res.status(404).json({
        error: true,
        message: "Note not Found",
      });
    }

    if(title) note.title = title;
    if(content) note.content = content;
    if(tags) note.tags = tags;
    if(isPinned) note.isPinned = isPinned;
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated Successfully...",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

// Edit Note Pinned API
exports.EditPinnedNote = async (req, res) => {
  const noteId = req.params.noteId;
  const {isPinned} = req.body;
  const user = req.user;
  try {
    const note = await Notes.findOne({
      _id : noteId,
      userId: user.user._id,
    });

    if(!note){
      return res.status(404).json({
        error: true,
        message: "Note not Found",
      });
    }

    note.isPinned = isPinned;
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated Successfully...",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

// Delete Note API
exports.DeleteNote = async (req, res) => {
  const noteId = req.params.noteId;
  const user = req.user;
  
  try {
    const note = await Notes.findOne({
      _id : noteId,
      userId: user.user._id,
    });

    if(!note){
      return res.status(404).json({
        error: true,
        message: "Note not Found",
      });
    }

    await Notes.deleteOne({
      _id: noteId,
      userId: user.user._id
    })

    return res.json({
      error: false,
      note,
      message: "Note deleted Successfully...",
    });
    
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

// Get All Note API
exports.GetNotes = async (req, res) => {
  const {user} = req.user;
  try {
    const notes = await Notes.find({
      userId: user._id,
    }).sort({
      isPinned: -1
    });

    if(!notes){
      return res.status(404).json({
        error: true,
        message: "Notes not Found",
      });
    }

    return res.json({
      error: false,
      notes,
      message: "all Notes retrieved Successfully...",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};


// Search Notes  API
exports.SearchNotes = async (req, res) => {
  const user = req.user;
  const { query } = req.query;

  try {
    let notes;
    if (!query || query.trim() === "") {
      notes = await Notes.find({ userId: user.user._id });
    } else {
      notes = await Notes.find({
        userId: user.user._id,
        $or: [
          { title: { $regex: new RegExp(query, "i") } },
          { content: { $regex: new RegExp(query, "i") } },
        ]
      });
    }

    return res.json({
      error: false,
      notes: notes,
      message: "Notes retrieved successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

