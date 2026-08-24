import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import type { SiteConfig } from './types';
import { TemplateSelector } from './templates/TemplateSelector';
import { Globe, AlertCircle, Loader2 } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extrai o slug digitado na barra de endereço (ex: site.com/financeiro -> "financeiro")
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

        // 1. Busca as configurações visuais do site pelo slug
        const { data: siteData, error: siteErr } = await supabase
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

        // 2. Tenta buscar itens/serviços de tabelas comuns caso existam
        try {
          const { data: tableData } = await supabase
            .from('contas')
            .select('*')
            .limit(20);
          
          if (tableData && tableData.length > 0) {
            setItems(tableData);
          }
        } catch {
          // Sem tabela adicional
        }

      } catch (err: any) {
        setError(err.message || 'Erro ao carregar dados da página.');
      } finally {
        setLoading(false);
      }
    };

    fetchLandingPage();
  }, [slug]);

  // Carregamento
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-3">
        <Loader2 size={32} className="animate-spin text-indigo-500" />
        <p className="text-xs font-bold text-slate-400">Carregando Landing Page...</p>
      </div>
    );
  }

  // Raiz sem slug informado (ex: vitrine.vercel.app/)
  if (!slug) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-indigo-600/20 text-indigo-400 rounded-3xl flex items-center justify-center mb-4 border border-indigo-500/30 shadow-lg">
          <Globe size={32} />
        </div>
        <h1 className="text-2xl font-black mb-2">Portal de Landing Pages</h1>
        <p className="text-xs text-slate-400 max-w-sm">
          Acesse diretamente pelo endereço exclusivo da sua empresa para visualizar a página de atendimento.
        </p>
      </div>
    );
  }

  // Página não cadastrada ou erro
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

  // Renderiza o template escolhido
  return <TemplateSelector config={config} items={items} />;
}