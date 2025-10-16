--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

-- Started on 2025-10-09 12:05:50

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 208 (class 1259 OID 34593)
-- Name: carros; Type: TABLE; Schema: public; Owner: vicente
--

CREATE TABLE public.carros (
    email text NOT NULL,
    carro jsonb,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.carros OWNER TO vicente;

--
-- TOC entry 204 (class 1259 OID 34500)
-- Name: clientes; Type: TABLE; Schema: public; Owner: vicente
--

CREATE TABLE public.clientes (
    email character varying(50) NOT NULL,
    nombre character varying(50),
    direccion character varying(100),
    telefono character varying(20),
    password character varying(20) NOT NULL
);


ALTER TABLE public.clientes OWNER TO vicente;

--
-- TOC entry 210 (class 1259 OID 34622)
-- Name: compras; Type: TABLE; Schema: public; Owner: vicente
--

CREATE TABLE public.compras (
    id integer NOT NULL,
    codigoredsys text NOT NULL,
    email text NOT NULL,
    carro jsonb NOT NULL,
    total numeric(10,2) NOT NULL,
    fecha timestamp without time zone DEFAULT now(),
    estado text DEFAULT 'pendiente'::text NOT NULL,
    CONSTRAINT compras_estado_check CHECK ((estado = ANY (ARRAY['pendiente'::text, 'finalizada'::text])))
);


ALTER TABLE public.compras OWNER TO vicente;

--
-- TOC entry 209 (class 1259 OID 34620)
-- Name: compras_id_seq; Type: SEQUENCE; Schema: public; Owner: vicente
--

CREATE SEQUENCE public.compras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.compras_id_seq OWNER TO vicente;

--
-- TOC entry 2880 (class 0 OID 0)
-- Dependencies: 209
-- Name: compras_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vicente
--

ALTER SEQUENCE public.compras_id_seq OWNED BY public.compras.id;


--
-- TOC entry 207 (class 1259 OID 34532)
-- Name: pedidos; Type: TABLE; Schema: public; Owner: vicente
--

CREATE TABLE public.pedidos (
    id integer NOT NULL,
    cliente_email character varying(50) NOT NULL,
    producto_id integer NOT NULL,
    cantidad integer DEFAULT 1 NOT NULL,
    fecha_pedido timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estado character varying(15) NOT NULL,
    direccionenvio character varying(50) NOT NULL
);


ALTER TABLE public.pedidos OWNER TO vicente;

--
-- TOC entry 205 (class 1259 OID 34528)
-- Name: pedidos_id_seq; Type: SEQUENCE; Schema: public; Owner: vicente
--

CREATE SEQUENCE public.pedidos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pedidos_id_seq OWNER TO vicente;

--
-- TOC entry 2881 (class 0 OID 0)
-- Dependencies: 205
-- Name: pedidos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vicente
--

ALTER SEQUENCE public.pedidos_id_seq OWNED BY public.pedidos.id;


--
-- TOC entry 206 (class 1259 OID 34530)
-- Name: pedidos_producto_id_seq; Type: SEQUENCE; Schema: public; Owner: vicente
--

CREATE SEQUENCE public.pedidos_producto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pedidos_producto_id_seq OWNER TO vicente;

--
-- TOC entry 2882 (class 0 OID 0)
-- Dependencies: 206
-- Name: pedidos_producto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vicente
--

ALTER SEQUENCE public.pedidos_producto_id_seq OWNED BY public.pedidos.producto_id;


--
-- TOC entry 203 (class 1259 OID 34485)
-- Name: productos; Type: TABLE; Schema: public; Owner: vicente
--

CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL,
    stock integer DEFAULT 0,
    imagen character varying(50),
    categoria character varying(20) NOT NULL,
    destacado boolean DEFAULT false
);


ALTER TABLE public.productos OWNER TO vicente;

--
-- TOC entry 202 (class 1259 OID 34483)
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: vicente
--

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productos_id_seq OWNER TO vicente;

--
-- TOC entry 2883 (class 0 OID 0)
-- Dependencies: 202
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vicente
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;


