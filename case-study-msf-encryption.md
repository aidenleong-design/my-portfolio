---
title: "Bringing Encryption Under Developer Control on AWS Managed Service for Flink"
role: Product Designer
company: Amazon Web Services
timeline: "Q4 2024, ~3 months"
tags: [product design, developer tools, encryption, AWS, UX, design systems]
---

An enterprise client in a heavily regulated industry flagged a hard requirement: they needed customer-managed encryption for their data pipelines on AWS Managed Service for Flink (MSF). Until then, encryption had been invisible — handled automatically with AWS-owned keys, with no controls exposed anywhere in the product. No flow existed to change or configure any of it.

If we couldn't build this, we lost the deal. If we built it poorly, we'd create a complex security workflow even harder to navigate for the developers using it.

I was the sole product designer on the project, working with front-end and back-end engineers, a product manager, and a technical writer. I owned the UX design end to end.

---

## The Problem

Data encryption on MSF covers two surfaces: data at rest and data in transit. Both had been locked to AWS-owned keys with no user-facing controls. The new requirement was Customer Managed Keys (CMK) — keys that the customer owns and configures in Amazon Key Management Service (KMS), another AWS service.

The domain is genuinely dense. CMKs aren't just a field in a form. They carry IAM permission dependencies, are managed by a separate persona (a Key Administrator, not the developer creating the Flink application), and live in a different AWS service entirely. A developer trying to create an application with CMK encryption is, in many cases, dependent on work someone else has already done — or hasn't yet.

Three things made this hard to design well:

**Two personas with an invisible dependency.** The developer creates the application. The Key Administrator configures and grants access to the keys. These two people may never interact directly, but one's work gates the other's. Any error in that handoff falls on the developer's screen as a cryptic permission failure.

**Cross-service consistency constraints.** CMK selection required coordinating with the KMS design team. They had established patterns that the AWS design system team had already approved. I had design opinions of my own, but changing course would have fragmented the experience across AWS services and damaged a cross-team relationship I needed. I made the call to adopt the KMS pattern and put my energy into the parts I owned.

**No existing flow to start from.** This wasn't a redesign. There was no prior encryption UI. I was building from scratch into a dense, regulated domain.

---

## Key Decisions

### 1. Include in-transit encryption even though CMK isn't available there yet

My design included a section for encryption in transit — showing its current state (AWS-owned keys) even though CMK can't be applied there yet. The product manager pushed back: why surface a setting users can't change?

My argument: compliance officers in regulated industries need to see that transit encryption is covered, not just at-rest. Hiding it wouldn't simplify the experience, but it would create doubt during security reviews. Structurally, the container already existed; adding the transit row cost almost nothing and left the surface extensible when CMK support for transit ships later.

The PM agreed. That section shipped.

### 2. Progressive disclosure for CMK selection

I didn't want the key selection UI visible by default. Most users would choose AWS-owned keys; surfacing CMK controls upfront would add cognitive load to a path most people never take.

The solution: a radio selection between AWS-owned key and Customer managed key. Choosing CMK reveals the key picker inline. The default path stays clean. The CMK path reveals itself when needed.

### 3. Browse modal over dropdown for key selection

My first design used a dropdown to select CMK keys. After collaborating with the KMS design team, I replaced it with a browse button that opens a modal listing the user's available keys — with search and pagination.

The practical reason: enterprise users can have hundreds of keys in KMS. A dropdown doesn't scale to that inventory. A modal does.

I disagreed with some specifics of the selection UI the KMS team required. I chose to accept the constraint. Pushing back would have created a disjointed experience across services and spent trust I'd need later. I concentrated design effort where I had more control.

### 4. Error handling as a primary focus, not an afterthought

The two-persona model made permission errors high-probability. A developer might select a CMK key their Key Administrator hasn't yet granted MSF access to. Without specific error handling, they'd hit a generic failure state with no path forward.

I worked with the engineering team to map the error taxonomy — what types of permission failures could occur, what the user could actually do about each one, and what information they'd need to act. The framing I kept coming back to: the developer who hits this error is not the person who fixes it. The message has to work as a handoff document.

