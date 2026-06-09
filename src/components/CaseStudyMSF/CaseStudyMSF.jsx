import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import styles from './CaseStudyMSF.module.css'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition:  { duration: 0.55, ease: 'easeOut', delay },
  viewport:    { once: true, margin: '-80px' },
})

const challenges = [
  {
    num:   '01',
    title: 'Two personas, one invisible dependency',
    body:  'The developer creates the application. The Key Administrator configures and grants access to the keys. One\'s work gates the other\'s and any error in that handoff lands on the developer\'s screen as a cryptic permission failure.',
  },
  {
    num:   '02',
    title: 'Cross-service consistency constraints',
    body:  'CMK selection required coordinating with the KMS design team. They had established patterns already approved by the AWS design system team. Pushing back would have fragmented the experience across services and spent trust I\'d need.',
  },
  {
    num:   '03',
    title: 'No existing flow to start from',
    body:  'This wasn\'t a redesign. There was no prior encryption UI. I was building from scratch into a dense, regulated domain with no baseline to compare against.',
  },
]

const decisions = [
  {
    num:   '01',
    title: 'Include in-transit encryption even though CMK isn\'t available there yet',
    body:  'The product manager pushed back: why surface a setting users can\'t change? My argument: compliance officers need to see that transit encryption is covered, not just at-rest. Hiding it wouldn\'t simplify the experience; it would create doubt during security reviews. Structurally, the container already existed; adding the transit row cost almost nothing and left the surface extensible when more encryption features for data in transit ships. The PM agreed. That section shipped.',
  },
  {
    num:   '02',
    title: 'Progressive disclosure for CMK selection',
    body:  'I didn\'t want the key selection UI visible by default. Most users choose AWS-owned keys; surfacing CMK controls upfront adds cognitive load to a path most never take. A radio selection between the two options lets the CMK path reveal itself only when needed. The default path stays clean.',
  },
  {
    num:   '03',
    title: 'Browse modal over dropdown for key selection',
    body:  'My first design used a dropdown. After collaborating with the KMS design team, I replaced it with a browse modal with search and pagination. Enterprise users can have hundreds of keys in KMS — a dropdown doesn\'t scale to that inventory. I disagreed with some specifics of the UI the KMS team required, but chose to accept the constraint rather than fracture the cross-service experience.',
  },
  {
    num:   '04',
    title: 'Error handling as a primary focus, not an afterthought',
    body:  'The two-persona model made permission errors high-probability. The framing I kept coming back to: the developer who hits this error is not the person who fixes it. The message has to work as a handoff document. The shipped error names the specific key ARN, surfaces IAM context in a copyable block, and tells developers to send it to their administrator. Those error patterns were adopted into the AWS design system.',
  },
]

const impacts = [
  {
    headline: 'Enterprise deal retained',
    body:     'The client\'s compliance requirement was met. The deal held, and CMK support opened MSF to regulated-industry customers who had previously been blocked by the AWS-owned-key constraint.',
  },
  {
    headline: 'Adopted into the AWS design system',
    body:     'The error message UX and UI patterns were submitted to and accepted by the AWS design system — now available to other service teams building permission-dependent flows.',
  },
  {
    headline: 'Foundation for future data',
    body:     'Front-end event tagging was laid for click and drop-off analytics, and a research plan was outlined for the customer success and product teams to run post-launch.',
  },
]

