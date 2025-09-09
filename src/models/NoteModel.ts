import mongoose from "mongoose";

export interface INote {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  title: String;
  content: String;
  createdAt?: Date;
  updatedAt?: Date;
}

const NoteSchema = new mongoose.Schema<INote>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const noteModel =
  (mongoose.models.Note as mongoose.Model<INote>) ||
  mongoose.model<INote>("Note", NoteSchema);

export default noteModel;
