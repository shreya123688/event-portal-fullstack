export default function ContactForm({ contact, modern }: { contact: { organizer: string; email: string; whatsapp: string; message: string }; modern?: boolean }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className={`text-2xl font-semibold mb-2 ${modern ? 'text-indigo-600' : ''}`}>Contact</h2>
      <div className="space-y-1 text-gray-700">
        <div>Organizer: {contact.organizer}</div>
        <div>Email: {contact.email}</div>
        <div>WhatsApp: {contact.whatsapp}</div>
        <p className="mt-2">{contact.message}</p>
      </div>
    </section>
  );
}