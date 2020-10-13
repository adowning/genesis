--
-- pg_dump -h localhost -p 5432 -U genesis -F p -v -t user --schema-only genesis
--
SET
  statement_timeout = 0;
SET
  lock_timeout = 0;
SET
  idle_in_transaction_session_timeout = 0;
SET
  client_encoding = 'UTF8';
SET
  standard_conforming_strings = on;
SET
  check_function_bodies = false;
SET
  client_min_messages = warning;
SET
  row_security = off;
SET
  default_tablespace = '';
SET
  default_with_oids = false;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
  -- Name: user; Type: TABLE; Schema: public; Owner: genesis
  --
  CREATE TABLE public."user" (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    username text,
    email text NOT NULL,
    password text NULL,
    phone text,
    google_id text,
    facebook_id text,
    twitter_id text,
    github_id text,
    image_url text,
    role text DEFAULT 'user',
    token_version INTEGER,
    status text DEFAULT 'verification' :: text NOT NULL,
    last_login_at timestamp with time zone,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
  );
ALTER TABLE public. "user" OWNER TO genesis;
--
  -- Name: user PK_user_id; Type: CONSTRAINT; Schema: public; Owner: genesis
  --
ALTER TABLE ONLY public."user"
ADD
  CONSTRAINT "PK_user_id" PRIMARY KEY (id);
--
  -- Name: user UQ_google_id; Type: CONSTRAINT; Schema: public; Owner: genesis
  --
ALTER TABLE ONLY public."user"
ADD
  CONSTRAINT "UQ_google_id" UNIQUE ("google_id");
--
  -- Name: user UQ_github_id; Type: CONSTRAINT; Schema: public; Owner: genesis
  --
ALTER TABLE ONLY public."user"
ADD
  CONSTRAINT "UQ_github_id" UNIQUE ("github_id");
--
  -- Name: user UQ_facebook_id; Type: CONSTRAINT; Schema: public; Owner: genesis
  --
ALTER TABLE ONLY public."user"
ADD
  CONSTRAINT "UQ_facebook_id" UNIQUE ("facebook_id");
--
  -- Name: user UQ_user_phone; Type: CONSTRAINT; Schema: public; Owner: genesis
  --
ALTER TABLE ONLY public."user"
ADD
  CONSTRAINT "UQ_user_phone" UNIQUE (phone);
--
  -- Name: user UQ_user_username; Type: CONSTRAINT; Schema: public; Owner: genesis
  --
ALTER TABLE ONLY public."user"
ADD
  CONSTRAINT "UQ_user_username" UNIQUE (username);
--
  -- Name: user UQ_user_email; Type: CONSTRAINT; Schema: public; Owner: genesis
  --
ALTER TABLE ONLY public."user"
ADD
  CONSTRAINT "UQ_user_email" UNIQUE (email);
--
  -- Name: user UQ_twitter_id; Type: CONSTRAINT; Schema: public; Owner: genesis
  --
ALTER TABLE ONLY public."user"
ADD
  CONSTRAINT "UQ_twitter_id" UNIQUE ("twitter_id");
--
  -- Name: user_email_key; Type: INDEX; Schema: public; Owner: genesis
  --
  CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);
--
  -- Name: user_facebook_id_key; Type: INDEX; Schema: public; Owner: genesis
  --
  CREATE UNIQUE INDEX "user_facebook_id_key" ON public."user" USING btree ("facebook_id");
--
  -- Name: user_github_id_key; Type: INDEX; Schema: public; Owner: genesis
  --
  CREATE UNIQUE INDEX "user_github_id_key" ON public."user" USING btree ("github_id");
--
  -- Name: user_google_id_key; Type: INDEX; Schema: public; Owner: genesis
  --
  CREATE UNIQUE INDEX "user_google_id_key" ON public."user" USING btree ("google_id");
--
  -- Name: user_phone_key; Type: INDEX; Schema: public; Owner: genesis
  --
  CREATE UNIQUE INDEX user_phone_key ON public."user" USING btree (phone);
--
  -- Name: user_twitter_id_key; Type: INDEX; Schema: public; Owner: genesis
  --
  CREATE UNIQUE INDEX "user_twitter_id_key" ON public."user" USING btree ("twitter_id");
--
  -- Name: user_username_key; Type: INDEX; Schema: public; Owner: genesis
  --
  CREATE UNIQUE INDEX user_username_key ON public."user" USING btree (username);