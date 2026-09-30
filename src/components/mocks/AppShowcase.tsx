import {
  ArrowRightIcon,
  CalendarBlankIcon,
  ChatCircleIcon,
  CheckCircleIcon,
  ClipboardTextIcon,
  FileTextIcon,
  GearSixIcon,
  HashIcon,
  ImageIcon,
  ListChecksIcon,
  MagnifyingGlassIcon,
  PaperclipIcon,
  PaperPlaneRightIcon,
  SparkleIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { SiteContent } from "@/content";
import type { showcaseIcons } from "@/content/schema";
import { LogoMark } from "@/components/brand/Logo";
import { Rich } from "@/components/ui/Rich";
import { Avatar, Card, CardHead, SummaryList } from "./parts";

type Showcase = NonNullable<SiteContent["showcase"]>;
type Message = Showcase["messages"][number];

const ICONS: Record<(typeof showcaseIcons)[number], typeof HashIcon> = {
  hash: HashIcon,
  calendar: CalendarBlankIcon,
  sparkle: SparkleIcon,
  team: UsersThreeIcon,
  tasks: ListChecksIcon,
  file: FileTextIcon,
  image: ImageIcon,
  checklist: ClipboardTextIcon,
};

function Icon({ name }: { name: keyof typeof ICONS }) {
  const I = ICONS[name];
  return <I className="i" />;
}

// Hero app showcase (MASTER 7.9): the whole workspace in one white card, framed by the violet brand
// texture. Layout from design-system/acta/Dashboard design.png: icon rail (settings pinned low),
// channels and people, the channel with Acta's task card and a composer, and a side panel with the
// catch-up summary and recent activity. Decorative: the sr-only summary carries the meaning.
export function AppShowcase({ showcase, brandName }: { showcase: Showcase; brandName: string }) {
  const { summary, task, activity } = showcase;
  return (
    <>
      <div className="frame" aria-hidden="true">
        <Card className="app">
          <div className="rail">
            <LogoMark className="mk" />
            <span className="on">
              <ChatCircleIcon className="i" />
            </span>
            <span>
              <CalendarBlankIcon className="i" />
            </span>
            <span>
              <MagnifyingGlassIcon className="i" />
            </span>
            <span className="low">
              <GearSixIcon className="i" />
            </span>
          </div>
          <div className="side">
            {showcase.groups.map((group) => (
              <div key={group.label} style={{ display: "grid", gap: 2 }}>
                <span className="grp">{group.label}</span>
                {group.items.map((item) => (
                  <span key={item.label} className={`it${item.active ? " on" : ""}${item.muted ? " muted" : ""}`}>
                    {item.person ? <Avatar person={item.person} small /> : item.icon ? <Icon name={item.icon} /> : null}
                    {item.label}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="mainc">
            <CardHead icon={<HashIcon className="i" />} title={showcase.channel.name} meta={showcase.channel.meta} />
            <div className="msgs">
              {showcase.messages.map((m, i) => (
                <ChannelMessage key={`${m.time}-${i}`} message={m} brandName={brandName} />
              ))}
            </div>
            {showcase.composer && (
              <div className="app-composer">
                <PaperclipIcon className="i" />
                <span className="ph">{showcase.composer.placeholder}</span>
                <span className="send">
                  <PaperPlaneRightIcon className="i" />
                </span>
              </div>
            )}
          </div>
          {(summary || task || activity) && (
            <div className="panel">
              {summary && (
                <Card ai>
                  <CardHead icon={<SparkleIcon className="i" />} title={summary.title} />
                  {summary.items.length > 0 && (
                    <div className="card-body">
                      <SummaryList items={summary.items} />
                    </div>
                  )}
                </Card>
              )}
              {task && (
                <Card ai>
                  <CardHead icon={<CalendarBlankIcon className="i" />} title={task.title} meta={task.meta} />
                  <div className="card-body">
                    <div className="callout">
                      <CheckCircleIcon className="i" />
                      <span>{task.text}</span>
                    </div>
                  </div>
                </Card>
              )}
              {activity && (
                <Card ai>
                  <CardHead icon={<SparkleIcon className="i" />} title={activity.title} />
                  {activity.items.length > 0 && (
                    <ul className="activity">
                      {activity.items.map((a, i) => (
                        <li key={`${a.text}-${i}`}>
                          <Icon name={a.icon} />
                          <span>{a.text}</span>
                          <time>{a.time}</time>
                        </li>
                      ))}
                    </ul>
                  )}
                  {activity.action && (
                    <div className="activity-foot">
                      <span className="activity-btn">
                        {activity.action}
                        <ArrowRightIcon className="i" />
                      </span>
                    </div>
                  )}
                </Card>
              )}
            </div>
          )}
        </Card>
      </div>
      <p className="sr-only">{showcase.srSummary}</p>
    </>
  );
}

function ChannelMessage({ message: m, brandName }: { message: Message; brandName: string }) {
  return (
    <div className="lm">
      {m.acta || !m.author ? (
        <span className="acta-av">
          <LogoMark className="mk" />
        </span>
      ) : (
        <Avatar person={m.author} />
      )}
      <div>
        <b>{m.acta || !m.author ? brandName : m.author.name}</b>
        <time>{m.time}</time>
        {m.text && (
          <p>
            <Rich text={m.text} />
          </p>
        )}
        {m.tasks && (
          <div className="task-card">
            <div className="task-head">
              <CheckCircleIcon className="i" weight="fill" />
              <span>{m.tasks.title}</span>
            </div>
            {m.tasks.items.length > 0 && (
              <ul>
                {m.tasks.items.map((t, i) => (
                  <li key={`${t.title}-${i}`}>
                    <span className="box" />
                    <span className="tt">{t.title}</span>
                    {t.tag && <span className={`ttag ${t.tag.tone}`}>{t.tag.label}</span>}
                    {t.due && (
                      <span className="due">
                        <CalendarBlankIcon className="i" />
                        {t.due}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
