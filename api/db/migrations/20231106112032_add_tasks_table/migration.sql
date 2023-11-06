-- CreateTable
CREATE TABLE "Tasks" (
    "id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "taskList" JSONB NOT NULL DEFAULT '{"Top Priority": [],"Important": [],"Other": []}',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