export default function CaseStudyMSF() {
  const shouldReduceMotion = useReducedMotion()
  const anim = (delay = 0) => shouldReduceMotion ? {} : fadeUp(delay)

  return (
    <article className={styles.page}>

      {/* ─── Back link ─── */}
      <div className={styles.backWrap}>
        <Link to="/#projects" className={styles.back}>← Work</Link>
      </div>

      {/* ─── Hero ─── */}
      <header className={styles.hero}>
        <motion.span className={`text-caption ${styles.category}`} {...anim(0)}>
          Case Study · AWS · Q4 2024
        </motion.span>
        <motion.h1 className={styles.heroTitle} {...anim(0.05)}>
          Designing AWS MSF's<br />Encryption Controls
        </motion.h1>
        <motion.p className={styles.heroSub} {...anim(0.1)}>
          AWS Managed Service for Apache Flink
        </motion.p>
      </header>

      {/* ─── Hero image ─── */}
      <motion.div className={styles.heroImageWrap} {...anim(0.15)}>
        <img
          src="/case-study-msf/encryption-container.png"
          alt="The encryption settings container inside the MSF create application form"
          className={styles.heroImg}
        />
      </motion.div>

      {/* ─── Meta strip ─── */}
      <div className={styles.metaStrip}>
        {[
          { label: 'Role',     value: 'Product Designer' },
          { label: 'Company',  value: 'Amazon Web Services' },
          { label: 'Timeline', value: 'Q4 2024 · 3 months' },
          { label: 'Scope',    value: 'Product Design · Design Systems' },
        ].map(m => (
          <div key={m.label} className={styles.metaItem}>
            <span className={styles.metaLabel}>{m.label}</span>
            <span className={styles.metaValue}>{m.value}</span>
          </div>
        ))}
      </div>

      {/* ─── Opening ─── */}
      <section className={styles.section}>
        <div className={styles.prose}>
          <motion.p className={`text-body ${styles.lead}`} {...anim()}>
            An enterprise client in a heavily regulated industry flagged a hard requirement:
            they needed customer-managed encryption for their data pipelines on AWS Managed
            Service for Flink. Until then, encryption had been invisible and handled automatically
            with AWS-owned keys, with no controls exposed anywhere in the product.
          </motion.p>
          <motion.p className={`text-body ${styles.lead}`} {...anim(0.05)}>
            If we couldn't build this, we lost the deal. If we built it poorly, we'd make
            a complex security workflow even harder to navigate for developers. I was the sole
            product designer, working with front-end and back-end engineers, a product manager,
            and a technical writer. I owned the UX design end-to-end.
          </motion.p>
        </div>
      </section>

      {/* ─── The Problem ─── */}
      <section className={styles.section}>
        <motion.span className={`text-caption ${styles.sectionLabel}`} {...anim()}>
          The Problem
        </motion.span>
        <motion.h2 className={styles.sectionTitle} {...anim(0.05)}>
          Dense domain, two personas,<br />no existing flow
        </motion.h2>
        <motion.p className={`text-body ${styles.sectionIntro}`} {...anim(0.1)}>
          Data encryption on MSF covers two surfaces: data at rest and data in transit.
          Both had been locked to AWS-owned keys with no user-facing controls. CMKs carry
          IAM permission dependencies, are managed by a separate persona, and live in a
          different AWS service. Three things made this hard to design well.
        </motion.p>

        <div className={styles.challengeGrid}>
          {challenges.map((c, i) => (
            <motion.div key={c.num} className={styles.challengeCard} {...anim(i * 0.07)}>
              <span className={styles.challengeNum}>{c.num}</span>
              <h3 className={styles.challengeTitle}>{c.title}</h3>
              <p className={`text-body ${styles.challengeBody}`}>{c.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Key Decisions ─── */}
      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <motion.span className={`text-caption ${styles.sectionLabel}`} {...anim()}>
            Key Decisions
          </motion.span>
          <motion.h2 className={styles.sectionTitle} {...anim(0.05)}>
            Four choices that shaped the experience
          </motion.h2>

          <div className={styles.decisionList}>
            {decisions.map((d, i) => (
              <motion.div key={d.num} className={styles.decision} {...anim(i * 0.06)}>
                <span className={styles.decisionNum}>{d.num}</span>
                <div className={styles.decisionContent}>
                  <h3 className={styles.decisionTitle}>{d.title}</h3>
                  <p className={`text-body ${styles.decisionBody}`}>{d.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The Solution ─── */}
      <section className={styles.section}>
        <motion.span className={`text-caption ${styles.sectionLabel}`} {...anim()}>
          The Solution
        </motion.span>
        <motion.h2 className={styles.sectionTitle} {...anim(0.05)}>
          A progressive, compliance-ready encryption flow
        </motion.h2>
        <div className={styles.prose}>
          <motion.p className="text-body" {...anim(0.1)}>
            The shipped experience lives inside the MSF create and edit application flows.
            Developers see an "Encryption" container — divided into at-rest and in-transit —
            as part of the standard form. For at-rest: a radio selection between AWS-owned
            key and Customer managed key. Choosing CMK reveals an inline key picker with a
            search field, a Browse button for the modal, and a Create key shortcut for users
            who haven't set one up yet.
          </motion.p>
          <motion.p className="text-body" {...anim(0.12)}>
            The browse modal lists all accessible customer managed keys — alias, key ID, and
            enabled/disabled status — with search and pagination. For in-transit: the current
            TLS encryption state is surfaced as informational text. No controls. A compliance
            officer can confirm both surfaces are covered without the developer having to manage it.
          </motion.p>
        </div>

        <div className={styles.screenshotStack}>
          <motion.figure className={styles.screenshot} {...anim()}>
            <img
              src="/case-study-msf/encryption-container.png"
              alt="Create application form with encryption settings showing at-rest radio options and in-transit TLS notice"
            />
            <figcaption className={styles.caption}>
              The Encryption section in the create-application form. In-transit (informational)
              and at-rest (configurable) are co-located so compliance reviewers see both
              surfaces at once.
            </figcaption>
          </motion.figure>

          <motion.figure className={styles.screenshot} {...anim(0.05)}>
            <img
              src="/case-study-msf/cmk-browse-modal.png"
              alt="KMS key picker modal showing customer managed keys list with alias, key ID, and enabled status"
            />
            <figcaption className={styles.caption}>
              The KMS key picker modal: alias, key ID, enabled status, search, and pagination.
              Selecting a key and clicking Choose populates the ARN field.
            </figcaption>
          </motion.figure>

          <motion.figure className={styles.screenshot} {...anim(0.1)}>
            <img
              src="/case-study-msf/permission-error.png"
              alt="Permission error state with specific key ARN, IAM context in copyable block, and link to KMS console"
            />
            <figcaption className={styles.caption}>
              Permission error on application creation. The message names the specific key ARN,
              surfaces IAM context in a copyable block, and links to KMS — everything needed
              to hand off to a Key Administrator.
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ─── Impact ─── */}
      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <motion.span className={`text-caption ${styles.sectionLabel}`} {...anim()}>
            Impact
          </motion.span>
          <motion.h2 className={styles.sectionTitle} {...anim(0.05)}>
            The deal held. The work outlived the project.
          </motion.h2>

          <div className={styles.impactGrid}>
            {impacts.map((item, i) => (
              <motion.div key={item.headline} className={styles.impactCard} {...anim(i * 0.07)}>
                <h3 className={styles.impactHeadline}>{item.headline}</h3>
                <p className={`text-body ${styles.impactBody}`}>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Reflection ─── */}
      <section className={styles.section}>
        <motion.span className={`text-caption ${styles.sectionLabel}`} {...anim()}>
          Reflection
        </motion.span>
        <motion.h2 className={styles.sectionTitle} {...anim(0.05)}>
          What I'd do differently
        </motion.h2>
        <div className={styles.prose}>
          <motion.p className="text-body" {...anim(0.1)}>
            I wanted research sessions where a Key Administrator and a developer attempted
            to build a Flink application together, synchronously (testing the real-time
            handoff) and asynchronously (testing when the admin's setup happens separately
            and the developer picks up later). That second scenario is where the hardest
            friction likely lives, and I designed for it based on domain reasoning rather
            than observed behavior. I shipped without seeing it break.
          </motion.p>
          <motion.p className="text-body" {...anim(0.12)}>
            What this project changed in how I think about design: working across AWS service
            boundaries is different from working inside a single product. You're not just
            designing for your users, you're designing around decisions other teams have
            already made. Adopting the KMS browse UI felt like a concession in the moment.
            Looking back, it was the right trade, and it freed me to go deeper on error
            handling — which turned out to be where I had the most to contribute.
          </motion.p>
          <motion.p className="text-body" {...anim(0.14)}>
            The error message system getting picked up by the AWS design system wasn't
            something I planned for. But it was a reminder that durable work isn't always
            the feature itself. Sometimes it's what you build around the edge cases.
          </motion.p>
        </div>
      </section>

      {/* ─── Footer nav ─── */}
      <div className={styles.pageFooter}>
        <Link to="/#projects" className={styles.backFooter}>← Back to Work</Link>
      </div>

    </article>
  )
}
