from flask import Flask
from dotenv import load_dotenv


app = Flask(__name__)

load_dotenv()


@app.route("/")
def index():
    return "<h1> Hello World </h1>"


if __name__ == "__main__":
    app.run(debug=True)
