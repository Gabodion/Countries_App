from flask import Flask, render_template, url_for


app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/country-details")
def get_more_info():
    return render_template("detail.html")




if __name__ == "__main__":
    app.run(debug=True)