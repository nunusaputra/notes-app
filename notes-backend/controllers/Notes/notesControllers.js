const Notes = require("../../models").Notes;
const Users = require("../../models").Users;

module.exports = {
  // ===================== START GET ALL NOTES ===================== //
  getNotes: async (req, res) => {
    try {
      const notes = await Notes.findAll({
        include: [
          {
            model: Users,
            attributes: ["id", "name", "email"],
          },
        ],
        where: {
          userId: req.id,
        },
      });

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
        message: "Internal Server Error",
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
          userId: req.id,
        },
        include: [
          {
            model: Users,
            attributes: ["id", "name", "email"],
          },
        ],
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
        message: "Internal Server Error",
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
        userId: req.id,
      });

      res.status(201).json({
        message: "Success create notes",
        data: notes,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
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
          userId: req.id,
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
        message: "Internal Server Error",
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
        message: "Internal Server Error",
      });
    }
  },
  //   ===================== END DELETE NOTES ===================== //
};
