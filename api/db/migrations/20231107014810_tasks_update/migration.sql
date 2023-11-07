-- AlterTable
CREATE SEQUENCE tasks_id_seq;
ALTER TABLE "Tasks" ALTER COLUMN "id" SET DEFAULT nextval('tasks_id_seq');
ALTER SEQUENCE tasks_id_seq OWNED BY "Tasks"."id";
