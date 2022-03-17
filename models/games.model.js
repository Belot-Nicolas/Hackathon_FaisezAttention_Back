const connection = require("../db-config");
const Joi = require('joi');
const db = connection.promise();


// const validate = (data) => {
//     return Joi.object({
//         name: Joi.string().max(255).presence(),
//         image: Joi.string().max(255).presence(),
//         gifwin: Joi.string().max(255).presence(),
//         gifloose: Joi.string().max(255).presence(),
//         anecdote_win: Joi.string().max(255).presence(),
//         anecdote_loose: Joi.string().max(255).presence(),
//     }).validate(data, { abortEarly: false }).error;
// }

const findAll = () => {
    return db
        .query("SELECT * FROM games")
        .then(([result]) => result)
        .catch((err) => {
            console.error(err);
            return err;
        });
}

const findOne = (id) => {
    return db
        .query("SELECT * FROM games WHERE id_game=?", [id])
        .then(([result]) => result[0])
        .catch((err) => {
            console.error(err);
            return err;
        });
}

const remove = (id) => {
    return db
        .query("DELETE FROM games WHERE id_game=?", [id])
        .then(([result]) => {
            return result.affectedRows !== 0;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

const create = ({ name, image, gifwin, gifloose, anecdote_win, anecdote_loose }) => {
    return db
        .query('INSERT INTO games (name, image, gifwin, gifloose, anecdote_win, anecdote_loose) VALUES (?,?,?,?,?,?)', [name, image, gifwin, gifloose, anecdote_win, anecdote_loose])
        .then(([result]) => {
            const lastId = result.insertId;
            return { lastId, name, image, gifwin, gifloose, anecdote_win, anecdote_loose };
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

const update = (data, id) => {
    return db
        .query("UPDATE games SET ? WHERE id_game=?", [data, id])
        .then(([result]) => {
            return result.affectedRows;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

const average = () => {
    return db
    .query("SELECT  g.name, AVG(s.score) AS average FROM games as g INNER JOIN game_session as s ON s.id_game=g.id_game GROUP BY g.name ORDER BY g.name ASC")
    .then(([result]) => result)
    .catch((err) => {
        console.error(err);
        return err;
    });
}

module.exports = {
    findAll,
    findOne,
    remove,
    create,
    update,
    average
    // validate
}