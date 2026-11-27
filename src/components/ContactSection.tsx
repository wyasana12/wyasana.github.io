import React, { useEffect, useId, useRef, useState } from 'react';
import type { Language } from '../data/portfolioData';
import { EMAILJS_CONFIG, UI_STRINGS } from '../data/portfolioData';
import { AlertCircleIcon, CheckCircleIcon, SendIcon } from './Icons';

interface ContactSectionProps {
  lang: Language;
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const strings = UI_STRINGS[lang];
  const formRef = useRef<HTMLFormElement>(null);
  const announcerRef = useRef<HTMLDivElement>(null);

  const headingId = useId();
  const nameId = useId();
  const nameErrorId = useId();
  const emailId = useId();
  const emailErrorId = useId();
  const subjectId = useId();
  const subjectErrorId = useId();
  const messageId = useId();
  const messageErrorId = useId();
  const honeypotId = useId();

  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Sync ARIA state (aria-invalid & aria-describedby) with native :user-invalid
  useEffect(() => {
    const form = formRef.current;
    const announcer = announcerRef.current;
    if (!form || !announcer) return;

    const flagged = new WeakSet<Element>();
    const announced = new WeakSet<Element>();
    let announceTimer: number | undefined;
    let announcedField: Element | null = null;

    const linkError = (el: HTMLElement, shown: boolean) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const ids = (el.getAttribute('aria-describedby') || '')
        .split(/\s+/)
        .filter((id) => id && id !== errorId);
      if (shown) ids.push(errorId);
      if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
      else el.removeAttribute('aria-describedby');
    };

    const spokenText = (node: Element) => {
      const copy = node.cloneNode(true) as Element;
      copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
      copy.querySelectorAll('[role="img"][aria-label]').forEach((n) => {
        n.replaceWith(`${n.getAttribute('aria-label')}: `);
      });
      return (copy.textContent || '').replace(/\s+/g, ' ').trim();
    };

    const announceError = (el: HTMLInputElement | HTMLTextAreaElement) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const errorEl = document.getElementById(errorId);
      if (!errorEl) return;
      const label = el.labels?.[0] ? `${spokenText(el.labels[0])}: ` : '';
      window.clearTimeout(announceTimer);
      announcer.textContent = '';
      announcedField = el;
      announceTimer = window.setTimeout(() => {
        announcer.textContent = label + spokenText(errorEl);
      }, 500);
    };

    const syncAria = (target: EventTarget | null, shouldAnnounce = false) => {
      if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
        return;
      }
      if (target.getAttribute('aria-hidden') === 'true') return;

