const bcrypt = require('bcrypt')
const pool = require('../conexao')

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const query =
      'insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *'

    const { rows } = await pool.query(query, [nome, email, senhaCriptografada])

    const { senha: _, ...usuario } = rows[0]

    return res.status(201).json(usuario)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = cadastrarUsuario
