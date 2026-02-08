from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_grade_point(m):
    if 90 <= m <= 100:
        return 10
    elif 80 <= m <= 89:
        return 9
    elif 70 <= m <= 79:
        return 8
    elif 60 <= m <= 69:
        return 7
    elif 50 <= m <= 59:
        return 6
    elif 45 <= m <= 49:
        return 5
    elif 40 <= m <= 44:
        return 4
    else:
        return 0

@app.route("/calculate", methods=["POST"])
def calculate_sgpa():
    data = request.json
    marks = data["marks"]
    credits = data["credits"]

    grade_points = [get_grade_point(m) for m in marks]
    total = sum(c * gp for c, gp in zip(credits, grade_points))
    sgpa = round(total / sum(credits), 2)

    return jsonify({
        "grade_points": grade_points,
        "sgpa": sgpa
    })

if __name__ == "__main__":
    app.run(debug=True)
