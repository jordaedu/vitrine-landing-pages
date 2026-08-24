import React from 'react';
import type { DynamicDataProps } from '../types';
import { FileText, MessageCircle } from 'lucide-react';

export const Template5_FinancePortal: React.FC<DynamicDataProps> = ({ config, items = [] }) => {
  const primary = config.primary_color || '#2563eb';
  const whatsappUrl = config.whatsapp_number 
    ? `https://wa.me/${config.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(config.whatsapp_default_message || 'Olá! Gostaria de falar sobre os orçamentos e serviços da tabela.')}`
    : '#';

  const formatCurrency = (val: any) => {
    const num = Number(val) || 0;
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      <header className="bg-slate-950 border-b border-slate-800 py-6 px-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl text-white shadow-md" style={{ backgroundColor: primary }}>
              <FileText size={20} />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-white">{config.site_title}</h1>
              <p className="text-xs text-slate-400">Portal de Orçamentos & Serviços</p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md"
            style={{ backgroundColor: primary }}
          >
            <MessageCircle size={15} />
            <span>Falar com Atendente</span>
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 flex-1 w-full space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {config.headline || 'Tabela de Serviços e Condições'}
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            {config.subheadline || 'Acompanhe a relação pública de serviços, valores e prazos.'}
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 uppercase font-black text-[10px] text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Descrição / Serviço</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Data / Prazo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {(items.length > 0 ? items : [
                { descricao: 'Consultoria e Diagnóstico', valor: 1500, pago: true, data_vencimento: '2026-09-01' },
                { descricao: 'Execução e Instalação', valor: 3200, pago: false, data_vencimento: '2026-09-15' }
              ]).map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-white">
                    {row.descricao || row.nome || row.titulo || `Item #${idx + 1}`}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold" style={{ color: primary }}>
                    {formatCurrency(row.valor || row.preco || 0)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                      row.pago ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}>
                      {row.pago ? 'CONCLUÍDO' : 'EM ABERTO'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-slate-400">
                    {row.data_vencimento || row.created_at?.slice(0, 10) || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {config.site_title} • Portal Seguro
      </footer>

    </div>
  );
};