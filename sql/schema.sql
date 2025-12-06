DROP DATABASE IF EXISTS finance_manager;
CREATE DATABASE IF NOT EXISTS finance_manager;

USE finance_manager;

DROP TABLE IF EXISTS usuario;
CREATE TABLE IF NOT EXISTS usuario(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(30),
    email VARCHAR(155),
    senha VARCHAR(255),
    data_nasc DATE,
    cpf VARCHAR(11) UNIQUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



DROP TABLE IF EXISTS conta;
CREATE TABLE IF NOT EXISTS conta(
    num INT UNSIGNED PRIMARY KEY NOT NULL,
    usuario INT UNSIGNED,
    saldo DECIMAL(10, 2) DEFAULT 0,
    status ENUM("ativa", "inativa") DEFAULT "ativa",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario) REFERENCES usuario(id)
);



DROP TABLE IF EXISTS categoria;
CREATE TABLE IF NOT EXISTS categoria(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(255),
    natureza ENUM("despesa", "faturamento")
);



DROP TABLE IF EXISTS lancamento;
CREATE TABLE IF NOT EXISTS lancamento(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    usuario INT UNSIGNED NOT NULL,
    conta INT UNSIGNED NOT NULL,
    categoria INT UNSIGNED NOT NULL,
    descricao VARCHAR(255),
    valor DECIMAL(10, 2) NOT NULL,
    tipo ENUM("dinheiro", "credito","debito", "PIX") NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario) REFERENCES usuario(id),
    FOREIGN KEY (conta) REFERENCES conta(num),
    FOREIGN KEY (categoria) REFERENCES categoria(id)
);



DROP TABLE IF EXISTS meta;
CREATE TABLE IF NOT EXISTS meta(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    usuario INT UNSIGNED,
    nome VARCHAR(255),
    descricao VARCHAR(255) NULL,
    valor_alvo DECIMAL(10, 2),
    prazo_final DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario) REFERENCES usuario(id)
);

INSERT INTO categoria (nome, natureza) VALUES 
("Alimentacao", "despesa"),
("Transporte", "despesa"),
("Saude", "despesa"),
("Educacao", "despesa"),
("Moradia", "despesa"),
("Lazer", "despesa"),
("Salario", "faturamento"),
("Freelance", "faturamento"),
("Investimentos", "faturamento"),
("Outros", "despesa"),
("Outros", "faturamento");

INSERT INTO usuario (nome, email, senha, cpf) VALUES ("Jeferson", "jeferson123@gmail.com", "1234", 12345678910);