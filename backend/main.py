from sys import exit
from os import environ
from flask_cors import CORS
from dotenv import load_dotenv
from flask import Flask, jsonify, request

from api.Models.db import db
from api.Schema.schema import schema
from strawberry.flask.views import GraphQLView

app = Flask(__name__)

CORS(app, origins="*")

load_dotenv("../.env")

postgresql_url = environ.get("POSTGRES_CONNECT_URL")
if postgresql_url is None:
    print("No variable named POSTGRES_CONNECT_URL found in .env file")
    exit()

env_type = environ.get("ENVIRONMENT_TYPE")

app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("POSTGRES_CONNECT_URL") #f"postgresql://{user}:{password}@{host}:{port}/{database}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

if env_type == "PROD":
    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view("graphql_view", schema=schema, graphiql=False), #, graphiql=False
    )
else:
    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view("graphql_view", schema=schema, graphiql=True), #, graphiql=False
    )

@app.route("/", methods=['GET', 'POST'])
def hello_world():
    if request.method == 'POST':
        return jsonify({"Meow": "Simon"})
    return jsonify({"Meow": "Duggu"})

db.init_app(app)

if __name__ == "__main__":
    app.run()
