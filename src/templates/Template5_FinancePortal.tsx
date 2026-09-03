import React, { useState } from 'react';
import type { DynamicDataProps } from '../types';
import { ProductGrid } from './ProductGrid';
import { FileText, MessageCircle, ShoppingBag, Terminal } from 'lucide-react';

export const Template5_FinancePortal: React.FC<DynamicDataProps> = ({ config, items = [] }) => {
  const primary = config.primary_color || '#2563eb';
  const [tab, setTab] = useState<'tabela' | 'catalogo'>('tabela');

  const whatsappUrl = config.whatsapp_number 
    ? `https://wa.me/${config.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(config.whatsapp_default_message || 'Olá! Gostaria de falar sobre os orçamentos e serviços da tabela.')}`
    : '#';

  const formatCurrency = (val: any) => {
    const num = Number(val) || 0;
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-950 border-b border-slate-800 py-5 px-4 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl text-white shadow-md" style={{ backgroundColor: primary }}>
              <FileText size={20} />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-white">{config.site_title}</h1>
              <p className="text-xs text-slate-400">Portal Corporativo & Orçamentos</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setTab('tabela')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${tab === 'tabela' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Terminal size={14} /> Tabela
              </button>
              <button
                onClick={() => setTab('catalogo')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${tab === 'catalogo' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <ShoppingBag size={14} /> Catálogo ({items.length})
              </button>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md hover:opacity-90 transition"
              style={{ backgroundColor: primary }}
            >
              <MessageCircle size={15} />
              <span>Atendimento</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 flex-1 w-full space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {tab === 'tabela' ? (config.headline || 'Tabela de Serviços e Condições') : 'Catálogo Detalhado de Itens'}
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            {tab === 'tabela' ? (config.subheadline || 'Acompanhe a relação de serviços, valores e prazos.') : 'Explore os produtos cadastrados com ficha visual.'}
          </p>
        </div>

        {tab === 'tabela' ? (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 uppercase font-black text-[10px] text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Descrição / Serviço</th>
                  <th className="px-6 py-4">Valor</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Prazo / Registro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">Nenhum registro encontrado no banco de dados.</td>
                  </tr>
                ) : (
                  items.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">{row.descricao || row.nome || row.titulo || `Item #${idx + 1}`}</td>
                      <td className="px-6 py-4 font-mono font-bold" style={{ color: primary }}>{formatCurrency(row.valor || row.preco || row.price || 0)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${row.pago ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-blue-950 text-blue-400 border border-blue-800'}`}>
                          {row.pago ? 'CONCLUÍDO' : 'DISPONÍVEL'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-slate-400">{row.data_vencimento || row.created_at?.slice(0, 10) || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <ProductGrid items={items} theme="dark" />
        )}
      </main>

      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {config.site_title} • Portal Corporativo
      </footer>
    </div>
  );
};