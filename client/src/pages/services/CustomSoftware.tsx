import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Code2, Puzzle, RefreshCw, ShieldCheck, Zap, Database } from "lucide-react";

export default function CustomSoftwarePage() {
  return (
    <ServicePageTemplate
      slug="custom-software"
      serviceType="Custom Software Development"
      pageTitle="Custom Software Development Brisbane"
      metaDescription="AdvanseIT is a bespoke software development company in Brisbane. We deliver custom software development in Australia and Queensland — AI-powered, scalable, and built for your workflows. ABN 12 656 409 850."
      keywords={[
        "custom software development Brisbane",
        "bespoke software Brisbane",
        "enterprise software development Australia",
        "software solutions Queensland",
        "tailored software Brisbane",
        "business automation software Australia",
        "API development Brisbane",
        "cloud software development Brisbane",
        "SaaS development Australia",
        "bespoke software development company",
        "custom software development Australia",
      ]}
      heroHeadline={
        <>
          Custom Software
          <br />
          <span className="text-[#00C8D4]">Built Around Your Business</span>
        </>
      }
      heroSubheading="AdvanseIT is a bespoke software development company in Brisbane building tailored solutions for unique business workflows. From ERP integrations and automation tools to cloud-native SaaS platforms — we deliver AI-powered custom software development in Australia that eliminates manual work and scales with your growth."
      schemaDescription="AdvanseIT delivers custom software development Australia, building bespoke software solutions including ERP integrations, business automation tools, cloud-native applications, and AI-powered software from Brisbane, Queensland."
      benefits={[
        {
          icon: <Puzzle size={20} />,
          title: "Built for Your Workflow",
          description:
            "Off-the-shelf software forces you to change your processes. Custom software is built around how your business actually works.",
        },
        {
          icon: <Code2 size={20} />,
          title: "AI-Powered Automation",
          description:
            "We embed AI into your software from day one — automating repetitive tasks, generating insights, and reducing operational costs.",
        },
        {
          icon: <Database size={20} />,
          title: "ERP & System Integration",
          description:
            "We integrate with your existing systems — Xero, MYOB, Salesforce, SAP, and custom databases — creating a unified data ecosystem.",
        },
        {
          icon: <RefreshCw size={20} />,
          title: "Scalable Cloud Architecture",
          description:
            "Built on AWS, Google Cloud, or Azure with microservices and serverless architecture that scales from 10 to 10,000 users without rewrites.",
        },
        {
          icon: <ShieldCheck size={20} />,
          title: "Security & Compliance",
          description:
            "Role-based access control, data encryption, audit logging, and compliance with Australian Privacy Act and ISO 27001 standards.",
        },
        {
          icon: <Zap size={20} />,
          title: "Rapid Iteration",
          description:
            "Agile delivery with 2-week sprints means you see working software quickly and can adapt requirements as your business evolves.",
        },
      ]}
      process={[
        {
          title: "Requirements Discovery",
          description:
            "Our custom software development team Brisbane runs structured workshops to map existing workflows, identify pain points, and define your software requirements in detail.",
        },
        {
          title: "Architecture & Design",
          description:
            "We design the system architecture, data models, and API contracts. You approve the technical design before development begins.",
        },
        {
          title: "Agile Development",
          description:
            "Development in 2-week sprints with working demos after each sprint. Full transparency via project management tools (Linear, Jira).",
        },
        {
          title: "Integration & Testing",
          description:
            "Integration with your existing systems, comprehensive automated testing, and user acceptance testing (UAT) with your team.",
        },
        {
          title: "Deployment & Handover",
          description:
            "Production deployment, staff training, documentation, and a support retainer to ensure a smooth transition and ongoing evolution.",
        },
      ]}
      technologies={[
        "Python",
        "Node.js",
        "TypeScript",
        "React",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Redis",
        "AWS",
        "Google Cloud",
        "Azure",
        "Docker",
        "Kubernetes",
        "REST APIs",
        "GraphQL",
        "Xero API",
        "Salesforce",
      ]}
      faqs={[
        {
          question: "When should I choose custom software over off-the-shelf?",
          answer:
            "Custom software development Australia makes sense when off-the-shelf tools don't fit your workflow, when you need deep integrations with existing systems, or when your process is a competitive advantage you want to protect. We'll give you an honest assessment during the free consultation.",
        },
        {
          question: "How much does custom software development Australia cost?",
          answer:
            "Custom software projects typically range from $20,000 AUD for a focused automation tool to $200,000+ for a full enterprise platform. We provide a detailed fixed-price quote after a discovery workshop.",
        },
        {
          question: "Can you integrate with our existing systems (Xero, Salesforce, etc.)?",
          answer:
            "Yes. We have extensive experience integrating with Xero, MYOB, Salesforce, HubSpot, SAP, and custom databases via REST APIs, webhooks, and direct database connections.",
        },
        {
          question: "Who owns the code?",
          answer:
            "You do. All source code, documentation, and intellectual property is transferred to you on final payment. We use Git repositories and provide full handover.",
        },
        {
          question: "Do you offer ongoing support after delivery?",
          answer:
            "Yes. Our custom software development Australia team offers monthly support and development retainers covering bug fixes, feature additions, security updates, and infrastructure management.",
        },
      ]}
    />
  );
}
