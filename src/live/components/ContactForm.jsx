import { useState } from 'react';
import FormField from './FormField';
import Button from './Button';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]{7,15}$/;
const emptyValues = { name: '', email: '', phone: '', message: '', website: '' };

export function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Enter your name.';
  if (!values.email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = 'Enter a valid email, like name@example.com.';
  if (values.phone && !PHONE_PATTERN.test(values.phone)) errors.phone = 'Enter a valid phone number (7 to 15 digits).';
  if (values.message.trim().length < 10) errors.message = 'Write at least 10 characters.';
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  function handleChange(event) {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validate(next));
  }

  function handleBlur(event) {
    setTouched((previous) => ({ ...previous, [event.target.name]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, message: true });
    if (Object.keys(found).length > 0) return;

    if (values.website) {
      setStatus('success'); // honeypot filled: pretend success, send nothing
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name, email: values.email, phone: values.phone, message: values.message }),
      });
      if (!response.ok) throw new Error('Request failed with status ' + response.status);
      setStatus('success');
      setValues(emptyValues);
      setTouched({});
      setErrors({});
    } catch {
      setStatus('error');
    }
  }

  const show = (name) => (touched[name] ? errors[name] : undefined);

  return (
    <form onSubmit={handleSubmit} noValidate className="grid">
      <FormField label="Name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} error={show('name')} required autoComplete="name" />
      <FormField label="Email" name="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={show('email')} required autoComplete="email" />
      <FormField label="Phone (optional)" name="phone" type="tel" value={values.phone} onChange={handleChange} onBlur={handleBlur} error={show('phone')} autoComplete="tel" />
      <FormField label="Message" name="message" as="textarea" rows={5} value={values.message} onChange={handleChange} onBlur={handleBlur} error={show('message')} required />

      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
      </div>

      <Button type="submit" loading={status === 'loading'}>
        Send message
      </Button>

      {status === 'success' && <p role="status">Thanks. Your message was sent.</p>}
      {status === 'error' && <p role="alert" className="text-danger">Your message could not be sent. Please try again.</p>}
    </form>
  );
}
