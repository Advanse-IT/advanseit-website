import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Bot, Brain, Zap, Database, ShieldCheck, BarChart3 } from "lucide-react";

export default function AISolutionsPage() {
  return (
    <ServicePageTemplate
      slug="ai-solutions"
      serviceType="Artificial Intelligence Solutions"
      pageTitle="AI Solutions & Development Brisbane"
      metaDescription="Custom AI chatbots, machine learning, and AI automation for Australian businesses. AdvanseIT makes enterprise AI accessible to SMEs from Brisbane. ABN 12 656 409 850."
      keywords={[
        "AI solutions Brisbane",
        "artificial intelligence development Brisbane",
        "AI integration Australia",
        "machine learning Brisbane",
        "AI automation Queensland",
        "AI consulting Brisbane",
        "AI chatbot development Australia",
        "LLM integration Brisbane",
        "GPT-4 integration Australia",
        "AI-first software Australia",
        "computer vision Brisbane",
        "NLP development Australia",
      ]}
      heroHeadline={
        <>
          AI Solutions
          <br />
          <span className="text-[#00C8D4]">Enterprise AI for Every Business</span>
        </>
      }
      heroSubheading="AdvanseIT builds custom AI solutions that make enterprise-grade artificial intelligence accessible to Australian SMEs. From AI chatbots and LLM integrations to machine learning models and computer vision — we deliver AI that creates real business value."
      schemaDescription="Custom artificial intelligence solutions for Australian businesses. AdvanseIT builds AI chatbots, machine learning models, NLP integrations, computer vision applications, and LLM-powered automation from Brisbane, Queensland."
      benefits={[
        {
          icon: <Bot size={20} />,
          title: "AI Chatbots & Virtual Assistants",
          description:
            "Custom chatbots powered by GPT-4, Claude, and Gemini for customer service automation, internal knowledge bases, and lead qualification.",
        },
        {
          icon: <Brain size={20} />,
          title: "Machine Learning Models",
          description:
            "Predictive analytics, recommendation engines, anomaly detection, and classification models trained on your business data.",
        },
        {
          icon: <Zap size={20} />,
          title: "AI Process Automation",
          description:
            "Automate document processing, data extraction, email triage, and repetitive workflows using AI — reducing costs and human error.",
        },
        {
          icon: <Database size={20} />,
          title: "RAG & Knowledge Bases",
          description:
            "Retrieval-Augmented Generation (RAG) systems that let your AI answer questions from your own documents, policies, and data.",
        },
        {
          icon: <ShieldCheck size={20} />,
          title: "Responsible AI",
          description:
            "We build AI systems with transparency, bias mitigation, and data privacy at the core — compliant with Australian Privacy Act requirements.",
        },
        {
          icon: <BarChart3 size={20} />,
          title: "AI Analytics & Insights",
          description:
            "Natural language interfaces for your data — ask questions in plain English and get instant insights from your business intelligence.",
        },
      ]}
      process={[
        {
          title: "AI Opportunity Assessment",
          description:
            "We identify the highest-value AI opportunities in your business — focusing on use cases with clear ROI and feasible data availability.",
        },
        {
          title: "Data & Feasibility Review",
          description:
            "We assess your existing data, systems, and infrastructure to determine the best AI approach and set realistic expectations.",
        },
        {
          title: "Prototype & Proof of Concept",
          description:
            "We build a working prototype quickly so you can see the AI in action and validate the approach before committing to full development.",
        },
        {
          title: "Production Development",
          description:
            "Full development with model training, API integration, testing, and deployment to your infrastructure or cloud environment.",
        },
        {
          title: "Monitoring & Improvement",
          description:
            "AI models require ongoing monitoring and retraining. We provide performance dashboards and continuous improvement retainers.",
        },
      ]}
      technologies={[
        "OpenAI GPT-4",
        "Anthropic Claude",
        "Google Gemini",
        "LangChain",
        "LlamaIndex",
        "Python",
        "TensorFlow",
        "PyTorch",
        "scikit-learn",
        "Hugging Face",
        "Pinecone",
        "Weaviate",
        "OpenCV",
        "AWS SageMaker",
        "Azure AI",
        "Google Vertex AI",
      ]}
      faqs={[
        {
          question: "What AI services does AdvanseIT offer?",
          answer:
            "We offer AI chatbot development, LLM integrations (GPT-4, Claude, Gemini), RAG knowledge base systems, machine learning model development, computer vision, NLP, AI process automation, and AI consulting.",
        },
        {
          question: "How much does an AI chatbot cost?",
          answer:
            "A basic AI chatbot integration starts from $5,000 AUD. A custom RAG-powered knowledge base or enterprise AI assistant typically ranges from $15,000–$50,000+ depending on complexity and data volume.",
        },
        {
          question: "Do I need a lot of data to use AI?",
          answer:
            "Not necessarily. Modern LLMs like GPT-4 and Claude work well with minimal training data using prompt engineering and RAG. For custom ML models, we'll assess your data during the free consultation and advise on feasibility.",
        },
        {
          question: "Is my data safe when using AI?",
          answer:
            "Yes. We design AI systems with data privacy as a priority. We can deploy AI models on your own infrastructure or use enterprise API tiers with no-training data policies. We comply with the Australian Privacy Act.",
        },
        {
          question: "Can AI integrate with my existing software?",
          answer:
            "Yes. We integrate AI into your existing CRM, ERP, website, app, or internal tools via APIs. Common integrations include Salesforce, HubSpot, Zendesk, Slack, and custom databases.",
        },
      ]}
    />
  );
}
