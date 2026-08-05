import LegalPage, { Section, P, List } from "./components/LegalPage";

export default function Terms() {
  return (
    <LegalPage title="Terms & Conditions">
      <Section title="1. Agreement">
        <P>
          These Terms &amp; Conditions ("Terms") govern your access to and use of the website and services offered by Kaizen Agentics ("we," "us," or "our"). By accessing our website or engaging our services, you agree to these Terms.
        </P>
        <P>
          If you do not agree with these Terms, please do not use our website or services.
        </P>
      </Section>

      <Section title="2. About Kaizen Agentics">
        <P>
          Kaizen Agentics provides consulting, engineering, and delivery services in artificial intelligence, data engineering, software development, and related technology domains. Service scope, deliverables, timelines, and fees are defined in separate proposals, statements of work, or engagement agreements.
        </P>
      </Section>

      <Section title="3. Use of Our Website">
        <P>You agree to use our website only for lawful purposes. You must not:</P>
        <List items={[
          "Attempt to gain unauthorized access to our systems or data",
          "Interfere with the proper functioning of the website",
          "Use the website to transmit malicious code, spam, or unlawful content",
          "Copy, scrape, or republish website content without our prior written consent",
        ]} />
      </Section>

      <Section title="4. Professional Services">
        <P>
          Any professional services we provide are governed by the applicable proposal, statement of work, or master services agreement signed between you and Kaizen Agentics. If there is a conflict between these Terms and a signed agreement, the signed agreement will prevail for that engagement.
        </P>
      </Section>

      <Section title="5. Client Responsibilities">
        <P>When engaging our services, you agree to:</P>
        <List items={[
          "Provide accurate information required for discovery, delivery, and communication",
          "Grant timely access to systems, stakeholders, and materials reasonably needed for the project",
          "Review deliverables and provide feedback within agreed timelines",
          "Ensure you have the rights and permissions necessary for any data or materials you provide to us",
        ]} />
      </Section>

      <Section title="6. Intellectual Property">
        <P>
          Unless otherwise agreed in writing, Kaizen Agentics retains ownership of its pre-existing materials, frameworks, tools, methodologies, and know-how. Project-specific deliverables and ownership rights will be defined in the relevant engagement agreement.
        </P>
        <P>
          You may not use our name, logo, or project references in marketing or publicity without our prior written approval, except where disclosure is required by law.
        </P>
      </Section>

      <Section title="7. Confidentiality">
        <P>
          Each party may receive confidential information from the other in connection with an engagement. Both parties agree to protect such information and use it only for the purpose of the engagement, except as required by law or with the other party's consent.
        </P>
      </Section>

      <Section title="8. Fees and Payment">
        <P>
          Fees, invoicing schedules, expenses, and payment terms are specified in the applicable commercial agreement. Unless otherwise stated, invoices are due within the payment period indicated on the invoice. Late payments may result in suspension of services.
        </P>
      </Section>

      <Section title="9. Disclaimer">
        <P>
          Our website and general informational content are provided on an "as is" and "as available" basis. We do not warrant that the website will be uninterrupted, error-free, or free of harmful components. Nothing on this website constitutes legal, financial, or professional advice.
        </P>
      </Section>

      <Section title="10. Limitation of Liability">
        <P>
          To the fullest extent permitted by applicable law, Kaizen Agentics will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website. Our total liability related to the website, excluding obligations under a signed services agreement, is limited to the amount you paid us, if any, for access to the website in the twelve months preceding the claim.
        </P>
      </Section>

      <Section title="11. Termination">
        <P>
          We may suspend or restrict access to our website if we reasonably believe you have violated these Terms. Service engagements may be terminated in accordance with the applicable signed agreement.
        </P>
      </Section>

      <Section title="12. Changes to These Terms">
        <P>
          We may update these Terms from time to time. The "Last updated" date at the top of this page indicates when the Terms were last revised. Continued use of the website after changes are posted constitutes acceptance of the updated Terms.
        </P>
      </Section>

      <Section title="13. Contact">
        <P>
          For questions about these Terms, contact Kaizen Agentics at{" "}
          <a href="mailto:support@kaizenagentics.com" style={{ color: "#00d4ff", textDecoration: "none" }}>
            support@kaizenagentics.com
          </a>.
        </P>
      </Section>
    </LegalPage>
  );
}
