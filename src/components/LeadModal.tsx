'use client';

import React, { useState } from 'react';

import { WA_PHONE } from './SiteHeader';
import { trackWhatsAppLead } from '@/lib/analytics';
import { openWhatsAppDirect } from '@/lib/whatsapp';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [typology, setTypology] = useState('T3 — 3 Quartos + Suite');
  const [timeSlot, setTimeSlot] = useState('O mais breve possível');
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSending(true);

    trackWhatsAppLead('lead_modal_form', { name: name.trim(), typology, timeSlot });

    const msg = `Olá André! Vi a Moradia Domaine XXV em Oliveirinha e gostaria de agendar uma visita. Como podemos combinar?\n\nNome: ${name.trim()}\nContacto: ${phone.trim()}\nInteresse: ${typology}`;

    setTimeout(() => {
      setSending(false);
      onClose();
      openWhatsAppDirect(msg, WA_PHONE);
    }, 400);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-box"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8a7d6f] hover:text-[#1a1714] text-xl leading-none cursor-pointer transition-colors"
          aria-label="Fechar"
        >✕</button>

        <div className="mb-5">
          <div className="section-label mb-2">Solicitar Informação</div>
          <h3 className="serif font-semibold text-[#1a1714] text-xl">
            Apresentação do Domaine XXV
          </h3>
          <p className="text-[#8a7d6f] text-sm mt-1.5 leading-relaxed">
            Receba o mapa de acabamentos, estudo de viabilidade bancária e confirmação de disponibilidade.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="field-label" htmlFor="m-name">Nome</label>
            <input id="m-name" type="text" required value={name}
              onChange={e => setName(e.target.value)}
              placeholder="O seu nome completo"
              className="field-input" />
          </div>
          <div>
            <label className="field-label" htmlFor="m-phone">Telemóvel / WhatsApp</label>
            <input id="m-phone" type="tel" required value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="912 345 678"
              className="field-input" />
          </div>
          <div>
            <label className="field-label" htmlFor="m-typo">Interesse</label>
            <select id="m-typo" value={typology} onChange={e => setTypology(e.target.value)} className="field-input">
              <option>T3 — 3 Quartos + Suite</option>
              <option>T4 — 4 Quartos / Escritório</option>
              <option>Quero conhecer as opções</option>
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="m-time">Melhor horário</label>
            <select id="m-time" value={timeSlot} onChange={e => setTimeSlot(e.target.value)} className="field-input">
              <option>O mais breve possível</option>
              <option>Manhã (09h – 13h)</option>
              <option>Tarde (14h – 18h)</option>
              <option>Final do dia (18h – 20h)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="btn-primary w-full justify-center mt-2 disabled:opacity-60"
          >
            {sending ? 'A redirecionar...' : 'Enviar pelo WhatsApp →'}
          </button>

          <p className="text-[11px] text-[#8a7d6f] text-center">
            🔒 Privacidade garantida — contacto usado apenas para este projeto.
          </p>
        </form>
      </div>
    </div>
  );
}
