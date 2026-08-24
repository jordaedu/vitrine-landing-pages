import React from 'react';
import type { DynamicDataProps } from '../types';
import { 
  MessageCircle, 
  Globe, 
  MapPin, 
  Phone, 
  ExternalLink,
  CheckCircle
} from 'lucide-react';

export const Template3_BioLinks: React.FC<DynamicDataProps> = ({ config, items = [] }) => {
  const primary = config.primary_color || '#8b5cf6';
  const whatsappUrl = config.whatsapp_number 
    ? `https://wa.me/${config.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(config.whatsapp_default_message || 'Olá! Vim através do link da bio.')}`
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      
      <div className="w-full max-w-md mx-auto space-y-6 text-center">
        
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
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {config.site_title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xs mx-auto mt-1">
              {config.headline || config.subheadline || 'Conecte-se comigo através dos links oficiais abaixo.'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full p-4 rounded-2xl text-white font-black text-sm flex items-center justify-between shadow-xl transition-transform hover:scale-102 active:scale-98"
              style={{ backgroundColor: primary }}
            >
              <div className="flex items-center gap-3">
                <MessageCircle size={20} />
                <span>Conversar no WhatsApp</span>
              </div>
              <ExternalLink size={16} className="opacity-70" />
            </a>
          )}

          {items.map((linkItem, idx) => {
            const label = linkItem.nome || linkItem.titulo || linkItem.title || linkItem.descricao || `Opção #${idx + 1}`;
            const targetUrl = linkItem.url || linkItem.link || whatsappUrl || '#';

            return (
              <a
                key={idx}
                href={targetUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-2xl text-white font-bold text-xs sm:text-sm flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-slate-400" />
                  <span>{label}</span>
                </div>
                <ExternalLink size={14} className="text-slate-500" />
              </a>
            );
          })}

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

        <div className="pt-4 border-t border-slate-900 flex justify-center items-center gap-4 text-slate-400 text-xs">
          {config.address && (
            <span className="flex items-center gap-1">
              <MapPin size={13} /> {config.address}
            </span>
          )}
        </div>

        <footer className="text-[10px] text-slate-600">
          Powered by {config.site_title}
        </footer>

      </div>

    </div>
  );
};