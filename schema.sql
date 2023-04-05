-- PostgreSQL database schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE "open-ics" WITH ENCODING = 'UTF8' LOCALE = 'en_US.UTF8';

CREATE SCHEMA public;

CREATE TYPE public.org_type AS ENUM ('section', 'region', 'district');

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
    ONLY public.organizations
ADD
    CONSTRAINT organizations_pkey PRIMARY KEY (id);

ALTER TABLE
    ONLY public.radio_channels
ADD
    CONSTRAINT radio_channels_pkey PRIMARY KEY (id);

ALTER TABLE
    ONLY public.organizations
ADD
    CONSTRAINT org_parent_fk FOREIGN KEY (parent) REFERENCES public.organizations(id);

ALTER TABLE
    ONLY public.radio_channels
ADD
    CONSTRAINT radio_channel_owner_fk FOREIGN KEY (channel_owner) REFERENCES public.organizations(id);