--
-- TOC entry 2720 (class 2604 OID 34625)
-- Name: compras id; Type: DEFAULT; Schema: public; Owner: vicente
--

ALTER TABLE ONLY public.compras ALTER COLUMN id SET DEFAULT nextval('public.compras_id_seq'::regclass);


--
-- TOC entry 2715 (class 2604 OID 34535)
-- Name: pedidos id; Type: DEFAULT; Schema: public; Owner: vicente
--

ALTER TABLE ONLY public.pedidos ALTER COLUMN id SET DEFAULT nextval('public.pedidos_id_seq'::regclass);


--
-- TOC entry 2716 (class 2604 OID 34536)
-- Name: pedidos producto_id; Type: DEFAULT; Schema: public; Owner: vicente
--

ALTER TABLE ONLY public.pedidos ALTER COLUMN producto_id SET DEFAULT nextval('public.pedidos_producto_id_seq'::regclass);


--
-- TOC entry 2712 (class 2604 OID 34488)
-- Name: productos id; Type: DEFAULT; Schema: public; Owner: vicente
--

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);


--
-- TOC entry 2872 (class 0 OID 34593)
-- Dependencies: 208
-- Data for Name: carros; Type: TABLE DATA; Schema: public; Owner: vicente
--

COPY public.carros (email, carro, fecha) FROM stdin;
vcontrerasalcu@gmail.com	[]	2025-08-07 11:42:06.727702
\.


--
-- TOC entry 2868 (class 0 OID 34500)
-- Dependencies: 204
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: vicente
--

COPY public.clientes (email, nombre, direccion, telefono, password) FROM stdin;
vcontrerasalcu@gmail.com	Vicente Contreras	\N	\N	user
\.


--
-- TOC entry 2874 (class 0 OID 34622)
-- Dependencies: 210
-- Data for Name: compras; Type: TABLE DATA; Schema: public; Owner: vicente
--

COPY public.compras (id, codigoredsys, email, carro, total, fecha, estado) FROM stdin;
\.


--
-- TOC entry 2871 (class 0 OID 34532)
-- Dependencies: 207
-- Data for Name: pedidos; Type: TABLE DATA; Schema: public; Owner: vicente
--

COPY public.pedidos (id, cliente_email, producto_id, cantidad, fecha_pedido, estado, direccionenvio) FROM stdin;
\.


--
-- TOC entry 2867 (class 0 OID 34485)
-- Dependencies: 203
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: vicente
--

