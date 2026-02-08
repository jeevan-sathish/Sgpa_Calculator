from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_grade_point(marks):
    if 90 <= marks <= 100:
        return 10
    elif 80 <= marks < 90:
        return 9
    elif 70 <= marks < 80:
        return 8
    elif 60 <= marks < 70:
        return 7
    elif 50 <= marks < 60:
        return 6
    elif 45 <= marks < 50:
        return 5
    elif 40 <= marks < 45:
        return 4
    else:
        return 0

@app.route("/calculate", methods=["POST"])
def calculate_sgpa():
    subjects = request.json  

    total_points = 0
    total_credits = 0
    grade_points = []

    for sub in subjects:
        
        
        marks = sub.get("marks", 0)
        credits = sub.get("credits", 0)

        gp = get_grade_point(marks)
        grade_points.append(gp)

        total_points += gp * credits
        total_credits += credits

    if total_credits == 0:
        return jsonify({"error": "Total credits cannot be zero"}), 400

    sgpa = round(total_points / total_credits, 2)

    return jsonify({
        "grade_points": grade_points,
        "sgpa": sgpa
    })


if __name__ == "__main__":
    app.run(debug=True)
