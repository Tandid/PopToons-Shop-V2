import { motion } from "framer-motion";
import Image from "next/image";

interface Social {
  name: string;
  url: string;
}

const socials: Social[] = [
  {
    name: "linkedin",
    url: "/images/logos/linkedin.png",
  },
  {
    name: "github",
    url: "/images/logos/github.png",
  },
];

const Footer: React.FC = (): React.ReactElement => (
  <motion.footer
    initial="hidden"
    whileInView="show"
    className="px-6 py-12 sm:p-16 xs:p-8"
  >
    <div className="2xl:max-w-[1280px] w-full flex flex-col mx-auto gap-8">
      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] opacity-10 bg-black" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-normal text-[18px] text-gray-800 opacity-50">
            Copyright 2023 © Pop Toons Shop | Tandid Alam
          </p>
          <div className="flex gap-4">
            {socials.map(
              (social: Social): React.ReactElement => (
                <Image
                  key={social.name}
                  src={social.url}
                  alt={social.name}
                  width="30"
                  height="30"
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
