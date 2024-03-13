-- Table: public.permissions

-- DROP TABLE IF EXISTS public.permissions;

CREATE TABLE IF NOT EXISTS public.permissions
(
 id SERIAL PRIMARY KEY,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT permissions_name_key UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE public.permissions
    OWNER to postgres;