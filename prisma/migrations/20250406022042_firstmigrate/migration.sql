-- CreateTable
CREATE TABLE "Pedal" (
    "pedal_id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "startDateRegistration" DATE NOT NULL,
    "end_date_registration" DATE NOT NULL,
    "additional_infomation" VARCHAR(100),
    "start_place" VARCHAR(100) NOT NULL,
    "participants_limit" INTEGER,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Pedal_pkey" PRIMARY KEY ("pedal_id")
);

-- CreateTable
CREATE TABLE "Inscricao" (
    "rideId" TEXT NOT NULL,
    "pedal_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "subscription_date" DATE NOT NULL,

    CONSTRAINT "Inscricao_pkey" PRIMARY KEY ("rideId")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(40) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Pedal" ADD CONSTRAINT "Pedal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscricao" ADD CONSTRAINT "Inscricao_pedal_id_fkey" FOREIGN KEY ("pedal_id") REFERENCES "Pedal"("pedal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscricao" ADD CONSTRAINT "Inscricao_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
