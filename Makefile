CONTAINER=mysqldb
DB_USER=root
DB_PASS=root
DB_NAME=finance_manager

SCHEMA=./sql/schema.sql
PROCEDURES=./sql/procedures.sql
TRIGGERS=./sql/triggers.sql

reset-db:
	docker exec -i $(CONTAINER) mysql -u $(DB_USER) -p$(DB_PASS) < $(SCHEMA)
	docker exec -i $(CONTAINER) mysql -u $(DB_USER) -p$(DB_PASS) $(DB_NAME) < $(PROCEDURES)
	docker exec -i $(CONTAINER) mysql -u $(DB_USER) -p$(DB_PASS) $(DB_NAME) < $(TRIGGERS)

up:
	docker compose up -d

down:
	docker compose down -v

restart: down up 