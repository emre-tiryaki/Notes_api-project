import express from "express";
import userModel from "../models/userModel.js";
import noteModel, { type INote } from "../models/NoteModel.js";

const notesRoute = express.Router();

//for making a new note
notesRoute.post("/new", async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId;

  try {
    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "there are no users with that id" });

    const newNote = await noteModel.create({
      userId: user._id,
      title: title,
      content: content,
    });

    user.notes.push(newNote._id);

    await user.save();

    return res.status(201).json({ message: "message created" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `(new)Internal server error: ${error}` });
  }
});

//for getting all notes
notesRoute.get("/all", async (req, res) => {
  const userId = req.userId;

  try {
    const usersNotesId = await userModel
      .findById(userId)
      .select("notes")
      .lean();

    if (!usersNotesId)
      return res.status(404).json({ message: "notes not found" });

    const notes = await noteModel.find({ _id: { $in: usersNotesId.notes } }).select("-userId").lean();

    if (!notes) return res.status(404).json({ message: "notes not found" });

    return res.status(200).json({ message: "Here's your notes", notes: notes });
  } catch (error) {
    return res.status(500).json({
      message: `(getting all notes)Internal server error: ${error}`,
    });
  }
});

//for getting a specific note
notesRoute.get("/:id", async (req, res) => {
  const noteId = req.params.id;

  try {
    //getting the note data without the userId variable
    const noteData = (await noteModel
      .findById(noteId)
      .select("-userId")
      .lean()) as INote;

    if (!noteData) return res.status(404).json({ message: "Note not found" });

    return res
      .status(200)
      .json({ message: "Here's your note", note: noteData });
  } catch (error) {
    return res.status(500).json({
      message: `(getting specific note)Internal server error: ${error}`,
    });
  }
});

//for updating a specific note
notesRoute.post("/:id", async (req, res) => {
  const { title, content } = req.body;

  if (!title && !content)
    return res.status(400).json({ message: "give at least 1 parameter" });

  const noteId = req.params.id;

  try {
    const note = await noteModel.findById(noteId);

    if (!note) return res.status(404).json({ message: "Note not found" });

    if (title) note.title = title;

    if (content) note.content = content;

    note.save();

    return res.status(200).json({ message: "note updated" });
  } catch (error) {
    return res.status(500).json({
      message: `(updating specific note)Internal server error: ${error}`,
    });
  }
});

export default notesRoute;
