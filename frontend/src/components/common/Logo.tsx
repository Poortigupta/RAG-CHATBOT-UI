export function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <img
        src="/chatbot.png"
        alt="Chatbot Logo"
        width={28}
        height={28}
        className="rounded shadow-sm ring-1 ring-black/5 dark:ring-white/10 object-cover"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
