-- Table: public.role-permissions

-- DROP TABLE IF EXISTS public."role-permissions";

CREATE TABLE IF NOT EXISTS public."role-permissions"
(
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "roleId" integer NOT NULL,
    "permissionId" integer NOT NULL,
    CONSTRAINT "role-permissions_pkey" PRIMARY KEY ("roleId", "permissionId"),
    CONSTRAINT "role-permissions_permissionId_fkey" FOREIGN KEY ("permissionId")
        REFERENCES public.permissions (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "role-permissions_roleId_fkey" FOREIGN KEY ("roleId")
        REFERENCES public.roles (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."role-permissions"
    OWNER to lemurusers_owner;