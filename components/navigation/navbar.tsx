import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <header className="shadow-lg py-3 bg-white z-50">
      <div className="container flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-500">
          Prime Solar
        </Link>
        <Link href="/">
          <Button>Get Solar Info</Button>
        </Link>
      </div>
    </header>
  );
};
export default Navbar;
