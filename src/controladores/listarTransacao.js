const pool = require('../conexao')

const listarTransacao = async (req, res) => {
  try {
    const usuarioId = req.usuario.id

    const query = `
      select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome
      from transacoes t
      inner join categorias c on t.categoria_id = c.id
      where t.usuario_id = $1
    `
    const { rows } = await pool.query(query, [usuarioId])

    res.status(200).json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = listarTransacao
