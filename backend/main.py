from sys import exit
from os import environ
from flask_cors import CORS
from dotenv import load_dotenv
from flask import Flask, jsonify, request

from api.Models.db import db
from api.Schema.schema import schema
from strawberry.flask.views import GraphQLView

load_dotenv("../.env")

app = Flask(__name__)


client_1 = environ.get("ALLOWED_ORIGIN_CLIENT_1")
client_2 = environ.get("ALLOWED_ORIGIN_CLIENT_2")
client_3 = environ.get("ALLOWED_ORIGIN_CLIENT_3")
client_4 = environ.get("ALLOWED_ORIGIN_CLIENT_4")

CORS(app, origins=[client_1, client_2, client_3, client_4])

@app.route('/')
def hello_world():
    return 'Hello, World!'

#                                                        SETTING UP THE DATABASE (POSTGRESQL)
postgresql_url = environ.get("POSTGRES_CONNECT_URL")
if postgresql_url is None:
    print("No variable named POSTGRES_CONNECT_URL found in .env file")
    exit()

env_type = environ.get("ENVIRONMENT_TYPE")

app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("POSTGRES_CONNECT_URL") #f"postgresql://{user}:{password}@{host}:{port}/{database}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

#                                                       SETTING UP THE GRAPHQL URLS
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

if __name__ == "__main__":
    app.run()
