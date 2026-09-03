import { profile } from "@/lib/data";
import ScrollStory from "@/components/ScrollStory";

export default function Statement() {
  return (
    <section className="relative -mt-[15vh] px-6 lg:-mt-[35vh]">
      <ScrollStory
        pinned
        text={profile.statement}
        className="font-display mx-auto max-w-5xl text-3xl leading-[1.2] font-semibold tracking-tight sm:text-5xl lg:text-6xl"
      />
    </section>
  );
}
