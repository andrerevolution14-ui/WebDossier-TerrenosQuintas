import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://zxwkviggbftqiqwnigjn.supabase.co';

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'sb_publishable_t2eEV1cMmpdr_4YU_UdBbA_X8_6_WD7';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface LeadRecord {
  nome: string;
  telemovel: string;
  origem?: string;
  mensagem?: string;
  created_at?: string;
}

export async function saveLeadToSupabase(lead: LeadRecord) {
  try {
    const payload = {
      nome: lead.nome,
      telemovel: lead.telemovel,
      origem: lead.origem || 'Dossier Terreno Quintãs, Aveiro',
      mensagem: lead.mensagem || null,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from('leads').insert([payload]).select();

    if (error) {
      console.warn('[Supabase] Warning ao inserir lead na tabela leads:', error.message);
      return { success: false, error: error.message };
    }

    console.log('[Supabase] Lead gravada com sucesso na tabela leads:', data);
    return { success: true, data };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[Supabase] Erro inesperado ao gravar lead:', msg);
    return { success: false, error: msg };
  }
}
