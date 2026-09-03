import React, { useState } from 'react';
import type { DynamicDataProps } from '../types';
import { ProductGrid } from './ProductGrid';
import { Sparkles, CheckCircle2, Shield, Send, ShoppingBag, Layout } from 'lucide-react';

export const Template4_LeadCapture: React.FC<DynamicDataProps> = ({ config, items = [] }) => {
  const primary = config.primary_color || '#059669';
  const [tab, setTab] = useState<'captura' | 'produtos'>('captura');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (config.whatsapp_number) {
      const msg = `Olá! Meu nome é *${name}* e tenho interesse nos serviços/produtos. (Telefone: ${phone})`;
      window.open(`https://wa.me/${config.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-white">
      <header className="p-5 border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h2 className="text-xl font-black text-white">{config.site_title}</h2>
          <div className="flex gap-2 bg-slate-900 p-1 rounded-xl">
            <button
              onClick={() => setTab('captura')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${tab === 'captura' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Layout size={14} /> Atendimento
            </button>
            <button
              onClick={() => setTab('produtos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${tab === 'produtos' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <ShoppingBag size={14} /> Produtos ({items.length})
            </button>
          </div>
        </div>
      </header>

      {tab === 'produtos' ? (
        <main className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full space-y-6">
          <div className="border-b border-slate-900 pb-4">
            <h2 className="text-2xl font-black text-white">Nossos Produtos & Cursos</h2>
            <p className="text-xs text-slate-400 mt-1">Conheça as opções disponíveis e solicite atendimento direto.</p>
          </div>
          <ProductGrid items={items} theme="dark" />
        </main>
      ) : (
        <main className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-bold rounded-full">
              <Sparkles size={13} />
              <span>Condição Exclusiva de Atendimento</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              {config.headline || 'Transforme seus resultados com nossa consultoria'}
            </h1>

            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              {config.subheadline || 'Preencha seus dados para receber uma demonstração completa e atendimento prioritário da nossa equipe especializada.'}
            </p>

            <div className="space-y-2 pt-2 text-left">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Diagnóstico inicial 100% gratuito</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Sem compromisso ou fidelidade</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
              {sent ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="text-base font-black text-white">Solicitação Encaminhada!</h3>
                  <p className="text-xs text-slate-400">Entraremos em contato com você pelo WhatsApp em instantes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base font-black text-white">Receba Nosso Contato</h3>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Seu Nome *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Ex: Carlos Silva"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">WhatsApp / Telefone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="(12) 99999-9999"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-white font-black text-xs shadow-xl hover:scale-102 flex items-center justify-center gap-2"
                    style={{ backgroundColor: primary }}
                  >
                    <Send size={15} />
                    <span>Garantir Contato Prioritário</span>
                  </button>
                  <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
                    <Shield size={11} /> Seus dados estão 100% protegidos
                  </p>
                </form>
              )}
            </div>
          </div>
        </main>
      )}

      <footer className="p-6 text-center text-xs text-slate-600 border-t border-slate-900">
        © {new Date().getFullYear()} {config.site_title}. Todos os direitos reservados.
      </footer>
    </div>
  );
};