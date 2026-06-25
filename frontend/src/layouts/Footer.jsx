export default function Footer() {
  return (
    <footer className="border-t border-ink-100 dark:border-ink-700/60 px-6 py-5 text-center text-xs text-ink-400 dark:text-paper-400">
      © {new Date().getFullYear()} Ascent Career Platform. Built to help you land the offer.
    </footer>
  );
}
