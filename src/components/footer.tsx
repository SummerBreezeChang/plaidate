import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center gap-4 pb-4">
      <div className="flex flex-row justify-between">
        <ul className="flex flex-row gap-4">
          <li className="dark:text-muted-foreground dark:hover:text-foreground cursor-pointer">
            Built using Next.js 15
          </li>
          <li className="dark:text-muted-foreground dark:hover:text-foreground">
            •
          </li>
          <li className="dark:text-muted-foreground dark:hover:text-foreground">
            <Link href="https://github.com/idee8/waitly">
              Get this template
            </Link>
          </li>
          <li className="dark:text-muted-foreground dark:hover:text-foreground">
            •
          </li>
          <li className="dark:text-muted-foreground dark:hover:text-foreground cursor-pointer">
            <Link href="https://kofi.com/idee8">Become a Sponsor</Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Crafted by{" "}
          <Link href="https://idee8.agency" className="font-semibold text-foreground">Idee8</Link>
        </p>
      </div>
    </footer>
  );
}
