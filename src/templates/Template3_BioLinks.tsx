import React, { useState } from 'react';
import type { DynamicDataProps } from '../types';
import { MessageCircle, ShoppingBag, Globe, Phone, ExternalLink, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const Template3_BioLinks: React.FC<DynamicDataProps> = ({ config, items = [] }) => {
  const primary = config.primary_color || '#8b5cf6';
  const [showCatalog, setShowCatalog] = useState(false);

  const whatsappUrl = config.whatsapp_number 
    ? `https://wa.me/${config.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(config.whatsapp_default_message || 'Olá! Vim pelo Link da Bio.')}`
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md mx-auto space-y-6 text-center">
        {/* Foto de Perfil */}
        <div className="space-y-3 flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-900 flex items-center justify-center">
              {config.logo_url ? (
                <img src={config.logo_url} alt={config.site_title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-black text-white" style={{ color: primary }}>
                  {config.site_title.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-slate-950">
              <CheckCircle size={14} />
            </div>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{config.site_title}</h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xs mx-auto mt-1">
              {config.headline || config.subheadline || 'Acesse nossos canais e produtos oficiais.'}
            </p>
          </div>
        </div>

        {/* Botões Principais */}
        <div className="space-y-3">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full p-4 rounded-2xl text-white font-black text-sm flex items-center justify-between shadow-xl transition-transform hover:scale-102"
              style={{ backgroundColor: primary }}
            >
              <div className="flex items-center gap-3">
                <MessageCircle size={20} />
                <span>Falar Conosco no WhatsApp</span>
              </div>
              <ExternalLink size={16} className="opacity-80" />
            </a>
          )}

          {/* Aba Retrátil de Produtos */}
          <button
            type="button"
            onClick={() => setShowCatalog(!showCatalog)}
            className="w-full p-4 bg-slate-900 border border-slate-800 rounded-2xl text-white font-bold text-sm flex items-center justify-between hover:bg-slate-850 transition-all shadow-lg"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} style={{ color: primary }} />
              <span>Ver Produtos & Cursos ({items.length})</span>
            </div>
            {showCatalog ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {/* Grid de produtos retrátil */}
          {showCatalog && (
            <div className="space-y-2 pt-2 text-left">
              {items.length === 0 ? (
                <div className="p-4 bg-slate-900 rounded-xl text-xs text-slate-500 text-center">Nenhum item cadastrado.</div>
              ) : (
                items.map((it, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-900 border border-slate-800/80 rounded-2xl flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{it.nome || it.titulo || it.descricao || `Item #${idx + 1}`}</p>
                      <p className="text-[10px] text-slate-400">R$ {it.preco || it.valor || 'Consulte'}</p>
                    </div>
                    {whatsappUrl && (
                      <a
                        href={`https://wa.me/${config.whatsapp_number?.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá! Tenho interesse no item: ${it.nome || it.titulo || ''}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 rounded-lg text-[10px] font-black text-white shrink-0"
                        style={{ backgroundColor: primary }}
                      >
                        Pedir
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {config.phone && (
            <a
              href={`tel:${config.phone.replace(/\D/g, '')}`}
              className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
            >
              <Phone size={15} />
              <span>Ligue: {config.phone}</span>
            </a>
          )}
        </div>

        <footer className="text-[10px] text-slate-600 pt-4">
          Powered by {config.site_title}
        </footer>
      </div>
    </div>
  );
};