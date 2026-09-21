import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zxwkviggbftqiqwnigjn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_t2eEV1cMmpdr_4YU_UdBbA_X8_6_WD7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Lead {
    nome: string;
    telefone: string;
    prazo: string;
    valor: string;
}

export async function insertLead(lead: Lead) {
    const { data, error } = await supabase.from('leads').insert([lead]).select();
    if (error) throw error;
    return data;
}
