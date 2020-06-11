Drop table if exists public.resources; 
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
  "edited" boolean DEFAULT false, 
  "last_updated" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
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
  "user_name" varchar UNIQUE NOT NULL,
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


-- POPULATE RESOURCES TABLE

-- to add a resource: 
-- INSERT INTO resources (name, url, likes, description, tech) VALUES ('React Official Docs', 'www.IloveReact.com', 50, 'The docs for React', 'react');

-- =============  COMMENTS QUERIES =============
-- to delete a comment: 
-- DELETE FROM comments WHERE _id = someId; 

-- to add a comment:
-- INSERT INTO comments (body, user_id, resource_id) VALUES ('I am Matt!', 1, 1); 

-- GET REQUEST FOR COMMENTS -- JOIN COMMENTS WITH USERS INFORMATION
-- SELECT comments.*, users.user_name, users.icon FROM comments JOIN users ON comments.user_id = users._id WHERE comments.resource_id = 2;

-- STRETCH: update comments
-- UPDATE comments SET body = 'New Comment', last_updated = CURRENT_TIMESTAMP, edited = true  WHERE _id = 3; 

--  ======== LIKE QUERIES ================

-- WANT TO NEUTRAL TO LIKED, AND SEE OVERALL LIKE COUNT GO UP BY ONE
-- TRANSACTION ("Neutral to Liked")
-- BEGIN; INSERT INTO likes (liked, resource_id, user_id) VALUES (true, 3, 3); UPDATE resources SET likes = likes + 1 WHERE _id = 3; COMMIT; 

-- WANT TO GO FROM LIKED TO NEUTRAL, AND SEE OVERALL LIKE COUNT GO DOWN BY ONE
-- TRANSACTION ("Neutral to Liked")
-- BEGIN;
-- DELETE FROM likes WHERE resource_id = 3 AND user_id = 3;
-- UPDATE resources SET likes = likes - 1 WHERE _id = 3;
-- COMMIT; 

-- WANT TO GO FROM NEUTRAL TO DISLIKED, AND SEE OVERALL LIKE COUNT GO DOWN BY ONE
-- BEGIN; INSERT INTO likes (liked, resource_id, user_id) VALUES (false, 3, 3); UPDATE resources SET likes = likes - 1 WHERE _id = 3; COMMIT; 

-- WANT TO GO FROM DISLIKED TO NEUTRAL, AND SEE OVERALL LIKE COUNT GO UP BY ONE
-- BEGIN;
-- DELETE FROM likes WHERE resource_id = 3 AND user_id = 3;
-- UPDATE resources SET likes = likes + 1 WHERE _id = 3;
-- COMMIT; 

-- Depending on whether user has liked or disliked a resource, the front end must send either one of these two queries 

-- ================ JOINS/delivering GET request ===============

-- to get ALL resources of a particular topic, ordered by likes (descending), and with user-specific info on what they like, dislike, or are neutral about
-- SELECT resources.*, likes.liked FROM resources  LEFT JOIN likes ON resources._id = likes.resource_id AND likes.user_id = 3 WHERE resources.tech = 'javascript' ORDER BY likes DESC;