      const invalid = target.matches(':user-invalid');
      if (invalid) {
        if (shouldAnnounce && !announced.has(target)) {
          announceError(target);
          announced.add(target);
        }
        target.setAttribute('aria-invalid', 'true');
        linkError(target, true);
        flagged.add(target);
      } else if (flagged.has(target) || target.getAttribute('aria-invalid') !== 'true') {
        target.setAttribute('aria-invalid', 'false');
        linkError(target, false);
        flagged.delete(target);
        announced.delete(target);
        if (announcedField === target) {
          window.clearTimeout(announceTimer);
          announcer.textContent = '';
        }
      }
    };

    const controls = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input:not([aria-hidden="true"]), textarea'
    );
    controls.forEach((el) => syncAria(el));

    const handleBlur = (e: FocusEvent) => syncAria(e.target, true);
    const handleInput = (e: Event) => {
      const target = e.target;
      if (target instanceof HTMLElement && target.hasAttribute('aria-invalid')) {
        syncAria(target);
      }
    };
    const handleInvalid = (e: Event) => {
      if (e.target instanceof Element) {
        announced.add(e.target);
        syncAria(e.target);
      }
    };
    const handleReset = () => {
      window.setTimeout(() => {
        Array.from(form.elements).forEach((el) => syncAria(el));
      }, 0);
    };

    form.addEventListener('blur', handleBlur, true);
    form.addEventListener('input', handleInput);
    form.addEventListener('invalid', handleInvalid, true);
    form.addEventListener('reset', handleReset, true);

    return () => {
      window.clearTimeout(announceTimer);
      form.removeEventListener('blur', handleBlur, true);
      form.removeEventListener('input', handleInput);
      form.removeEventListener('invalid', handleInvalid, true);
      form.removeEventListener('reset', handleReset, true);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.reportValidity()) {
      const firstInvalid = form.querySelector<HTMLElement>(':invalid');
      firstInvalid?.focus();
      return;
    }

    const formData = new FormData(form);

    // Honeypot anti-spam check
    const honeypot = String(formData.get('website') || '').trim();
    if (honeypot) {
      setStatus('success');
      setStatusMessage(strings.contactSuccess);
      form.reset();
      return;
    }

    const { serviceId, templateId, publicKey } = EMAILJS_CONFIG;
    if (
      !serviceId ||
      !templateId ||
      serviceId === 'YOUR_SERVICE_ID' ||
      templateId === 'YOUR_TEMPLATE_ID'
    ) {
      setStatus('error');
      setStatusMessage(strings.contactErrorConfig);
      return;
    }

    const fromName = String(formData.get('from_name') || '').trim();
    const fromEmail = String(formData.get('from_email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const time = new Date().toLocaleString(lang === 'id' ? 'id-ID' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    setStatus('sending');
    setStatusMessage('');

    try {
      // Dynamic import keeps @emailjs/browser out of the initial JS bundle
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: fromName,
          name: fromName,
          from_email: fromEmail,
          email: fromEmail,
          reply_to: fromEmail,
          subject,
          title: subject,
          message,
          time,
        },
        { publicKey }
      );

      setStatus('success');
      setStatusMessage(strings.contactSuccess);
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
      setStatusMessage(strings.contactErrorGeneric);
    }
  };

  return (
    <section id="contact" className="section" aria-label={strings.sectionContact}>
      {/* Mobile Sticky Header (visual mirror; semantic <h2> lives in .section-header) */}
      <div className="section-sticky-header" aria-hidden="true">
        <span className="section-sticky-title">{strings.sectionContact}</span>
      </div>

      {/* Main Section Header */}
      <div className="section-header">
        <h2 id={headingId} className="section-header-title">
          {strings.sectionContact}
        </h2>
        <div className="section-header-line" />
      </div>

      <div className="contact-card">
        <p className="contact-required-note">{strings.contactRequiredNote}</p>

        <form
          ref={formRef}
          method="POST"
          aria-labelledby={headingId}
          onSubmit={handleSubmit}
          className="contact-form"
        >
          {/* Honeypot anti-spam field hidden from assistive technology */}
          <div className="visually-hidden" aria-hidden="true">
            <label htmlFor={honeypotId}>Website</label>
            <input
              id={honeypotId}
              name="website"
              type="text"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
            />
          </div>

          {/* Row 1: Full Name & Email side by side */}
          <div className="contact-row-two">
            <div className="contact-field">
              <label htmlFor={nameId} className="contact-label">
                {strings.contactNameLabel} <span className="contact-required-mark" aria-hidden="true">*</span>
              </label>
              <input
                id={nameId}
                name="from_name"
                type="text"
                className="contact-input"
                placeholder={strings.contactNamePlaceholder}
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                enterKeyHint="next"
                data-error={nameErrorId}
              />
              <div id={nameErrorId} className="contact-error-msg">
                <span role="img" aria-label={strings.errorLabel} className="contact-error-icon">
                  <AlertCircleIcon size={13} aria-hidden="true" />
                </span>
                <span>{strings.contactNameError}</span>
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor={emailId} className="contact-label">
                {strings.contactEmailLabel} <span className="contact-required-mark" aria-hidden="true">*</span>
              </label>
              <input
                id={emailId}
                name="from_email"
                type="email"
                className="contact-input"
                placeholder={strings.contactEmailPlaceholder}
                required
                autoComplete="email"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                enterKeyHint="next"
                data-error={emailErrorId}
              />
              <div id={emailErrorId} className="contact-error-msg">
                <span role="img" aria-label={strings.errorLabel} className="contact-error-icon">
                  <AlertCircleIcon size={13} aria-hidden="true" />
                </span>
                <span>{strings.contactEmailError}</span>
              </div>
            </div>
          </div>

          {/* Row 2: Subject */}
          <div className="contact-field">
            <label htmlFor={subjectId} className="contact-label">
              {strings.contactSubjectLabel} <span className="contact-required-mark" aria-hidden="true">*</span>
            </label>
            <input
              id={subjectId}
              name="subject"
              type="text"
              className="contact-input"
              placeholder={strings.contactSubjectPlaceholder}
              required
              minLength={3}
              maxLength={150}
              enterKeyHint="next"
              data-error={subjectErrorId}
            />
            <div id={subjectErrorId} className="contact-error-msg">
              <span role="img" aria-label={strings.errorLabel} className="contact-error-icon">
                <AlertCircleIcon size={13} aria-hidden="true" />
              </span>
              <span>{strings.contactSubjectError}</span>
            </div>
          </div>

          {/* Row 3: Message */}
          <div className="contact-field">
            <label htmlFor={messageId} className="contact-label">
              {strings.contactMessageLabel} <span className="contact-required-mark" aria-hidden="true">*</span>
            </label>
            <textarea
              id={messageId}
              name="message"
              className="contact-input contact-textarea"
              placeholder={strings.contactMessagePlaceholder}
              required
              minLength={10}
              maxLength={2000}
              rows={3}
              data-error={messageErrorId}
            />
            <div id={messageErrorId} className="contact-error-msg">
              <span role="img" aria-label={strings.errorLabel} className="contact-error-icon">
                <AlertCircleIcon size={13} aria-hidden="true" />
              </span>
              <span>{strings.contactMessageError}</span>
            </div>
          </div>

          {/* Live status feedback for AJAX submission */}
          {statusMessage && (
            <div
              role="status"
              aria-live="polite"
              className={`contact-status-banner ${status === 'success' ? 'is-success' : 'is-error'}`}
            >
              {status === 'success' ? (
                <CheckCircleIcon size={15} aria-hidden="true" className="contact-status-icon" />
              ) : (
                <AlertCircleIcon size={15} aria-hidden="true" className="contact-status-icon" />
              )}
              <span>{statusMessage}</span>
            </div>
          )}

          <div className="contact-actions">
            <button
              type="submit"
              className="contact-submit-btn"
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
            >
              <SendIcon size={14} aria-hidden="true" />
              <span>{status === 'sending' ? strings.contactSending : strings.contactSubmit}</span>
            </button>
          </div>
        </form>

        {/* Single polite live region for deferred field validation announcements */}
        <div ref={announcerRef} aria-live="polite" className="visually-hidden" />
      </div>
    </section>
  );
};

