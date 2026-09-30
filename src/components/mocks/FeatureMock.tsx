import {
  ArrowCounterClockwiseIcon,
  ArrowRightIcon,
  AtIcon,
  CalendarBlankIcon,
  CheckIcon,
  FileTextIcon,
  HashIcon,
  MagnifyingGlassIcon,
  PaperclipIcon,
  PaperPlaneRightIcon,
  SparkleIcon,
  TagIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { FeatureMock as FeatureMockData } from "@/content";
import { Rich } from "@/components/ui/Rich";
import { Avatar, BotRow, Card, CardHead, MeRow, Seg, SummaryList } from "./parts";

type Mock<T extends FeatureMockData["type"]> = Extract<FeatureMockData, { type: T }>;

// Feature 1, CATCH UP (MASTER 7.3): question, Acta reply, then the summary card.
function SummaryMock({ mock }: { mock: Mock<"summary"> }) {
  return (
    <div className="chat" data-mock="summary">
      <MeRow person={mock.question.author} text={mock.question.text} className="r1" />
      {mock.reply && <BotRow text={mock.reply} className="r2" />}
      <Card ai className="r3">
        <CardHead icon={<SparkleIcon className="i" />} title={mock.card.title} meta={mock.card.meta} />
        {mock.items.length > 0 && (
          <div className="card-body">
            <SummaryList items={mock.items} stagger />
          </div>
        )}
      </Card>
    </div>
  );
}

// Feature 2, AUTO-SYNC (MASTER 7.4): the message with the deadline underlined, then the calendar card.
function TaskMock({ mock }: { mock: Mock<"task"> }) {
  return (
    <div className="chat" data-mock="task">
      <MeRow person={mock.message.author} text={mock.message.text} className="r1" />
      <Card ai className="r2">
        <CardHead icon={<CalendarBlankIcon className="i" />} title={mock.card.title} meta={mock.card.meta} />
        <div className="card-body">
          {mock.callout && (
            <div className="callout">
              <CheckIcon className="i" />
              <span>{mock.callout}</span>
            </div>
          )}
          {mock.days.length > 0 && (
            <div
              className="week"
              style={{ "--days": mock.days.length, "--busy": Math.max(1, mock.days.filter((d) => d.events.length > 0).length) } as React.CSSProperties}
            >
              {mock.days.map((day) => (
                <div key={day.label} className={day.events.length === 0 ? "empty" : undefined}>
                  <span className={`d${day.today ? " now" : ""}`}>{day.label}</span>
                  {day.events.map((evt) => (
                    <div key={evt.title} className={`evt${evt.isNew ? " new drop" : ""}`}>
                      {evt.title}
                      <small>{evt.time}</small>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        {(mock.undo || mock.open) && (
          <div className="card-foot">
            {mock.undo && (
              <span className="app-btn ghost">
                <ArrowCounterClockwiseIcon className="i" />
                {mock.undo}
              </span>
            )}
            {mock.open && (
              <span className="foot-right">
                <span className="app-btn">
                  {mock.open}
                  <ArrowRightIcon className="i" />
                </span>
              </span>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

const chipIcon = {
  person: <AtIcon className="i" />,
  date: <CalendarBlankIcon className="i" />,
  topic: <TagIcon className="i" />,
};

// Feature 3, RECALL (MASTER 7.5): search field with how Acta read the question, then the answer card.
function SearchMock({ mock }: { mock: Mock<"search"> }) {
  return (
    <div className="chat" data-mock="search">
      <Card className="r1">
        <div className="card-body">
          <div className="sfield">
            <MagnifyingGlassIcon className="i" />
            {mock.query ? <span className="q typed-in typed">{mock.query}</span> : <span className="q">{mock.placeholder}</span>}
            {mock.shortcut && <span className="kbd">{mock.shortcut}</span>}
          </div>
          {mock.chips.length > 0 && (
            <div className="chips r2">
              {mock.understoodLabel && <span>{mock.understoodLabel}</span>}
              {mock.chips.map((chip) => (
                <span key={chip.label} className="chip2">
                  {chipIcon[chip.icon]}
                  {chip.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
      <Card ai className="r3">
        <CardHead icon={<SparkleIcon className="i" />} title={mock.result.title} meta={mock.result.meta} />
        <div className="card-body">
          <div className="qcard">
            <Avatar person={mock.result.author} small />
            <div>
              <div className="qhead">
                <b>{mock.result.author.name}</b>
                <time>{mock.result.time}</time>
              </div>
              <p>
                <Rich text={mock.result.text} as="mark" />
              </p>
            </div>
          </div>
          {mock.file && (
            <span className="filechip">
              <FileTextIcon className="i" />
              {mock.file.name}
              {mock.file.size && <small>{mock.file.size}</small>}
            </span>
          )}
        </div>
        {mock.action && (
          <div className="card-foot">
            <span className="foot-right">
              <span className="app-btn">
                {mock.action}
                <ArrowRightIcon className="i" />
              </span>
            </span>
          </div>
        )}
      </Card>
    </div>
  );
}

// Feature 4, COMPOSE (MASTER 7.6): the rough composer draft, then Acta's polished output card.
function ComposeMock({ mock }: { mock: Mock<"compose"> }) {
  return (
    <div className="chat" data-mock="compose">
      <Card className="r1">
        <CardHead
          icon={<HashIcon className="i" />}
          title={mock.channel}
          end={mock.modes.length > 0 ? <Seg options={mock.modes} active={mock.activeMode} /> : undefined}
        />
        {mock.draft.length > 0 && (
          <ul className="draft">
            {mock.draft.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}
        <div className="card-foot">
          <span className="aitag press">
            <SparkleIcon className="i" />
            {mock.action}
          </span>
          <span className="ctools">
            <span>
              <AtIcon className="i" />
            </span>
            <span>
              <PaperclipIcon className="i" />
            </span>
            <span className="send">
              <PaperPlaneRightIcon className="i" />
            </span>
          </span>
        </div>
      </Card>
      <Card ai className="r3">
        <CardHead icon={<SparkleIcon className="i" />} title={mock.result.title} meta={mock.result.meta} />
        <div className="card-body">
          <p style={{ color: "var(--color-text-sub)" }}>{mock.result.body}</p>
        </div>
        {(mock.languages.length > 0 || mock.insert) && (
          <div className="card-foot">
            <Seg options={mock.languages} active={mock.activeLanguage} />
            {mock.insert && (
              <span className="foot-right">
                <span className="app-btn">{mock.insert}</span>
              </span>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

export function FeatureMock({ mock }: { mock: FeatureMockData }) {
  switch (mock.type) {
    case "summary":
      return <SummaryMock mock={mock} />;
    case "task":
      return <TaskMock mock={mock} />;
    case "search":
      return <SearchMock mock={mock} />;
    case "compose":
      return <ComposeMock mock={mock} />;
  }
}
