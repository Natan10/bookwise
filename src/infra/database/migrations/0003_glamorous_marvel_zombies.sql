ALTER TABLE "books" ALTER COLUMN "num_of_pages" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "rate" integer NOT NULL;