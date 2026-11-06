import { useTypewriter } from "@/hooks/use-typewriter";
import { usePrefersReducedMotion } from "@/hooks/use-tilt";

const ROLES = [
  { article: "an", title: "Automation Specialist" },
  { article: "a", title: "Web Developer" },
] as const;

const TITLES = ROLES.map((role) => role.title);

/**
 * "I'm an Automation Specialist" / "I'm a Web Developer" with a typing effect.
 * Screen readers get one static sentence; the animated part is aria-hidden so letters are not announced.
 * With reduced motion, the first role is shown as static text and the cursor is not rendered.
 */
const RoleTyper = () => {
  const reduced = usePrefersReducedMotion();
  const { text, index } = useTypewriter(TITLES, { enabled: !reduced });
  const { article } = ROLES[index];

  return (
    <p className="text-xl font-bold leading-snug sm:text-2xl md:text-3xl">
      <span className="sr-only">I'm an Automation Specialist and a Web Developer.</span>
      <span aria-hidden="true">
        <span className="text-foreground">I'm {article} </span>
        {/* Own line on phones so the longest role never reflows the line while typing. */}
        <span className="block min-h-[1.375em] sm:inline sm:min-h-0">
          <span className="role-gradient">{text}</span>
          {!reduced && <span className="typing-cursor" />}
        </span>
      </span>
    </p>
  );
};

export default RoleTyper;
