const { Router } = require("express");
const router = Router();

// llamado simple ya que es un solo json y usamos get
const user_cart = require("../user_cart/25801.json");


//routes
module.exports = (pool) => {
    router.get("/", async (req, res) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
            `SELECT id, name, count, cost, currency, images FROM cartproducts`,
            );
            res.json(rows);

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error al recibir solicitud" });
        } finally {
            if (conn) conn.release(); //release to pool
        }
        //res.send(user_cart);
    });

    router.post("/", async (req, res) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const resp = await conn.query(
            `INSERT INTO cartproducts(id, name, count, cost, currency, images) VALUE(?, ?, ?, ?, ?, ?)`,
            [
                req.body.id,
                req.body.name,
                req.body.count,
                req.body.cost,
                req.body.currency,
                req.body.images
            ]
            );
            res.json({id: parseInt(resp.insertID), ...req.body});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error al recibir solicitud" });
        } finally {
            if (conn) conn.release(); //release to pool
        }
    });

    router.put("/:id", async (req, res) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const resp = await conn.query(
            `UPDATE cartproducts SET name=?, count=?, cost=?, currency=?, images=? WHERE id=?`,
            [
                req.body.name,
                req.body.count,
                req.body.cost,
                req.body.currency,
                req.body.images,
                req.params.id
            ]
            );
            res.json({id: parseInt(req.params.id), ...req.body});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error al recibir solicitud" });
        } finally {
            if (conn) conn.release(); //release to pool
        }
    });

    router.delete("/:id", async (req, res) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
            `DELETE FROM cartproducts WHERE id=?`, [req.params.id,]
            );
            res.json({message: `Se ha eliminado el elemento ${req.params.name} del carrito`});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error al recibir solicitud" });
        } finally {
            if (conn) conn.release(); //release to pool
        }
    });

    

    return router;

}

// si en el require de ../user_cart/ quiero llamar al archivo json como hago?
// Importamos el módulo 'fs' y 'util' de Node.js
