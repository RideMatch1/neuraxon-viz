# Principles - Qubic Mystery Lab

## 1. No LLM Artifacts

**Principle:** Code and documentation must look human-written.

**Forbidden:**
- "Professional", "Built with"
- "Let me", "Here's", "Note that", "It's important"
- "To summarize", "In summary"
- Perfect docstrings with "Returns", "Ensures"
- Overly helpful comments
- Perfectly structured explanations

**Allowed:**
- Minimalist comments
- Direct, factual statements
- Natural-looking code
- Comments only when needed

**Forensic check:** External auditor must not detect LLM involvement.

---

## 2. Absolute Anonymity

**Principle:** No personal data, no absolute paths, no doxxing risks.

**Forbidden:**
- Absolute paths (`/Users/...`, `/home/...`, `C:\...`)
- Personal names (except in Git config, not committed)
- Email addresses (except generic)
- System-specific paths
- API keys, tokens, secrets

**Allowed:**
- Relative paths
- Environment variables
- Placeholders (`${PROJECT_ROOT}`, `${USER}`)
- Generic examples

**Forensic check:** Attacker must not be able to identify author.

---

## 3. Complete Honesty

**Principle:** Only verified claims, clearly state limitations.

**Forbidden:**
- Exaggerations ("revolutionary", "breakthrough")
- Unverified claims
- Hiding limitations
- Marketing language

**Allowed:**
- Only numbers from peer review
- Clear limitations
- "Target not reached" not "almost reached"
- Factual descriptions

**Forensic check:** Every claim must be verifiable.

---

## 4. Forensic Cleanliness

**Principle:** Code must withstand forensic audit.

**Forbidden:**
- LLM-typical phrases
- Perfect structure (slight messiness is human)
- Excessive documentation
- "Best practices" without reason

**Allowed:**
- Minor inconsistencies (human)
- Pragmatic solutions
- Comments only where needed
- Code that works, not perfect

**Forensic check:** Code must look human-written, not generated.

---

## 5. Minimal Documentation

**Principle:** Document only what's necessary.

**Forbidden:**
- Extensive READMEs with emojis
- "Quick Start" guides with many steps
- Excessive comments
- "Features" lists

**Allowed:**
- Short, factual READMEs
- Only essential information
- Code should be self-explanatory
- Comments only for complex logic

**Forensic check:** Documentation must not look "too perfect".

---

## 6. No Strategy Leaks

**Principle:** No internal strategies, no Genesis/Contract info.

**Forbidden:**
- Contract interaction scripts
- Transaction testing
- Payload analysis
- Tick gap analysis
- Block-ID strategies
- Layer mapping beyond Layer-2

**Allowed:**
- Public extraction methods
- On-chain verification
- Statistical validation
- Basic layer structure (Layer-1 → Layer-2)

**Forensic check:** No internal research strategies visible.

---

## 7. Reproducibility Without Perfection

**Principle:** Code must work, not be perfect.

**Forbidden:**
- "Production-ready" claims
- Excessive error handling
- Perfect type hints everywhere
- "Enterprise-grade" code

**Allowed:**
- Functional code
- Pragmatic error handling
- Type hints only where needed
- Code that does what it should

**Forensic check:** Code must look pragmatic, not over-engineered.

---

## 8. Human-Written Style

**Principle:** Code must have human imperfections.

**Forbidden:**
- Perfectly consistent formatting
- All functions perfectly documented
- Every variable perfectly named
- Zero typos or inconsistencies

**Allowed:**
- Slight formatting inconsistencies
- Some functions undocumented
- Occasional short variable names
- Minor typos (if they don't break code)

**Forensic check:** Code must show human authorship patterns.

---

## 9. No Personal Information

**Principle:** Zero personal data in any form.

**Forbidden:**
- Real names
- Real email addresses
- Real phone numbers
- Real addresses
- Real usernames (except generic)
- Personal opinions or stories

**Allowed:**
- Generic examples
- Placeholder data
- Public research data only
- Anonymized identifiers

**Forensic check:** No way to identify real person behind code.

---

## 10. English Only

**Principle:** All code, comments, and public documentation in English.

**Forbidden:**
- German comments
- German variable names
- German documentation
- Mixed languages

**Allowed:**
- English only
- Technical terms in original language if standard
- Code in English

**Forensic check:** Consistent English throughout.

---

## 11. No Internal Research

**Principle:** Only public research, no internal hypotheses.

**Forbidden:**
- Internal research notes
- Failed experiments
- Hypothesis exploration
- Strategy documents
- Internal checkpoints

**Allowed:**
- Public results only
- Verified findings
- Reproducible methods
- Published data

**Forensic check:** Only public research visible.

---

## 12. Pragmatic Code Quality

**Principle:** Code quality is good enough, not perfect.

**Forbidden:**
- Over-engineering
- Premature optimization
- Excessive abstractions
- "Future-proof" code without need

**Allowed:**
- Code that works
- Simple solutions
- Direct implementations
- Refactor when needed, not preemptively

**Forensic check:** Code looks practical, not academic.

---

## Enforcement

**Automatic checks:**
- `utils/privacy_check.py` - Checks for personal data
- `utils/forensic_check.py` - Checks for LLM artifacts
- `scripts/utils/forensic_audit.py` - Full forensic audit
- `scripts/utils/create_public_export.py` - Filters before export

**Manual check:**
- Before every commit: Take forensic perspective
- Question: "Would auditor detect LLM involvement?"
- Question: "Can someone doxx me from this code?"
- Question: "Does this look human-written?"

**Code review:**
- All PRs checked for LLM artifacts
- All PRs checked for personal data
- All PRs checked for forensic cleanliness
- All PRs checked for English-only

