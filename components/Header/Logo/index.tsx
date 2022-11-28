
import Image from "next/image";
import logo from "../../../public/logo.png";

export default function Logo() {
    return (
        <a href="/" className="max-w-[130px] w-[13%] text-xl mr-4 px-1.5 no-underline whitespace-nowrap">
            <Image src={logo} className="pl-[20%]" width={72} height={72} alt="logo" />
        </a>
    )
}