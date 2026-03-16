import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Users, Zap, ShieldCheck, RefreshCw, DollarSign, Globe } from "lucide-react";

export default function ITStaffingPage() {
  return (
    <ServicePageTemplate
      slug="it-staffing"
      serviceType="IT Staffing & Outsourcing"
      pageTitle="IT Staffing & Outsourcing Brisbane"
      metaDescription="Flexible IT staffing and outsourcing from Brisbane. Access pre-vetted developers, testers, designers, and project managers. AdvanseIT. ABN 12 656 409 850."
      keywords={[
        "IT staffing Brisbane",
        "IT outsourcing Brisbane",
        "IT recruitment Australia",
        "offshore IT staffing Brisbane",
        "dedicated development team Australia",
        "IT consulting Brisbane",
        "staff augmentation Australia",
        "hire developers Brisbane",
        "outsource software development Australia",
        "remote IT team Brisbane",
      ]}
      heroHeadline={
        <>
          IT Staffing &amp; Outsourcing
          <br />
          <span className="text-[#00C8D4]">Scale Your Team Fast</span>
        </>
      }
      heroSubheading="AdvanseIT provides flexible IT staffing and outsourcing solutions for Australian businesses. Access pre-vetted software engineers, QA testers, UI/UX designers, and project managers — on demand, without the overhead of permanent hiring."
      schemaDescription="IT staffing and outsourcing services for Australian businesses. AdvanseIT provides dedicated development teams, staff augmentation, and IT outsourcing with pre-vetted software engineers, QA testers, and project managers from Brisbane, Queensland."
      benefits={[
        {
          icon: <Users size={20} />,
          title: "Pre-Vetted Professionals",
          description:
            "Every professional goes through technical assessments, background checks, and communication screening before joining your team.",
        },
        {
          icon: <Zap size={20} />,
          title: "Fast Onboarding",
          description:
            "We can have qualified professionals working on your project within 1–2 weeks — far faster than traditional recruitment.",
        },
        {
          icon: <DollarSign size={20} />,
          title: "Cost-Effective",
          description:
            "Access skilled IT professionals at 40–60% lower cost than equivalent Australian permanent hires, with no recruitment fees or HR overhead.",
        },
        {
          icon: <RefreshCw size={20} />,
          title: "Flexible Engagement",
          description:
            "Scale up or down as your project demands. Engage for a specific project, a fixed term, or on an ongoing basis — no lock-in contracts.",
        },
        {
          icon: <Globe size={20} />,
          title: "Australian-Managed",
          description:
            "Brisbane-based management ensures clear communication, Australian business hours overlap, and accountability for delivery quality.",
        },
        {
          icon: <ShieldCheck size={20} />,
          title: "IP & Security Protected",
          description:
            "All team members sign NDAs and IP assignment agreements. We follow Australian Privacy Act requirements for data handling.",
        },
      ]}
      process={[
        {
          title: "Requirements Brief",
          description:
            "You share your technical requirements, team culture, and timeline. We define the role profile and skills matrix together.",
        },
        {
          title: "Candidate Shortlisting",
          description:
            "We shortlist 3–5 pre-vetted candidates from our talent pool. You receive CVs, technical assessment results, and communication samples.",
        },
        {
          title: "Interviews & Selection",
          description:
            "You interview shortlisted candidates and select your preferred team member(s). We facilitate the process and provide honest assessments.",
        },
        {
          title: "Onboarding",
          description:
            "We handle contracts, NDAs, tool access, and onboarding. Your new team member is ready to contribute within days.",
        },
        {
          title: "Ongoing Management",
          description:
            "AdvanseIT provides ongoing HR support, performance management, and quality oversight — so you can focus on your business.",
        },
      ]}
      technologies={[
        "React",
        "Vue.js",
        "Angular",
        "Node.js",
        "Python",
        "Java",
        ".NET",
        "PHP",
        "React Native",
        "Flutter",
        "AWS",
        "Azure",
        "DevOps",
        "Selenium",
        "Cypress",
        "Figma",
        "UI/UX Design",
        "Project Management",
      ]}
      faqs={[
        {
          question: "What roles can AdvanseIT staff?",
          answer:
            "We staff software engineers (frontend, backend, full-stack), mobile developers, QA/test engineers, UI/UX designers, DevOps engineers, data engineers, AI/ML engineers, and project managers.",
        },
        {
          question: "How quickly can I get a developer?",
          answer:
            "We can typically have a pre-vetted candidate ready for interview within 3–5 business days, and onboarded within 1–2 weeks of selection.",
        },
        {
          question: "What are the engagement models?",
          answer:
            "We offer three models: dedicated team (full-time professionals working exclusively on your project), staff augmentation (extending your existing team), and project outsourcing (we manage the full delivery).",
        },
        {
          question: "Is there a minimum engagement period?",
          answer:
            "Our minimum engagement is 3 months for dedicated team placements. For project-based work, there is no minimum — we scope each project individually.",
        },
        {
          question: "How do you ensure quality and accountability?",
          answer:
            "All team members are managed by our Brisbane-based team leads who conduct weekly performance reviews, code reviews, and client satisfaction checks. We replace underperforming team members at no additional cost.",
        },
      ]}
    />
  );
}
