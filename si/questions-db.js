// IS5126 Quiz — question database. Edit to add/remove/edit questions.
// Schema: id, chapter, chapterTitle, text, options, correct (string or string[] for multi-select), explainCorrect, explainOptions (per-option: what that option means / why right or wrong)

const QUIZ_DB = [
  {
    "id": "L1-Q1",
    "chapter": "l1",
    "chapterTitle": "Lecture 1 — Course Introduction",
    "text": "What is the primary goal of IS5126?",
    "options": {
      "A": "A deep-dive Statistics course",
      "B": "A programming bootcamp for Python",
      "C": "Bridging technical skills and practical applications in real-world scenarios through hands-on analytics",
      "D": "A theory-heavy ML course with mathematical derivations"
    },
    "correct": "C",
    "explainCorrect": "The course bridges the divide between technical skills and practical applications.",
    "explainOptions": {
      "A": "A deep-dive Statistics course would focus on theory and methods; IS5126 is applied analytics that bridges technical skills and real-world applications.",
      "B": "The course expects Python comfort but is not a programming bootcamp; the goal is hands-on analytics in real-world scenarios.",
      "C": "The course bridges the divide between technical skills and practical applications.",
      "D": "A theory-heavy ML course would emphasize derivations; IS5126 emphasizes application and hands-on analytics, not pure theory."
    }
  },
  {
    "id": "L1-Q2",
    "chapter": "l1",
    "chapterTitle": "Lecture 1 — Course Introduction",
    "text": "Which is NOT an expectation from students?",
    "options": {
      "A": "Prior exposure to statistics and basic ML",
      "B": "Comfort with Python",
      "C": "Everything is step-by-step spoon-fed",
      "D": "Focus on why a method is used"
    },
    "correct": "C",
    "explainCorrect": "The course is NOT spoon-fed.",
    "explainOptions": {
      "A": "Prior exposure to stats and ML is an expectation, so this is something the course does expect — the question asks which is NOT expected.",
      "B": "Comfort with Python is expected; the question asks for the one thing that is NOT an expectation.",
      "C": "The course is NOT spoon-fed; students are expected to engage actively, so 'everything spoon-fed' is not an expectation.",
      "D": "Focus on why a method is used is expected; the question asks which is NOT expected."
    }
  },
  {
    "id": "L1-Q3",
    "chapter": "l1",
    "chapterTitle": "Lecture 1 — Course Introduction",
    "text": "What are the six data quality dimensions?",
    "options": {
      "A": "Accuracy, Precision, Recall, F1, Completeness, Validity",
      "B": "Completeness, Uniqueness, Validity, Consistency, Timeliness, Accuracy",
      "C": "Mean, Median, Mode, Variance, Skewness, Kurtosis",
      "D": "Train, Test, Validation, Drift, Leakage, Bias"
    },
    "correct": "B",
    "explainCorrect": "Completeness, Uniqueness, Validity, Consistency, Timeliness, Accuracy.",
    "explainOptions": {
      "A": "Accuracy, Precision, Recall, and F1 are model/evaluation metrics, not the six data quality dimensions (which are about the data itself).",
      "B": "Completeness, Uniqueness, Validity, Consistency, Timeliness, Accuracy.",
      "C": "Mean, median, mode, variance, skewness, kurtosis are summary statistics for describing distributions, not data quality dimensions.",
      "D": "Train/test/validation and drift/leakage/bias refer to ML workflow and model issues, not the six dimensions of data quality."
    }
  },
  {
    "id": "L1-Q4",
    "chapter": "l1",
    "chapterTitle": "Lecture 1 — Course Introduction",
    "text": "For statistical inference with 15% missing data, what imputation is recommended?",
    "options": {
      "A": "Simple imputation (mean/median)",
      "B": "Multiple Imputation (MI)",
      "C": "Drop all rows with missing",
      "D": "Forward fill"
    },
    "correct": "B",
    "explainCorrect": "For 5–20% missing in statistical inference, use Multiple Imputation. Simple imputation underestimates SEs.",
    "explainOptions": {
      "A": "Simple imputation (mean/median) is fine for ML with low missing, but for statistical inference with 5–20% missing it underestimates standard errors; MI is recommended.",
      "B": "For 5–20% missing in statistical inference, use Multiple Imputation. Simple imputation underestimates SEs.",
      "C": "Dropping all rows with missing loses data and can bias inference; with 15% missing, Multiple Imputation is the recommended approach.",
      "D": "Forward fill is a time-series imputation method; for general statistical inference with 15% missing, Multiple Imputation is the right tool."
    }
  },
  {
    "id": "L1-Q6",
    "chapter": "l1",
    "chapterTitle": "Lecture 1 — Course Introduction",
    "text": "Using AI tools without proper acknowledgement is equivalent to:",
    "options": {
      "A": "Nothing — AI use is always allowed",
      "B": "Lifting/paraphrasing without citation — same sanctions",
      "C": "A warning only",
      "D": "Redo the assignment"
    },
    "correct": "B",
    "explainCorrect": "Same as plagiarism — attracts same sanctions.",
    "explainOptions": {
      "A": "AI use is allowed only with proper acknowledgement; unacknowledged use is treated like plagiarism, not 'nothing'.",
      "B": "Same as plagiarism — attracts same sanctions.",
      "C": "It is not just a warning; policy treats it the same as lifting or paraphrasing without citation, with the same sanctions.",
      "D": "Redo may be an outcome in some cases, but the policy equivalence is to plagiarism (same sanctions), not only redo."
    }
  },
  {
    "id": "L1-Q7",
    "chapter": "l1",
    "chapterTitle": "Lecture 1 — Course Introduction",
    "text": "For ML with &lt;5% missing (e.g., churn prediction), what is acceptable?",
    "options": {
      "A": "Multiple Imputation only",
      "B": "Simple imputation (e.g., median)",
      "C": "Drop all missing rows",
      "D": "Leave as NaN"
    },
    "correct": "B",
    "explainCorrect": "For ML/exploratory with &lt;5% missing, simple imputation OK.",
    "explainOptions": {
      "A": "Multiple Imputation is recommended for statistical inference with 5–20% missing; for ML with &lt;5% missing, simple imputation is acceptable and simpler.",
      "B": "For ML/exploratory with &lt;5% missing, simple imputation OK.",
      "C": "Dropping all missing rows throws away data unnecessarily; with low missing, simple imputation is preferred.",
      "D": "Leaving as NaN usually breaks ML pipelines; with &lt;5% missing, imputing (e.g. median) is the acceptable approach."
    }
  },
  {
    "id": "L1-Q8",
    "chapter": "l1",
    "chapterTitle": "Lecture 1 — Course Introduction",
    "text": "Applied Analytics = ?",
    "options": {
      "A": "Pure theoretical statistics",
      "B": "Turning data into decisions that drive business value",
      "C": "Software engineering only",
      "D": "Data visualization only"
    },
    "correct": "B",
    "explainCorrect": "Turning data into decisions that drive business value.",
    "explainOptions": {
      "A": "Pure theoretical statistics is the opposite of applied analytics; the course focuses on turning data into business decisions.",
      "B": "Turning data into decisions that drive business value.",
      "C": "Software engineering supports analytics but applied analytics is broader: data → decisions → value.",
      "D": "Visualization is one tool; applied analytics is the full pipeline from data to decisions that drive value."
    }
  },
  {
    "id": "L1-Q9",
    "chapter": "l1",
    "chapterTitle": "Lecture 1 — Course Introduction",
    "text": "Academic dishonesty (plagiarism) in IS5126 typically results in:",
    "options": {
      "A": "Warning and re-submission",
      "B": "Failing the entire course ('F')",
      "C": "Zero on the assignment only",
      "D": "Mandatory tutorial"
    },
    "correct": "B",
    "explainCorrect": "Moderate offense → fail entire course.",
    "explainOptions": {
      "A": "Warning and re-submission is a lighter outcome; for plagiarism the course policy is fail entire course.",
      "B": "Moderate offense → fail entire course.",
      "C": "Zero on the assignment only would be a lesser sanction; policy specifies failing the entire course.",
      "D": "Mandatory tutorial is not the stated outcome; academic dishonesty leads to failing the course."
    }
  },
  {
    "id": "L1-Q10",
    "chapter": "l1",
    "chapterTitle": "Lecture 1 — Course Introduction",
    "text": "If review_comment is 59% empty, correct approach for sentiment analysis?",
    "options": {
      "A": "Simple imputation",
      "B": "Label as \"Exploratory — based on 41% of reviews with comments\"",
      "C": "Drop all without comments",
      "D": "Multiple Imputation on text"
    },
    "correct": "B",
    "explainCorrect": "Cannot generalize; label as exploratory based on 41% with comments.",
    "explainOptions": {
      "A": "Simple imputation fills missing text; with 59% missing you cannot generalize to all reviews, so labeling as exploratory is required.",
      "B": "Cannot generalize; label as exploratory based on 41% with comments.",
      "C": "Dropping 59% loses most data and doesn't address the need to be transparent about coverage.",
      "D": "Multiple imputation on free text is not standard; the right approach is to label the analysis as exploratory given 41% coverage."
    }
  },
  {
    "id": "L1-Q12",
    "chapter": "l1",
    "chapterTitle": "Lecture 1 — Course Introduction",
    "text": "SSID system is used for:",
    "options": {
      "A": "Data quality",
      "B": "Detecting code plagiarism",
      "C": "Model deployment",
      "D": "Feature store"
    },
    "correct": "B",
    "explainCorrect": "Student Submission Integrity Diagnosis — detects code plagiarism.",
    "explainOptions": {
      "A": "Data quality is a separate concern; SSID is specifically for submission integrity and plagiarism detection.",
      "B": "Student Submission Integrity Diagnosis — detects code plagiarism.",
      "C": "Model deployment is unrelated; SSID is used to check student code for plagiarism.",
      "D": "Feature store is for ML features; SSID is the system that diagnoses code submission integrity."
    }
  },
  {
    "id": "L1-Q13",
    "chapter": "l1",
    "chapterTitle": "Lecture 1 — Course Introduction",
    "text": "Course journey (key takeaways):",
    "options": {
      "A": "Stats only",
      "B": "EDA → ML/DL → Deploy",
      "C": "Programming only",
      "D": "Theory only"
    },
    "correct": "B",
    "explainCorrect": "Journey: EDA → ML/DL → Deploy. Data quality first, 6 dimensions.",
    "explainOptions": {
      "A": "The course covers more than stats; the journey is EDA → ML/DL → Deploy.",
      "B": "Journey: EDA → ML/DL → Deploy. Data quality first, 6 dimensions.",
      "C": "Programming is a means; the key journey is EDA → ML/DL → Deploy.",
      "D": "The course is applied; the takeaway is the full pipeline from EDA to deployment, not theory only."
    }
  },
  {
    "id": "L1-Q14",
    "chapter": "l1",
    "chapterTitle": "Lecture 1 — Course Introduction",
    "text": "With >40% missing (e.g. 60% review_comment empty):",
    "options": {
      "A": "Simple imputation OK",
      "B": "Multiple Imputation",
      "C": "Exploratory only — cannot generalize",
      "D": "Drop all"
    },
    "correct": "C",
    "explainCorrect": "Very high missing: exploratory only. Cannot generalize to full population.",
    "explainOptions": {
      "A": "With >40% missing, simple imputation is not enough to claim generalizability; results must be labeled exploratory only.",
      "B": "Multiple imputation helps with moderate missing; with very high missing you still cannot generalize to the full population.",
      "C": "Very high missing: exploratory only. Cannot generalize to full population.",
      "D": "Dropping all would discard most data; the right framing is to treat the analysis as exploratory only."
    }
  },
  {
    "id": "L1-Q15",
    "chapter": "l1",
    "chapterTitle": "Lecture 1 — Course Introduction",
    "text": "Datasets for projects can come from:",
    "options": {
      "A": "Canvas only",
      "B": "Kaggle, Hugging Face, UCI, AWS, gov open data",
      "C": "Internal only",
      "D": "None"
    },
    "correct": "B",
    "explainCorrect": "Kaggle, Hugging Face, UCI, SNAP, AWS, US/Canada gov, Wikipedia datasets.",
    "explainOptions": {
      "A": "Canvas is for submission, not the only source of datasets; projects can use public and open datasets.",
      "B": "Kaggle, Hugging Face, UCI, SNAP, AWS, US/Canada gov, Wikipedia datasets.",
      "C": "Internal-only is too restrictive; course allows public sources like Kaggle, UCI, gov data.",
      "D": "Datasets are allowed from multiple public and open sources, not 'none'."
    }
  },
  {
    "id": "L1-Q16",
    "chapter": "l1",
    "chapterTitle": "Lecture 1 — Course Introduction",
    "text": "Which of the following are among the six data quality dimensions? (Select all that apply.)",
    "options": {
      "A": "Completeness",
      "B": "Uniqueness",
      "C": "Precision",
      "D": "Timeliness"
    },
    "correct": ["A", "B", "D"],
    "explainCorrect": "The six dimensions are Completeness, Uniqueness, Validity, Consistency, Timeliness, Accuracy. Precision is an ML metric (TP/(TP+FP)), not a data quality dimension.",
    "explainOptions": {
      "A": "Completeness is one of the six data quality dimensions (data present where expected).",
      "B": "Uniqueness is one of the six (no inappropriate duplicates).",
      "C": "Precision here means the ML metric (TP/(TP+FP)), not a data quality dimension; the six are Completeness, Uniqueness, Validity, Consistency, Timeliness, Accuracy.",
      "D": "Timeliness is one of the six (data current and available when needed)."
    }
  },
  {
    "id": "L2-Q1",
    "chapter": "l2",
    "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
    "text": "GMV for Olist = ?",
    "options": {
      "A": "SUM(price) only",
      "B": "SUM(price+freight) for delivered orders",
      "C": "AOV * num_orders",
      "D": "COUNT(orders)"
    },
    "correct": "B",
    "explainCorrect": "GMV = SUM(price + freight) for status='delivered'. Tables: orders + order_items.",
    "explainOptions": {
      "A": "SUM(price) only undercounts GMV because freight is part of order value; GMV includes price + freight.",
      "B": "GMV = SUM(price + freight) for status='delivered'. Tables: orders + order_items.",
      "C": "AOV × num_orders gives GMV only if AOV is defined as GMV/orders; the definition of GMV itself is sum of price+freight for delivered orders.",
      "D": "COUNT(orders) is number of orders, not revenue; GMV is a monetary sum (price + freight for delivered)."
    }
  },
  {
    "id": "L2-Q2",
    "chapter": "l2",
    "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
    "text": "AOV = ?",
    "options": {
      "A": "GMV / total_items",
      "B": "total_items / num_orders",
      "C": "GMV / num_orders (aggregate at order level first)",
      "D": "SUM(price)/COUNT(*)"
    },
    "correct": "C",
    "explainCorrect": "AOV = GMV / Number of Orders. Critical: aggregate at order level FIRST, then average.",
    "explainOptions": {
      "A": "GMV / total_items gives revenue per item, not per order; AOV is average per order, so denominator must be num_orders.",
      "B": "total_items / num_orders is items per order (basket size), not average order value in money.",
      "C": "AOV = GMV / Number of Orders. Critical: aggregate at order level FIRST, then average.",
      "D": "SUM(price)/COUNT(*) over rows can double-count if one order has multiple rows; AOV requires aggregating to order level first."
    }
  },
  {
    "id": "L2-Q4",
    "chapter": "l2",
    "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
    "text": "SQL execution order (memory trick)?",
    "options": {
      "A": "SELECT first",
      "B": "FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT",
      "C": "WHERE before FROM",
      "D": "GROUP BY before WHERE"
    },
    "correct": "B",
    "explainCorrect": "FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. 'Frantic Warriors Gathered Here Seeking Order & Loot'.",
    "explainOptions": {
      "A": "SELECT is evaluated late (after WHERE, GROUP BY, HAVING); the logical order starts with FROM.",
      "B": "FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. 'Frantic Warriors Gathered Here Seeking Order & Loot'.",
      "C": "WHERE runs after FROM and JOIN; you cannot filter before the tables are identified.",
      "D": "GROUP BY runs after WHERE; filtering by aggregate (e.g. count) must use HAVING, not WHERE."
    }
  },
  {
    "id": "L2-Q5",
    "chapter": "l2",
    "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
    "text": "SELECT state, COUNT(*) as cnt FROM orders WHERE cnt > 10 GROUP BY state — works?",
    "options": {
      "A": "Yes",
      "B": "No — use HAVING COUNT(*) > 10",
      "C": "Yes if you add ORDER BY",
      "D": "No — use WHERE COUNT(*)"
    },
    "correct": "B",
    "explainCorrect": "WHERE filters before grouping; cannot use aggregate in WHERE. Use HAVING COUNT(*) > 10.",
    "explainOptions": {
      "A": "The query fails: WHERE cannot reference the aggregate cnt; aggregates are applied after grouping.",
      "B": "WHERE filters before grouping; cannot use aggregate in WHERE. Use HAVING COUNT(*) > 10.",
      "C": "ORDER BY doesn't fix it; the error is using cnt (an aggregate) in WHERE; use HAVING instead.",
      "D": "WHERE COUNT(*) is invalid; aggregate conditions on grouped rows belong in HAVING, not WHERE."
    }
  },
  {
    "id": "L2-Q6",
    "chapter": "l2",
    "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
    "text": "Index on order_status most useful when:",
    "options": {
      "A": "Most rows have same status",
      "B": "Table is very small",
      "C": "Small fraction of rows match filter",
      "D": "No WHERE clause"
    },
    "correct": "C",
    "explainCorrect": "Index gives O(log n) lookup when few rows match. Full scan O(n) when many match.",
    "explainOptions": {
      "A": "When most rows have the same status, a filter on status matches many rows; index helps less than a full scan in that case.",
      "B": "On very small tables the cost difference between index and full scan is negligible; index helps when the table is large.",
      "C": "Index gives O(log n) lookup when few rows match. Full scan O(n) when many match.",
      "D": "With no WHERE clause there is no filter to use an index for; the whole table is scanned."
    }
  },
  {
    "id": "L2-Q7",
    "chapter": "l2",
    "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
    "text": "Second SQL run much faster on same large table. Reason?",
    "options": {
      "A": "DB added index",
      "B": "Result in CPU cache",
      "C": "Data loaded into RAM",
      "D": "Query planner skipped"
    },
    "correct": "C",
    "explainCorrect": "Data was already loaded into memory (RAM) — caching.",
    "explainOptions": {
      "A": "An index would help lookup but doesn't explain the second run being much faster on the same query; data already in RAM does.",
      "B": "CPU cache is for instructions/small data; the big win on a large table is the data being in RAM (buffer cache).",
      "C": "Data was already loaded into memory (RAM) — caching.",
      "D": "The query planner still runs; the speedup comes from data already being cached in memory."
    }
  },
  {
    "id": "L2-Q8",
    "chapter": "l2",
    "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
    "text": "Relational model best for:",
    "options": {
      "A": "Complex relationships, reporting, ACID",
      "B": "Self-contained docs",
      "C": "Graph traversals",
      "D": "Flexible schema"
    },
    "correct": "A",
    "explainCorrect": "Relational: Orders, Items, Products. Document: reviews. Graph: customer-product-category.",
    "explainOptions": {
      "A": "Relational: Orders, Items, Products. Document: reviews. Graph: customer-product-category.",
      "B": "Self-contained docs are the strength of the document model, not the relational model.",
      "C": "Graph traversals are best handled by the graph model (e.g. customer–product–category), not relational.",
      "D": "Flexible schema is a feature of document stores; relational model has a fixed schema and ACID."
    }
  },
  {
    "id": "L2-Q9",
    "chapter": "l2",
    "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
    "text": "Document model advantages:",
    "options": {
      "A": "ACID, JOINs",
      "B": "Locality, flexible schema, no JOINs for single-doc",
      "C": "Graph queries",
      "D": "Index speed"
    },
    "correct": "B",
    "explainCorrect": "Locality (all in one place), flexible schema, no JOINs for single-doc reads.",
    "explainOptions": {
      "A": "ACID and JOINs are strengths of relational DBs; document model trades these for locality and flexible schema.",
      "B": "Locality (all in one place), flexible schema, no JOINs for single-doc reads.",
      "C": "Graph queries are for the graph model; document model is about storing self-contained documents.",
      "D": "Index speed is not the defining advantage; document model is about locality, flexible schema, and single-doc reads without JOINs."
    }
  },
  {
    "id": "L2-Q10",
    "chapter": "l2",
    "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
    "text": "Graph model best for:",
    "options": {
      "A": "Monthly sales reports",
      "B": "Product catalog",
      "C": "Customers who bought what similar customers bought",
      "D": "Order history"
    },
    "correct": "C",
    "explainCorrect": "Graph: traverse edges for 'similar customers', 'friends of friends'.",
    "explainOptions": {
      "A": "Monthly sales reports are typically tabular/relational (aggregations over orders); not graph traversal.",
      "B": "Product catalog is usually document or relational; graph excels at 'who bought what' and similar-customer traversal.",
      "C": "Graph: traverse edges for 'similar customers', 'friends of friends'.",
      "D": "Order history is often relational or document; graph is best when you need multi-hop relationships (e.g. similar customers)."
    }
  },
  {
    "id": "L2-Q11",
    "chapter": "l2",
    "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
    "text": "CSV vs Database — use Database when:",
    "options": {
      "A": "Prototyping only",
      "B": "Offline analysis",
      "C": "Single user",
      "D": "Concurrent access, integrity, JOINs, repeated querying"
    },
    "correct": "D",
    "explainCorrect": "Database for concurrent access, integrity (FKs, ACID), JOINs, repeated querying. CSV for prototyping.",
    "explainOptions": {
      "A": "Prototyping is when CSV is often enough; use a database when you need concurrency, integrity, JOINs, repeated queries.",
      "B": "Offline analysis can be done on CSV; database is preferred when you need concurrent access and integrity.",
      "C": "Single-user is a case where CSV might suffice; database shines with concurrent access, integrity, JOINs.",
      "D": "Database for concurrent access, integrity (FKs, ACID), JOINs, repeated querying. CSV for prototyping."
    }
  },
  {
    "id": "L2-Q12",
    "chapter": "l2",
    "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
    "text": "After JOINs, avoid double counting by:",
    "options": {
      "A": "Using COUNT(*)",
      "B": "Using SUM",
      "C": "Using AVG",
      "D": "Using COUNT(DISTINCT entity_id)"
    },
    "correct": "D",
    "explainCorrect": "COUNT(DISTINCT order_id) when counting orders after joining to order_items.",
    "explainOptions": {
      "A": "COUNT(*) after a JOIN counts rows (one order can appear multiple times); you get double counting unless you use COUNT(DISTINCT order_id).",
      "B": "SUM is for aggregating a numeric column; to avoid double counting entities after JOIN you need COUNT(DISTINCT entity_id).",
      "C": "AVG doesn't fix double counting; to count distinct orders after joining to order_items use COUNT(DISTINCT order_id).",
      "D": "COUNT(DISTINCT order_id) when counting orders after joining to order_items."
    }
  },
  {
    "id": "L2-Q13",
    "chapter": "l2",
    "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
    "text": "Index lookup complexity vs full scan?",
    "options": {
      "A": "O(n) vs O(log n)",
      "B": "O(log n) vs O(n) for index vs full scan",
      "C": "Same",
      "D": "O(1) vs O(n)"
    },
    "correct": "B",
    "explainCorrect": "Index: O(log n) B-tree lookup. Full scan: O(n) checks every row.",
    "explainOptions": {
      "A": "You reversed them: index lookup is O(log n), full scan is O(n), not the other way around.",
      "B": "Index: O(log n) B-tree lookup. Full scan: O(n) checks every row.",
      "C": "They are not the same; index is O(log n) and full scan is O(n).",
      "D": "Index is O(log n), not O(1); hash index can be O(1) but B-tree (typical) is O(log n). Full scan is O(n)."
    }
  },
  {
    "id": "L2-Q14",
    "chapter": "l2",
    "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
    "text": "Repeat purchase rate: simple definition?",
    "options": {
      "A": "GMV / customers",
      "B": "% customers with ≥2 orders",
      "C": "AOV",
      "D": "On-time rate"
    },
    "correct": "B",
    "explainCorrect": "Simple: % of customers with ≥2 orders. Olist: 97% never returned.",
    "explainOptions": {
      "A": "GMV / customers is revenue per customer, not the share of customers who made repeat purchases.",
      "B": "Simple: % of customers with ≥2 orders. Olist: 97% never returned.",
      "C": "AOV is average order value; repeat purchase rate is the percentage of customers with two or more orders.",
      "D": "On-time rate is about delivery performance; repeat purchase rate is % of customers with ≥2 orders."
    }
  },
  {
    "id": "L2-Q15",
    "chapter": "l2",
    "chapterTitle": "Lecture 2 — Data Processing, Storage & Retrieval",
    "text": "Message broker (event-driven) helps with?",
    "options": {
      "A": "Faster queries",
      "B": "Decoupling — services don't know each other; broker stores if receiver down",
      "C": "Indexing",
      "D": "JOINs"
    },
    "correct": "B",
    "explainCorrect": "Event-driven: broker decouples. No tight coupling = no cascading failures.",
    "explainOptions": {
      "A": "Faster queries come from indexing or caching; the message broker's main benefit is decoupling services.",
      "B": "Event-driven: broker decouples. No tight coupling = no cascading failures.",
      "C": "Indexing is a data-layer concern; the broker helps with decoupling and storing messages when the receiver is down.",
      "D": "JOINs are for relational queries; the broker is for async event flow and decoupling, not JOINs."
    }
  },
  {
    "id": "L3-Q1",
    "chapter": "l3",
    "chapterTitle": "Lecture 3 — Regression and Classification I",
    "text": "In Y = b0 + b1*X1 + b2*X2 + e, 'ceteris paribus' means:",
    "options": {
      "A": "Holding others constant",
      "B": "All variables change",
      "C": "Only X1 matters",
      "D": "Residual is zero"
    },
    "correct": "A",
    "explainCorrect": "Each coefficient shows effect when all other variables stay the same.",
    "explainOptions": {
      "A": "Each coefficient shows effect when all other variables stay the same.",
      "B": "If all variables change, you can't isolate one coefficient's effect; ceteris paribus means holding others constant.",
      "C": "All predictors can matter; ceteris paribus means when interpreting one coefficient we hold the others fixed.",
      "D": "Residual being zero is about fit, not the interpretation of coefficients; ceteris paribus is about holding other Xs constant."
    }
  },
  {
    "id": "L3-Q2",
    "chapter": "l3",
    "chapterTitle": "Lecture 3 — Regression and Classification I",
    "text": "Residual = ?",
    "options": {
      "A": "Predicted - Actual",
      "B": "Actual - Predicted",
      "C": "Mean - Actual",
      "D": "Actual / Predicted"
    },
    "correct": "B",
    "explainCorrect": "Residual = Y - Y_hat = Actual - Predicted.",
    "explainOptions": {
      "A": "Predicted − Actual is the negative of the residual; by convention residual = Actual − Predicted (Y − Y_hat).",
      "B": "Residual = Y - Y_hat = Actual - Predicted.",
      "C": "Mean − Actual is deviation from mean, not from predicted value; residual is error in prediction.",
      "D": "Actual / Predicted is a ratio, not the prediction error; residual is the difference Actual − Predicted."
    }
  },
  {
    "id": "L3-Q3",
    "chapter": "l3",
    "chapterTitle": "Lecture 3 — Regression and Classification I",
    "text": "MSE penalizes large errors how?",
    "options": {
      "A": "Linearly",
      "B": "Same as small",
      "C": "Squared — error of 4 is 16x worse than 1",
      "D": "Logarithmically"
    },
    "correct": "C",
    "explainCorrect": "MSE = (1/n)*sum((y - y_hat)^2). Squared errors.",
    "explainOptions": {
      "A": "MSE uses squared errors, not linear; doubling the error quadruples its contribution to MSE.",
      "B": "Large and small errors are not penalized the same; MSE squares errors so large ones dominate.",
      "C": "MSE = (1/n)*sum((y - y_hat)^2). Squared errors.",
      "D": "MSE uses squares, not log; the penalty is quadratic (error²), so error 4 is 16× worse than error 1."
    }
  },
  {
    "id": "L3-Q4",
    "chapter": "l3",
    "chapterTitle": "Lecture 3 — Regression and Classification I",
    "text": "R² always increases when you add a variable. Solution?",
    "options": {
      "A": "Use R² anyway",
      "B": "Use Adjusted R² for model comparison",
      "C": "Use MSE",
      "D": "Use p-value"
    },
    "correct": "B",
    "explainCorrect": "Adjusted R² only increases when variable genuinely helps, not by chance.",
    "explainOptions": {
      "A": "Using R² anyway is misleading because R² always goes up when you add a variable; use Adjusted R² for comparison.",
      "B": "Adjusted R² only increases when variable genuinely helps, not by chance.",
      "C": "MSE is for absolute fit; for comparing models with different numbers of predictors, Adjusted R² is the right tool.",
      "D": "p-value tests one coefficient; for overall model comparison (with more/fewer variables) use Adjusted R²."
    }
  },
  {
    "id": "L3-Q5",
    "chapter": "l3",
    "chapterTitle": "Lecture 3 — Regression and Classification I",
    "text": "VIF >= 10 indicates:",
    "options": {
      "A": "No problem",
      "B": "Moderate concern",
      "C": "Serious multicollinearity",
      "D": "Perfect fit"
    },
    "correct": "C",
    "explainCorrect": "VIF = 10 serious.",
    "explainOptions": {
      "A": "VIF ≥ 10 is a problem — it indicates serious multicollinearity, not 'no problem'.",
      "B": "VIF ≥ 10 is beyond moderate; the usual rule is VIF ≥ 10 = serious multicollinearity.",
      "C": "VIF = 10 serious.",
      "D": "Perfect fit is unrelated; VIF measures collinearity among predictors, and ≥10 means serious multicollinearity."
    }
  },
  {
    "id": "L3-Q6",
    "chapter": "l3",
    "chapterTitle": "Lecture 3 — Regression and Classification I",
    "text": "Ridge (L2) regularization:",
    "options": {
      "A": "Some coefficients → 0",
      "B": "Shrinks all coefficients toward zero",
      "C": "Drops features",
      "D": "Increases coefficients"
    },
    "correct": "B",
    "explainCorrect": "Ridge shrinks all. Lasso (L1) drives some to 0.",
    "explainOptions": {
      "A": "Some coefficients → 0 is Lasso (L1); Ridge (L2) shrinks all toward zero but typically keeps all non-zero.",
      "B": "Ridge shrinks all. Lasso (L1) drives some to 0.",
      "C": "Dropping features (exact zero) is Lasso; Ridge shrinks coefficients but doesn't remove them.",
      "D": "Ridge shrinks coefficients toward zero; it doesn't increase them."
    }
  },
  {
    "id": "L3-Q7",
    "chapter": "l3",
    "chapterTitle": "Lecture 3 — Regression and Classification I",
    "text": "Lasso (L1) regularization:",
    "options": {
      "A": "Shrinks all equally",
      "B": "Some coefficients become exactly 0",
      "C": "Adds features",
      "D": "No effect"
    },
    "correct": "B",
    "explainCorrect": "Lasso does feature selection; some coeffs → 0.",
    "explainOptions": {
      "A": "Shrinking all equally is Ridge; Lasso shrinks but can drive some coefficients exactly to zero (feature selection).",
      "B": "Lasso does feature selection; some coeffs → 0.",
      "C": "Lasso doesn't add features; it can zero out some (deselect), not add.",
      "D": "Lasso has a clear effect: L1 penalty drives some coefficients to exactly zero."
    }
  },
  {
    "id": "L3-Q8",
    "chapter": "l3",
    "chapterTitle": "Lecture 3 — Regression and Classification I",
    "text": "Multicollinearity breaks:",
    "options": {
      "A": "Prediction",
      "B": "Explanation (cause & effect)",
      "C": "Training speed",
      "D": "Memory"
    },
    "correct": "B",
    "explainCorrect": "Breaks explanation, not prediction. If forecasting, less concern.",
    "explainOptions": {
      "A": "Prediction (forecasting Y) can still work with multicollinearity; it's the interpretation of individual coefficients that breaks.",
      "B": "Breaks explanation, not prediction. If forecasting, less concern.",
      "C": "Training speed and memory are not what multicollinearity breaks; it breaks cause-and-effect interpretation.",
      "D": "Memory use is unrelated; multicollinearity makes it hard to say 'this variable's effect is X' (explanation)."
    }
  },
  {
    "id": "L3-Q9",
    "chapter": "l3",
    "chapterTitle": "Lecture 3 — Regression and Classification I",
    "text": "p-value = 0.002 for a coefficient means:",
    "options": {
      "A": "99.8% certain effect is real",
      "B": "0.2% chance null is true",
      "C": "If true effect were zero, prob of seeing this extreme = 0.2%",
      "D": "Model explains 99.8%"
    },
    "correct": "C",
    "explainCorrect": "p-value = P(observing this or more extreme | H0 true).",
    "explainOptions": {
      "A": "p-value is not 'probability the effect is real'; it's the probability of the data (or more extreme) if H0 were true.",
      "B": "p-value is not the probability that the null is true; it assumes H0 is true and asks how likely the observed result is.",
      "C": "p-value = P(observing this or more extreme | H0 true).",
      "D": "99.8% sounds like R²; p=0.002 means if the true effect were zero, you'd see this extreme a result only 0.2% of the time."
    }
  },
  {
    "id": "L3-Q10",
    "chapter": "l3",
    "chapterTitle": "Lecture 3 — Regression and Classification I",
    "text": "Odds ratio OR=1.5 for 'is_late' means:",
    "options": {
      "A": "50% lower odds of late",
      "B": "50% higher odds of late",
      "C": "No effect",
      "D": "1.5x lower"
    },
    "correct": "B",
    "explainCorrect": "OR > 1 increases odds. OR=1.5 → 50% higher odds of late.",
    "explainOptions": {
      "A": "OR=1.5 means higher odds of late, not lower; 50% lower would be OR < 1.",
      "B": "OR > 1 increases odds. OR=1.5 → 50% higher odds of late.",
      "C": "OR=1.5 is not no effect; OR=1 would be no effect. 1.5 means 50% higher odds.",
      "D": "1.5x lower would be OR < 1; OR=1.5 means 1.5× higher odds (50% higher)."
    }
  },
  {
    "id": "L3-Q11",
    "chapter": "l3",
    "chapterTitle": "Lecture 3 — Regression and Classification I",
    "text": "Training-serving skew occurs when:",
    "options": {
      "A": "Model is too complex",
      "B": "Same transformation done differently in train vs inference",
      "C": "Data is imbalanced",
      "D": "Features are correlated"
    },
    "correct": "B",
    "explainCorrect": "Skew = transformation differs between training and inference.",
    "explainOptions": {
      "A": "Model complexity is a separate issue; training-serving skew is when preprocessing or feature logic differs between train and serve.",
      "B": "Skew = transformation differs between training and inference.",
      "C": "Imbalanced data is about class distribution; skew here means the same transformation applied differently (or only in one place) in train vs inference.",
      "D": "Correlated features are multicollinearity; training-serving skew is about transform/feature consistency between train and inference."
    }
  },
  {
    "id": "L3-Q12",
    "chapter": "l3",
    "chapterTitle": "Lecture 3 — Regression and Classification I",
    "text": "For time-series/delivery prediction, use:",
    "options": {
      "A": "Random split",
      "B": "Stratified split",
      "C": "Time-based split",
      "D": "Group-based split"
    },
    "correct": "C",
    "explainCorrect": "Time-based: train on past, test on future. Random fails for business data.",
    "explainOptions": {
      "A": "Random split mixes past and future; for time/delivery you must train on past and test on future to avoid leakage.",
      "B": "Stratified split preserves class balance but doesn't respect time; for time-series you need time-based split.",
      "C": "Time-based: train on past, test on future. Random fails for business data.",
      "D": "Group-based (e.g. by user) avoids leakage across groups but for time-series the critical rule is past vs future."
    }
  },
  {
    "id": "L3-Q13",
    "chapter": "l3",
    "chapterTitle": "Lecture 3 — Regression and Classification I",
    "text": "Under-predict delivery (say 5 days, takes 8):",
    "options": {
      "A": "Customer pleasantly surprised",
      "B": "Customer angry, bad review — under-prediction costlier",
      "C": "No impact",
      "D": "Model is unbiased"
    },
    "correct": "B",
    "explainCorrect": "Under-predict (late) costs more than over-predict (early).",
    "explainOptions": {
      "A": "Pleasantly surprised is when you over-predict (say 8 days, delivers in 5); under-predicting (5 vs 8) means late delivery and angry customer.",
      "B": "Under-predict (late) costs more than over-predict (early).",
      "C": "Under-prediction has impact: delivery is late, so customer experience and reviews suffer.",
      "D": "Under-prediction is a bias (systematically late); the point is that this asymmetry makes under-prediction costlier."
    }
  },
  {
    "id": "L3-Q14",
    "chapter": "l3",
    "chapterTitle": "Lecture 3 — Regression and Classification I",
    "text": "ROC-AUC = 0.5 means:",
    "options": {
      "A": "Perfect classifier",
      "B": "Random guessing",
      "C": "Worst possible",
      "D": "Good model"
    },
    "correct": "B",
    "explainCorrect": "AUC 0.5 = diagonal = random. 0.8-0.9 good, >0.9 excellent or leakage.",
    "explainOptions": {
      "A": "Perfect classifier would have AUC 1; AUC 0.5 is the diagonal (no discrimination).",
      "B": "AUC 0.5 = diagonal = random. 0.8-0.9 good, >0.9 excellent or leakage.",
      "C": "Worst would be below 0.5 (inverted); 0.5 is exactly random, not worst.",
      "D": "0.5 is not good; it means the model does no better than random guessing."
    }
  },
  {
    "id": "L3-Q15",
    "chapter": "l3",
    "chapterTitle": "Lecture 3 — Regression and Classification I",
    "text": "When temporal drift exists, advanced models (RF, stacking):",
    "options": {
      "A": "Always help",
      "B": "Often don't help — root cause is drift, not model",
      "C": "Replace need for time split",
      "D": "Fix drift automatically"
    },
    "correct": "B",
    "explainCorrect": "Olist: all models ~0.43-0.48 AUC. Using last 3 months → 0.73. Drift was root cause.",
    "explainOptions": {
      "A": "Advanced models don't always help when the issue is data drift; Olist showed similar AUC across models until recency was fixed.",
      "B": "Olist: all models ~0.43-0.48 AUC. Using last 3 months → 0.73. Drift was root cause.",
      "C": "Time split is still needed; fancier models don't replace using recent data when there's temporal drift.",
      "D": "Models don't fix drift automatically; you have to address it (e.g. train on recent window)."
    }
  },
  {
    "id": "L4-Q1",
    "chapter": "l4",
    "chapterTitle": "Lecture 4 — Regression and Classification II",
    "text": "Decision tree learns:",
    "options": {
      "A": "Linear combinations",
      "B": "If-then rules from data",
      "C": "Neural weights",
      "D": "Principal components"
    },
    "correct": "B",
    "explainCorrect": "Series of if-then rules. E.g. if days_since_last_order > 60 and total_orders",
    "explainOptions": {
      "A": "Linear combinations are what linear/logistic regression learns; trees learn axis-aligned if-then rules.",
      "B": "Series of if-then rules. E.g. if days_since_last_order > 60 and total_orders",
      "C": "Neural weights are from neural networks; decision trees split on features with thresholds (rules).",
      "D": "Principal components are from PCA; trees don't use PCs, they use raw features in splits."
    }
  },
  {
    "id": "L4-Q2",
    "chapter": "l4",
    "chapterTitle": "Lecture 4 — Regression and Classification II",
    "text": "Splitting criterion uses:",
    "options": {
      "A": "MSE only",
      "B": "Information Gain or Gini",
      "C": "R²",
      "D": "AUC"
    },
    "correct": "B",
    "explainCorrect": "Information Gain = entropy(parent) - avg entropy(children). Or Gini (sklearn default).",
    "explainOptions": {
      "A": "MSE is used for regression trees; for classification trees the split criterion is Information Gain or Gini.",
      "B": "Information Gain = entropy(parent) - avg entropy(children). Or Gini (sklearn default).",
      "C": "R² is for regression fit; tree splits for classification use impurity (Gini or entropy).",
      "D": "AUC is an evaluation metric; the splitting criterion when growing a tree is Gini or Information Gain."
    }
  },
  {
    "id": "L4-Q3",
    "chapter": "l4",
    "chapterTitle": "Lecture 4 — Regression and Classification II",
    "text": "Gini = 0 means:",
    "options": {
      "A": "Max impurity (50/50)",
      "B": "Pure node (all same class)",
      "C": "No split possible",
      "D": "Perfect accuracy"
    },
    "correct": "B",
    "explainCorrect": "Gini = 0 → pure. Gini = 0.5 → max impurity.",
    "explainOptions": {
      "A": "Max impurity (50/50) is Gini = 0.5, not 0; Gini = 0 means the node is pure.",
      "B": "Gini = 0 → pure. Gini = 0.5 → max impurity.",
      "C": "No split possible is a consequence of purity, not the definition of Gini = 0; Gini = 0 means all same class.",
      "D": "Perfect accuracy is a model-level metric; Gini = 0 at a node means that node has only one class (pure)."
    }
  },
  {
    "id": "L4-Q4",
    "chapter": "l4",
    "chapterTitle": "Lecture 4 — Regression and Classification II",
    "text": "Random Forest: each split considers:",
    "options": {
      "A": "All features",
      "B": "Random subset of features (e.g. sqrt(p))",
      "C": "Only target",
      "D": "No features"
    },
    "correct": "B",
    "explainCorrect": "RF uses random feature subset per split. sqrt(p) for classification, p/3 for regression.",
    "explainOptions": {
      "A": "A single tree might use all features over its splits, but each split in RF considers only a random subset (e.g. sqrt(p)).",
      "B": "RF uses random feature subset per split. sqrt(p) for classification, p/3 for regression.",
      "C": "Target is not a feature; each split considers a random subset of input features, not the target.",
      "D": "RF does use features; at each split it draws a random subset of features (e.g. sqrt(p)) to choose from."
    }
  },
  {
    "id": "L4-Q5",
    "chapter": "l4",
    "chapterTitle": "Lecture 4 — Regression and Classification II",
    "text": "Bootstrap in RF: ~what fraction of data is OOB (out-of-bag)?",
    "options": {
      "A": "0%",
      "B": "37%",
      "C": "63%",
      "D": "100%"
    },
    "correct": "B",
    "explainCorrect": "(1-1/N)^N → 1/e ≈ 37% never selected.",
    "explainOptions": {
      "A": "0% OOB would mean every sample is in every bootstrap sample; in reality ~37% are left out (OOB).",
      "B": "(1-1/N)^N → 1/e ≈ 37% never selected.",
      "C": "63% is the fraction that appears in each bootstrap sample on average; OOB is the complement, ~37%.",
      "D": "100% OOB would mean no sample is ever used; actually ~63% are used per bag, so ~37% are OOB."
    }
  },
  {
    "id": "L4-Q6",
    "chapter": "l4",
    "chapterTitle": "Lecture 4 — Regression and Classification II",
    "text": "OOB estimate is:",
    "options": {
      "A": "Biased",
      "B": "Unbiased — each sample predicted by trees that didn't see it",
      "C": "Same as train accuracy",
      "D": "Not used"
    },
    "correct": "B",
    "explainCorrect": "OOB = out-of-bag. Unbiased internal validation.",
    "explainOptions": {
      "A": "OOB is unbiased because each sample is predicted only by trees that didn't see it in the bootstrap sample.",
      "B": "OOB = out-of-bag. Unbiased internal validation.",
      "C": "Train accuracy is optimistic; OOB is an internal validation estimate and is not the same as train accuracy.",
      "D": "OOB is used in RF as an internal validation estimate without needing a separate holdout."
    }
  },
  {
    "id": "L4-Q7",
    "chapter": "l4",
    "chapterTitle": "Lecture 4 — Regression and Classification II",
    "text": "Class imbalance (97% no churn, 3% churn): naive 'predict no churn' gives:",
    "options": {
      "A": "3% accuracy",
      "B": "50% accuracy",
      "C": "97% accuracy but F1=0",
      "D": "100% accuracy"
    },
    "correct": "C",
    "explainCorrect": "Accuracy misleading. F1=0. Use class_weight, SMOTE, or threshold tuning.",
    "explainOptions": {
      "A": "Predicting all majority (no churn) gives ~97% accuracy when 97% don't churn, not 3%.",
      "B": "50% would be random guessing; naive 'predict no churn' gives high accuracy because the majority is no churn.",
      "C": "Accuracy misleading. F1=0. Use class_weight, SMOTE, or threshold tuning.",
      "D": "100% would mean every prediction correct; naive predictor gets ~97% accuracy but 0 positives, so F1=0."
    }
  },
  {
    "id": "L4-Q8",
    "chapter": "l4",
    "chapterTitle": "Lecture 4 — Regression and Classification II",
    "text": "Target leakage example:",
    "options": {
      "A": "Using delivery_date to predict is_late",
      "B": "Using age to predict churn",
      "C": "Using price to predict sales",
      "D": "Using category"
    },
    "correct": "A",
    "explainCorrect": "delivery_date contains the answer! Target leakage = info from outside training.",
    "explainOptions": {
      "A": "delivery_date contains the answer! Target leakage = info from outside training.",
      "B": "Age is a legitimate feature for churn; it's available at prediction time and doesn't encode the target.",
      "C": "Price to predict sales is a valid input; leakage would be using something that directly reveals the target.",
      "D": "Category is a normal feature; leakage is when a feature implicitly contains the target (e.g. delivery_date for is_late)."
    }
  },
  {
    "id": "L4-Q9",
    "chapter": "l4",
    "chapterTitle": "Lecture 4 — Regression and Classification II",
    "text": "Normalize before or after train_test_split?",
    "options": {
      "A": "Before",
      "B": "After — fit scaler on train only, transform both",
      "C": "Either",
      "D": "Never normalize"
    },
    "correct": "B",
    "explainCorrect": "Way 2 correct: split first, fit scaler on train, transform train and test. Prevents leakage.",
    "explainOptions": {
      "A": "Normalizing before split lets test data influence the scaler (e.g. mean/std); that's leakage. Split first, then fit scaler on train.",
      "B": "Way 2 correct: split first, fit scaler on train, transform train and test. Prevents leakage.",
      "C": "Order matters: normalizing after split (fit on train, transform both) is correct; before split leaks test info.",
      "D": "Normalizing is often needed for models like logistic regression; the rule is do it after split, on train only for fit."
    }
  },
  {
    "id": "L4-Q10",
    "chapter": "l4",
    "chapterTitle": "Lecture 4 — Regression and Classification II",
    "text": "Feature Store provides:",
    "options": {
      "A": "Model training only",
      "B": "Point-in-time correctness via event_time (as-of joins)",
      "C": "Real-time only",
      "D": "No versioning"
    },
    "correct": "B",
    "explainCorrect": "event_time prevents leakage — only features available at observation time.",
    "explainOptions": {
      "A": "Feature store supports training and serving; its key for correctness is point-in-time (event_time), not 'training only'.",
      "B": "event_time prevents leakage — only features available at observation time.",
      "C": "Feature store can serve batch and real-time; the defining capability for leakage prevention is point-in-time (as-of) joins.",
      "D": "Feature stores typically do versioning; the answer is about point-in-time correctness via event_time."
    }
  },
  {
    "id": "L4-Q11",
    "chapter": "l4",
    "chapterTitle": "Lecture 4 — Regression and Classification II",
    "text": "Model Registry is for:",
    "options": {
      "A": "Storing raw data",
      "B": "Versioning and managing ML models with metadata",
      "C": "Feature computation",
      "D": "API deployment"
    },
    "correct": "B",
    "explainCorrect": "Model Registry: which model in prod, hyperparams, rollback, feature expectations.",
    "explainOptions": {
      "A": "Raw data is stored in data lakes/warehouses; Model Registry stores model artifacts and metadata, not raw data.",
      "B": "Model Registry: which model in prod, hyperparams, rollback, feature expectations.",
      "C": "Feature computation is the job of feature store or pipelines; Model Registry is for model versioning and deployment metadata.",
      "D": "API deployment uses the model; Model Registry is where you version and select which model to deploy (metadata, rollback)."
    }
  },
  {
    "id": "L4-Q12",
    "chapter": "l4",
    "chapterTitle": "Lecture 4 — Regression and Classification II",
    "text": "Pipeline prevents leakage by:",
    "options": {
      "A": "Using more data",
      "B": "Ensuring fit() only sees training data",
      "C": "Dropping features",
      "D": "Using regularization"
    },
    "correct": "B",
    "explainCorrect": "Pipeline bundles preprocessor + model; fit() only on X_train.",
    "explainOptions": {
      "A": "Using more data doesn't by itself prevent leakage; the pipeline prevents it by ensuring fit() sees only training data.",
      "B": "Pipeline bundles preprocessor + model; fit() only on X_train.",
      "C": "Dropping features can reduce leakage if you drop leaky ones, but the pipeline's role is to restrict fit() to train data.",
      "D": "Regularization reduces overfitting; leakage prevention is about ensuring preprocessor and model are fit only on train."
    }
  },
  {
    "id": "L4-Q13",
    "chapter": "l4",
    "chapterTitle": "Lecture 4 — Regression and Classification II",
    "text": "Single deep decision tree tends to?",
    "options": {
      "A": "Underfit",
      "B": "Overfit",
      "C": "Be optimal",
      "D": "Need more data"
    },
    "correct": "B",
    "explainCorrect": "Single deep tree overfits. RF: many trees, average → reduce variance.",
    "explainOptions": {
      "A": "Underfitting is from too simple a model; a single deep tree is complex and tends to overfit, not underfit.",
      "B": "Single deep tree overfits. RF: many trees, average → reduce variance.",
      "C": "A single deep tree is rarely optimal; it memorizes training data and typically overfits.",
      "D": "More data can help, but the direct answer is that a single deep tree tends to overfit; RF combats this by averaging."
    }
  },
  {
    "id": "L4-Q14",
    "chapter": "l4",
    "chapterTitle": "Lecture 4 — Regression and Classification II",
    "text": "Temporal leakage example?",
    "options": {
      "A": "Using age",
      "B": "Random split on time-series — future predicts past",
      "C": "Using category",
      "D": "Train/test split"
    },
    "correct": "B",
    "explainCorrect": "Temporal leakage: random split on time-series lets future data predict past.",
    "explainOptions": {
      "A": "Using age is a feature choice, not temporal leakage; leakage is when future information leaks into training.",
      "B": "Temporal leakage: random split on time-series lets future data predict past.",
      "C": "Using category is not temporal leakage; temporal leakage is mixing past and future (e.g. random split on time-series).",
      "D": "A proper train/test split on time-series (train=past, test=future) avoids leakage; the leak is random split that mixes times."
    }
  },
  {
    "id": "L4-Q15",
    "chapter": "l4",
    "chapterTitle": "Lecture 4 — Regression and Classification II",
    "text": "Logistic vs RF: which needs feature scaling?",
    "options": {
      "A": "Both",
      "B": "Neither",
      "C": "Logistic only",
      "D": "RF only"
    },
    "correct": "C",
    "explainCorrect": "Logistic requires scaling. RF does not (tree splits are scale-invariant).",
    "explainOptions": {
      "A": "RF doesn't need scaling; only logistic (and other linear/iterative models) typically need feature scaling.",
      "B": "Logistic does need scaling; 'neither' is wrong because logistic regression is sensitive to feature scale.",
      "C": "Logistic requires scaling. RF does not (tree splits are scale-invariant).",
      "D": "RF is scale-invariant; it's logistic regression that needs scaling, not RF."
    }
  },
  {
    "id": "L5-Q1",
    "chapter": "l5",
    "chapterTitle": "Lecture 5 — Unsupervised Learning",
    "text": "PCA is:",
    "options": {
      "A": "Non-linear",
      "B": "Linear — finds orthogonal axes of max variance",
      "C": "For clustering only",
      "D": "Same as UMAP"
    },
    "correct": "B",
    "explainCorrect": "PCA: linear, interpretable loadings, preserves global variance.",
    "explainOptions": {
      "A": "PCA is linear: it finds linear combinations (orthogonal axes of max variance); UMAP/t-SNE are non-linear.",
      "B": "PCA: linear, interpretable loadings, preserves global variance.",
      "C": "PCA is for dimensionality reduction and can feed into clustering; it's not 'for clustering only' — it's linear projection.",
      "D": "UMAP is non-linear and neighbor-based; PCA is linear and variance-based — they are different."
    }
  },
  {
    "id": "L5-Q2",
    "chapter": "l5",
    "chapterTitle": "Lecture 5 — Unsupervised Learning",
    "text": "UMAP preserves:",
    "options": {
      "A": "Global variance",
      "B": "Local neighborhoods (similar points stay close)",
      "C": "Loadings",
      "D": "Orthogonality"
    },
    "correct": "B",
    "explainCorrect": "UMAP: non-linear, neighbor-based, good for clustering + viz.",
    "explainOptions": {
      "A": "Global variance is what PCA preserves; UMAP preserves local structure (neighbors stay close).",
      "B": "UMAP: non-linear, neighbor-based, good for clustering + viz.",
      "C": "Loadings are from PCA; UMAP doesn't have loadings — it preserves local neighborhoods.",
      "D": "Orthogonality is a PCA property; UMAP is about local neighborhood preservation, not orthogonal axes."
    }
  },
  {
    "id": "L5-Q3",
    "chapter": "l5",
    "chapterTitle": "Lecture 5 — Unsupervised Learning",
    "text": "K-Means requires:",
    "options": {
      "A": "No k",
      "B": "Specifying k in advance",
      "C": "Density",
      "D": "Labels"
    },
    "correct": "B",
    "explainCorrect": "K-Means needs k. HDBSCAN/DBSCAN don't.",
    "explainOptions": {
      "A": "K-Means does require k; methods like HDBSCAN don't, but K-Means needs the number of clusters set in advance.",
      "B": "K-Means needs k. HDBSCAN/DBSCAN don't.",
      "C": "Density is the basis of DBSCAN/HDBSCAN; K-Means requires specifying k, not density.",
      "D": "K-Means is unsupervised — it doesn't use labels; it does require you to choose k."
    }
  },
  {
    "id": "L5-Q4",
    "chapter": "l5",
    "chapterTitle": "Lecture 5 — Unsupervised Learning",
    "text": "Silhouette score s ≈ -1 means:",
    "options": {
      "A": "Well clustered",
      "B": "On boundary",
      "C": "Probably wrong cluster",
      "D": "Perfect"
    },
    "correct": "C",
    "explainCorrect": "s ≈ +1 well clustered, 0 boundary, -1 wrong cluster.",
    "explainOptions": {
      "A": "Well clustered is s ≈ +1; s ≈ -1 means the point is probably in the wrong cluster.",
      "B": "On boundary is s ≈ 0; s ≈ -1 means wrong cluster (closer to another cluster).",
      "C": "s ≈ +1 well clustered, 0 boundary, -1 wrong cluster.",
      "D": "Perfect would be s ≈ +1; s ≈ -1 is the opposite — point is likely assigned to the wrong cluster."
    }
  },
  {
    "id": "L5-Q5",
    "chapter": "l5",
    "chapterTitle": "Lecture 5 — Unsupervised Learning",
    "text": "HDBSCAN labels outliers as:",
    "options": {
      "A": "0",
      "B": "-1 (noise)",
      "C": "1",
      "D": "NaN"
    },
    "correct": "B",
    "explainCorrect": "HDBSCAN: -1 = noise/outlier. No need to set k.",
    "explainOptions": {
      "A": "0 is a valid cluster label in HDBSCAN; outliers are labeled -1, not 0.",
      "B": "HDBSCAN: -1 = noise/outlier. No need to set k.",
      "C": "1 is a cluster index; noise/outliers get the special label -1.",
      "D": "HDBSCAN uses -1 for noise, not NaN; -1 is the convention for unassigned/outlier points."
    }
  },
  {
    "id": "L5-Q6",
    "chapter": "l5",
    "chapterTitle": "Lecture 5 — Unsupervised Learning",
    "text": "BERTopic pipeline: Embeddings → ?",
    "options": {
      "A": "K-Means only",
      "B": "UMAP → HDBSCAN → c-TF-IDF",
      "C": "PCA → K-Means",
      "D": "LDA"
    },
    "correct": "B",
    "explainCorrect": "Embeddings → UMAP (dim reduction) → HDBSCAN (cluster) → c-TF-IDF (topic labels).",
    "explainOptions": {
      "A": "BERTopic uses UMAP then HDBSCAN then c-TF-IDF, not K-Means only.",
      "B": "Embeddings → UMAP (dim reduction) → HDBSCAN (cluster) → c-TF-IDF (topic labels).",
      "C": "BERTopic pipeline is UMAP → HDBSCAN → c-TF-IDF, not PCA → K-Means.",
      "D": "LDA is a different topic model (bag-of-words); BERTopic uses embeddings → UMAP → HDBSCAN → c-TF-IDF."
    }
  },
  {
    "id": "L5-Q7",
    "chapter": "l5",
    "chapterTitle": "Lecture 5 — Unsupervised Learning",
    "text": "HDBSCAN over K-Means for topic modeling because:",
    "options": {
      "A": "Faster",
      "B": "Handles varying densities, no k, labels noise as -1",
      "C": "More interpretable",
      "D": "Linear"
    },
    "correct": "B",
    "explainCorrect": "Varying topic sizes, no k to set, outlier detection.",
    "explainOptions": {
      "A": "HDBSCAN isn't necessarily faster; its advantage is varying densities, no k, and noise as -1.",
      "B": "Varying topic sizes, no k to set, outlier detection.",
      "C": "Interpretability isn't the main reason; HDBSCAN is chosen for density-based clustering, no k, and noise handling.",
      "D": "HDBSCAN is not linear; it's density-based. The advantage is handling varying cluster sizes and labeling noise."
    }
  },
  {
    "id": "L5-Q8",
    "chapter": "l5",
    "chapterTitle": "Lecture 5 — Unsupervised Learning",
    "text": "RFM = ?",
    "options": {
      "A": "Random Forest Model",
      "B": "Recency, Frequency, Monetary",
      "C": "Root Mean square",
      "D": "Regression Fit Metric"
    },
    "correct": "B",
    "explainCorrect": "RFM: Recency (days since last), Frequency (count), Monetary (total spend).",
    "explainOptions": {
      "A": "Random Forest Model is a different RF; in segmentation RFM = Recency, Frequency, Monetary.",
      "B": "RFM: Recency (days since last), Frequency (count), Monetary (total spend).",
      "C": "Root mean square is RMSE; RFM in customer segmentation is Recency, Frequency, Monetary.",
      "D": "Regression Fit Metric is not RFM; in marketing/segmentation RFM stands for Recency, Frequency, Monetary."
    }
  },
  {
    "id": "L5-Q9",
    "chapter": "l5",
    "chapterTitle": "Lecture 5 — Unsupervised Learning",
    "text": "Adjusted Rand Index is for:",
    "options": {
      "A": "Internal validation (no labels)",
      "B": "External validation (with ground truth)",
      "C": "Clustering only",
      "D": "Regression"
    },
    "correct": "B",
    "explainCorrect": "ARI: external, needs labels. Silhouette: internal, no labels.",
    "explainOptions": {
      "A": "Internal validation (no labels) is Silhouette; ARI needs ground-truth labels, so it's external validation.",
      "B": "ARI: external, needs labels. Silhouette: internal, no labels.",
      "C": "ARI is for clustering but the key is it's external (needs labels); 'clustering only' doesn't distinguish internal vs external.",
      "D": "ARI is for comparing clusterings (classification/clustering), not for regression."
    }
  },
  {
    "id": "L5-Q10",
    "chapter": "l5",
    "chapterTitle": "Lecture 5 — Unsupervised Learning",
    "text": "Elbow method for K-Means:",
    "options": {
      "A": "Plot inertia vs k, look for elbow",
      "B": "Plot silhouette vs k",
      "C": "Use ARI",
      "D": "Use RFM"
    },
    "correct": "A",
    "explainCorrect": "Inertia decreases with k; elbow = diminishing returns.",
    "explainOptions": {
      "A": "Inertia decreases with k; elbow = diminishing returns.",
      "B": "Silhouette vs k is valid but the classic elbow method uses inertia (within-cluster sum of squares) vs k.",
      "C": "ARI needs ground-truth labels; elbow method for K-Means uses unlabeled data and inertia.",
      "D": "RFM is customer segmentation; elbow method is plotting inertia vs k for choosing number of clusters."
    }
  },
  {
    "id": "L5-Q11",
    "chapter": "l5",
    "chapterTitle": "Lecture 5 — Unsupervised Learning",
    "text": "Class-based TF-IDF in BERTopic?",
    "options": {
      "A": "Per-document",
      "B": "Treats all docs in cluster as one giant doc; finds words unique to cluster",
      "C": "Same as standard TF-IDF",
      "D": "For embeddings"
    },
    "correct": "B",
    "explainCorrect": "All docs in cluster → one doc. Find words most unique to that cluster vs others → topic labels.",
    "explainOptions": {
      "A": "Per-document TF-IDF is standard; class-based (c-TF-IDF) treats all docs in a cluster as one 'doc' for that class.",
      "B": "All docs in cluster → one doc. Find words most unique to that cluster vs others → topic labels.",
      "C": "Standard TF-IDF is per-document; c-TF-IDF aggregates by cluster/class and finds words distinctive to that cluster.",
      "D": "Embeddings are used earlier in BERTopic; c-TF-IDF is for labeling clusters (topic words), not for producing embeddings."
    }
  },
  {
    "id": "L5-Q12",
    "chapter": "l5",
    "chapterTitle": "Lecture 5 — Unsupervised Learning",
    "text": "K-Means assumes?",
    "options": {
      "A": "Arbitrary shapes",
      "B": "Spherical clusters",
      "C": "Density-based",
      "D": "No k"
    },
    "correct": "B",
    "explainCorrect": "K-Means: spherical. DBSCAN/HDBSCAN: arbitrary shapes, density-based.",
    "explainOptions": {
      "A": "Arbitrary shapes are handled by density-based methods (DBSCAN/HDBSCAN); K-Means assumes roughly spherical clusters.",
      "B": "K-Means: spherical. DBSCAN/HDBSCAN: arbitrary shapes, density-based.",
      "C": "Density-based is DBSCAN/HDBSCAN; K-Means assumes spherical (or convex) clusters via centroids.",
      "D": "K-Means does require k; the assumption asked here is about cluster shape (spherical), not whether k is needed."
    }
  },
  {
    "id": "L5-Q13",
    "chapter": "l5",
    "chapterTitle": "Lecture 5 — Unsupervised Learning",
    "text": "BERTopic uses embeddings for?",
    "options": {
      "A": "Clustering only",
      "B": "Semantic meaning — context-aware",
      "C": "Speed",
      "D": "Compression"
    },
    "correct": "B",
    "explainCorrect": "Embeddings = context-aware. LDA = bag of words. BERTopic understands 'Windows' OS vs window glass.",
    "explainOptions": {
      "A": "Embeddings are used for semantic similarity and then clustering; the key is they capture semantic (context-aware) meaning.",
      "B": "Embeddings = context-aware. LDA = bag of words. BERTopic understands 'Windows' OS vs window glass.",
      "C": "Speed is not the main point; BERTopic uses embeddings for their semantic, context-aware representation.",
      "D": "Compression can be a side effect; the reason for embeddings in BERTopic is semantic/context-aware meaning."
    }
  },
  {
    "id": "L5-Q14",
    "chapter": "l5",
    "chapterTitle": "Lecture 5 — Unsupervised Learning",
    "text": "Cluster profiling: Recency Index 54 (avg=100) means?",
    "options": {
      "A": "54% more recent",
      "B": "46% more recent (lower recency = better)",
      "C": "54% older",
      "D": "Same as avg"
    },
    "correct": "B",
    "explainCorrect": "Recency = days since last order. Lower = more recent = better. Index 100 = population avg.",
    "explainOptions": {
      "A": "54% more recent would imply a lower index; index 54 means 54% of population avg (100), so this cluster is more recent (lower recency = better).",
      "B": "Recency = days since last order. Lower = more recent = better. Index 100 = population avg.",
      "C": "54% older would be index > 100; index 54 means less days since last order, so more recent (better).",
      "D": "Same as average would be index 100; 54 is below average, so this segment is more recent than avg."
    }
  },
  {
    "id": "L5-Q15",
    "chapter": "l5",
    "chapterTitle": "Lecture 5 — Unsupervised Learning",
    "text": "UMAP n_neighbors controls?",
    "options": {
      "A": "Speed only",
      "B": "Local vs global (default 15)",
      "C": "Number of clusters",
      "D": "Embedding dim"
    },
    "correct": "B",
    "explainCorrect": "n_neighbors: local vs global. min_dist: cluster tightness. Good for micro-topics.",
    "explainOptions": {
      "A": "n_neighbors affects the local vs global tradeoff, not just speed; small = more local structure.",
      "B": "n_neighbors: local vs global. min_dist: cluster tightness. Good for micro-topics.",
      "C": "Number of clusters is determined by HDBSCAN (or similar) after UMAP; n_neighbors controls how local the embedding is.",
      "D": "Embedding dimension is set separately (n_components); n_neighbors controls the local vs global balance (default 15)."
    }
  },
  {
    "id": "L7-Q1",
    "chapter": "l7",
    "chapterTitle": "Lecture 7 — Model Deployment",
    "text": "Why sklearn Pipeline instead of fitting encoder separately?",
    "options": {
      "A": "Faster",
      "B": "Prevents data leakage — encoder fits only on train",
      "C": "Smaller file",
      "D": "More accurate"
    },
    "correct": "B",
    "explainCorrect": "Without pipeline: encoder sees test data. Pipeline: fit only on train.",
    "explainOptions": {
      "A": "Pipeline isn't primarily about speed; the main benefit is preventing leakage by fitting the encoder only on train.",
      "B": "Without pipeline: encoder sees test data. Pipeline: fit only on train.",
      "C": "File size isn't the reason; the reason is ensuring preprocessor fits only on training data to avoid leakage.",
      "D": "Accuracy can improve indirectly by avoiding leakage; the direct reason for Pipeline is preventing encoder from seeing test data."
    }
  },
  {
    "id": "L7-Q2",
    "chapter": "l7",
    "chapterTitle": "Lecture 7 — Model Deployment",
    "text": "Saving Pipeline vs encoder+model separately:",
    "options": {
      "A": "Same",
      "B": "Pipeline = one file, preprocessor+model together",
      "C": "Separate is better",
      "D": "Pipeline is slower"
    },
    "correct": "B",
    "explainCorrect": "One .pkl has everything. pipeline.predict(raw_data) works.",
    "explainOptions": {
      "A": "Saving pipeline vs separately is not the same; one .pkl bundles preprocessor and model so predict(raw_data) works.",
      "B": "One .pkl has everything. pipeline.predict(raw_data) works.",
      "C": "Separate files require you to run preprocessor and model in sync; pipeline in one file is simpler for deployment.",
      "D": "Pipeline isn't slower; it's one object to load and call, and ensures consistent preprocessing."
    }
  },
  {
    "id": "L7-Q3",
    "chapter": "l7",
    "chapterTitle": "Lecture 7 — Model Deployment",
    "text": "Why clone(preprocessor) for each pipeline?",
    "options": {
      "A": "Speed",
      "B": "Each pipeline gets independent copy — no shared fitted state",
      "C": "Memory",
      "D": "Accuracy"
    },
    "correct": "B",
    "explainCorrect": "clone() copies constructor args, NOT fitted state. Order doesn't matter.",
    "explainOptions": {
      "A": "clone() isn't for speed; it gives each pipeline an independent copy so fitted state isn't shared.",
      "B": "clone() copies constructor args, NOT fitted state. Order doesn't matter.",
      "C": "Memory isn't the main point; the point is independent copies so one pipeline's fit doesn't affect another.",
      "D": "Accuracy isn't what clone() addresses; it's about avoiding shared mutable state between pipelines."
    }
  },
  {
    "id": "L7-Q4",
    "chapter": "l7",
    "chapterTitle": "Lecture 7 — Model Deployment",
    "text": "Soft voting ensemble:",
    "options": {
      "A": "Majority class",
      "B": "Average of predicted probabilities",
      "C": "Max probability",
      "D": "First model"
    },
    "correct": "B",
    "explainCorrect": "Avg of predict_proba, then threshold (e.g. 0.5).",
    "explainOptions": {
      "A": "Majority class is hard voting; soft voting uses the average of predicted probabilities, then a threshold.",
      "B": "Avg of predict_proba, then threshold (e.g. 0.5).",
      "C": "Taking max probability across models isn't soft voting; soft voting averages the probabilities.",
      "D": "Using only the first model isn't voting; soft voting combines all models' probabilities (e.g. average)."
    }
  },
  {
    "id": "L7-Q5",
    "chapter": "l7",
    "chapterTitle": "Lecture 7 — Model Deployment",
    "text": "Why FastAPI + Render instead of loading .pkl in Streamlit?",
    "options": {
      "A": "Cheaper",
      "B": "Model loads once; scale API/UI separately; centralized logging; same API for web/mobile/batch",
      "C": "Simpler",
      "D": "Faster locally"
    },
    "correct": "B",
    "explainCorrect": "Separation of concerns. Loose coupling.",
    "explainOptions": {
      "A": "Cost isn't the main driver; the benefit is model loads once, scale API/UI separately, same API for web/mobile/batch.",
      "B": "Separation of concerns. Loose coupling.",
      "C": "Architecture can be more components but cleaner; the gain is separation of concerns and scaling flexibility.",
      "D": "Locally loading .pkl in Streamlit can be simpler; FastAPI+Render is about production: one model load, scale, logging."
    }
  },
  {
    "id": "L7-Q6",
    "chapter": "l7",
    "chapterTitle": "Lecture 7 — Model Deployment",
    "text": "Pydantic Field(ge=0.01, le=50000) does:",
    "options": {
      "A": "Scales values",
      "B": "Input validation — reject out-of-range before model",
      "C": "Encodes categories",
      "D": "Logs requests"
    },
    "correct": "B",
    "explainCorrect": "Validation: ge=min, le=max. Clear errors for invalid input.",
    "explainOptions": {
      "A": "Field(ge=, le=) doesn't scale values; it validates that the value is within range and rejects otherwise.",
      "B": "Validation: ge=min, le=max. Clear errors for invalid input.",
      "C": "Encoding categories is separate (e.g. OrdinalEncoder); Pydantic Field(ge=, le=) is numeric range validation.",
      "D": "Logging is separate; Field(ge=, le=) validates input and returns clear errors when out of range."
    }
  },
  {
    "id": "L7-Q7",
    "chapter": "l7",
    "chapterTitle": "Lecture 7 — Model Deployment",
    "text": "Procfile contains:",
    "options": {
      "A": "Python version",
      "B": "Start command: web: uvicorn main:app --host 0.0.0.0 --port $PORT",
      "C": "Dependencies",
      "D": "Model path"
    },
    "correct": "B",
    "explainCorrect": "Tells Render how to start the app.",
    "explainOptions": {
      "A": "Python version is usually in .python-version or runtime.txt; Procfile specifies the start command.",
      "B": "Tells Render how to start the app.",
      "C": "Dependencies are in requirements.txt; Procfile contains the command to run the web process.",
      "D": "Model path is in code or env; Procfile defines the start command (e.g. uvicorn main:app)."
    }
  },
  {
    "id": "L7-Q8",
    "chapter": "l7",
    "chapterTitle": "Lecture 7 — Model Deployment",
    "text": ".python-version with 3.11.7:",
    "options": {
      "A": "Speeds up",
      "B": "Avoids Python 3.13 compatibility issues (pandas etc)",
      "C": "Required for Render",
      "D": "Enables async"
    },
    "correct": "B",
    "explainCorrect": "Render might use 3.13 otherwise; 3.11.7 is stable.",
    "explainOptions": {
      "A": "Pinning 3.11.7 isn't mainly for speed; it's to avoid newer Python (e.g. 3.13) compatibility issues.",
      "B": "Render might use 3.13 otherwise; 3.11.7 is stable.",
      "C": "Render supports multiple versions; .python-version pins the version you want (e.g. to avoid 3.13 issues).",
      "D": "Async is supported in several Python versions; .python-version is about avoiding compatibility problems, not enabling async."
    }
  },
  {
    "id": "L7-Q9",
    "chapter": "l7",
    "chapterTitle": "Lecture 7 — Model Deployment",
    "text": "Render free tier cold start:",
    "options": {
      "A": "Never happens",
      "B": "First request after 15 min inactivity takes 30-60s to wake",
      "C": "Only affects paid",
      "D": "Only at deploy"
    },
    "correct": "B",
    "explainCorrect": "Services sleep after 15 min. First request wakes server.",
    "explainOptions": {
      "A": "Cold start does happen on free tier: after ~15 min idle the service sleeps and the first request is slow (30–60s).",
      "B": "Services sleep after 15 min. First request wakes server.",
      "C": "Cold start affects free tier (services sleep); paid tiers often keep instances always on.",
      "D": "Cold start happens after inactivity, not only at deploy; first request after sleep triggers the delay."
    }
  },
  {
    "id": "L7-Q10",
    "chapter": "l7",
    "chapterTitle": "Lecture 7 — Model Deployment",
    "text": "To analyze misclassifications later:",
    "options": {
      "A": "Don't log",
      "B": "Log every prediction (input, output, timestamp) to JSONL",
      "C": "Log only errors",
      "D": "Log only drift"
    },
    "correct": "B",
    "explainCorrect": "JSONL: one JSON per line. Join with ground truth later.",
    "explainOptions": {
      "A": "Not logging prevents analyzing misclassifications later; you need to log predictions to join with ground truth.",
      "B": "JSONL: one JSON per line. Join with ground truth later.",
      "C": "Logging only errors misses correct predictions; to analyze misclassifications you need input, output, timestamp for all.",
      "D": "Drift logging is separate; for misclassification analysis log every prediction (input, output, timestamp) to JSONL."
    }
  },
  {
    "id": "L7-Q11",
    "chapter": "l7",
    "chapterTitle": "Lecture 7 — Model Deployment",
    "text": "Bulk scoring (50 transactions):",
    "options": {
      "A": "Click 50 times in Streamlit",
      "B": "Call API in a loop from Python script",
      "C": "Not possible",
      "D": "Use Excel"
    },
    "correct": "B",
    "explainCorrect": "requests.post in loop. Export to CSV. Same API.",
    "explainOptions": {
      "A": "Clicking 50 times in Streamlit is manual; bulk scoring is done by calling the API in a loop from a script.",
      "B": "requests.post in loop. Export to CSV. Same API.",
      "C": "Bulk scoring is possible: call the same API in a loop (e.g. requests.post), then export results to CSV.",
      "D": "Excel could hold data, but scoring is done by calling the API (e.g. Python loop); Excel doesn't replace the API."
    }
  },
  {
    "id": "L7-Q12",
    "chapter": "l7",
    "chapterTitle": "Lecture 7 — Model Deployment",
    "text": "Streamlit app makes predictions by:",
    "options": {
      "A": "Loading .pkl locally",
      "B": "Calling FastAPI (HTTP POST)",
      "C": "Using sklearn directly",
      "D": "Batch only"
    },
    "correct": "B",
    "explainCorrect": "Streamlit = UI. Sends POST to Render API. Loose coupling.",
    "explainOptions": {
      "A": "In the FastAPI+Streamlit setup, the app doesn't load .pkl locally; it calls the FastAPI backend via HTTP POST.",
      "B": "Streamlit = UI. Sends POST to Render API. Loose coupling.",
      "C": "Streamlit doesn't use sklearn directly for prediction; it sends requests to the FastAPI service.",
      "D": "Streamlit can do single or batch; in either case predictions are made by calling the FastAPI API (POST), not batch-only."
    }
  },
  {
    "id": "L7-Q13",
    "chapter": "l7",
    "chapterTitle": "Lecture 7 — Model Deployment",
    "text": "Drift detection warns about:",
    "options": {
      "A": "Model accuracy",
      "B": "Input values >3 std from training mean",
      "C": "API latency",
      "D": "Log size"
    },
    "correct": "B",
    "explainCorrect": "Compares incoming features to training stats. Flags anomalies.",
    "explainOptions": {
      "A": "Drift detection is about input/feature distribution vs training, not model accuracy (which needs labels).",
      "B": "Compares incoming features to training stats. Flags anomalies.",
      "C": "API latency is operational; drift detection warns when input values are far from training (e.g. >3 std from mean).",
      "D": "Log size isn't what drift detection warns about; it flags when feature values deviate from training distribution."
    }
  },
  {
    "id": "L7-Q14",
    "chapter": "l7",
    "chapterTitle": "Lecture 7 — Model Deployment",
    "text": "feature_stats.json is used for?",
    "options": {
      "A": "Model weights",
      "B": "Drift detection — compare inputs to training mean/std",
      "C": "API docs",
      "D": "Logging only"
    },
    "correct": "B",
    "explainCorrect": "Stores training distribution (mean, std). API checks if input >3 std from mean.",
    "explainOptions": {
      "A": "Model weights are in the model file; feature_stats.json holds training stats (mean, std) for drift checks.",
      "B": "Stores training distribution (mean, std). API checks if input >3 std from mean.",
      "C": "API docs are separate (e.g. OpenAPI); feature_stats.json is for comparing inputs to training mean/std.",
      "D": "It's used for drift detection (compare inputs to training stats), not only for logging."
    }
  },
  {
    "id": "L7-Q15",
    "chapter": "l7",
    "chapterTitle": "Lecture 7 — Model Deployment",
    "text": "Render free tier: when service sleeps, logs (predictions.jsonl)?",
    "options": {
      "A": "Persist",
      "B": "Reset to empty (ephemeral)",
      "C": "Backed up",
      "D": "In DB"
    },
    "correct": "B",
    "explainCorrect": "Ephemeral storage: when service sleeps, local files deleted. No persistent logging on free tier.",
    "explainOptions": {
      "A": "On free tier, local files don't persist; when the service sleeps, storage is reset (ephemeral).",
      "B": "Ephemeral storage: when service sleeps, local files deleted. No persistent logging on free tier.",
      "C": "Predictions.jsonl isn't backed up on free tier; when the service sleeps, local files are lost.",
      "D": "Logs are in local files by default, not in a DB; on free tier that storage is ephemeral (reset when service sleeps)."
    }
  },
  {
    "id": "L8-Q1",
    "chapter": "l8",
    "chapterTitle": "Lecture 8 — Neural Nets I",
    "text": "Without activation, a neural network is:",
    "options": {
      "A": "Non-linear",
      "B": "Just linear regression",
      "C": "Unstable",
      "D": "Faster"
    },
    "correct": "B",
    "explainCorrect": "Activation adds non-linearity. Without it, layers collapse to linear.",
    "explainOptions": {
      "A": "Without activation the stack of layers is equivalent to one linear map; you need activation for non-linearity.",
      "B": "Activation adds non-linearity. Without it, layers collapse to linear.",
      "C": "Stability isn't the issue; without activation the network is equivalent to linear regression.",
      "D": "Speed isn't the point; without activation the model is just linear regression (no extra expressiveness)."
    }
  },
  {
    "id": "L8-Q2",
    "chapter": "l8",
    "chapterTitle": "Lecture 8 — Neural Nets I",
    "text": "ReLU range:",
    "options": {
      "A": "0 to 1",
      "B": "-1 to 1",
      "C": "0 to infinity",
      "D": "-inf to inf"
    },
    "correct": "C",
    "explainCorrect": "ReLU(x)=max(0,x). Passes only positive. Avoids vanishing in positive range.",
    "explainOptions": {
      "A": "0 to 1 is sigmoid; ReLU outputs [0, ∞): zero for negative input, identity for positive.",
      "B": "-1 to 1 is tanh; ReLU range is [0, ∞).",
      "C": "ReLU(x)=max(0,x). Passes only positive. Avoids vanishing in positive range.",
      "D": "ReLU clips negatives to 0, so output is never negative; range is [0, ∞), not all reals."
    }
  },
  {
    "id": "L8-Q3",
    "chapter": "l8",
    "chapterTitle": "Lecture 8 — Neural Nets I",
    "text": "Bias in a neuron:",
    "options": {
      "A": "Shifts decision boundary (threshold adjuster)",
      "B": "Is always 0",
      "C": "Same as weight",
      "D": "Not trainable"
    },
    "correct": "A",
    "explainCorrect": "Bias = trainable constant. Allows activation to shift; without it, forced through origin.",
    "explainOptions": {
      "A": "Bias = trainable constant. Allows activation to shift; without it, forced through origin.",
      "B": "Bias is learned (trainable), not fixed at 0; it shifts the decision boundary.",
      "C": "Bias is a scalar per neuron; weights are a vector. Both trainable but different roles (weights = direction, bias = shift).",
      "D": "Bias is trainable (learned); it's a parameter like weights, updated by backprop."
    }
  },
  {
    "id": "L8-Q4",
    "chapter": "l8",
    "chapterTitle": "Lecture 8 — Neural Nets I",
    "text": "Backpropagation uses:",
    "options": {
      "A": "Forward pass only",
      "B": "Chain rule to distribute error backward",
      "C": "Random updates",
      "D": "No gradients"
    },
    "correct": "B",
    "explainCorrect": "Chain rule: compute how much each weight contributed to loss.",
    "explainOptions": {
      "A": "Forward pass computes output; backprop uses the chain rule to propagate error backward and compute gradients.",
      "B": "Chain rule: compute how much each weight contributed to loss.",
      "C": "Updates are gradient-based, not random; backprop uses the chain rule to get gradients.",
      "D": "Backpropagation is exactly about computing gradients; without gradients there's no backprop."
    }
  },
  {
    "id": "L8-Q5",
    "chapter": "l8",
    "chapterTitle": "Lecture 8 — Neural Nets I",
    "text": "One epoch =",
    "options": {
      "A": "One weight update",
      "B": "One complete pass through all training data",
      "C": "One batch",
      "D": "One layer"
    },
    "correct": "B",
    "explainCorrect": "Epoch = full pass over training set.",
    "explainOptions": {
      "A": "One weight update is one step (e.g. one batch); an epoch is one full pass through all training data.",
      "B": "Epoch = full pass over training set.",
      "C": "One batch is a subset; one epoch means every training sample is seen once (may be many batches).",
      "D": "Layer is a structural unit; epoch is a training unit: one complete pass over the training set."
    }
  },
  {
    "id": "L8-Q6",
    "chapter": "l8",
    "chapterTitle": "Lecture 8 — Neural Nets I",
    "text": "Entity embeddings for categorical (e.g. 73 categories):",
    "options": {
      "A": "One-hot → 73 columns",
      "B": "Learn dense vector per category (e.g. 73×16)",
      "C": "Drop categories",
      "D": "Use label encoding only"
    },
    "correct": "B",
    "explainCorrect": "Embedding: 73 categories → 73×dim dense vectors. Learns semantic similarity.",
    "explainOptions": {
      "A": "One-hot gives 73 sparse columns; entity embedding learns a dense vector per category (e.g. 73×16), which can capture similarity.",
      "B": "Embedding: 73 categories → 73×dim dense vectors. Learns semantic similarity.",
      "C": "Dropping categories loses information; embedding keeps all categories as learned dense vectors.",
      "D": "Label encoding only gives integers (e.g. 0..72); embedding learns a dense vector per category for semantic similarity."
    }
  },
  {
    "id": "L8-Q7",
    "chapter": "l8",
    "chapterTitle": "Lecture 8 — Neural Nets I",
    "text": "Entity embedding dimension heuristic (fast.ai):",
    "options": {
      "A": "Same as categories",
      "B": "1.6 × n_categories^0.56",
      "C": "Always 256",
      "D": "n_categories / 2"
    },
    "correct": "B",
    "explainCorrect": "e.g. 73 categories: 1.6×73^0.56 ≈ 18.",
    "explainOptions": {
      "A": "Dimension isn't equal to number of categories; the fast.ai heuristic is 1.6 × n_categories^0.56 (e.g. 73 → ~18).",
      "B": "e.g. 73 categories: 1.6×73^0.56 ≈ 18.",
      "C": "256 is not a general rule; embedding dimension is often set by a heuristic like 1.6×n^0.56.",
      "D": "n_categories/2 is not the formula; the common heuristic is 1.6 × n_categories^0.56."
    }
  },
  {
    "id": "L8-Q8",
    "chapter": "l8",
    "chapterTitle": "Lecture 8 — Neural Nets I",
    "text": "For tabular data, tree-based models often:",
    "options": {
      "A": "Always worse than NNs",
      "B": "Outperform neural networks",
      "C": "Same as NNs",
      "D": "Not used"
    },
    "correct": "B",
    "explainCorrect": "RF, XGBoost often beat NNs on tabular. NNs need representation learning.",
    "explainOptions": {
      "A": "On tabular data, tree-based models (RF, XGBoost) often outperform NNs; NNs shine when representation learning helps.",
      "B": "RF, XGBoost often beat NNs on tabular. NNs need representation learning.",
      "C": "They're not the same; trees often do better on tabular; NNs excel on raw signals (vision, text).",
      "D": "Tree-based models are widely used for tabular data and often outperform NNs."
    }
  },
  {
    "id": "L8-Q9",
    "chapter": "l8",
    "chapterTitle": "Lecture 8 — Neural Nets I",
    "text": "Vanishing gradients in deep nets (sigmoid/tanh):",
    "options": {
      "A": "Gradients grow",
      "B": "Gradients shrink toward zero in early layers",
      "C": "No effect",
      "D": "Only in output"
    },
    "correct": "B",
    "explainCorrect": "Sigmoid/tanh saturate; gradients vanish. ReLU, batch norm help.",
    "explainOptions": {
      "A": "Vanishing means gradients shrink toward zero, not grow; in deep nets with sigmoid/tanh they get smaller in early layers.",
      "B": "Sigmoid/tanh saturate; gradients vanish. ReLU, batch norm help.",
      "C": "There is an effect: gradients can become very small in early layers, making learning slow or stuck.",
      "D": "Vanishing affects layers backward through the net, especially early layers, not only the output."
    }
  },
  {
    "id": "L8-Q10",
    "chapter": "l8",
    "chapterTitle": "Lecture 8 — Neural Nets I",
    "text": "Dropout:",
    "options": {
      "A": "Increases capacity",
      "B": "Randomly sets some activations to 0 during training",
      "C": "Speeds training",
      "D": "Adds parameters"
    },
    "correct": "B",
    "explainCorrect": "Dropout: randomly zero out. Reduces overfitting.",
    "explainOptions": {
      "A": "Dropout doesn't add capacity; it randomly zeros activations during training to reduce overfitting.",
      "B": "Dropout: randomly zero out. Reduces overfitting.",
      "C": "Training can be slower (more epochs); dropout doesn't speed training — it regularizes.",
      "D": "Dropout doesn't add parameters; it sets some activations to 0 at random during training."
    }
  },
  {
    "id": "L8-Q11",
    "chapter": "l8",
    "chapterTitle": "Lecture 8 — Neural Nets I",
    "text": "Sigmoid range and use?",
    "options": {
      "A": "-1 to 1, hidden layers",
      "B": "0 to 1, probability / binary output",
      "C": "0 to inf, regression",
      "D": "-inf to inf, all"
    },
    "correct": "B",
    "explainCorrect": "Sigmoid: 0–1, good for probability. Cons: saturates, vanishing gradients.",
    "explainOptions": {
      "A": "-1 to 1 is tanh; sigmoid outputs (0, 1), used for probability or binary output.",
      "B": "Sigmoid: 0–1, good for probability. Cons: saturates, vanishing gradients.",
      "C": "0 to inf is ReLU-like; sigmoid is bounded (0, 1) and used for probability, not unbounded regression.",
      "D": "Sigmoid is bounded between 0 and 1; it's used for probability/binary output, not all purposes."
    }
  },
  {
    "id": "L8-Q12",
    "chapter": "l8",
    "chapterTitle": "Lecture 8 — Neural Nets I",
    "text": "Single-layer NN can only learn?",
    "options": {
      "A": "Non-linear boundaries",
      "B": "Linear (straight-line) boundary",
      "C": "Any function",
      "D": "Circular"
    },
    "correct": "B",
    "explainCorrect": "Single layer = linear. Hidden layers + activation = non-linear.",
    "explainOptions": {
      "A": "Non-linear boundaries need hidden layers and activation; a single layer (no hidden) is just linear.",
      "B": "Single layer = linear. Hidden layers + activation = non-linear.",
      "C": "Single layer can only learn linear boundaries; 'any function' needs depth and non-linearity.",
      "D": "A single linear layer gives a linear boundary; circular or other shapes need multiple layers + activation."
    }
  },
  {
    "id": "L8-Q13",
    "chapter": "l8",
    "chapterTitle": "Lecture 8 — Neural Nets I",
    "text": "Batch Normalization helps with?",
    "options": {
      "A": "Speed only",
      "B": "Vanishing gradients — normalizes inner layers",
      "C": "Overfitting only",
      "D": "Input only"
    },
    "correct": "B",
    "explainCorrect": "Batch norm: normalizes activations. Helps gradients flow, reduces vanishing.",
    "explainOptions": {
      "A": "Batch norm can help speed but its main benefit is stabilizing training and helping with vanishing gradients.",
      "B": "Batch norm: normalizes activations. Helps gradients flow, reduces vanishing.",
      "C": "It helps with vanishing gradients and training stability; overfitting is more addressed by dropout/regularization.",
      "D": "Batch norm normalizes activations in inner layers, not only the input layer."
    }
  },
  {
    "id": "L8-Q14",
    "chapter": "l8",
    "chapterTitle": "Lecture 8 — Neural Nets I",
    "text": "BCELoss is for?",
    "options": {
      "A": "Regression",
      "B": "Binary classification",
      "C": "Multi-class",
      "D": "Clustering"
    },
    "correct": "B",
    "explainCorrect": "BCELoss = Binary Cross-Entropy. For binary classification.",
    "explainOptions": {
      "A": "Regression uses MSE or similar; BCELoss is Binary Cross-Entropy for binary classification.",
      "B": "BCELoss = Binary Cross-Entropy. For binary classification.",
      "C": "Multi-class uses CrossEntropyLoss (or NLLLoss); BCELoss is for binary (two classes).",
      "D": "Clustering uses different objectives; BCELoss is for supervised binary classification."
    }
  },
  {
    "id": "L8-Q15",
    "chapter": "l8",
    "chapterTitle": "Lecture 8 — Neural Nets I",
    "text": "Embeddings learn semantic similarity because?",
    "options": {
      "A": "Pre-defined",
      "B": "Learned — similar behavior → similar vectors",
      "C": "Random",
      "D": "One-hot"
    },
    "correct": "B",
    "explainCorrect": "Embedding weights learned. Similar categories for target → similar vectors.",
    "explainOptions": {
      "A": "Embeddings are learned from data, not pre-defined; similar behavior for the target leads to similar vectors.",
      "B": "Embedding weights learned. Similar categories for target → similar vectors.",
      "C": "They start random but are learned; after training, similar categories have similar embedding vectors.",
      "D": "One-hot is fixed (orthogonal); embeddings are learned so that similar categories get similar vectors."
    }
  },
  {
    "id": "L9-Q1",
    "chapter": "l9",
    "chapterTitle": "Lecture 9 — RNN & LSTM",
    "text": "RNN processes 18 words, one word per timestep. How many timesteps?",
    "options": {
      "A": "1",
      "B": "9",
      "C": "18",
      "D": "Depends on hidden size"
    },
    "correct": "C",
    "explainCorrect": "One input per timestep. 18 words → 18 timesteps.",
    "explainOptions": {
      "A": "1 timestep would mean one input total; with 18 words you have 18 timesteps (one word per step).",
      "B": "9 would be half; timesteps = number of inputs in the sequence = 18.",
      "C": "One input per timestep. 18 words → 18 timesteps.",
      "D": "Timesteps are determined by the sequence length (18 words), not by hidden size."
    }
  },
  {
    "id": "L9-Q2",
    "chapter": "l9",
    "chapterTitle": "Lecture 9 — RNN & LSTM",
    "text": "RNN on 7 days of stock prices, one day per step. Timestep = ?",
    "options": {
      "A": "Neurons in hidden layer",
      "B": "One step where single input (one day) is processed",
      "C": "Training iterations",
      "D": "Layers"
    },
    "correct": "B",
    "explainCorrect": "Timestep = one position in sequence; one day's price = one timestep.",
    "explainOptions": {
      "A": "Neurons are the hidden size; a timestep is one position in the sequence (e.g. one day's input).",
      "B": "Timestep = one position in sequence; one day's price = one timestep.",
      "C": "Training iterations are epochs/steps; a timestep is one slot in the input sequence (e.g. one day).",
      "D": "Layers are depth of the network; timestep is the index in the sequence (e.g. day 1, 2, …)."
    }
  },
  {
    "id": "L9-Q3",
    "chapter": "l9",
    "chapterTitle": "Lecture 9 — RNN & LSTM",
    "text": "RNN hidden state h_t:",
    "options": {
      "A": "Independent each step",
      "B": "Passed from t-1 to t; acts as memory",
      "C": "Same as input",
      "D": "Not used"
    },
    "correct": "B",
    "explainCorrect": "h_t passed to next step. Same weights shared across time.",
    "explainOptions": {
      "A": "h_t is not independent; it depends on h_{t-1} and current input — it's passed along as memory.",
      "B": "h_t passed to next step. Same weights shared across time.",
      "C": "Hidden state is computed from input and previous h; it's not the same as the raw input.",
      "D": "h_t is central: it's passed to the next timestep and carries information across time (memory)."
    }
  },
  {
    "id": "L9-Q4",
    "chapter": "l9",
    "chapterTitle": "Lecture 9 — RNN & LSTM",
    "text": "Vanishing gradient in RNN:",
    "options": {
      "A": "Gradients explode",
      "B": "BPTT: gradients multiply over steps, shrink to zero",
      "C": "Only in LSTM",
      "D": "No issue"
    },
    "correct": "B",
    "explainCorrect": "BPTT: gradients multiplied each step. Long sequences → vanish.",
    "explainOptions": {
      "A": "Exploding gradients are the opposite; vanishing means gradients shrink toward zero over many steps.",
      "B": "BPTT: gradients multiplied each step. Long sequences → vanish.",
      "C": "LSTM is designed to reduce vanishing; vanilla RNN has the vanishing gradient problem.",
      "D": "Vanishing is a real issue in RNNs: gradients get smaller as they propagate back through time."
    }
  },
  {
    "id": "L9-Q5",
    "chapter": "l9",
    "chapterTitle": "Lecture 9 — RNN & LSTM",
    "text": "LSTM addresses:",
    "options": {
      "A": "Speed",
      "B": "Vanishing gradients — gates control memory",
      "C": "Input size",
      "D": "Output format"
    },
    "correct": "B",
    "explainCorrect": "LSTM: separate cell state, gates (forget, input, output). Long-term memory.",
    "explainOptions": {
      "A": "LSTM isn't mainly about speed; it addresses vanishing gradients and long-term memory via gates.",
      "B": "LSTM: separate cell state, gates (forget, input, output). Long-term memory.",
      "C": "Input size is not what LSTM addresses; it addresses gradient vanishing and long-range dependency via gates.",
      "D": "Output format isn't the point; LSTM adds cell state and gates to control memory and reduce vanishing gradients."
    }
  },
  {
    "id": "L9-Q6",
    "chapter": "l9",
    "chapterTitle": "Lecture 9 — RNN & LSTM",
    "text": "Forget gate (sigmoid) output 0 means:",
    "options": {
      "A": "Keep all old memory",
      "B": "Discard all old memory",
      "C": "Half of memory",
      "D": "Output nothing"
    },
    "correct": "B",
    "explainCorrect": "0 = forget everything. 1 = keep all. 0.5 = partial.",
    "explainOptions": {
      "A": "Keep all would be forget gate ≈ 1; output 0 means 'forget everything' (discard all old cell content).",
      "B": "0 = forget everything. 1 = keep all. 0.5 = partial.",
      "C": "Half would be 0.5; forget gate output 0 means discard 100% of old memory.",
      "D": "Output nothing describes the gate output; the meaning is 'discard all old memory' for the cell state."
    }
  },
  {
    "id": "L9-Q7",
    "chapter": "l9",
    "chapterTitle": "Lecture 9 — RNN & LSTM",
    "text": "LSTM cell state C_t vs hidden state h_t:",
    "options": {
      "A": "Same",
      "B": "C_t = long-term memory; h_t = short-term/output",
      "C": "C_t is output",
      "D": "h_t is long-term"
    },
    "correct": "B",
    "explainCorrect": "C_t = conveyor belt (long-term). h_t = current output (short-term).",
    "explainOptions": {
      "A": "They're different: C_t is the cell state (long-term memory); h_t is the hidden/output state (short-term).",
      "B": "C_t = conveyor belt (long-term). h_t = current output (short-term).",
      "C": "The main output to next layer/step is h_t; C_t is internal state (long-term memory), not the direct output.",
      "D": "Long-term memory is C_t (cell state); h_t is the hidden state / short-term output at this step."
    }
  },
  {
    "id": "L9-Q8",
    "chapter": "l9",
    "chapterTitle": "Lecture 9 — RNN & LSTM",
    "text": "Time series: use _____ split. Never _____ randomly.",
    "options": {
      "A": "Random; split",
      "B": "Time-based; shuffle",
      "C": "Stratified; group",
      "D": "Group; time"
    },
    "correct": "B",
    "explainCorrect": "Time-based split only. Shuffling leaks future into past.",
    "explainOptions": {
      "A": "Random split is wrong for time series (leaks future); you must use time-based split.",
      "B": "Time-based split only. Shuffling leaks future into past.",
      "C": "Stratified/group don't fix the main issue; for time series use time-based split and never shuffle the sequence.",
      "D": "Never shuffle time series; use time-based split. 'Group; time' reverses the right idea (time-based; don't shuffle)."
    }
  },
  {
    "id": "L9-Q9",
    "chapter": "l9",
    "chapterTitle": "Lecture 9 — RNN & LSTM",
    "text": "Sliding window: past 14 days (X) → predict:",
    "options": {
      "A": "Past 7 days",
      "B": "Next day (y)",
      "C": "Same day",
      "D": "Next 14 days"
    },
    "correct": "B",
    "explainCorrect": "X = past N values. y = next value (or next K).",
    "explainOptions": {
      "A": "Past 7 days are inputs (X), not the prediction target; you predict the next value (y) after the window.",
      "B": "X = past N values. y = next value (or next K).",
      "C": "Same day is already in X; the target y is typically the next time step (next day).",
      "D": "You can predict next K steps, but the standard setup is X = past 14 days → y = next day (or next K); not necessarily next 14."
    }
  },
  {
    "id": "L9-Q10",
    "chapter": "l9",
    "chapterTitle": "Lecture 9 — RNN & LSTM",
    "text": "Scale time series:",
    "options": {
      "A": "On full data before split",
      "B": "Fit scaler on train only; transform train, val, test",
      "C": "On test only",
      "D": "Don't scale"
    },
    "correct": "B",
    "explainCorrect": "Fit MinMaxScaler on train. Transform val and test with same scaler.",
    "explainOptions": {
      "A": "Scaling on full data before split leaks future info into the scaler; fit scaler on train only, then transform train/val/test.",
      "B": "Fit MinMaxScaler on train. Transform val and test with same scaler.",
      "C": "Fitting on test only is wrong; scaler must be fit on train, then used to transform train, val, and test.",
      "D": "Scaling is usually needed for RNNs; when you do it, fit on train only and transform all splits with that scaler."
    }
  },
  {
    "id": "L9-Q11",
    "chapter": "l9",
    "chapterTitle": "Lecture 9 — RNN & LSTM",
    "text": "Input gate in LSTM controls?",
    "options": {
      "A": "What to forget",
      "B": "How much new memory to add",
      "C": "Output only",
      "D": "Nothing"
    },
    "correct": "B",
    "explainCorrect": "Input gate: how much of newly generated memory to add to cell state.",
    "explainOptions": {
      "A": "What to forget is the forget gate; the input gate controls how much new information to add to the cell state.",
      "B": "Input gate: how much of newly generated memory to add to cell state.",
      "C": "Output gate controls what goes to h_t; input gate controls how much new memory is added to C_t.",
      "D": "Input gate does something important: it gates how much of the new candidate memory is added to the cell."
    }
  },
  {
    "id": "L9-Q12",
    "chapter": "l9",
    "chapterTitle": "Lecture 9 — RNN & LSTM",
    "text": "Output gate in LSTM?",
    "options": {
      "A": "What to forget",
      "B": "Which parts of cell state to output as hidden state",
      "C": "Input only",
      "D": "Memory only"
    },
    "correct": "B",
    "explainCorrect": "Output gate: which parts of C_t are relevant now → h_t.",
    "explainOptions": {
      "A": "What to forget is the forget gate; the output gate decides which parts of the cell state become the hidden output h_t.",
      "B": "Output gate: which parts of C_t are relevant now → h_t.",
      "C": "Input gate controls what's added to C_t; output gate controls what of C_t is exposed as h_t.",
      "D": "Output gate selects which parts of cell state to output (h_t); it's not 'memory only' — it shapes the visible output."
    }
  },
  {
    "id": "L9-Q13",
    "chapter": "l9",
    "chapterTitle": "Lecture 9 — RNN & LSTM",
    "text": "BPTT = ?",
    "options": {
      "A": "Backpropagation through time",
      "B": "Batch processing",
      "C": "Binary pass",
      "D": "Bias propagation"
    },
    "correct": "A",
    "explainCorrect": "BPTT: backprop through time. Gradients flow backward across sequence.",
    "explainOptions": {
      "A": "BPTT: backprop through time. Gradients flow backward across sequence.",
      "B": "Batch processing is separate; BPTT = backpropagation through time (gradients backward over the sequence).",
      "C": "Binary pass isn't the acronym; BPTT stands for backpropagation through time.",
      "D": "Bias propagation isn't correct; BPTT is backpropagation through time (computing gradients across timesteps)."
    }
  },
  {
    "id": "L9-Q14",
    "chapter": "l9",
    "chapterTitle": "Lecture 9 — RNN & LSTM",
    "text": "RNN applications in finance include?",
    "options": {
      "A": "Image classification",
      "B": "Stock prediction, fraud, speech",
      "C": "Clustering only",
      "D": "Regression only"
    },
    "correct": "B",
    "explainCorrect": "RNN/LSTM: time series, fraud detection, speech translation, etc.",
    "explainOptions": {
      "A": "Image classification is typically CNN; RNN/LSTM are for sequences (time series, text, speech).",
      "B": "RNN/LSTM: time series, fraud detection, speech translation, etc.",
      "C": "RNNs are used for sequence prediction/classification (e.g. stock, fraud, speech), not only clustering.",
      "D": "RNNs do regression and classification on sequences; applications include stock prediction, fraud, speech — not regression only."
    }
  },
  {
    "id": "L9-Q15",
    "chapter": "l9",
    "chapterTitle": "Lecture 9 — RNN & LSTM",
    "text": "Feedforward NN limitation for sequences?",
    "options": {
      "A": "Too fast",
      "B": "Fixed size; no memory; order ignored",
      "C": "Too many params",
      "D": "No hidden layers"
    },
    "correct": "B",
    "explainCorrect": "Feedforward: fixed input, no memory, permuting past gives same output.",
    "explainOptions": {
      "A": "Speed isn't the limitation; feedforward nets have fixed input size, no memory across steps, and ignore order.",
      "B": "Feedforward: fixed input, no memory, permuting past gives same output.",
      "C": "Parameter count isn't the key limitation; the issue is fixed size, no recurrence, and order not mattering.",
      "D": "Feedforward nets can have hidden layers; the limitation for sequences is fixed input size and no temporal memory."
    }
  }
];

if (typeof module !== 'undefined' && module.exports) module.exports = { QUIZ_DB };
