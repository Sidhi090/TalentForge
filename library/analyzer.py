import re
import pdfplumber
import docx

def extract_text(file_path):
    if file_path.endswith(".pdf"):
        with pdfplumber.open(file_path) as pdf:
            return " ".join(page.extract_text() or "" for page in pdf.pages)
    elif file_path.endswith(".docx"):
        doc = docx.Document(file_path)
        return " ".join(p.text for p in doc.paragraphs)
    return ""


def analyze_resume(text: str):
    strengths = []
    improvements = []
    keyword_matches = []

    # ✅ Check sections
    sections = ["education", "experience", "skills", "projects"]
    for sec in sections:
        if sec.lower() in text.lower():
            strengths.append(f"{sec.title()} section found")
        else:
            improvements.append(f"Add {sec.title()} section")

    # ✅ Detect email
    if re.search(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b", text):
        strengths.append("Email detected")
    else:
        improvements.append("Add an email address")

    # ✅ Detect phone number
    if re.search(r"\+?\d[\d -]{8,12}\d", text):
        strengths.append("Phone number detected")
    else:
        improvements.append("Include phone number")

    # ✅ Check keywords
    keywords = ["python", "java", "sql", "aws", "fastapi"]
    for kw in keywords:
        if kw.lower() in text.lower():
            keyword_matches.append({"word": kw, "match": True})
        else:
            keyword_matches.append({"word": kw, "match": False})

    # ✅ Simple ATS score
    score = int((len([k for k in keyword_matches if k["match"]]) / len(keyword_matches)) * 100)

    return {
        "score": score,
        "strengths": strengths,
        "improvements": improvements,
        "keywordMatches": keyword_matches,
        "recommendations": [
            "Add measurable achievements",
            "Include more industry-specific keywords",
            "Ensure consistent formatting",
            "Keep resume to 1-2 pages"
        ]
    }
