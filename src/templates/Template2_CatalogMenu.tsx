import React, { useState } from 'react';
import type { DynamicDataProps } from '../types';
import { ShoppingBag, MessageCircle, Search, Sparkles, Star, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export const Template2_CatalogMenu: React.FC<DynamicDataProps> = ({ config, items = [] }) => {
  const primary = config.primary_color || '#2563eb';
  const [filter, setFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'inicio' | 'catalogo' | 'sobre'>('inicio');

  const whatsappUrl = config.whatsapp_number 
    ? `https://wa.me/${config.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(config.whatsapp_default_message || 'Olá! Gostaria de informações sobre os cursos e serviços.')}`
    : '#';

  const filteredItems = items.filter(item => {
    const title = item.nome || item.name || item.titulo || item.descricao || '';
    return title.toLowerCase().includes(filter.toLowerCase());
  });

  const formatCurrency = (val: any) => {
    const num = Number(val) || 0;
    if (num === 0) return 'Consulte';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('inicio')}>
            {config.logo_url ? (
              <img src={config.logo_url} alt={config.site_title} className="h-11 w-auto object-contain rounded-xl" />
            ) : (
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg" style={{ backgroundColor: primary }}>
                {config.site_title.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <span className="font-black text-lg text-white tracking-tight block leading-tight">{config.site_title}</span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Portal Oficial de Capacitação</span>
            </div>
          </div>

          <nav className="flex items-center gap-1 bg-slate-950/70 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('inicio')}
              className={`px-4 py-2 rounded-xl transition ${activeTab === 'inicio' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Início
            </button>
            <button
              onClick={() => setActiveTab('catalogo')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'catalogo' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <ShoppingBag size={14} /> Catálogo ({items.length})
            </button>
            <button
              onClick={() => setActiveTab('sobre')}
              className={`px-4 py-2 rounded-xl transition ${activeTab === 'sobre' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Sobre
            </button>
          </nav>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            <MessageCircle size={16} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1">
        {activeTab === 'inicio' && (
          <>
            {/* HERO BANNER */}
            <section className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
                    <Sparkles size={14} /> Matrículas Abertas • Metodologia Interativa
                  </div>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                    {config.headline || config.site_title}
                  </h1>
                  <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                    {config.subheadline || 'Aprenda uma nova profissão com método prático, estrutura moderna e foco no mercado de trabalho.'}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                    <button
                      onClick={() => setActiveTab('catalogo')}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-xl shadow-blue-600/20 transition flex items-center justify-center gap-2"
                    >
                      <span>Explorar Cursos ({items.length})</span>
                      <ArrowRight size={17} />
                    </button>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm transition flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={17} />
                      <span>Tirar Dúvidas</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900">
                    <img
                      src={config.banner_url || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80'}
                      alt="Banner Principal"
                      className="w-full h-80 sm:h-96 object-cover"
                    />
                    <div className="p-6 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-black text-white">Certificado Reconhecido</h4>
                        <p className="text-xs text-slate-400">Qualificação comprovada para o currículo</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star size={16} fill="currentColor" />
                        <span className="text-xs font-bold text-white">4.9/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO DE DESTAQUES */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-white">Destaques da Grade</h2>
                  <p className="text-xs text-slate-400 mt-1">Alguns dos treinamentos mais procurados na unidade</p>
                </div>
                <button
                  onClick={() => setActiveTab('catalogo')}
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  Ver Todos ({items.length}) →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.slice(0, 4).map((item, idx) => {
                  const title = item.nome || item.name || item.titulo || `Curso #${idx + 1}`;
                  const desc = item.descricao || item.description || 'Formação com certificado e acompanhamento de instrutor.';
                  const price = item.valor ?? item.preco ?? item.price;
                  const img = item.imagem_url || item.image_url || item.foto || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60';

                  return (
                    <div key={item.id || idx} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-blue-500/40 transition-all shadow-lg">
                      <img src={img} alt={title} className="h-44 w-full object-cover" />
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="font-bold text-white text-base truncate">{title}</h3>
                          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">{desc}</p>
                        </div>
                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                          <span className="text-sm font-black text-white">{formatCurrency(price)}</span>
                          <button onClick={() => setActiveTab('catalogo')} className="text-xs text-blue-400 font-bold hover:underline">
                            Detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {activeTab === 'catalogo' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <h2 className="text-3xl font-black text-white">Catálogo Completo</h2>
                <p className="text-xs text-slate-400 mt-1">Pesquise e matricule-se diretamente pelo WhatsApp</p>
              </div>

              <div className="relative min-w-[280px]">
                <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  placeholder="Filtrar por nome do curso..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="py-20 text-center bg-slate-900/40 rounded-3xl border border-dashed border-slate-800 text-slate-500 text-xs">
                Nenhum item localizado no momento.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item, idx) => {
                  const title = item.nome || item.name || item.titulo || `Curso #${idx + 1}`;
                  const desc = item.descricao || item.description || 'Treinamento completo com material incluso.';
                  const price = item.valor ?? item.preco ?? item.price;
                  const img = item.imagem_url || item.image_url || item.foto || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60';
                  const zapItemUrl = `https://wa.me/${config.whatsapp_number?.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá! Gostaria de me matricular ou saber mais sobre o curso: ${title}`)}`;

                  return (
                    <div key={item.id || idx} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-blue-500/50 transition-all shadow-xl">
                      <img src={img} alt={title} className="h-44 w-full object-cover" />
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="font-bold text-white text-base truncate">{title}</h3>
                          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">{desc}</p>
                        </div>
                        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase block font-bold">Valor</span>
                            <span className="text-sm font-black text-white">{formatCurrency(price)}</span>
                          </div>
                          <a
                            href={zapItemUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md"
                          >
                            <MessageCircle size={13} /> Matricular
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {activeTab === 'sobre' && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8">
            <div className="bg-slate-900 border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-xl space-y-6">
              <h2 className="text-3xl font-black text-white">Sobre a {config.site_title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {config.about_text || 'Compromisso com o aprendizado, estrutura tecnológica e capacitação prática de nossos alunos.'}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-slate-800 text-xs text-slate-400">
                {config.phone && <div className="flex items-center gap-2"><Phone size={15} /> {config.phone}</div>}
                {config.email && <div className="flex items-center gap-2"><Mail size={15} /> {config.email}</div>}
                {config.address && <div className="flex items-center gap-2 sm:col-span-2"><MapPin size={15} /> {config.address}</div>}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {config.site_title}. Todos os direitos reservados.</p>
          <p className="text-slate-400">Portal de Atendimento e Matrículas Online</p>
        </div>
      </footer>
    </div>
  );
};