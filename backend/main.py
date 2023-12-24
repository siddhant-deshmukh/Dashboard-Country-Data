from flask import Flask, jsonify, request
from flask_cors import CORS

from strawberry.flask.views import GraphQLView
from api.Schema.schema import schema
from api.Models.db import db

app = Flask(__name__)

CORS(app, origins="*")

database = "world-data"
user = "siddhant"
password = "password"
host = "localhost"
port = "5432"

app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{user}:{password}@{host}:{port}/{database}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view("graphql_view", schema=schema), #, graphiql=False
)
#app.add_url_rule(
#    "/g",
#    view_func=GraphQLView.as_view("graphql_view", schema=schema),
#)

@app.route("/", methods=['GET', 'POST'])
def hello_world():
    if request.method == 'POST':
        return jsonify({"Meow": "Simon"})
    return jsonify({"Meow": "Duggu"})


db.init_app(app)

if __name__ == "__main__":
    app.run()
