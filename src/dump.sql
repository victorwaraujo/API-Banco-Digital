create database dindin;

create  table usuarios (
  id serial primary key,
  nome varchar(255) not null,
  email varchar(255) unique not null,
  senha varchar(255) not null
);

create table categorias (
  id serial primary key, 
  descricao varchar(255) not null
);

create table transacoes (
  id serial primary key,
  descricao varchar(255) not null,
  valor integer not null,
  data date not null,
  categoria_id integer references categorias(id),
  usuario_id integer references usuarios(id),
  tipo varchar (255) not null
);

insert into categorias (descricao)  values
('Alimentacao'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');