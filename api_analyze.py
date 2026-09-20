from flask import Flask, jsonify, request

app = Flask(__name__)


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return response


def build_rule_based_analysis(summary):
    findings = []
    recommendations = []

    images_without_alt = int(summary.get("imagesWithoutAlt", 0) or 0)
    headings = summary.get("headings", []) or []
    buttons = int(summary.get("buttons", 0) or 0)
    links = int(summary.get("links", 0) or 0)

    if images_without_alt > 0:
        findings.append({
            "type": "detected_issue",
            "issue": f"{images_without_alt} image(s) do not have an alt attribute.",
            "impact": "Screen-reader users may miss important image information."
        })
        recommendations.append("Add meaningful alt text to informative images and empty alt text to decorative images.")
    else:
        findings.append({
            "type": "positive_check",
            "issue": "No images without an alt attribute were detected in the sampled page.",
            "impact": "This is a limited automated check, not a complete accessibility audit."
        })

    if not headings:
        findings.append({
            "type": "potential_issue",
            "issue": "No h1, h2, or h3 headings were detected.",
            "impact": "A meaningful heading structure can help users navigate the page."
        })
        recommendations.append("Add a logical heading hierarchy beginning with a descriptive h1 where appropriate.")
    else:
        recommendations.append("Review heading order and ensure each heading describes the content that follows it.")

    if buttons == 0 and links == 0:
        findings.append({
            "type": "potential_issue",
            "issue": "No buttons or links were detected.",
            "impact": "Interactive controls may be missing or may use custom elements not detected by this check."
        })
    else:
        recommendations.append("Test all interactive controls with keyboard navigation and visible focus indicators.")

    return {
        "source": "rule_based_fallback",
        "page": {
            "title": summary.get("title", ""),
            "url": summary.get("url", "")
        },
        "findings": findings,
        "recommendations": recommendations,
        "disclaimer": "This is a lightweight heuristic analysis and does not certify WCAG compliance."
    }


@app.route("/api/analyze", methods=["POST", "OPTIONS"])
def analyze():
    if request.method == "OPTIONS":
        return ("", 204)

    summary = request.get_json(silent=True)
    if not isinstance(summary, dict):
        return jsonify({"ok": False, "error": "Expected a JSON page summary."}), 400

    result = build_rule_based_analysis(summary)
    return jsonify({"ok": True, **result})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
