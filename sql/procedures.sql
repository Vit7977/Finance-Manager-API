USE finance_manager;

-- CONTA / USUARIO ------------------------------

DROP PROCEDURE IF EXISTS conta_create;

DELIMITER //
CREATE PROCEDURE IF NOT EXISTS conta_create(
    IN p_nome VARCHAR(30),
    IN p_email VARCHAR(155),
    IN p_senha VARCHAR(255),
    IN p_data_nasc DATE,
    IN p_cpf VARCHAR(11),
    IN p_saldo DECIMAL(10, 2),
    IN p_tipo VARCHAR(30)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    INSERT INTO usuario(nome, email, senha, data_nasc, cpf) 
    VALUES (p_nome, p_email, p_senha, p_data_nasc, p_cpf);

    SET @user_id = LAST_INSERT_ID();
    SET @account_num = @user_id + 1000;

    INSERT INTO conta(num, usuario, saldo, tipo) 
    VALUES (@account_num, @user_id, p_saldo, p_tipo);

    COMMIT;
END//
DELIMITER ;



DROP PROCEDURE IF EXISTS usuario_update;

DELIMITER //
CREATE PROCEDURE IF NOT EXISTS usuario_update(
    IN p_nome VARCHAR(30),
    IN p_email VARCHAR(155),
    IN p_senha VARCHAR(255),
    IN p_id INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    UPDATE usuario SET nome = p_nome, email = p_email, senha = p_senha
    WHERE id = p_id;

    COMMIT;
END//
DELIMITER ;

-- CATEGORIA / LANCAMENTO ------------------------------

DROP PROCEDURE IF EXISTS lancamento_create;
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS lancamento_create(
    IN p_id_usuario INT,
    IN p_id_conta INT,
    IN p_id_categoria INT,
    IN p_descricao VARCHAR(255),
    IN p_valor DECIMAL(10, 2)
)

BEGIN
    DECLARE v_natureza VARCHAR(20);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

        SELECT natureza INTO v_natureza 
        FROM categoria 
        WHERE id = p_id_categoria;

        INSERT INTO lancamento(usuario, conta, categoria, descricao, valor)
        VALUES (p_id_usuario, p_id_conta, p_id_categoria, p_descricao, p_valor);

        IF v_natureza = "despesa" THEN
            UPDATE conta SET saldo = saldo - p_valor WHERE id = p_id_conta;
        ELSE
            UPDATE conta SET saldo = saldo + p_valor WHERE id = p_id_conta;
        END IF;


    COMMIT;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS lancamento_update;
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS lancamento_update(
    IN p_descricao VARCHAR(255),
    IN p_valor DECIMAL(10, 2),
    IN p_id_lancamento INT,
    IN p_id_conta INT,
    IN p_id_categoria INT
)

BEGIN
    DECLARE v_natureza VARCHAR(20);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    SELECT natureza INTO v_natureza 
    FROM categoria 
    WHERE id = p_id_categoria;

    UPDATE lancamento SET descricao = p_descricao, valor = p_valor 
    WHERE lancamento.id = p_id_lancamento;

    IF v_natureza = "despesa" THEN
        UPDATE conta SET saldo = saldo - p_valor WHERE id = p_id_conta;
    ELSE
        UPDATE conta SET saldo = saldo + p_valor WHERE id = p_id_conta;
    END IF;

    COMMIT;
END//
DELIMITER ;

-- META ------------------------------

DROP PROCEDURE IF EXISTS meta_create;
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS meta_create(
    IN p_id_usuario INT,
    IN p_nome VARCHAR(255),
    IN p_descricao VARCHAR(255),
    IN p_valor_alvo DECIMAL(10, 2),
    IN p_prazo_final DATE
)

BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    INSERT INTO meta(usuario, nome, descricao, valor_alvo, prazo_final)
    VALUES (p_id_usuario, p_nome, p_descricao, p_valor_alvo, p_prazo_final);

    COMMIT;
END//
DELIMITER ;



DROP PROCEDURE IF EXISTS meta_update;
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS meta_update(
    IN p_id_usuario INT,
    IN p_nome VARCHAR(255),
    IN p_descricao VARCHAR(255),
    IN p_valor_alvo DECIMAL(10, 2),
    IN p_prazo_final DATE
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    UPDATE meta SET nome = p_nome, descricao = p_descricao,
    valor_alvo = p_valor_alvo, prazo_final = p_prazo_final;

    COMMIT;
END//
DELIMITER ;