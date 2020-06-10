Drop table if exists public.resources; 
Drop table if exists public.techs; 
Drop table if exists public.comments; 
Drop table if exists public.likes; 
Drop table if exists public.users;

CREATE TABLE public.resources (
  "_id" bigserial NOT NULL,
  "name" varchar NOT NULL,
  "url" varchar NOT NULL,
  "likes" bigint NOT NULL, 
  "tech" varchar NOT NULL,
  "description" varchar NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "resources_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.comments (
  "_id" serial NOT NULL,
  "body" varchar NOT NULL,
  "user_id" bigint NOT NULL,
  "resource_id" bigint NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "comments_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.likes (
  "_id" serial NOT NULL,
  "liked" boolean,
  "resource_id" bigint NOT NULL,
  "user_id" bigint NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "likes_resource_id_user_id" PRIMARY KEY ("resource_id", "user_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.users (
  "_id" bigserial NOT NULL,
  "user_name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "icon" varchar NOT NULL,
  "password" varchar NOT NULL,
  "token" varchar NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE public.comments ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE public.comments ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("resource_id") REFERENCES public.resources("_id");
ALTER TABLE public.likes ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("resource_id") REFERENCES public.resources("_id");
ALTER TABLE public.likes ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("user_id") REFERENCES public.users("_id");

-- POPULATING DATA

-- POPULATE TECHS TABLE
-- INSERT INTO techs (tech) VALUES ('react');
-- INSERT INTO techs (tech) VALUES ('javascript');
-- INSERT INTO techs (tech) VALUES ('puppeteer');
-- INSERT INTO techs (tech) VALUES ('express');
-- INSERT INTO techs (tech) VALUES ('typescript');
-- INSERT INTO techs (tech) VALUES ('enzyme');
-- INSERT INTO techs (tech) VALUES ('jest');
-- INSERT INTO techs (tech) VALUES ('mongodb');
-- INSERT INTO techs (tech) VALUES ('angular');
-- INSERT INTO techs (tech) VALUES ('redux');
-- INSERT INTO techs (tech) VALUES ('vue');
-- INSERT INTO techs (tech) VALUES ('node');

-- POPULATE RESOURCES TABLE

-- to add a resource: 
-- INSERT INTO resources (name, url, likes, description, tech) VALUES ('React Official Docs', 'www.IloveReact.com', 50, 'The docs for React', 'react');

-- to add a comment:
-- INSERT INTO comments (body, user_id, resource_id) VALUES ('I am Matt!', 1, 1); 

--  ======== LIKE QUERIES ================

-- to add a like/dislike from neutral state, or change to like/dislike from disliked state 
-- INSERT INTO likes (liked, resource_id, user_id) 
-- VALUES ($1, 1, 1)
-- ON CONFLICT (resource_id, user_id) 
-- DO UPDATE SET liked = $1;

-- db.query(query, ([true]))


-- to go back to neutral from either like or dislike
-- DELETE FROM likes WHERE resource_id = 1 AND user_id = 1; 

-- Depending on whether user has liked or disliked a resource, the front end must send either one of these two queries 
