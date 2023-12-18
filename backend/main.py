from flask import Flask
from strawberry.flask.views import GraphQLView
from api.Schema.schema import schema
from api.Models.db import db

app = Flask(__name__)

database="world-data"
user="siddhant"
password="password"
host="localhost"
port="5432"
  
app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{user}:{password}@{host}:{port}/{database}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
  
app.add_url_rule(
  "/graphql",
  view_func=GraphQLView.as_view("graphql_view", schema=schema),
)

db.init_app(app)

if __name__ == "__main__":
  app.run()
