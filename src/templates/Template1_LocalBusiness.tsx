import React from 'react';
import type { DynamicDataProps } from '../types';
import { 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';

export const Template1_LocalBusiness: React.FC<DynamicDataProps> = ({ config, items = [] }) => {
  const primary = config.primary_color || '#4f46e5';
  const whatsappUrl = config.whatsapp_number 
    ? `https://wa.me/${config.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(config.whatsapp_default_message || 'Olá! Gostaria de mais informações e um orçamento.')}`
    : '#';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {config.logo_url ? (
              <img src={config.logo_url} alt={config.site_title} className="h-10 w-auto object-contain rounded-lg" />
            ) : (
              <div 
                className="w-10 h-10 rounded-xl text-white flex items-center justify-center font-black text-xl shadow-md"
                style={{ backgroundColor: primary }}
              >
                {config.site_title.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight">
              {config.site_title}
            </span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: primary }}
          >
            <MessageCircle size={16} />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              <ShieldCheck size={14} style={{ color: primary }} />
              <span>Atendimento com excelência e garantia</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              {config.headline || `Soluções completas com a ${config.site_title}`}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              {config.subheadline || 'Trabalhamos com alto padrão de qualidade, transparência e agilidade para entregar o melhor resultado para você e sua empresa.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white font-black text-sm px-7 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105"
                style={{ backgroundColor: primary }}
              >
                <span>Solicitar Orçamento Grátis</span>
                <ArrowRight size={16} />
              </a>

              {config.phone && (
                <a
                  href={`tel:${config.phone.replace(/\D/g, '')}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm px-6 py-4 rounded-2xl border border-slate-200 transition-colors"
                >
                  <Phone size={16} />
                  <span>{config.phone}</span>
                </a>
              )}
            </div>

            {/* Destaques rápidos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-left">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Orçamento Rápido</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Profissionais Qualificados</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 col-span-2 sm:col-span-1">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Satisfação Garantida</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200">
              <img
                src={config.banner_url || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'}
                alt="Banner Principal"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* SERVIÇOS / PRODUTOS */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Nossos Serviços & Especialidades
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Conheça tudo o que oferecemos com garantia e o melhor custo-benefício
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(items.length > 0 ? items : [
              { nome: 'Atendimento Personalizado', descricao: 'Análise completa da sua necessidade para fornecer o orçamento ideal.' },
              { nome: 'Serviços Especializados', descricao: 'Execução com equipamentos modernos e equipe altamente capacitada.' },
              { nome: 'Garantia & Suporte', descricao: 'Acompanhamento pós-serviço para assegurar total tranquilidade.' }
            ]).map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 hover:shadow-lg hover:border-indigo-300 transition-all space-y-3"
              >
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-md"
                  style={{ backgroundColor: primary }}
                >
                  {idx + 1}
                </div>
                <h3 className="text-base font-black text-slate-900">
                  {item.nome || item.descricao || item.title || `Especialidade #${idx + 1}`}
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {item.detalhes || item.descricao || 'Entre em contato para saber mais detalhes e condições especiais de pagamento.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-10 text-xs font-medium border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <p className="text-white font-bold text-sm">{config.site_title}</p>
            <p className="mt-1">{config.address || 'Atendimento em toda a região'}</p>
          </div>
          <p>© {new Date().getFullYear()} - Todos os direitos reservados.</p>
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