import React from 'react';

export const ProductGrid: React.FC<{ items: any[]; theme?: 'light' | 'dark' | 'card' }> = ({ items, theme = 'light' }) => {
  if (!items || items.length === 0) {
    return (
      <div className="py-12 text-center border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl">
        <p className="text-slate-500 text-sm">Nenhum produto ou curso disponível no momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item, idx) => {
        const title = item.nome || item.name || item.titulo || item.title || `Item #${idx + 1}`;
        const desc = item.descricao || item.description || item.detalhes || '';
        const rawPrice = item.preco || item.price || item.valor;
        const price = rawPrice ? (typeof rawPrice === 'number' ? `R$ ${rawPrice.toFixed(2)}` : `R$ ${rawPrice}`) : null;
        const img = item.imagem_url || item.image_url || item.foto || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60';

        if (theme === 'dark') {
          return (
            <div key={item.id || idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all flex flex-col">
              <img src={img} alt={title} className="h-44 w-full object-cover" />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white text-base truncate">{title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1.5">{desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-cyan-400 font-bold text-sm">{price || 'Consulte'}</span>
                  <span className="text-[11px] bg-cyan-950 text-cyan-300 px-2.5 py-1 rounded border border-cyan-800/60 font-medium">Disponível</span>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div key={item.id || idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
            <img src={img} alt={title} className="h-44 w-full object-cover" />
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-base">{title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1.5">{desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-indigo-600 font-bold text-sm">{price || 'Sob Consulta'}</span>
                <span className="text-[11px] bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded font-medium">Ver detalhes</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};