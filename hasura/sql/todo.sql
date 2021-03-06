-- Table: public.todo
-- DROP TABLE public.todo;
CREATE TABLE public.todo (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  "desc" text COLLATE pg_catalog."default" NOT NULL,
  is_complete boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT todo_pkey PRIMARY KEY (id),
  CONSTRAINT todo_created_by_fkey FOREIGN KEY (created_by) REFERENCES public."user" (id) MATCH SIMPLE ON UPDATE RESTRICT ON DELETE RESTRICT
) WITH (OIDS = FALSE) TABLESPACE pg_default;
ALTER TABLE public.todo OWNER to genesis;
COMMENT ON TABLE public.todo IS 'Lets do it';
-- Trigger: set_public_todo_updated_at
  -- DROP TRIGGER set_public_todo_updated_at ON public.todo;
  CREATE TRIGGER set_public_todo_updated_at BEFORE
UPDATE ON public.todo FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_todo_updated_at ON public.todo IS 'trigger to set value of column "updated_at" to current timestamp on row update';