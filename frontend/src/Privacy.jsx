import LegalPage, { Section, P, List } from "./components/LegalPage";

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <Section title="1. Introduction">
        <P>
          Kaizen Agentics ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect personal information when you visit our website, contact us, or engage our services.
        </P>
        <P>
          By using our website or submitting information to us, you acknowledge that you have read and understood this Privacy Policy.
        </P>
      </Section>

      <Section title="2. Information We Collect">
        <P>We may collect the following categories of information:</P>
        <List items={[
          "Contact details such as your name, email address, phone number, company name, and country",
          "Business and project information you submit through our contact forms or during engagements",
          "Communications you send to us, including emails and meeting notes",
          "Technical data such as IP address, browser type, device information, and pages visited",
          "Cookies and similar technologies used to operate and improve our website",
        ]} />
      </Section>

      <Section title="3. How We Use Your Information">
        <P>We use personal information to:</P>
        <List items={[
          "Respond to inquiries and provide information about our services",
          "Evaluate, scope, and deliver client engagements",
          "Communicate with you about projects, proposals, and support requests",
          "Operate, secure, and improve our website and internal processes",
          "Comply with legal obligations and enforce our agreements",
        ]} />
      </Section>

      <Section title="4. Legal Bases for Processing">
        <P>
          Where applicable data protection laws require a legal basis, we process personal information based on one or more of the following: your consent, performance of a contract, our legitimate interests in operating and growing our business, and compliance with legal obligations.
        </P>
      </Section>

      <Section title="5. Cookies and Analytics">
        <P>
          Our website may use cookies and similar technologies to maintain basic functionality, remember preferences, and understand how visitors use the site. You can control cookies through your browser settings. Disabling cookies may affect certain website features.
        </P>
      </Section>

      <Section title="6. How We Share Information">
        <P>
          We do not sell your personal information. We may share information with trusted service providers who assist us with hosting, email delivery, analytics, or project delivery, subject to appropriate confidentiality and security obligations. We may also disclose information if required by law or to protect our rights, users, or others.
        </P>
      </Section>

      <Section title="7. Data Security">
        <P>
          We implement reasonable administrative, technical, and organizational safeguards designed to protect personal information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
        </P>
      </Section>

      <Section title="8. Data Retention">
        <P>
          We retain personal information only for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required or permitted by law. Inquiry and engagement records are typically retained for the duration of the business relationship and for a reasonable period thereafter.
        </P>
      </Section>

      <Section title="9. International Transfers">
        <P>
          If you are located outside the country where we process data, your information may be transferred to and processed in jurisdictions that may have different data protection laws. Where required, we take appropriate steps to protect such transfers.
        </P>
      </Section>

      <Section title="10. Your Rights">
        <P>
          Depending on your location, you may have rights to access, correct, delete, restrict, or object to certain processing of your personal information, and to withdraw consent where processing is based on consent. To exercise these rights, contact us using the details below.
        </P>
      </Section>

      <Section title="11. Children's Privacy">
        <P>
          Our website and services are not directed to children under 16, and we do not knowingly collect personal information from children.
        </P>
      </Section>

      <Section title="12. Changes to This Policy">
        <P>
          We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page reflects the latest revision. We encourage you to review this page periodically.
        </P>
      </Section>

      <Section title="13. Contact Us">
        <P>
          For privacy-related questions or requests, contact Kaizen Agentics at{" "}
          <a href="mailto:support@kaizenagentics.com" style={{ color: "#00d4ff", textDecoration: "none" }}>
            support@kaizenagentics.com
          </a>.
        </P>
      </Section>
    </LegalPage>
  );
}
