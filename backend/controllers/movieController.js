import connection from "../connection.js";
import CustomError from "../classes/CustomError.js";

export function index(req, res) {
    const sql = "SELECT * FROM `movies`";

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });

        let data = results
        const response = {
            total: results.length,
            data,
        };
        res.json(response);
    });
};

export function show(req, res) {
    const id = parseInt(req.params.id);
    const sql = "SELECT * FROM reviews WHERE movie_id = ?"
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({
            error: 'Database query failed'
        });
        const item = results[0];
        if (!item) return res.status(404).json({
            error: 'Movie not found'
        });
        const sqlReviews = `
    SELECT movies.*, AVG(reviews.vote) AS average, 
    COUNT(reviews.text) AS comments
    FROM reviews
    RIGHT JOIN movies ON movies.id = reviews.movie_id
    WHERE movies.id = ?
    `
        connection.query(sqlReviews, [id], (err, reviews) => {
            if (err) return res.status(500).json({ error: "Server error" });
            item.reviews = reviews;
            res.json(item);
        });
    });
};

export function store() {

}

export function update(req, res) {
    const id = parseInt(req.params.id);
};

export function modify(req, res) {
    const id = parseInt(req.params.id);

};

export function destroy(req, res) {
    const id = parseInt(req.params.id);
    const sql = "DELETE FROM `movies` WHERE `id` = ?;"

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.sendStatus(204);
    })
};