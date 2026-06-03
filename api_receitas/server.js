const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ==================== BANCO ====================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "app_receitas",
});

db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar no MySQL:", err);
    return;
  }
  console.log("🔥 MySQL conectado!");
});

// ==================== LOGIN ====================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT *
    FROM usuarios
    WHERE email = ? AND Senha = ?
  `;

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(401).json({
        message: "Usuário ou senha inválidos",
      });
    }

    res.json({
      id: result[0].id,
      nome: result[0].nome,
      email: result[0].email,
    });
  });
});

// ==================== CADASTRO ====================
app.post("/cadastro", (req, res) => {
  const { nome, email, password } = req.body;

  const sql = `
    INSERT INTO usuarios (nome, email, Senha)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [nome, email, password], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Usuário cadastrado com sucesso!" });
  });
});

// ==================== TODAS RECEITAS ====================
app.get("/receitas", (req, res) => {
  const sql = `
    SELECT 
      receitas.*,
      usuarios.nome AS nome_usuario
    FROM receitas
    LEFT JOIN usuarios ON usuarios.id = receitas.usuario_id
    ORDER BY receitas.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ==================== RECEITAS POR CATEGORIA ====================
app.get("/receitas/categoria", (req, res) => {
  const { categoria } = req.query;

  const sql = `
    SELECT 
      receitas.*,
      usuarios.nome AS nome_usuario
    FROM receitas
    LEFT JOIN usuarios ON usuarios.id = receitas.usuario_id
    WHERE receitas.categoria = ?
    ORDER BY receitas.id DESC
  `;

  db.query(sql, [categoria], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ==================== RECEITAS DO USUÁRIO ====================
app.get("/receitas/usuario/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT *
    FROM receitas
    WHERE usuario_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ==================== CRIAR RECEITA ====================
app.post("/receitas", (req, res) => {
  const {
    usuarioId,
    title,
    image,
    description,
    modoPreparo,
    tempoPreparo,
    categoria,
  } = req.body;

  const sql = `
    INSERT INTO receitas (
      usuario_id,
      titulo,
      descricao,
      modo_preparo,
      tempo_preparo,
      image,
      categoria
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [usuarioId, title, description, modoPreparo, tempoPreparo, image, categoria],
    (err) => {
      if (err) {
        console.log("Erro ao criar receita:", err);
        return res.status(500).json(err);
      }

      res.json({ message: "Receita criada com sucesso!" });
    }
  );
});

// ==================== DELETAR RECEITA ====================
app.delete("/receitas/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM receitas
    WHERE id = ?
  `;

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Receita deletada!" });
  });
});

// ==================== CURTIR RECEITA ====================
app.put("/receitas/:id/curtir", (req, res) => {
  const { id } = req.params;
  const { usuarioId } = req.body;

  const verificar = `
    SELECT *
    FROM curtidas
    WHERE usuario_id = ? AND receita_id = ?
  `;

  db.query(verificar, [usuarioId, id], (err, resultado) => {
    if (err) return res.status(500).json(err);

    if (resultado.length > 0) {
      return res.status(400).json({
        message: "Você já curtiu esta receita.",
      });
    }

    const insert = `
      INSERT INTO curtidas (usuario_id, receita_id)
      VALUES (?, ?)
    `;

    db.query(insert, [usuarioId, id], (err) => {
      if (err) return res.status(500).json(err);

      const update = `
        UPDATE receitas
        SET curtidas = curtidas + 1
        WHERE id = ?
      `;

      db.query(update, [id], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Receita curtida!" });
      });
    });
  });
});

// ==================== PESQUISA ====================
app.get("/receitas/pesquisa", (req, res) => {
  const { q } = req.query;

  const sql = `
    SELECT *
    FROM receitas
    WHERE titulo LIKE ?
    ORDER BY id DESC
  `;

  db.query(sql, [`%${q}%`], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ==================== SERVER ====================
app.listen(3001, () => {
  console.log("🚀 Servidor rodando na porta 3001");
});