export const EXPERTISE_AREAS = [
  {
    slug: "agentic-ai-systems",
    title: "Agentic AI Systems",
    menuDesc: "Autonomous AI agent design & deployment",
    icon: "⟡",
    tagline: "Autonomous agents that reason, plan, and act across your business.",
    description:
      "We design and deploy agentic AI systems that go beyond chatbots — multi-step agents that use tools, access enterprise knowledge, and execute workflows with human-in-the-loop guardrails.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    bullets: [
      "Multi-agent orchestration for complex business processes",
      "Tool-using agents integrated with internal systems and APIs",
      "RAG pipelines and knowledge-grounded reasoning",
      "Human-in-the-loop guardrails for safe, auditable autonomy",
    ],
  },
  {
    slug: "data-engineering",
    title: "Data Engineering",
    menuDesc: "Modern data platform engineering",
    icon: "◈",
    tagline: "Modern data platforms built for scale, governance, and reliability.",
    description:
      "We build end-to-end data engineering solutions — from ingestion and transformation to lakehouse architecture and analytics-ready datasets that power confident decision-making.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    bullets: [
      "Medallion architecture pipelines on Delta Lake and cloud warehouses",
      "Batch and streaming ETL/ELT with Spark, ADF, and Airflow",
      "Lakehouse design, orchestration, and Unity Catalog governance",
      "BI-ready datasets for Power BI, Looker, and Tableau",
    ],
  },
  {
    slug: "machine-learning-ai",
    title: "Machine Learning & Artificial Intelligence",
    menuDesc: "Production ML & AI model development",
    icon: "◉",
    tagline: "Custom ML and AI models engineered for production impact.",
    description:
      "From predictive analytics to deep learning, we build machine learning solutions that are trained on your data, validated rigorously, and deployed into production with full MLOps lifecycle support.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80",
    bullets: [
      "Predictive models for forecasting, classification, and scoring",
      "Model training, evaluation, and hyperparameter tuning",
      "MLOps: CI/CD for models, monitoring, and retraining",
      "Deployment as APIs, batch jobs, or embedded services",
    ],
  },
  {
    slug: "software-development",
    title: "Software Development",
    menuDesc: "Enterprise application engineering",
    icon: "◎",
    tagline: "Robust applications engineered for performance and longevity.",
    description:
      "We build modern software products and internal platforms using proven architectures, clean code practices, and cloud-native patterns — designed to scale with your business.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    bullets: [
      "Full-stack web and enterprise application development",
      "Microservices and event-driven architecture",
      "Modern frontend and API-first product engineering",
      "CI/CD pipelines, testing, and production observability",
    ],
  },
  {
    slug: "api-automation",
    title: "API & Automation",
    menuDesc: "Integration & workflow automation",
    icon: "⟳",
    tagline: "Connect systems and eliminate manual work at scale.",
    description:
      "We design secure APIs and intelligent automation workflows that connect your CRMs, ERPs, and internal tools — turning repetitive processes into reliable, self-running systems.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    bullets: [
      "REST and GraphQL API design and development",
      "Workflow automation across CRMs, ERPs, and internal tools",
      "Event-driven pipelines triggered by real business events",
      "Third-party integrations, webhooks, and OpenAPI documentation",
    ],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    menuDesc: "Cloud-native platform solutions",
    icon: "☁",
    tagline: "Cloud-native platforms built for security, scale, and resilience.",
    description:
      "We architect and implement cloud solutions on Azure and modern cloud stacks — from migration and infrastructure to managed platforms that support AI, data, and software workloads.",
    image: "https://images.unsplash.com/photo-1451188502541-b5ac71093c44?auto=format&fit=crop&w=1400&q=80",
    bullets: [
      "Azure cloud architecture and platform modernization",
      "Infrastructure as code and secure cloud landing zones",
      "Databricks, Fabric, and managed data platform deployments",
      "Cost optimization, monitoring, and operational excellence",
    ],
  },
];

export function getExpertiseBySlug(slug) {
  return EXPERTISE_AREAS.find((area) => area.slug === slug);
}