The shipped error message names the specific key ARN the developer lacks access to, surfaces the full IAM context (user, service, action, resource ARNs) in a copyable block, and tells the developer to send that block to their AWS administrator. There's also a direct link to the KMS console. The developer doesn't need to understand the error — they need to be able to forward it.

Those error message patterns were reviewed and adopted into the AWS design system — making them available to other service teams building similar permission-dependent flows.

---

## The Solution

The shipped experience lives inside the MSF create and edit application flows. Developers see an encryption settings container — labeled "Encryption - new" — as part of the standard create-application form.

For at-rest: two radio options — "Use AWS owned key" (default, no further action required) and "Use customer managed key." Selecting the CMK option reveals an inline key picker: a search field where the developer can type a key ARN directly, or hit "Browse" to open the KMS key modal. A "Create key" link is also surfaced for developers who haven't set up a key yet — a forward path so they don't hit a dead end.

The browse modal lists all the customer managed keys accessible in the developer's account: alias, key ID, and enabled/disabled status, with search and pagination for large key inventories. Once a key is selected and confirmed, the ARN populates the field and they continue through the rest of the form.

For in-transit: the section reads "By default, your data is encrypted by Transport Layer Security (TLS) during transit." No controls. No action required. A compliance officer reviewing the configuration can see both surfaces are covered without the developer needing to manage it.

If the selected key has a permission issue, the error message tells the developer exactly what happened — the specific key ARN they lack access to, the IAM context (user, service, action, resource), and what to do: "copy the following text and send it to your AWS administrator." The technical block is copyable. A link goes directly to the AWS KMS console.

That last detail — the copy-to-send-to-admin pattern — was the most deliberate design decision in the error state. The error isn't the developer's to fix; it's the Key Administrator's. The message had to bridge a person-to-person handoff, not just surface a status code.

![Create application form with encryption section](./screenshots/encryption-container.png)
*The Encryption section within the create-application form. In-transit (informational) and at-rest (configurable) are co-located so compliance reviewers see both surfaces at once.*

![CMK browse modal](./screenshots/cmk-browse-modal.png)
*The KMS key picker modal: alias, key ID, enabled status, search, and pagination. Selecting a key and clicking Choose populates the ARN field.*

![Permission error state](./screenshots/permission-error.png)
*Permission error on application creation. The message names the specific key ARN, surfaces the IAM context in a copyable block, and links directly to KMS — everything the developer needs to hand off to their Key Administrator.*

---

## Impact

The enterprise client stayed. Their compliance requirement was met, and the deal held.

The error message UX and UI patterns I designed were submitted to and accepted by the AWS design system. They're now available to other service teams building encryption or permission-dependent flows. The work outlived the project.

On adoption: MSF's CMK encryption support positioned the service for customers in regulated industries who had previously been blocked by the AWS-owned-key constraint. That was the strategic goal. The door is now open.

I don't have post-launch task success rates or error rate data — I shipped without a full research cycle. I laid the infrastructure for it: front-end event tagging for click and drop-off analytics, and an outlined research plan for the customer success and product teams to gather feedback from early adopters. If you're reading this after that data exists, ask me about it.

---

## Reflection

The thing I'd do differently: user research before launch, not after. Specifically, I wanted sessions where a Key Administrator and a developer attempted to build a Flink application together — synchronously (testing the real-time handoff) and asynchronously (testing when the admin's setup happens separately and the developer picks up later). That second scenario is where the hardest friction likely lives, and I designed for it based on domain reasoning rather than observed behavior.

I laid the foundation. But I shipped without seeing it break.

What this project changed in how I think about design: working across AWS service boundaries is different from working inside a single product. You're not just designing for your users — you're designing around the decisions other teams have already made, the trust relationships those teams have, and the patterns they've already shipped. Adopting the KMS browse UI felt like a concession in the moment. Looking back, it was the right trade, and it freed me to go deeper on error handling — which turned out to be where I had the most to contribute.

The error message system getting picked up by the AWS design system wasn't something I planned for. But it was a reminder that durable work isn't always the feature itself. Sometimes it's what you build around the edge cases.
