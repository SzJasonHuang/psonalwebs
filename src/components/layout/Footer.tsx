import { site } from "@/data/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-200">
      <Container wide>
        <div className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-zinc-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <ul className="flex items-center gap-5">
            {site.social.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors duration-150 hover:text-zinc-900"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
