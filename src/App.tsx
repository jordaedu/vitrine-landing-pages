import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabase as centralSupabase } from './supabaseClient';
import type { SiteConfig } from './types';
import { TemplateSelector } from './templates/TemplateSelector';
import { Globe, AlertCircle, Loader2 } from 'lucide-react';

// Mapeamento direto de credenciais por slug caso a tabela central_tenants não esteja disponível
const TENANT_CREDENTIALS_MAP: Record<string, { url: string; anonKey: string }> = {
  onb: {
    url: 'https://cfojhfsfpjennfaijuys.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmb2poZnNmcGplbm5mYWlqdXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODE2NzIsImV4cCI6MjA3NTk1NzY3Mn0.Y-nI_gn-QacT8BECYoMpZkCA6DKQQhG1ujKiTW2pwv4'
  }
};

export default function App() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const slug = path.split('/')[0] || '';

  useEffect(() => {
    const fetchLandingPage = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // 1. Busca configurações visuais no banco central
        const { data: siteData, error: siteErr } = await centralSupabase
          .from('site_config')
          .select('*')
          .eq('slug', slug.toLowerCase())
          .maybeSingle();

        if (siteErr) throw siteErr;

        if (!siteData) {
          setError(`A Landing Page "${slug}" não foi encontrada.`);
          setLoading(false);
          return;
        }

        setConfig(siteData as SiteConfig);

        // 2. Conexão com o banco do tenant
        let tenantClient = centralSupabase;
        const normalizedSlug = slug.toLowerCase();

        if (TENANT_CREDENTIALS_MAP[normalizedSlug]) {
          tenantClient = createClient(
            TENANT_CREDENTIALS_MAP[normalizedSlug].url,
            TENANT_CREDENTIALS_MAP[normalizedSlug].anonKey
          );
        } else {
          try {
            const { data: tenantData } = await centralSupabase
              .from('central_tenants')
              .select('*')
              .eq('slug', normalizedSlug)
              .maybeSingle();

            if (tenantData?.supabase_url && tenantData?.supabase_anon_key) {
              tenantClient = createClient(tenantData.supabase_url, tenantData.supabase_anon_key);
            }
          } catch (e) {
            console.warn('[Vitrine] Falha ao consultar central_tenants, usando central como fallback.');
          }
        }

        // 3. Busca produtos/cursos na base correta do tenant
        const potentialTables = ['cursos', 'pacotes', 'produtos', 'contas', 'products'];
        let loadedItems: any[] = [];

        for (const table of potentialTables) {
          try {
            const { data, error: tableErr } = await tenantClient.from(table).select('*').limit(40);
            if (!tableErr && data && data.length > 0) {
              console.log(`[Vitrine] ${data.length} itens carregados com sucesso da tabela "${table}".`);
              loadedItems = data;
              break;
            }
          } catch {
            // Continua para a próxima tentativa
          }
        }

        // Fallback: se as tabelas estiverem vazias, usa o services_json cadastrado
        if (loadedItems.length === 0 && siteData.services_json && Array.isArray(siteData.services_json)) {
          loadedItems = siteData.services_json;
        }

        setItems(loadedItems);
      } catch (err: any) {
        console.error('[Vitrine] Erro geral:', err);
        setError(err.message || 'Erro ao carregar dados da página.');
      } finally {
        setLoading(false);
      }
    };

    fetchLandingPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-3">
        <Loader2 size={32} className="animate-spin text-indigo-500" />
        <p className="text-xs font-bold text-slate-400">Carregando Landing Page...</p>
      </div>
    );
  }

  if (!slug) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-indigo-600/20 text-indigo-400 rounded-3xl flex items-center justify-center mb-4 border border-indigo-500/30 shadow-lg">
          <Globe size={32} />
        </div>
        <h1 className="text-2xl font-black mb-2">Portal de Landing Pages</h1>
        <p className="text-xs text-slate-400 max-w-sm">
          Acesse diretamente pelo endereço exclusivo da sua empresa (ex: /onb).
        </p>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center space-y-3">
        <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center border border-rose-500/30">
          <AlertCircle size={24} />
        </div>
        <h2 className="text-lg font-black">{error || 'Página Indisponível'}</h2>
        <p className="text-xs text-slate-400">Verifique se a URL foi digitada corretamente.</p>
      </div>
    );
  }

  return <TemplateSelector config={config} items={items} />;
}