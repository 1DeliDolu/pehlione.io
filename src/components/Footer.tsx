function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-6 text-sm text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
        <span>© {year} • Alle Rechte vorbehalten.</span>
        {/* kontakt information mustafa.ozdmir1408@gmail.com */}
        <span>Kontakt: <a href="mailto:mustafa.ozdmir1408@gmail.com">mustafa.ozdmir1408@gmail.com</a></span>
        <a
          href="https://github.com/1DeliDolu/pehlione.io"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub • pehlione.io
        </a>
      </div>
    </footer>
  )
}

export default Footer
