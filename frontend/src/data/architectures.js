// ── ARCHITECTURE EXPLORER DATA ───────────────────────────────────────────────
// Pure data consumed by components/ArchitectureExplorer.jsx.
// `col` groups nodes into layout columns (left→right flow); nodes sharing a
// `col` render stacked in the same column (used for fan-in sources and fan-out
// destinations). `category` drives the node's accent color.

export const ARCHITECTURES = [
  {
    id: "lakehouse",
    label: "Azure Databricks Lakehouse",
    summary: "Multi-source enterprise data consolidated into a governed medallion lakehouse.",
    nodes: [
      { id: "src-oracle", label: "Oracle", col: 0, category: "source", detail: {
        purpose: "Operational source system holding core transactional records.",
        role: "Feeds structured, high-volume transactional data into the ingestion layer.",
        bestPractices: [
          "Use change data capture (CDC) instead of full extracts where possible",
          "Isolate extraction load from production OLTP workloads",
          "Version source schemas so downstream pipelines can detect drift",
        ],
        implementation: "Data Falcon connects to Oracle via managed, credential-vaulted linked services and schedules incremental CDC-based extraction rather than nightly full loads, minimizing impact on production systems.",
        relatedServices: ["Data Engineering", "Cloud Migration"],
      } },
      { id: "src-sqlserver", label: "SQL Server", col: 0, category: "source", detail: {
        purpose: "Line-of-business database powering internal applications.",
        role: "Supplies relational operational data alongside other source systems.",
        bestPractices: [
          "Extract via replication or CDC to avoid locking production tables",
          "Standardize timezone and encoding handling before ingestion",
          "Track row-level watermarks for reliable incremental loads",
        ],
        implementation: "Data Falcon configures incremental extraction using SQL Server change tracking, orchestrated centrally alongside every other source in the same ingestion pipeline.",
        relatedServices: ["Data Engineering", "Cloud Migration"],
      } },
      { id: "src-snowflake", label: "Snowflake", col: 0, category: "source", detail: {
        purpose: "Existing cloud data warehouse holding curated analytical datasets.",
        role: "Contributes pre-modeled analytical data into the unified lakehouse.",
        bestPractices: [
          "Reuse existing Snowflake transformations rather than re-deriving them",
          "Pull via secure data sharing where available instead of file export",
          "Reconcile row counts after each sync to catch silent drift",
        ],
        implementation: "Data Falcon integrates Snowflake as a first-class source using native connectors, letting existing curated tables land directly into the lakehouse's bronze layer without duplicating transformation logic.",
        relatedServices: ["Data Engineering", "Data Platform Modernization"],
      } },
      { id: "src-sap", label: "SAP", col: 0, category: "source", detail: {
        purpose: "Enterprise resource planning system of record for finance and operations.",
        role: "Provides master and transactional ERP data critical to enterprise reporting.",
        bestPractices: [
          "Use certified SAP extractors rather than direct table access",
          "Preserve SAP business logic (currency, unit conversions) at extraction time",
          "Coordinate extraction windows with SAP batch jobs to avoid contention",
        ],
        implementation: "Data Falcon extracts SAP data through certified connectors into Azure Data Factory, preserving business-context fields so finance and operations reporting stays accurate downstream.",
        relatedServices: ["Data Engineering", "Enterprise Integration"],
      } },
      { id: "adf", label: "Azure Data Factory", col: 1, category: "ingest", detail: {
        purpose: "Central orchestration layer that ingests and schedules movement of data from every source system.",
        role: "Coordinates extraction, scheduling, retries, and monitoring across all upstream systems.",
        bestPractices: [
          "Parameterize pipelines instead of duplicating them per source",
          "Centralize monitoring and alerting on pipeline failures",
          "Separate orchestration metadata from business data",
        ],
        implementation: "Data Falcon builds metadata-driven ADF pipelines that dynamically loop across source systems, so onboarding a new source system is a configuration change, not a new pipeline.",
        relatedServices: ["Data Engineering", "Cloud Migration"],
      } },
      { id: "landing", label: "Landing Zone", col: 2, category: "storage", detail: {
        purpose: "Raw, immutable copy of source data exactly as received.",
        role: "Acts as the auditable point of entry before any transformation occurs.",
        bestPractices: [
          "Never modify landed files in place — treat them as immutable",
          "Partition by ingestion date for efficient reprocessing",
          "Retain landing data long enough to support full reprocessing",
        ],
        implementation: "Data Falcon lands every source as Parquet/Delta files in Azure Data Lake Storage, partitioned by source and load date, giving a complete audit trail before any transformation begins.",
        relatedServices: ["Data Engineering", "Data Governance"],
      } },
      { id: "bronze", label: "Bronze", col: 3, category: "medallion-bronze", detail: {
        purpose: "Structured, schema-enforced representation of raw ingested data.",
        role: "First Delta Lake layer — validated and typed, but not yet business-ready.",
        bestPractices: [
          "Enforce schema-on-write with Delta Lake constraints",
          "Track ingestion metadata (source, timestamp, batch id) per row",
          "Never delete bronze history — append and version instead",
        ],
        implementation: "Data Falcon converts landed files into Delta tables with enforced schemas, capturing full lineage metadata so every downstream row can be traced back to its exact source batch.",
        relatedServices: ["Data Engineering", "Data Platform Modernization"],
      } },
      { id: "silver", label: "Silver", col: 4, category: "medallion-silver", detail: {
        purpose: "Cleansed, conformed, and joined data ready for cross-domain analysis.",
        role: "Resolves duplicates, standardizes formats, and enforces business rules.",
        bestPractices: [
          "Apply deduplication and data-quality rules consistently across domains",
          "Conform dimensions (customer, product, date) across all sources",
          "Version transformation logic alongside the data it produces",
        ],
        implementation: "Data Falcon builds PySpark transformation jobs that cleanse, deduplicate, and conform bronze data into consistent silver tables shared across every downstream analytics and AI use case.",
        relatedServices: ["Data Engineering", "AI & Machine Learning"],
      } },
      { id: "gold", label: "Gold", col: 5, category: "medallion-gold", detail: {
        purpose: "Business-ready, aggregated datasets modeled for consumption.",
        role: "Final curated layer feeding both BI dashboards and AI/ML workloads.",
        bestPractices: [
          "Model gold tables around business questions, not source structure",
          "Document ownership and refresh SLAs for every gold dataset",
          "Grant access at the gold layer, not upstream, to keep governance simple",
        ],
        implementation: "Data Falcon curates gold-layer star schemas aligned to specific business domains, governed end-to-end through Unity Catalog so every consumer sees the same trusted numbers.",
        relatedServices: ["Data Engineering", "Data Governance", "Business Intelligence"],
      } },
      { id: "powerbi", label: "Power BI", col: 6, category: "consumption", detail: {
        purpose: "Self-serve dashboards and reporting for business users.",
        role: "Presents gold-layer data through governed, refreshable reports.",
        bestPractices: [
          "Model semantic layers once and reuse across reports",
          "Use direct lake / import mode intentionally based on freshness needs",
          "Apply row-level security aligned with Unity Catalog permissions",
        ],
        implementation: "Data Falcon builds governed Power BI semantic models directly on gold-layer Delta tables, giving business users live, trusted dashboards without duplicating data.",
        relatedServices: ["Business Intelligence", "Data Governance"],
      } },
      { id: "ai", label: "AI", col: 6, category: "ai", detail: {
        purpose: "Predictive and generative AI models built on governed enterprise data.",
        role: "Consumes gold-layer data to power forecasting, scoring, and AI agents.",
        bestPractices: [
          "Train and serve models on the same governed gold tables BI uses",
          "Track model lineage back to the exact training dataset version",
          "Monitor for data drift between training and production data",
        ],
        implementation: "Data Falcon builds ML pipelines directly on gold-layer data using Databricks ML, deploying models and AI agents that stay in sync with the same trusted, governed data BI dashboards use.",
        relatedServices: ["AI & Machine Learning", "AI Agents & LLMs"],
      } },
    ],
    edges: [
      ["src-oracle", "adf"], ["src-sqlserver", "adf"], ["src-snowflake", "adf"], ["src-sap", "adf"],
      ["adf", "landing"], ["landing", "bronze"], ["bronze", "silver"], ["silver", "gold"],
      ["gold", "powerbi"], ["gold", "ai"],
    ],
  },

  {
    id: "fabric",
    label: "Microsoft Fabric",
    summary: "End-to-end analytics on a single, unified Fabric workspace.",
    nodes: [
      { id: "oracle", label: "Oracle", col: 0, category: "source", detail: {
        purpose: "Operational source system holding core transactional records.",
        role: "Origin point for data flowing into the Fabric ecosystem.",
        bestPractices: [
          "Use incremental extraction over full loads wherever possible",
          "Document source ownership and change-notification process",
          "Validate schema before every ingestion run",
        ],
        implementation: "Data Falcon connects Oracle to Fabric using Data Factory pipelines native to the Fabric workspace, keeping ingestion and transformation in a single governed environment.",
        relatedServices: ["Data Engineering", "Microsoft Fabric Modernization"],
      } },
      { id: "pipeline", label: "Pipeline", col: 1, category: "ingest", detail: {
        purpose: "Fabric-native orchestration for moving and scheduling data loads.",
        role: "Extracts and lands source data on a governed schedule.",
        bestPractices: [
          "Parameterize pipelines to support multiple sources with one template",
          "Centralize failure alerting inside the Fabric workspace",
          "Keep orchestration logic separate from transformation logic",
        ],
        implementation: "Data Falcon builds parameterized Fabric Data Factory pipelines that extract from source systems on a defined schedule, with built-in monitoring and retry logic.",
        relatedServices: ["Data Engineering", "Microsoft Fabric Modernization"],
      } },
      { id: "lakehouse", label: "Lakehouse", col: 2, category: "storage", detail: {
        purpose: "Unified storage layer combining file-based and tabular data.",
        role: "Landing and staging point for raw and lightly processed data.",
        bestPractices: [
          "Use Delta format for all managed tables inside the Lakehouse",
          "Separate raw and cleansed zones within the same Lakehouse",
          "Apply consistent naming conventions across tables and files",
        ],
        implementation: "Data Falcon structures the Fabric Lakehouse into clear raw and cleansed zones, using Delta tables throughout so both engineers and analysts query the same underlying data.",
        relatedServices: ["Data Platform Modernization", "Microsoft Fabric Modernization"],
      } },
      { id: "notebook", label: "Notebook", col: 3, category: "transform", detail: {
        purpose: "Code-based transformation environment for cleansing and shaping data.",
        role: "Applies business logic and data-quality rules to Lakehouse data.",
        bestPractices: [
          "Version notebook logic alongside the data it produces",
          "Modularize transformation logic into reusable functions",
          "Log data-quality check results for every run",
        ],
        implementation: "Data Falcon writes PySpark notebooks inside Fabric to cleanse, join, and conform Lakehouse data, with data-quality checks logged on every execution.",
        relatedServices: ["Data Engineering", "Microsoft Fabric Modernization"],
      } },
      { id: "warehouse", label: "Warehouse", col: 4, category: "storage", detail: {
        purpose: "SQL-native analytical store for business-ready datasets.",
        role: "Hosts curated, query-optimized tables for reporting and analysis.",
        bestPractices: [
          "Model warehouse tables around business domains, not source systems",
          "Index and partition large fact tables for query performance",
          "Enforce access control at the warehouse layer",
        ],
        implementation: "Data Falcon curates Fabric Warehouse tables modeled around specific business domains, giving analysts fast, governed SQL access to trusted data.",
        relatedServices: ["Data Platform Modernization", "Data Governance"],
      } },
      { id: "semantic-model", label: "Semantic Model", col: 5, category: "medallion-gold", detail: {
        purpose: "Governed business-metric layer sitting between raw tables and reports.",
        role: "Defines shared measures, relationships, and calculations once, for every report.",
        bestPractices: [
          "Define measures once centrally rather than per-report",
          "Document every measure's business definition",
          "Apply row-level security consistently across the model",
        ],
        implementation: "Data Falcon builds a single Fabric Semantic Model per business domain, centralizing metric definitions so every Power BI report calculates numbers the same way.",
        relatedServices: ["Business Intelligence", "Data Governance"],
      } },
      { id: "powerbi-fabric", label: "Power BI", col: 6, category: "consumption", detail: {
        purpose: "Self-serve dashboards and reporting for business users.",
        role: "Presents the semantic model's governed metrics to end users.",
        bestPractices: [
          "Build reports directly on the semantic model, not raw tables",
          "Reuse visuals and templates across similar reports",
          "Monitor report usage to retire stale dashboards",
        ],
        implementation: "Data Falcon builds Power BI reports directly against the Fabric Semantic Model, giving business users live, governed dashboards inside the same Fabric environment as the data.",
        relatedServices: ["Business Intelligence", "Microsoft Fabric Modernization"],
      } },
    ],
    edges: [
      ["oracle", "pipeline"], ["pipeline", "lakehouse"], ["lakehouse", "notebook"],
      ["notebook", "warehouse"], ["warehouse", "semantic-model"], ["semantic-model", "powerbi-fabric"],
    ],
  },

  {
    id: "unity-catalog",
    label: "Unity Catalog Migration",
    summary: "Structured migration from a legacy Hive Metastore to governed Unity Catalog.",
    nodes: [
      { id: "hive", label: "Hive Metastore", col: 0, category: "source", detail: {
        purpose: "Legacy metadata store tracking table and schema definitions.",
        role: "Starting point of the migration — holds today's table, schema, and permission definitions.",
        bestPractices: [
          "Inventory every table, view, and permission before touching anything",
          "Identify orphaned or unused tables before migrating them",
          "Capture current access patterns as a baseline for validation",
        ],
        implementation: "Data Falcon runs a full inventory pass across the Hive Metastore, cataloging every table, schema, and grant as the baseline for migration planning.",
        relatedServices: ["Unity Catalog Migration", "Data Governance"],
      } },
      { id: "assessment", label: "Assessment", col: 1, category: "process", detail: {
        purpose: "Structured evaluation of migration scope, risk, and dependencies.",
        role: "Determines what needs to move, in what order, and what could break.",
        bestPractices: [
          "Classify tables by business criticality before sequencing migration",
          "Identify downstream jobs and dashboards dependent on each table",
          "Flag legacy permission patterns that don't map cleanly to Unity Catalog",
        ],
        implementation: "Data Falcon runs Databricks' assessment tooling against the estate to surface dependency risk and permission gaps, producing a prioritized, risk-ranked migration plan before any table moves.",
        relatedServices: ["Unity Catalog Migration", "Enterprise Architecture Advisory"],
      } },
      { id: "ucx", label: "UCX", col: 2, category: "process", detail: {
        purpose: "Databricks' migration toolkit for automating Unity Catalog conversion.",
        role: "Executes the mechanical work of converting Hive tables and permissions.",
        bestPractices: [
          "Run UCX in dry-run mode before executing any real migration",
          "Migrate in small, validated batches, not the whole estate at once",
          "Keep the original Hive Metastore intact until validation completes",
        ],
        implementation: "Data Falcon runs UCX in phased batches, validating each batch's table integrity and permissions before proceeding to the next, keeping a rollback path available throughout.",
        relatedServices: ["Unity Catalog Migration", "Data Engineering"],
      } },
      { id: "migration", label: "Migration", col: 3, category: "process", detail: {
        purpose: "The actual movement of table definitions and data into Unity Catalog.",
        role: "Converts external and managed Hive tables into Unity Catalog-governed tables.",
        bestPractices: [
          "Preserve table history and schema evolution during conversion",
          "Reconcile row counts and checksums after every migrated batch",
          "Communicate migration windows to downstream consumers in advance",
        ],
        implementation: "Data Falcon migrates tables batch by batch with automated row-count and checksum reconciliation after each run, so discrepancies are caught immediately, not discovered downstream.",
        relatedServices: ["Unity Catalog Migration", "Data Engineering"],
      } },
      { id: "permissions", label: "Permissions", col: 4, category: "governance", detail: {
        purpose: "Access control model governing who can see and use which data.",
        role: "Re-establishes least-privilege access under Unity Catalog's model.",
        bestPractices: [
          "Model permissions around groups, not individual users",
          "Map legacy grants to Unity Catalog's three-level namespace deliberately",
          "Audit effective access after cutover, not just configured grants",
        ],
        implementation: "Data Falcon redesigns access control around Unity Catalog's catalog-schema-table hierarchy and Azure AD groups, replacing ad-hoc legacy grants with an auditable least-privilege model.",
        relatedServices: ["Data Governance", "Unity Catalog Migration"],
      } },
      { id: "catalog", label: "Catalog", col: 5, category: "governance", detail: {
        purpose: "Unified governance layer spanning every workspace and cloud.",
        role: "Provides the single source of truth for table discovery and access.",
        bestPractices: [
          "Organize catalogs around business domains, not team boundaries",
          "Tag sensitive data consistently for policy enforcement",
          "Centralize catalog administration under a dedicated governance owner",
        ],
        implementation: "Data Falcon structures Unity Catalog around business domains with consistent tagging for sensitive fields, giving every workspace a single, shared governance model.",
        relatedServices: ["Data Governance", "Unity Catalog Migration"],
      } },
      { id: "lineage", label: "Lineage", col: 6, category: "governance", detail: {
        purpose: "End-to-end tracking of how data moves and transforms across the platform.",
        role: "Gives visibility into upstream sources and downstream consumers of every table.",
        bestPractices: [
          "Enable automatic lineage capture rather than relying on manual documentation",
          "Use lineage to assess blast radius before schema changes",
          "Surface lineage to data consumers, not just engineering",
        ],
        implementation: "Data Falcon enables Unity Catalog's automatic lineage tracking across every pipeline and notebook, giving teams instant visibility into the impact of any proposed change.",
        relatedServices: ["Data Governance", "Unity Catalog Migration"],
      } },
      { id: "production", label: "Production", col: 7, category: "consumption", detail: {
        purpose: "Fully governed, production-ready Unity Catalog environment.",
        role: "The end state — every table, permission, and pipeline running under unified governance.",
        bestPractices: [
          "Decommission the legacy Hive Metastore only after a full validation window",
          "Monitor query performance post-migration against pre-migration baselines",
          "Establish an ongoing governance review cadence, not a one-time project",
        ],
        implementation: "Data Falcon runs a parallel validation period comparing production workloads on Unity Catalog against historical Hive Metastore baselines before formally decommissioning the legacy metastore.",
        relatedServices: ["Unity Catalog Migration", "Data Governance"],
      } },
    ],
    edges: [
      ["hive", "assessment"], ["assessment", "ucx"], ["ucx", "migration"], ["migration", "permissions"],
      ["permissions", "catalog"], ["catalog", "lineage"], ["lineage", "production"],
    ],
  },

  {
    id: "enterprise-ai",
    label: "Enterprise AI",
    summary: "Unstructured enterprise documents transformed into a governed AI chat experience.",
    nodes: [
      { id: "documents", label: "Documents", col: 0, category: "source", detail: {
        purpose: "Unstructured enterprise content — contracts, policies, reports, manuals.",
        role: "Raw source material that AI Agents ultimately reason over.",
        bestPractices: [
          "Classify documents by sensitivity before ingestion",
          "Track document versioning so answers can cite the current version",
          "Exclude documents outside their approved retention window",
        ],
        implementation: "Data Falcon builds a document ingestion pipeline that classifies content by sensitivity and business domain before it ever reaches an embedding model.",
        relatedServices: ["AI Agents & LLMs", "Data Governance"],
      } },
      { id: "ocr", label: "OCR", col: 1, category: "process", detail: {
        purpose: "Extracts machine-readable text from scanned or image-based documents.",
        role: "Converts unstructured document images into structured, searchable text.",
        bestPractices: [
          "Validate OCR accuracy on a sample before bulk processing",
          "Preserve document layout and structure where it carries meaning",
          "Flag low-confidence extractions for human review",
        ],
        implementation: "Data Falcon uses layout-aware OCR to preserve table and section structure from source documents, flagging low-confidence extractions for review before they enter the AI pipeline.",
        relatedServices: ["AI Agents & LLMs", "Intelligent Document Processing"],
      } },
      { id: "embeddings", label: "Embeddings", col: 2, category: "ai", detail: {
        purpose: "Numerical vector representations capturing document meaning.",
        role: "Converts extracted text into a form that can be semantically searched.",
        bestPractices: [
          "Chunk documents thoughtfully — too large loses precision, too small loses context",
          "Version embedding models so re-indexing is a controlled process",
          "Attach source metadata to every embedded chunk for citation",
        ],
        implementation: "Data Falcon chunks documents using context-aware splitting and generates embeddings with metadata attached to every chunk, so every AI answer can be traced back to its exact source passage.",
        relatedServices: ["AI Agents & LLMs", "AI & Machine Learning"],
      } },
      { id: "vector-db", label: "Vector Database", col: 3, category: "storage", detail: {
        purpose: "Specialized storage optimized for high-speed similarity search over embeddings.",
        role: "Retrieves the most relevant document chunks for a given query in real time.",
        bestPractices: [
          "Apply access-control filters at retrieval time, not just at the source",
          "Monitor retrieval relevance, not just system uptime",
          "Re-index incrementally as documents change rather than in full rebuilds",
        ],
        implementation: "Data Falcon deploys a governed vector database with retrieval-time permission filtering, so the AI agent only ever surfaces content the requesting user is authorized to see.",
        relatedServices: ["AI Agents & LLMs", "Data Governance"],
      } },
      { id: "llm", label: "LLM", col: 4, category: "ai", detail: {
        purpose: "Large language model that reasons over retrieved context to generate answers.",
        role: "Synthesizes retrieved document chunks into a coherent, grounded response.",
        bestPractices: [
          "Ground every response in retrieved context — avoid relying on model memory alone",
          "Evaluate response quality against a labeled test set before launch",
          "Log prompts and responses for ongoing quality monitoring",
        ],
        implementation: "Data Falcon grounds every LLM response in retrieved enterprise content via retrieval-augmented generation, with automated evaluation against a labeled question set before any model or prompt change ships.",
        relatedServices: ["AI Agents & LLMs", "AI & Machine Learning"],
      } },
      { id: "ai-agent", label: "AI Agent", col: 5, category: "ai", detail: {
        purpose: "Orchestration layer that plans multi-step actions, not just single answers.",
        role: "Coordinates retrieval, reasoning, and tool calls to complete a task end-to-end.",
        bestPractices: [
          "Constrain agent tool access to exactly what the task requires",
          "Log every tool call and decision step for auditability",
          "Set explicit fallback behavior for low-confidence situations",
        ],
        implementation: "Data Falcon builds task-scoped AI Agents with tightly constrained tool access and full decision logging, so every automated action is explainable and auditable after the fact.",
        relatedServices: ["AI Agents & LLMs", "AI & Machine Learning"],
      } },
      { id: "enterprise-chat", label: "Enterprise Chat", col: 6, category: "consumption", detail: {
        purpose: "The governed conversational interface end users interact with.",
        role: "Delivers grounded, permission-aware answers directly to business users.",
        bestPractices: [
          "Surface citations alongside every answer, not just the answer itself",
          "Respect the same access controls in chat as in the source systems",
          "Collect user feedback to continuously improve retrieval quality",
        ],
        implementation: "Data Falcon delivers Enterprise Chat with inline citations back to source documents and per-user access enforcement, so every answer is both trustworthy and traceable.",
        relatedServices: ["AI Agents & LLMs", "Business Intelligence"],
      } },
    ],
    edges: [
      ["documents", "ocr"], ["ocr", "embeddings"], ["embeddings", "vector-db"],
      ["vector-db", "llm"], ["llm", "ai-agent"], ["ai-agent", "enterprise-chat"],
    ],
  },
];