COPY public.productos (id, nombre, descripcion, precio, stock, imagen, categoria, destacado) FROM stdin;
7	Ergonomic Steel Table	The sleek and little Shirt comes with plum LED lighting for smart functionality	720.95	20	http://localhost:3001/images/imagen1.jpg	ropa	f
6	Small Granite Shirt	Discover the parrot-like agility of our Shoes, perfect for simplistic users	808.21	36	http://localhost:3001/images/imagen1.jpg	hogar	f
10	Generic Cotton Tuna	Our shark-friendly Gloves ensures ornery comfort for your pets	164.59	12	http://localhost:3001/images/imagen2.jpg	hogar	f
3	Awesome Marble Hat	New blue Fish with ergonomic design for paltry comfort	850.10	41	http://localhost:3001/images/imagen4.jpg	electronica	f
8	Intelligent Granite Bike	New black Pants with ergonomic design for regal comfort	980.02	2	http://localhost:3001/images/imagen2.jpg	hogar	f
4	Small Granite Gloves	Ergonomic Shoes made with Marble for all-day corny support	418.89	2	http://localhost:3001/images/imagen2.jpg	ropa	f
5	Intelligent Steel Fish	The white Chicken combines Taiwan aesthetics with Nitrogen-based durability	762.19	15	http://localhost:3001/images/imagen3.jpg	juguetes	f
9	Unbranded Steel Cheese	Professional-grade Car perfect for small training and recreational use	987.89	35	http://localhost:3001/images/imagen4.jpg	ropa	f
20	Bespoke Bamboo Cheese	Handcrafted Salad designed with Cotton for snoopy performance	241.69	40	http://localhost:3001/images/imagen1.jpg	juguetes	f
25	Oriental Steel Table	The Fully-configurable eco-centric adapter Gloves offers reliable performance and amused design	165.10	36	http://localhost:3001/images/imagen3.jpg	juguetes	f
27	Rustic Rubber Pizza	The sleek and cuddly Chicken comes with tan LED lighting for smart functionality	351.60	81	http://localhost:3001/images/imagen4.jpg	electronica	\N
17	Rustic Marble Chair	The sleek and yellow Tuna comes with fuchsia LED lighting for smart functionality	981.50	10	http://localhost:3001/images/imagen2.jpg	ropa	f
22	Rustic Steel Hat	The maroon Towels combines El Salvador aesthetics with Lead-based durability	623.89	52	http://localhost:3001/images/imagen2.jpg	ropa	f
19	Awesome Bamboo Ball	Introducing the Sierra Leone-inspired Hat, blending gripping style with local craftsmanship	741.89	31	http://localhost:3001/images/imagen4.jpg	juguetes	t
14	Ergonomic Gold Chips	The fuchsia Bacon combines Reunion aesthetics with Terbium-based durability	829.15	58	http://localhost:3001/images/imagen1.jpg	juguetes	\N
21	Ergonomic Gold Chips	Professional-grade Fish perfect for old training and recreational use	627.19	14	http://localhost:3001/images/imagen1.jpg	juguetes	f
16	Unbranded Granite Shoes	New Chips model with 71 GB RAM, 113 GB storage, and worthless features	376.12	1	http://localhost:3001/images/imagen4.jpg	electronica	f
28	Practical Bamboo Gloves	The Public-key zero trust moratorium Salad offers reliable performance and dapper design	444.40	11	http://localhost:3001/images/imagen4.jpg	ropa	f
23	Oriental Marble Computer	Experience the mint green brilliance of our Keyboard, perfect for grown environments	928.25	71	http://localhost:3001/images/imagen4.jpg	juguetes	\N
24	Frozen Wooden Ball	Our crispy-inspired Chicken brings a taste of luxury to your stale lifestyle	609.30	49	http://localhost:3001/images/imagen2.jpg	electronica	f
11	Refined Rubber Car	Soft Table designed with Rubber for palatable performance	117.25	28	http://localhost:3001/images/imagen4.jpg	hogar	f
13	Elegant Aluminum Fish	Introducing the Democratic Republic of the Congo-inspired Pizza, blending finished style with local craftsmanship	207.19	70	http://localhost:3001/images/imagen4.jpg	hogar	f
12	Tasty Aluminum Pants	Our fluffy-inspired Fish brings a taste of luxury to your marvelous lifestyle	362.20	60	http://localhost:3001/images/imagen1.jpg	ropa	f
15	Incredible Aluminum Chair	Discover the dolphin-like agility of our Cheese, perfect for spanish users	487.79	54	http://localhost:3001/images/imagen2.jpg	electronica	f
26	Sleek Metal Computer	Discover the spotless new Car with an exciting mix of Rubber ingredients	906.05	72	http://localhost:3001/images/imagen4.jpg	ropa	f
18	Licensed Marble Hat	The sleek and lustrous Salad comes with yellow LED lighting for smart functionality	209.69	30	http://localhost:3001/images/imagen3.jpg	juguetes	f
33	Luxurious Plastic Hat	Stylish Sausages designed to make you stand out with well-off looks	396.95	31	http://localhost:3001/images/imagen4.jpg	electronica	f
34	Licensed Bamboo Salad	Discover the zebra-like agility of our Fish, perfect for well-to-do users	847.55	6	http://localhost:3001/images/imagen3.jpg	electronica	f
29	Fantastic Bronze Salad	Savor the sour essence in our Pants, designed for magnificent culinary adventures	821.39	18	http://localhost:3001/images/imagen3.jpg	ropa	f
1	Luxurious Metal Sausages	The Deshawn Shirt is the latest in a series of exalted products from Bauch Inc	753.49	65	http://localhost:3001/images/imagen1.jpg	juguetes	f
32	Soft Silk Bike	Our cow-friendly Pizza ensures rewarding comfort for your pets	883.35	88	http://localhost:3001/images/imagen3.jpg	juguetes	f
35	Awesome Metal Soap	New olive Salad with ergonomic design for wealthy comfort	28.39	74	http://localhost:3001/images/imagen4.jpg	hogar	f
31	Bespoke Silk Shirt	Introducing the Ireland-inspired Pants, blending rapid style with local craftsmanship	86.05	82	http://localhost:3001/images/imagen1.jpg	juguetes	t
2	Oriental Gold Chair	Discover the wry new Sausages with an exciting mix of Steel ingredients	141.04	95	http://localhost:3001/images/imagen2.jpg	electronica	t
30	Intelligent Bamboo Chair	Experience the lavender brilliance of our Bike, perfect for talkative environments	551.75	91	http://localhost:3001/images/imagen1.jpg	ropa	f
\.


