import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://zxwkviggbftqiqwnigjn.supabase.co';

export const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'sb_publishable_t2eEV1cMmpdr_4YU_UdBbA_X8_6_WD7';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Estrutura da tabela `leads` (por ordem de importância):
 * id | nome | telemovel | quando_ligar | quando_visitar | mensagem | origem | status | created_at
 */
export interface LeadRecord {
  nome: string;
  telemovel: string;
  quando_ligar?: string | null;
  quando_visitar?: string | null;
  mensagem?: string | null;
  origem?: string;
  status?: string;
}

export async function saveLeadToSupabase(lead: LeadRecord) {
  try {
    const payload = {
      nome: lead.nome,
      telemovel: lead.telemovel,
      quando_ligar: lead.quando_ligar || null,
      quando_visitar: lead.quando_visitar || null,
      mensagem: lead.mensagem || null,
      origem: lead.origem || 'Dossier Terreno Quintãs, Aveiro',
      status: lead.status || 'nova',
    };

    // Não usar .select() após o insert para não violar a política RLS (a chave pública só tem permissão de INSERT)
    let { error, status } = await supabase.from('leads').insert([payload]);

    // Fallback: se as colunas novas ainda não existirem (migração SQL por correr), grava sem elas
    // e junta a informação à mensagem para não perder nada.
    if (error && /quando_ligar|quando_visitar|column/i.test(error.message)) {
      console.warn('[Supabase] Colunas quando_ligar/quando_visitar em falta — a gravar no formato antigo. Corra o supabase_schema.sql.');
      const extras = [
        payload.quando_ligar ? `Quando ligar: ${payload.quando_ligar}` : '',
        payload.quando_visitar ? `Quando visitar: ${payload.quando_visitar}` : '',
      ].filter(Boolean).join(' | ');
      const legacyPayload = {
        nome: payload.nome,
        telemovel: payload.telemovel,
        mensagem: [extras, payload.mensagem].filter(Boolean).join(' | ') || null,
        origem: payload.origem,
        status: payload.status,
      };
      const legacy = await supabase.from('leads').insert([legacyPayload]);
      error = legacy.error;
      status = legacy.status;
    }

    if (error) {
      console.warn('[Supabase] Tentativa 1 falhou, a retentar...', error.message);
      // Aguardar 400ms e retentar
      await new Promise((r) => setTimeout(r, 400));
      const retry = await supabase.from('leads').insert([payload]);
      error = retry.error;
      status = retry.status;
    }

    if (error) {
      console.error('[Supabase] Erro ao inserir lead na tabela leads após retry:', error.message, error.code);
      return { success: false, error: error.message };
    }

    console.log('[Supabase] Lead gravada com sucesso na tabela leads! Status HTTP:', status);
    return { success: true, status };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[Supabase] Erro inesperado ao gravar lead:', msg);
    return { success: false, error: msg };
  }
}
