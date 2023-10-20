const express = require('express')
const cadastrarUsuario = require('./controladores/usuario')
const {
  verificarEmailEmUso,
  verificarEmailExistente
} = require('./intermediarios/validarEmail')

const login = require('./controladores/login')
const verificarLogin = require('./intermediarios/validarLogin')
const validarSenha = require('./intermediarios/validarSenha')
const detalharPerfil = require('./controladores/perfilUsuario')
const atualizarUsuario = require('./controladores/atualizarUsuario')
const listarCategorias = require('./controladores/listarCategorias')
const listarTransacao = require('./controladores/listarTransacao')
const detalharTransacao = require('./controladores/detalharTransacao')
const cadastrarTransacao = require('./controladores/cadastrarTransacao')
const {
  validarTipo,
  validarTransacao
} = require('./intermediarios/validarTipo')
const editarTransacao = require('./controladores/editarTransacao')
const removerTransacao = require('./controladores/removerTransacao')
const obterExtrato = require('./controladores/obterExtrato')
const {
  validarCorpoRequisicao
} = require('./intermediarios/validarCamposobrigatorios')
const {
  schemaUsuario,
  schemaUsuarioLogin
} = require('./validações/schemaUsuarios')
const schemaTransacao = require('./validações/schemaTransacao')

const rotas = express()

rotas.post(
  '/usuario',
  validarCorpoRequisicao(schemaUsuario),
  verificarEmailEmUso,
  cadastrarUsuario
)

rotas.post(
  '/login',
  validarCorpoRequisicao(schemaUsuarioLogin),
  verificarEmailExistente,
  validarSenha,
  login
)

rotas.use(verificarLogin)

rotas.get('/usuario', detalharPerfil)

rotas.put(
  '/usuario',
  validarCorpoRequisicao(schemaUsuario),
  verificarEmailEmUso,
  atualizarUsuario
)

rotas.get('/categoria', listarCategorias)
rotas.get('/transacao', listarTransacao)
rotas.get('/transacao/extrato', obterExtrato)
rotas.get('/transacao/:id', detalharTransacao)

rotas.post(
  '/transacao',
  validarCorpoRequisicao(schemaTransacao),
  validarTipo,
  cadastrarTransacao
)
rotas.put(
  '/transacao/:id',
  validarCorpoRequisicao(schemaTransacao),
  validarTipo,
  editarTransacao
)

rotas.delete('/transacao/:id', validarTransacao, removerTransacao)

module.exports = rotas
