import ServicePageTemplate from "@/components/ServicePageTemplate";
import { CheckCircle2, Zap, ShieldCheck, RefreshCw, BarChart3, Code2 } from "lucide-react";

export default function TestingPage() {
  return (
    <ServicePageTemplate
      slug="testing"
      serviceType="Software Testing & Quality Assurance"
      pageTitle="Professional Software Testing Brisbane"
      metaDescription="AdvanseIT provides software testing Brisbane services including QA, automation, performance, and security testing for reliable software."
      keywords={[
        "software testing Brisbane",
        "QA testing Brisbane",
        "automated testing Australia",
        "software quality assurance Brisbane",
        "test automation Queensland",
        "performance testing Brisbane",
        "security testing Australia",
        "Selenium testing Brisbane",
        "Cypress testing Australia",
        "Playwright testing Brisbane",
        "regression testing Australia",
        "UAT testing Brisbane",
      ]}
      heroHeadline={
        <>
          Software Testing &amp; QA
          <br />
          <span className="text-[#00C8D4]">Quality You Can Rely On</span>
        </>
      }
      heroSubheading="AdvanseIT provides comprehensive software testing Brisbane and quality assurance services for Australian businesses. From manual exploratory testing to fully automated CI/CD pipelines — our software testing Brisbane company finds bugs before your users do."
      schemaDescription="Comprehensive software testing and quality assurance services for Australian businesses. AdvanseIT provides manual testing, automated testing (Selenium, Cypress, Playwright), performance testing, security testing, and UAT from Brisbane, Queensland."
      benefits={[
        {
          icon: <CheckCircle2 size={20} />,
          title: "Manual & Exploratory Testing",
          description:
            "Experienced QA engineers test your software the way real users do — uncovering edge cases and usability issues that automated tools miss.",
        },
        {
          icon: <Code2 size={20} />,
          title: "Test Automation",
          description:
            "We build robust automated test suites using Selenium, Cypress, and Playwright that run in your CI/CD pipeline on every commit.",
        },
        {
          icon: <Zap size={20} />,
          title: "Performance & Load Testing",
          description:
            "We simulate thousands of concurrent users with k6, JMeter, and Locust to identify bottlenecks before they impact your users.",
        },
        {
          icon: <ShieldCheck size={20} />,
          title: "Security Testing",
          description:
            "OWASP Top 10 vulnerability assessments, penetration testing, and security code reviews to protect your application and user data.",
        },
        {
          icon: <RefreshCw size={20} />,
          title: "Regression Testing",
          description:
            "Automated regression suites ensure new features never break existing functionality — giving your team confidence to ship faster.",
        },
        {
          icon: <BarChart3 size={20} />,
          title: "Test Reporting & Metrics",
          description:
            "Detailed test reports, defect dashboards, and quality metrics give stakeholders full visibility into software quality at every stage.",
        },
      ]}
      process={[
        {
          title: "Test Strategy & Planning",
          description:
            "Our software testing Brisbane team reviews your application, defines test scope, and creates a detailed test strategy covering test types, tools, environments, and entry/exit criteria.",
        },
        {
          title: "Test Case Design",
          description:
            "We write comprehensive test cases covering functional requirements, edge cases, negative scenarios, and non-functional requirements.",
        },
        {
          title: "Test Execution",
          description:
            "Manual and automated test execution across browsers, devices, and environments. Defects are logged with detailed reproduction steps.",
        },
        {
          title: "Defect Management",
          description:
            "All defects are tracked in your project management tool (Jira, Linear) with severity ratings, screenshots, and developer-ready reproduction steps.",
        },
        {
          title: "Sign-off & Reporting",
          description:
            "Final test summary report with pass/fail metrics, defect statistics, and a quality sign-off recommendation for release.",
        },
      ]}
      technologies={[
        "Selenium",
        "Cypress",
        "Playwright",
        "Jest",
        "Vitest",
        "k6",
        "JMeter",
        "Locust",
        "Postman",
        "REST Assured",
        "OWASP ZAP",
        "BrowserStack",
        "Sauce Labs",
        "Jira",
        "TestRail",
      ]}
      faqs={[
        {
          question: "What software testing Brisbane businesses need — what does AdvanseIT offer?",
          answer:
            "We offer manual testing, automated testing (Selenium, Cypress, Playwright), performance and load testing, security testing (OWASP), API testing, regression testing, cross-browser testing, mobile testing, and user acceptance testing (UAT).",
        },
        {
          question: "Can you test our existing application?",
          answer:
            "Yes. Our software testing service in Brisbane can test any web or mobile application regardless of the technology stack. We start with a test assessment to understand your application and define the most effective testing approach.",
        },
        {
          question: "Do you offer ongoing QA retainers?",
          answer:
            "Yes. Our software testing team in Brisbane offers monthly QA retainers for continuous testing support — covering regression testing, new feature testing, and performance monitoring.",
        },
        {
          question: "How do you handle defect reporting?",
          answer:
            "All defects are logged in your preferred project management tool (Jira, Linear, GitHub Issues) with severity ratings, detailed reproduction steps, screenshots, and video recordings where applicable.",
        },
        {
          question: "Can you set up automated testing in our CI/CD pipeline?",
          answer:
            "Yes. We set up automated test suites that run on every pull request or commit using GitHub Actions, GitLab CI, CircleCI, or your existing CI/CD tool. This gives your team instant feedback on code quality.",
        },
      ]}
    />
  );
}
