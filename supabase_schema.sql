-- =========================================================================
-- SUPABASE SCHEMA — WEB DOSSIER TERRENOS QUINTÃS
-- Projeto: zxwkviggbftqiqwnigjn
-- Execute este script no SQL Editor do seu Supabase Dashboard:
-- https://supabase.com/dashboard/project/zxwkviggbftqiqwnigjn/sql/new
-- =========================================================================

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    nome TEXT NOT NULL,
    telemovel TEXT NOT NULL,
    origem TEXT DEFAULT 'Dossier Terreno Quintãs, Aveiro',
    mensagem TEXT,
    status TEXT DEFAULT 'nova'
);

-- Ativar Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Política de Inserção Pública (permite que o formulário da landing page envie leads)
CREATE POLICY "Permitir inserção anónima de leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Política de Leitura Apenas para Utilizadores Autenticados / Painel
CREATE POLICY "Permitir leitura apenas a administradores"
ON public.leads
FOR SELECT
TO authenticated, service_role
USING (true);

-- Índices de performance para organização das leads
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
