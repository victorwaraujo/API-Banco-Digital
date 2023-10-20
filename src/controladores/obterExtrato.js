const pool = require('../conexao')

const obterExtrato = async (req, res) => {
  try {
    const usuario_id = req.usuario.id

    const somaEntradasQuery = `
      SELECT COALESCE(SUM(valor), 0) AS total_entradas
      FROM transacoes
      WHERE usuario_id = $1 AND tipo = 'entrada'
    `
    const { rows: entradas } = await pool.query(somaEntradasQuery, [usuario_id])

    const somaSaidasQuery = `
      SELECT COALESCE(SUM(valor), 0) AS total_saidas
      FROM transacoes
      WHERE usuario_id = $1 AND tipo = 'saida'
    `
    const { rows: saidas } = await pool.query(somaSaidasQuery, [usuario_id])

    const extrato = {
      entrada: parseInt(entradas[0].total_entradas),
      saida: parseInt(saidas[0].total_saidas)
    }

    return res.status(200).json(extrato)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = obterExtrato
