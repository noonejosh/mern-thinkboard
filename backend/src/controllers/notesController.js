import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try {
      const notes = await Note.find()
      res.status(200).json(notes)
    }catch (error){
        console.log("Error in getAllNotes controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function getNoteByID(req,res){
    try {
        const noteByID = await Note.findById(req.params.id);
        if(!noteByID) return res.status(404).json({message:"note not found"});
        res.status(200).json(noteByID);
    } catch (error) {
        console.log("Error in createNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function createNote(req, res) {
    try {
        const {title,content} = req.body
        const note = new Note({title,content});

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.log("Error in createNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function updateNote (req, res) {
    try {
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {new:true,}
        );
        
        if(!updatedNote) return res.status(404).json({message:"note not found"});

        res.status(200).json(updatedNote);

    } catch (error) {
        console.log("Error in updateNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
};

export async function deleteNote (req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id,)

        if(!deletedNote) return res.status(404).json({message:"note not found"});
        res.status(200).json(deletedNote);

    } catch (error) {
        console.log("Error in deleteNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
};