--
-- TOC entry 2884 (class 0 OID 0)
-- Dependencies: 209
-- Name: compras_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vicente
--

SELECT pg_catalog.setval('public.compras_id_seq', 113, true);


--
-- TOC entry 2885 (class 0 OID 0)
-- Dependencies: 205
-- Name: pedidos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vicente
--

SELECT pg_catalog.setval('public.pedidos_id_seq', 1, false);


--
-- TOC entry 2886 (class 0 OID 0)
-- Dependencies: 206
-- Name: pedidos_producto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vicente
--

SELECT pg_catalog.setval('public.pedidos_producto_id_seq', 1, false);


--
-- TOC entry 2887 (class 0 OID 0)
-- Dependencies: 202
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vicente
--

SELECT pg_catalog.setval('public.productos_id_seq', 35, true);


--
-- TOC entry 2731 (class 2606 OID 34600)
-- Name: carros carros_pkey; Type: CONSTRAINT; Schema: public; Owner: vicente
--

ALTER TABLE ONLY public.carros
    ADD CONSTRAINT carros_pkey PRIMARY KEY (email);


--
-- TOC entry 2727 (class 2606 OID 34504)
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: vicente
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (email);


--
-- TOC entry 2733 (class 2606 OID 34633)
-- Name: compras compras_codigo_redsys_key; Type: CONSTRAINT; Schema: public; Owner: vicente
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_codigo_redsys_key UNIQUE (codigoredsys);


--
-- TOC entry 2735 (class 2606 OID 34631)
-- Name: compras compras_pkey; Type: CONSTRAINT; Schema: public; Owner: vicente
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_pkey PRIMARY KEY (id);


--
-- TOC entry 2729 (class 2606 OID 34540)
-- Name: pedidos pedidos_pkey; Type: CONSTRAINT; Schema: public; Owner: vicente
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id);


--
-- TOC entry 2725 (class 2606 OID 34494)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: vicente
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- TOC entry 2738 (class 2606 OID 34601)
-- Name: carros carros_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vicente
--

ALTER TABLE ONLY public.carros
    ADD CONSTRAINT carros_email_fkey FOREIGN KEY (email) REFERENCES public.clientes(email) ON DELETE CASCADE;


--
-- TOC entry 2739 (class 2606 OID 34634)
-- Name: compras compras_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vicente
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_email_fkey FOREIGN KEY (email) REFERENCES public.clientes(email) ON DELETE CASCADE;


--
-- TOC entry 2736 (class 2606 OID 34541)
-- Name: pedidos pedidos_cliente_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vicente
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_cliente_email_fkey FOREIGN KEY (cliente_email) REFERENCES public.clientes(email);


--
-- TOC entry 2737 (class 2606 OID 34546)
-- Name: pedidos pedidos_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vicente
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.productos(id);


-- Completed on 2025-10-09 12:05:51

--
-- PostgreSQL database dump complete
--

