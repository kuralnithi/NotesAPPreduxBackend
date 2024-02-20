const rdsCon = require("../Database/db.config");

exports.addNote = async (req, res) => {
  const { id, content1, content2 } = req.body.noteData;
  console.log(id, content1, content2);

  rdsCon().getConnection((err, connection) => {
    if (err) throw err;

    console.log("connection established");

    connection.query(
      "INSERT INTO notes VALUES(?,?,?)",
      [id, content1, content2],
      (err, row) => {
        connection.release();

        if (err)
          res.status(500).json({ message: "erro in adding notes", data: row });

        console.log("row inserted", row);

        connection.query("SELECT * FROM notes", (err, row) => {
          if (err) {
            res
              .status(500)
              .json({ message: "error in getting rows", data: row });
            console.log("all rows returned", row);
          }
          res
            .status(200)
            .json({ message: "all notes returned successfully", data: row });
        });
      }
    );
  });
};
exports.getNote = async (req, res) => {
  rdsCon().getConnection((err, connection) => {
    if (err) throw err;

    console.log("connection established");

    connection.query("SELECT * FROM notes", (err, row) => {
      connection.release();

      if (err) throw err;
      console.log("all rows returned", row);
      res
        .status(200)
        .json({ message: "all notes returned successfully", data: row });
    });
  });
};
exports.editNote = async (req, res) => {
  const { id, Econtent1, Econtent2 } = req.body.noteData;
  console.log(id, Econtent1, Econtent2);
  rdsCon().getConnection((err, connection) => {
    if (err) throw err;

    console.log("connection established");

    connection.query(
      `UPDATE notes SET content1=?,content2=? WHERE id=?`,
      [Econtent1, Econtent2, id],
      (err, row) => {
        connection.release();

        if (err)
          return res
            .status(500)
            .json({ message: "error in editing rows", data: row });
        console.log("row updated", row);

        connection.query("SELECT * FROM notes", (err, row) => {
          if (err)
            return res
              .status(500)
              .json({ message: "error in getting rows", data: row });
          console.log("all rows returned", row);
          res
            .status(200)
            .json({ message: "all notes returned successfully", data: row });
        });
      }
    );
  });
};
exports.deleteNote = async (req, res) => {
  const { id } = req.body;
  console.log("id", id);
  rdsCon().getConnection((err, connection) => {
    if (err) throw err;

    console.log("connection established");

    connection.query(`DELETE FROM notes WHERE id = ? `, [id], (err, row) => {
      connection.release();

      if (err)
        res.status(500).json({ message: "error in deleting notes", data: row });

      console.log("row deleted", row);

      connection.query("SELECT * FROM notes", (err, row) => {
        if (err)
          res.status(500).json({ message: "error in getting rows", data: row });
        console.log("all rows returned", row);
        res
          .status(200)
          .json({ message: "all notes returned successfully", data: row });
      });
    });
  });
};

exports.addTask = async (req, res) => {
  const { id, title, text, completed } = req.body.taskData;
  console.log(req.body);

  rdsCon().getConnection((err, connection) => {
    if (err) throw err;

    console.log("connection established");

    connection.query(
      "INSERT INTO tasks VALUES(?,?,?,?)",
      [id, title, text, completed],
      (err, row) => {
        connection.release();

        if (err)
          res.status(500).json({ message: "Error in adding task", data: row });

        console.log("row inserted", row);

        connection.query("SELECT * FROM tasks", (err, row) => {
          connection.release();

          if (err) throw err;
          console.log("row returned", row);
          res
            .status(200)
            .json({ message: "Tasks returned successfully", data: row });
        });
      }
    );
  });
};

exports.getTask = async (req, res) => {
  console.log(req.body);

  rdsCon().getConnection((err, connection) => {
    if (err) throw err;

    console.log("connection established");

    connection.query("SELECT * FROM tasks", (err, row) => {
      connection.release();

      if (err) throw err;
      console.log("row returned", row);
      res
        .status(200)
        .json({ message: "Tasks returned successfully", data: row });
    });
  });
};

exports.updateTask = async (req, res) => {
  const { id, completed } = req.body.taskData;
  console.log("reqqqqqq>>",req.body);

  rdsCon().getConnection((err, connection) => {
    if (err) throw err;

    console.log("connection established");

    connection.query(
      "UPDATE tasks SET completed = ? WHERE id = ?",
      [completed, id],
      (err, row) => {
        connection.release();

        if (err)
          res
            .status(500)
            .json({ message: "error in updating task", data: row });

        console.log("row updated", row);
     

        connection.query("SELECT * FROM tasks", (err, row) => {
          connection.release();

          if (err) throw err;
          console.log("row returned", row);
          res
            .status(200)
            .json({ message: "Tasks returned successfully", data: row });
        });
      }
    );

   
  });
};

exports.deleteTask = async (req, res) => {
  const { id } = req.body;
  console.log("delete task", id);

  rdsCon().getConnection((err, connection) => {
    if (err) throw err;

    console.log("connection established");

    connection.query("DELETE from tasks WHERE id = ?", [id], (err, row) => {
      connection.release();

      if (err)
        return res
          .status(500)
          .json({ message: "error in deleting task", data: row });

      console.log("row deleted", row);

      connection.query("SELECT * FROM tasks", (err, row) => {
        connection.release();

        if (err) throw err;
        console.log("row returned", row);

        res
          .status(200)
          .json({ message: "Tasks returned successfully", data: row });
      });
    });
  });
};
