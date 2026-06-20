import { Container } from "@/components/Container";
import { Input } from "@/components/Input";

export function ContactForm() {
  return (
    <div>
      <div className="flex flex-col items-center text-center gap-5 pt-20">
        <h1 className="text-4xl font-semibold">Get In Touch With Us!</h1>
        <p className="max-w-150">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
          aspernatur blanditiis earum expedita nobis qui repellendus tenetur
          unde ut voluptate.
        </p>
      </div>
      <Container className="pt-15 pb-30 mx-4 p-8">
        <form className="grid grid-cols-2 gap-8 shadow-2xl rounded-3xl w-full p-8 md:w-140 mx-auto ">
          <div className="flex flex-col relative col-span-2 md:col-span-1">
            <Input placeholder="Enter your name..." />
          </div>
          <div className="col-span-2 md:col-span-1 bg-[#f2f2f2] rounded-xl px-2">
            <Input placeholder="" />
          </div>
          <div className="flex flex-col relative col-span-2">
            <Input placeholder="Enter your email..." />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <textarea
              placeholder="Enter your message..."
              className="bg-[#f2f2f2] py-3 px-2 rounded-xl h-40 outline-none resize-none"
            />
          </div>
          <button className="bg-black col-span-2 text-white w-full font-medium tracking-[2px] py-3 rounded-3xl cursor-pointer">
            Send
          </button>
        </form>
      </Container>
    </div>
  );
}
