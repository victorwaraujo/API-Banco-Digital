const detalharPerfil = (req, res) => {
  try {
    const usuario = req.usuario

    res.status(200).json(usuario)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = detalharPerfil
