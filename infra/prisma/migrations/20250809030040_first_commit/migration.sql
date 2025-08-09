-- CreateTable
CREATE TABLE "public"."Pedal" (
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
CREATE TABLE "public"."Enrollment" (
    "rideId" TEXT NOT NULL,
    "pedal_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "subscription_date" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("rideId")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "user_id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Pedal" ADD CONSTRAINT "Pedal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Enrollment" ADD CONSTRAINT "Enrollment_pedal_id_fkey" FOREIGN KEY ("pedal_id") REFERENCES "public"."Pedal"("pedal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Enrollment" ADD CONSTRAINT "Enrollment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
