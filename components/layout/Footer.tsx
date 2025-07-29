import Link from "next/link";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      dir="ltr"
      className="font-sans w-full border-b bg-background/95 text-center dir"
    >
      <div className="pt-7 pb-3 text-center">
        <p className={`font-base text-sm sm:text-medium`}>
          &copy; {year} Samy lahoues. All rights reserved{" "}
          <Link href="/policies" className="ml-4 underline hover:no-underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
