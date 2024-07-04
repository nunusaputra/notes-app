const Todos = require("../../models").Todos;
const Users = require("../../models").Users;

module.exports = {
  // ===================== START GET ALL TODOS ===================== //
  getTodos: async (req, res) => {
    try {
      const todos = await Todos.findAll({
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

      if (!todos || todos.length === 0) {
        return res.status(404).json({
          message: "Todos not found!",
        });
      }

      res.status(200).json({
        message: "Success get all todos",
        data: todos,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ===================== END GET ALL TODOS ===================== //

  // ===================== START GET TODOS BY ID ===================== //
  getTodosById: async (req, res) => {
    try {
      const { id } = req.params;

      const todo = await Todos.findOne({
        include: [
          {
            model: Users,
            attributes: ["id", "name", "email"],
          },
        ],
        where: {
          id,
          userId: req.id,
        },
      });

      if (!todo) {
        return res.status(404).json({
          message: "Todo not found!",
        });
      }

      res.status(200).json({
        message: "Success get todo by id",
        data: todo,
      });
    } catch (error) {}
  },
  // ===================== END GET TODOS BY ID ===================== //

  // ===================== START CREATE TODOS ===================== //
  createTodos: async (req, res) => {
    try {
      const { title, isDone } = req.body;

      const todos = await Todos.create({
        title,
        isDone,
        userId: req.id,
      });

      res.status(201).json({
        message: "Success create todos",
        data: todos,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ===================== END CREATE TODOS ===================== //

  // ===================== START UPDATE TODOS ===================== //
  updateTodos: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, isDone } = req.body;

      const todo = await Todos.findOne({
        where: {
          id,
        },
      });

      if (!todo) {
        return res.status(404).json({
          message: "Todo not found!",
        });
      }

      await Todos.update(
        {
          title,
          isDone,
          userId: req.id,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Success update todo",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ===================== END UPDATE TODOS ===================== //

  // ===================== START DELETE TODOS ===================== //
  deleteTodos: async (req, res) => {
    try {
      const { id } = req.params;

      await Todos.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Success delete todos",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ===================== END DELETE TODOS ===================== //
};
