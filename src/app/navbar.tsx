import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href={'/PageHome/Encription'}>Шифрование</Link></li>
                        <li><Link href={'/PageHome/Decription'}>Дешифрование</Link></li>
                    </ul>
                </div>
                <div className="navbar-end"/>
            </div>
        </>
    )
}