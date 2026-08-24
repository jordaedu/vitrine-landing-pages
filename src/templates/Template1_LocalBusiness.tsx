import React, { useState } from 'react';
import type { DynamicDataProps } from '../types';
import { 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Award, 
  Clock, 
  ChevronDown, 
  MapPin, 
  Mail, 
  Globe, 
  Sparkles,
  Zap,
  Check
} from 'lucide-react';

export const Template1_LocalBusiness: React.FC<DynamicDataProps> = ({ config }) => {
  const primary = config.primary_color || '#4f46e5';
  const whatsappUrl = config.whatsapp_number 
    ? `https://wa.me/${config.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(config.whatsapp_default_message || 'Olá! Gostaria de um orçamento detalhado.')}`
    : '#';

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const defaultServices = [
    { titulo: 'Consultoria e Execução de Alto Padrão', descricao: 'Projetos sob medida com acompanhamento rigoroso do início ao fim.', destaque: true },
    { titulo: 'Atendimento Rápido e Emergencial', descricao: 'Equipe de prontidão para diagnósticos rápidos e soluções definitivas.', destaque: false },
    { titulo: 'Garantia Estendida e Assistência', descricao: 'Trabalhos certificados com suporte pós-entrega contínuo.', destaque: false },
    { titulo: 'Materiais e Tecnologia de Ponta', descricao: 'Utilização exclusiva dos insumos mais duráveis e certificados do mercado.', destaque: false },
    { titulo: 'Orçamento Transparente e Sem Surpresas', descricao: 'Detalhamento integral de custos com opções flexíveis de pagamento.', destaque: false },
    { titulo: 'Profissionais Qualificados e Treinados', descricao: 'Especialistas experientes com foco total em acabamento e pontualidade.', destaque: false }
  ];

  const services = config.services_json && config.services_json.length > 0 
    ? config.services_json 
    : defaultServices;

  const defaultReviews = [
    { nome: 'Ricardo Almeida', comentario: 'Superaram todas as expectativas! Atendimento pontual e trabalho impecável.', estrelas: 5, cargo: 'Cliente Residencial' },
    { nome: 'Mariana Duarte', comentario: 'Profissionais extremamente atenciosos, entrega antes do prazo combinado. Recomendo de olhos fechados!', estrelas: 5, cargo: 'Empresária' },
    { nome: 'Carlos Eduardo', comentario: 'Melhor custo-benefício da região. Resolveram com muita agilidade.', estrelas: 5, cargo: 'Gestor Comercial' }
  ];

  const reviews = config.reviews_json && config.reviews_json.length > 0
    ? config.reviews_json
    : defaultReviews;

  const defaultFaqs = [
    { pergunta: 'Como funciona o processo de orçamento?', resposta: 'Você entra em contato conosco pelo WhatsApp, analisamos a sua solicitação e montamos uma proposta personalizada e transparente sem nenhum compromisso.' },
    { pergunta: 'Qual a área e regiões de atendimento?', resposta: config.address ? `Atendemos principalmente em ${config.address} e cidades vizinhas.` : 'Atendemos toda a cidade e regiões metropolitanas com agilidade.' },
    { pergunta: 'Quais são as formas de pagamento?', resposta: 'Aceitamos Pix, cartões de crédito em até 12x, faturamento corporativo e condições facilitadas.' },
    { pergunta: 'Os serviços possuem garantia contratual?', resposta: 'Sim! Todos os nossos projetos e serviços contam com termo de garantia oficial e suporte pós-atendimento.' }
  ];

  const faqs = config.faq_json && config.faq_json.length > 0
    ? config.faq_json
    : defaultFaqs;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* BARRA DE AVISO SUPERIOR */}
      <div className="bg-slate-900 text-slate-300 py-2.5 px-4 text-xs font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Atendimento aberto hoje • Resposta imediata via WhatsApp</span>
          </div>
          {config.phone && (
            <div className="hidden sm:flex items-center gap-2 font-bold text-white">
              <Phone size={13} style={{ color: primary }} />
              <span>{config.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {config.logo_url ? (
              <img src={config.logo_url} alt={config.site_title} className="h-11 w-auto object-contain rounded-xl" />
            ) : (
              <div 
                className="w-11 h-11 rounded-2xl text-white flex items-center justify-center font-black text-xl shadow-md"
                style={{ backgroundColor: primary }}
              >
                {config.site_title.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight block leading-tight">
                {config.site_title}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Excelência & Qualidade
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#sobre" className="hover:text-slate-900 transition-colors">Sobre</a>
            <a href="#servicos" className="hover:text-slate-900 transition-colors">Serviços</a>
            <a href="#depoimentos" className="hover:text-slate-900 transition-colors">Avaliações</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">Dúvidas</a>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: primary }}
          >
            <MessageCircle size={17} />
            <span>Falar com Especialista</span>
          </a>
        </div>
      </header>

      {/* HERO COM PROVA SOCIAL */}
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
              {config.subheadline || 'Trabalhamos com pontualidade, transparência e equipe qualificada para garantir o melhor resultado sem dores de cabeça.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white font-black text-sm px-8 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105"
                style={{ backgroundColor: primary }}
              >
                <span>Solicitar Orçamento Gratuito</span>
                <ArrowRight size={17} />
              </a>

              {config.phone && (
                <a
                  href={`tel:${config.phone.replace(/\D/g, '')}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm px-7 py-4 rounded-2xl border border-slate-200 shadow-sm transition-colors"
                >
                  <Phone size={16} />
                  <span>{config.phone}</span>
                </a>
              )}
            </div>

            {/* SELOS DE CONFIANÇA */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">{config.experience_years || '10+'} Anos</div>
                <div className="text-[11px] text-slate-500 font-bold">De Experiência</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">{config.satisfied_clients || '500+'}</div>
                <div className="text-[11px] text-slate-500 font-bold">Clientes Atendidos</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-emerald-600 flex items-center gap-1">
                  <span>100%</span> <ShieldCheck size={18} />
                </div>
                <div className="text-[11px] text-slate-500 font-bold">Garantia Total</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <img
                src={config.banner_url || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'}
                alt="Banner Principal"
                className="w-full h-96 sm:h-[450px] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 font-black">
                  <Check size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Qualidade Comprovada</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Equipe pronta para começar o seu projeto.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 font-bold"><Zap size={20} /></div>
            <div>
              <h4 className="text-sm font-black text-slate-900">Agilidade Real</h4>
              <p className="text-xs text-slate-500 mt-1">Cumprimento rigoroso de todos os prazos.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 font-bold"><Award size={20} /></div>
            <div>
              <h4 className="text-sm font-black text-slate-900">Alto Padrão</h4>
              <p className="text-xs text-slate-500 mt-1">Acabamento refinado e materiais nobres.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 font-bold"><Clock size={20} /></div>
            <div>
              <h4 className="text-sm font-black text-slate-900">Suporte Dedicado</h4>
              <p className="text-xs text-slate-500 mt-1">Acompanhamento contínuo no WhatsApp.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 font-bold"><ShieldCheck size={20} /></div>
            <div>
              <h4 className="text-sm font-black text-slate-900">Transparência</h4>
              <p className="text-xs text-slate-500 mt-1">Sem taxas ocultas ou imprevistos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO SOBRE A EMPRESA */}
      <section id="sobre" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600">Quem Somos</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Construindo confiança e resultados sólidos para nossos clientes
            </h2>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              {config.about_text || `Na ${config.site_title}, unimos tecnologia, experiência prática e dedicação para transformar cada projeto em uma experiência tranquila e eficiente. Nosso compromisso é entregar sempre além do combinado, respeitando seu tempo e investimento.`}
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Atendimento humanizado e focado na sua necessidade real</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Equipe técnica capacitada e com certificações ativas</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Facilidade de pagamento com condições exclusivas</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <h3 className="text-lg font-black text-slate-900">Por que somos a melhor escolha?</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-indigo-600 text-white font-black text-xs">01</div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Orçamento Rápido em Poucos Minutos</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 font-medium">Basta enviar sua demanda pelo WhatsApp e nossos atendentes respondem na hora.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-slate-800 text-white font-black text-xs">02</div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Planejamento e Execução Segura</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 font-medium">Cada etapa é explicada com clareza para você ter total tranquilidade.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE SERVIÇOS */}
      <section id="servicos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: primary }}>Catálogo de Soluções</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Serviços e Especialidades</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Trabalhos executados com rigor técnico, pontualidade e o melhor custo-benefício.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-3xl p-7 hover:shadow-xl hover:border-indigo-300 hover:bg-white transition-all flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-base shadow-md group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: primary }}
                  >
                    {idx + 1}
                  </div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.titulo}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {item.descricao}
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-black text-slate-700 group-hover:text-indigo-600 pt-2 transition-colors"
                >
                  <span>Pedir cotação deste serviço</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO DE DEPOIMENTOS / PROVA SOCIAL */}
      <section id="depoimentos" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Avaliações Reais</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">O que dizem nossos clientes</h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Confira os comentários de quem já contratou e aprovou nossos serviços.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div key={idx} className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(rev.estrelas || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed italic">
                    "{rev.comentario}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-700/60 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">
                    {rev.nome.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">{rev.nome}</h4>
                    <span className="text-[10px] text-slate-400">{rev.cargo || 'Cliente Verificado'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO DE FAQ (PERGUNTAS FREQUENTES) */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600">Tire Suas Dúvidas</span>
            <h2 className="text-3xl font-black text-slate-900">Perguntas Frequentes</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 text-slate-900 font-black text-xs sm:text-sm hover:bg-slate-50"
                  >
                    <span>{faq.pergunta}</span>
                    <ChevronDown size={18} className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3">
                      {faq.resposta}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BANNER DE CHAMADA FINAL (CTA) */}
      <section className="py-16 bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 text-white text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Pronto para começar seu projeto com garantia e qualidade?
          </h2>
          <p className="text-sm text-indigo-100 max-w-xl mx-auto font-medium">
            Clique no botão abaixo e fale agora com nossa equipe no WhatsApp para receber sua proposta sem custos.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm px-8 py-4 rounded-2xl shadow-2xl transition-transform hover:scale-105"
          >
            <MessageCircle size={18} />
            <span>Falar com Atendimento no WhatsApp</span>
          </a>
        </div>
      </section>

      {/* FOOTER COMPLETO */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-xs font-medium border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <span className="text-white font-black text-base">{config.site_title}</span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {config.subheadline || 'Compromisso com alto padrão, atendimento transparente e pontualidade na entrega.'}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold text-xs uppercase tracking-wider block">Contato</span>
            {config.phone && <p className="flex items-center gap-2"><Phone size={13} /> {config.phone}</p>}
            {config.email && <p className="flex items-center gap-2"><Mail size={13} /> {config.email}</p>}
            {config.address && <p className="flex items-center gap-2"><MapPin size={13} /> {config.address}</p>}
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold text-xs uppercase tracking-wider block">Navegação</span>
            <p><a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a></p>
            <p><a href="#servicos" className="hover:text-white transition-colors">Nossos Serviços</a></p>
            <p><a href="#depoimentos" className="hover:text-white transition-colors">Avaliações</a></p>
            <p><a href="#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a></p>
          </div>

          <div className="space-y-3">
            <span className="text-white font-bold text-xs uppercase tracking-wider block">Redes Sociais</span>
            <div className="flex gap-2">
              {config.instagram_url && (
                <a href={config.instagram_url} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl border border-slate-800" title="Instagram / Web">
                  <Globe size={16} />
                </a>
              )}
              {config.whatsapp_number && (
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md" title="WhatsApp">
                  <MessageCircle size={16} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 mt-8 border-t border-slate-900 text-center text-[10px] text-slate-500">
          © {new Date().getFullYear()} {config.site_title}. Todos os direitos reservados.
        </div>
      </footer>

      {/* WHATSAPP FLUTUANTE */}
      {config.whatsapp_number && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center animate-bounce"
          title="Fale conosco no WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      )}

    </div>
  );
};