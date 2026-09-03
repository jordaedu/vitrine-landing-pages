import React, { useState } from 'react';
import type { DynamicDataProps } from '../types';
import { ProductGrid } from './ProductGrid';
import { 
  Phone, MessageCircle, CheckCircle2, ArrowRight, ShieldCheck, 
  Star, Award, Clock, ChevronDown, MapPin, Mail, Globe, Sparkles, Zap, Check, ShoppingBag
} from 'lucide-react';

export const Template1_LocalBusiness: React.FC<DynamicDataProps> = ({ config, items = [] }) => {
  const primary = config.primary_color || '#4f46e5';
  const whatsappUrl = config.whatsapp_number 
    ? `https://wa.me/${config.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(config.whatsapp_default_message || 'Olá! Gostaria de um orçamento detalhado.')}`
    : '#';

  const [currentTab, setCurrentTab] = useState<'inicio' | 'produtos'>('inicio');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const defaultServices = [
    { titulo: 'Consultoria e Execução de Alto Padrão', descricao: 'Projetos sob medida com acompanhamento rigoroso do início ao fim.' },
    { titulo: 'Atendimento Rápido e Emergencial', descricao: 'Equipe de prontidão para diagnósticos rápidos e soluções definitivas.' },
    { titulo: 'Garantia Estendida e Assistência', descricao: 'Trabalhos certificados com suporte pós-entrega contínuo.' },
    { titulo: 'Materiais e Tecnologia de Ponta', descricao: 'Utilização exclusiva dos insumos mais duráveis e certificados do mercado.' },
    { titulo: 'Orçamento Transparente e Sem Surpresas', descricao: 'Detalhamento integral de custos com opções flexíveis de pagamento.' },
    { titulo: 'Profissionais Qualificados e Treinados', descricao: 'Especialistas experientes com foco total em acabamento e pontualidade.' }
  ];

  const services = config.services_json && config.services_json.length > 0 ? config.services_json : defaultServices;

  const defaultReviews = [
    { nome: 'Ricardo Almeida', comentario: 'Superaram todas as expectativas! Atendimento pontual e trabalho impecável.', estrelas: 5, cargo: 'Cliente Residencial' },
    { nome: 'Mariana Duarte', comentario: 'Profissionais extremamente atenciosos, entrega antes do prazo combinado. Recomendo!', estrelas: 5, cargo: 'Empresária' },
    { nome: 'Carlos Eduardo', comentario: 'Melhor custo-benefício da região. Resolveram com muita agilidade.', estrelas: 5, cargo: 'Gestor Comercial' }
  ];

  const reviews = config.reviews_json && config.reviews_json.length > 0 ? config.reviews_json : defaultReviews;

  const defaultFaqs = [
    { pergunta: 'Como funciona o processo de contratação/compra?', resposta: 'Você entra em contato conosco pelo WhatsApp, analisamos a sua solicitação e apresentamos a melhor proposta sem compromisso.' },
    { pergunta: 'Qual a área de atendimento?', resposta: config.address ? `Atendemos principalmente em ${config.address} e regiões adjacentes.` : 'Atendemos presencialmente e online com agilidade.' },
    { pergunta: 'Quais são as formas de pagamento?', resposta: 'Aceitamos Pix, cartões de crédito parcelado, faturamento corporativo e condições especiais.' }
  ];

  const faqs = config.faq_json && config.faq_json.length > 0 ? config.faq_json : defaultFaqs;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-600 selection:text-white flex flex-col">
      {/* Topbar */}
      <div className="bg-slate-900 text-slate-300 py-2.5 px-4 text-xs font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Atendimento aberto hoje • Resposta imediata no WhatsApp</span>
          </div>
          {config.phone && (
            <div className="hidden sm:flex items-center gap-2 font-bold text-white">
              <Phone size={13} style={{ color: primary }} />
              <span>{config.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Header com Abas */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('inicio')}>
            {config.logo_url ? (
              <img src={config.logo_url} alt={config.site_title} className="h-11 w-auto object-contain rounded-xl" />
            ) : (
              <div className="w-11 h-11 rounded-2xl text-white flex items-center justify-center font-black text-xl shadow-md" style={{ backgroundColor: primary }}>
                {config.site_title.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight block leading-tight">{config.site_title}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Excelência & Qualidade</span>
            </div>
          </div>

          <nav className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-black">
            <button
              onClick={() => setCurrentTab('inicio')}
              className={`px-4 py-2 rounded-xl transition-all ${currentTab === 'inicio' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Início & Serviços
            </button>
            <button
              onClick={() => setCurrentTab('produtos')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${currentTab === 'produtos' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <ShoppingBag size={15} style={{ color: primary }} />
              <span>Produtos / Cursos ({items.length})</span>
            </button>
          </nav>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg hover:opacity-95 transition-all"
            style={{ backgroundColor: primary }}
          >
            <MessageCircle size={17} />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Exibição condicional da Aba de Produtos */}
      {currentTab === 'produtos' ? (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full space-y-6">
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-3xl font-black text-slate-900">Catálogo de Produtos & Cursos</h1>
            <p className="text-slate-500 text-sm mt-1">Todos os itens cadastrados disponíveis para solicitação imediata.</p>
          </div>
          <ProductGrid items={items} theme="light" />
        </main>
      ) : (
        <main className="flex-1">
          {/* HERO */}
          <section className="relative py-16 sm:py-24 bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold shadow-sm">
                  <Sparkles size={14} style={{ color: primary }} />
                  <span>Líder em satisfação e compromisso com o cliente</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                  {config.headline || `Soluções completas com alto padrão na ${config.site_title}`}
                </h1>
                <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                  {config.subheadline || 'Trabalhamos com pontualidade, transparência e equipe qualificada para garantir o melhor resultado.'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                  <button
                    onClick={() => setCurrentTab('produtos')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white font-black text-sm px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform"
                    style={{ backgroundColor: primary }}
                  >
                    <span>Ver Produtos ({items.length})</span>
                    <ArrowRight size={17} />
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm px-7 py-4 rounded-2xl border border-slate-200 shadow-sm transition-colors"
                  >
                    <MessageCircle size={17} />
                    <span>WhatsApp Direto</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                  <img
                    src={config.banner_url || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'}
                    alt="Banner Principal"
                    className="w-full h-96 sm:h-[450px] object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SERVIÇOS */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: primary }}>Catálogo de Soluções</span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Serviços e Especialidades</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-3xl p-7 flex flex-col justify-between group space-y-4">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-base shadow-md" style={{ backgroundColor: primary }}>
                        {idx + 1}
                      </div>
                      <h3 className="text-base font-black text-slate-900">{item.titulo}</h3>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DEPOIMENTOS */}
          <section className="py-20 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
              <div className="text-center space-y-3 max-w-xl mx-auto">
                <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Avaliações Reais</span>
                <h2 className="text-3xl sm:text-4xl font-black text-white">O que dizem nossos clientes</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map((rev, idx) => (
                  <div key={idx} className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-4">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(rev.estrelas || 5)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed italic">"{rev.comentario}"</p>
                    <div className="pt-4 border-t border-slate-700/60">
                      <h4 className="text-xs font-black text-white">{rev.nome}</h4>
                      <span className="text-[10px] text-slate-400">{rev.cargo || 'Cliente Verificado'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-20 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900">Perguntas Frequentes</h2>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-5 text-left flex justify-between items-center gap-4 text-slate-900 font-black text-xs sm:text-sm hover:bg-slate-50"
                      >
                        <span>{faq.pergunta}</span>
                        <ChevronDown size={18} className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                          {faq.resposta}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 text-xs text-center border-t border-slate-800">
        <p>© {new Date().getFullYear()} {config.site_title}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};