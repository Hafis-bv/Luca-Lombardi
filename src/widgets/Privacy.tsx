import { Container } from "@/components/Container";
import { MdLock, MdSecurity, MdVerifiedUser } from "react-icons/md";

export function Privacy() {
  const privacy = [
    {
      id: 1,
      icon: <MdVerifiedUser size={50} />,
      text: "Verified transactions protect your privacy and security",
    },
    {
      id: 2,
      icon: <MdLock size={50} />,
      text: "Your data is encrypted and never shared with third parties",
    },
    {
      id: 3,
      icon: <MdSecurity size={50} />,
      text: "Advanced security protocols keep your account safe",
    },
  ];
  return (
    <Container className="flex flex-wrap items-center justify-center lg:justify-around gap-16 py-10 bg-gray-100">
      {privacy.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center text-center max-w-[260px] gap-3"
        >
          <div>{item.icon}</div>
          <p className="text-lg font-medium text-gray-800">{item.text}</p>
        </div>
      ))}
    </Container>
  );
}
