-- PostgreSQL database schema
CREATE DATABASE "open-ics" WITH ENCODING = 'UTF8' LOCALE = 'en_US.UTF8';

CREATE SCHEMA public;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

CREATE TYPE public.org_type AS ENUM ('section', 'region', 'district');

CREATE TABLE public."f217a_page_channels" (
    page_id uuid NOT NULL,
    channel_id uuid NOT NULL,
    "order" smallint
);

CREATE TABLE public."f217a_pages" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    page_owner uuid NOT NULL,
    frequency_band character varying NOT NULL
);

CREATE TABLE public.organizations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    type public.org_type NOT NULL,
    parent uuid
);

CREATE TABLE public.radio_channels (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    channel_owner uuid NOT NULL,
    name character varying NOT NULL,
    eligible_users character varying,
    rx_freq double precision,
    rx_width character(1),
    rx_tone character varying,
    tx_freq double precision,
    tx_width character(1),
    tx_tone character varying,
    mode character varying,
    remarks character varying,
    config character varying
);

ALTER TABLE
    ONLY public."f217a_page_channels"
ADD
    CONSTRAINT "f217a_page_channels_pk" PRIMARY KEY (page_id, channel_id);

ALTER TABLE
    ONLY public."f217a_pages"
ADD
    CONSTRAINT "f217a_pages_pk" PRIMARY KEY (id);

ALTER TABLE
    ONLY public.organizations
ADD
    CONSTRAINT organizations_pk PRIMARY KEY (id);

ALTER TABLE
    ONLY public.radio_channels
ADD
    CONSTRAINT radio_channels_pk PRIMARY KEY (id);

ALTER TABLE
    ONLY public."f217a_page_channels"
ADD
    CONSTRAINT "f217a_page_channels_page_FK" FOREIGN KEY (page_id) REFERENCES public."f217a_pages"(id);

ALTER TABLE
    ONLY public."f217a_page_channels"
ADD
    CONSTRAINT "f217a_page_channels_channel_FK" FOREIGN KEY (channel_id) REFERENCES public.radio_channels(id);

ALTER TABLE
    ONLY public."f217a_pages"
ADD
    CONSTRAINT "f217a_page_owner_FK" FOREIGN KEY (page_owner) REFERENCES public.organizations(id);

ALTER TABLE
    ONLY public.organizations
ADD
    CONSTRAINT org_parent_fk FOREIGN KEY (parent) REFERENCES public.organizations(id);

ALTER TABLE
    ONLY public.radio_channels
ADD
    CONSTRAINT radio_channel_owner_fk FOREIGN KEY (channel_owner) REFERENCES public.organizations(id);
