import React, { useState } from 'react';
import type { DynamicDataProps } from '../types';
import { ShoppingBag, MessageCircle, Search } from 'lucide-react';

export const Template2_CatalogMenu: React.FC<DynamicDataProps> = ({ config, items = [] }) => {
  const primary = config.primary_color || '#e11d48';
  const [filter, setFilter] = useState('');

  const filteredItems = items.filter(item => {
    const title = item.nome || item.descricao || item.title || item.name || '';
    return title.toLowerCase().includes(filter.toLowerCase());
  });

  const formatCurrency = (val: any) => {
    const num = Number(val) || 0;
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
  };

  const getWhatsAppOrderLink = (itemNome: string, valor: any) => {
    if (!config.whatsapp_number) return '#';
    const msg = `Olá! Gostaria de pedir: *${itemNome}* (${formatCurrency(valor)}).`;
    return `https://wa.me/${config.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      
      {/* HEADER */}
      <header className="relative bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800 pb-8 pt-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-3">
          {config.logo_url ? (
            <img src={config.logo_url} alt={config.site_title} className="h-16 w-auto object-contain rounded-2xl shadow-lg" />
          ) : (
            <div 
              className="w-16 h-16 rounded-2xl text-white flex items-center justify-center font-black text-2xl shadow-xl"
              style={{ backgroundColor: primary }}
            >
              {config.site_title.charAt(0).toUpperCase()}
            </div>
          )}

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {config.site_title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md font-medium">
            {config.headline || 'Faça seu pedido diretamente pelo cardápio online com entrega rápida!'}
          </p>

          <div className="relative w-full max-w-md mt-4">
            <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder="Buscar no cardápio..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-2xl text-xs font-medium text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>
      </header>

      {/* GRID DE PRODUTOS */}
      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full space-y-6">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <ShoppingBag size={14} style={{ color: primary }} />
            <span>Itens Disponíveis ({filteredItems.length})</span>
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-xs font-bold">
            Nenhum item encontrado no cardápio.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item, idx) => {
              const itemTitle = item.nome || item.descricao || item.title || `Item #${idx + 1}`;
              const itemVal = item.valor ?? item.preco ?? item.price ?? 0;
              const itemImg = item.foto || item.imagem || item.image || item.banner;

              return (
                <div 
                  key={idx}
                  className="bg-slate-800/60 border border-slate-800 hover:border-slate-700 rounded-3xl p-4 flex gap-4 items-center justify-between transition-all hover:bg-slate-800"
                >
                  {itemImg && (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-950 shrink-0 border border-slate-700">
                      <img src={itemImg} alt={itemTitle} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="text-sm font-black text-white truncate">{itemTitle}</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {item.descricao || item.detalhes || 'Delicioso e preparado na hora com os melhores ingredientes.'}
                    </p>
                    <div className="text-sm font-black pt-1" style={{ color: primary }}>
                      {formatCurrency(itemVal)}
                    </div>
                  </div>

                  <a
                    href={getWhatsAppOrderLink(itemTitle, itemVal)}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl text-white shadow-lg transition-transform hover:scale-110 shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: primary }}
                    title="Pedir no WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>{config.site_title} • Pedidos via WhatsApp</p>
      </footer>

    </div>
  );
};