const Notes = require("../../models").Notes;

module.exports = {
  // ===================== START GET ALL NOTES ===================== //
  getNotes: async (req, res) => {
    try {
      const notes = await Notes.findAll();

      if (!notes || notes.length === 0) {
        return res.status(404).json({
          message: "Notes not found!",
        });
      }

      res.status(200).json({
        message: "Success get all notes",
        data: notes,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // ===================== END GET ALL NOTES ===================== //

  // ===================== START GET NOTES BY ID ===================== //
  getNotesById: async (req, res) => {
    try {
      const { id } = req.params;

      const note = await Notes.findOne({
        where: {
          id,
        },
      });

      if (!note) {
        return res.status(404).json({
          message: "Note not found!",
        });
      }

      res.status(200).json({
        message: "Success get note by id",
        data: note,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // ===================== END GET NOTES BY ID ===================== //

  // ===================== START CREATE NOTES ===================== //
  createNotes: async (req, res) => {
    try {
      const { title, author, status, important, date, desc } = req.body;

      const notes = await Notes.create({
        title,
        author,
        status,
        important,
        date,
        desc,
      });

      res.status(201).json({
        message: "Success create notes",
        data: notes,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // ===================== END CREATE NOTES ===================== //

  // ===================== START UPDATE NOTES ===================== //
  updateNotes: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, status, important, date, desc } = req.body;
      const note = await Notes.findOne({
        where: {
          id,
        },
      });

      if (!note) {
        return res.status(404).json({
          message: "Note not found!",
        });
      }

      await Notes.update(
        {
          title,
          author,
          status,
          important,
          date,
          desc,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Success update notes",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  // ===================== END UPDATE NOTES ===================== //

  //   ===================== START DELETE NOTES ===================== //
  deleteNotes: async (req, res) => {
    try {
      const { id } = req.params;

      await Notes.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Success delete notes",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //   ===================== END DELETE NOTES ===================== //
};
