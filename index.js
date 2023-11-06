const express = require("express");

const app = express()

app.use(express.json())
app.listen(3000,() => {
    console.log("Servidor Aberto na porta 3000")
})
const {pool,closepool} = require("./database/data")

app.post("/cadastroProduto", async (req,res) => {
    try {
        pool.connect()
        const {idCategoria,nomeProduto,precoUnitario} = req.body;
        const result = await pool.query(`insert into produto (idCategoria,nomeProduto,precoUnitario) values (${idCategoria},'${nomeProduto}',${precoUnitario})`)
        console.log(result);
        if (result.rowCount === 0){
            res.status(400).json({message: "Erro"})
        } else {
            res.status(200).json({message: "Sucesso"})
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Not Found"})
    }
    finally{
        closepool();
    }
})

app.post("/cadastroCategoria", async (req,res) => {
    try {
        pool.connect()
        const {descricao} = req.body;
        const result = await pool.query(`insert into categoria (descricao) values ('${descricao}')`)
        if (result.rowCount === 0){
            res.status(400).json({message: "Erro"})
        } else {
            res.status(200).json({message: "Sucesso"})
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error})
    }
    finally{
        closepool();
    }
})

app.put("/atualizarProduto", async (req,res) => {
    try {
        pool.connect()
        const {id,idCategoria,nomeProduto,precoUnitario} = req.body;
        const result = await pool.query(`update produto set idCategoria = '${idCategoria}',nomeProduto = '${nomeProduto}',precoUnitario = '${precoUnitario}'  where produto.id = ${id}`)
        console.log(result);
        if (result.rowCount === 0){
            res.status(400).json({message: "Erro"})
        } else {
            res.status(200).json({message: "Sucesso"})
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Not Found"})
    }
    finally{
        closepool();
    }
})

app.put("/atualizarCategoria", async (req,res) => {
    try {
        pool.connect()
        const {id,descricao} = req.body;
        const result = await pool.query(`update categoria set descricao = '${descricao}' where categoria.id = ${id}`)
        if (result.rowCount === 0){
            res.status(400).json({message: "Erro"})
        } else {
            res.status(200).json({message: "Sucesso"})
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error})
    }
    finally{
        closepool();
    }
})

app.delete("/deleteProduto", async (req,res) => {
    try {
        pool.connect()
        const {id} = req.body;
        const result = await pool.query(`delete from produto where produto.id = ${id}`)
        console.log(result);
        if (result.rowCount === 0){
            res.status(400).json({message: "Erro"})
        } else {
            res.status(200).json({message: "Sucesso"})
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Not Found"})
    }
    finally{
        closepool();
    }
})

app.delete("/deleteCategoria", async (req,res) => {
    try {
        pool.connect()
        const {id} = req.body;
        const result = await pool.query(`delete from categoria where categoria.id = ${id}`)
        if (result.rowCount === 0){
            res.status(400).json({message: "Erro"})
        } else {
            res.status(200).json({message: "Sucesso"})
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error})
    }
    finally{
        closepool();
    }
})

app.get("/getProduto", async (req,res) => {
    try {
        pool.connect()
        const result = await pool.query(`select * from produto`)
        console.log(result);
        if (result.rowCount === 0){
            res.status(400).json({message: "Erro"})
        } else {
            res.status(200).json(result.rows)
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Not Found"})
    }
    finally{
        closepool();
    }
})

app.get("/getCategoria", async (req,res) => {
    try {
        pool.connect()
        const result = await pool.query(`select * from categoria`)
        if (result.rowCount === 0){
            res.status(400).json({message: "Erro"})
        } else {
            res.status(200).json(result.rows)
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error})
    }
    finally{
        closepool();
    }
})