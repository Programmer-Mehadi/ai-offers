import Link from "next/link"

const footerLinks = [
  {
    title: "Offers",
    links: [
      { href: "/tools", label: "All Offers" },
      { href: "#", label: "Categories" },
      { href: "#", label: "How We Verify" },
      { href: "#", label: "Submit an Offer" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Contact" },
      { href: "#", label: "Privacy & Terms" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-[10px] font-bold text-white">
                SP
              </div>
              <span className="text-base font-bold">StudentPerks</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Helping students save money with verified
              discounts and exclusive offers.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="mb-3 text-sm font-semibold">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-3 text-sm font-semibold">Follow Us</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Twitter / X
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} StudentPerks. Not affiliated with any listed brands.
          All trademarks belong to their respective owners.
        </div>
      </div>
    </footer>
  )
}
