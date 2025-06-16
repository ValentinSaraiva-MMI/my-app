import mysql.connector
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request, Header, HTTPException, status, Body
from pydantic import BaseModel


class Login(BaseModel):
    lastname: str
    firstname: str
    email: str
    birthDate: str
    city: str
    postalCode: str

app = FastAPI()
origins = {"*"}
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a connexion to the database

conn = mysql.connector.connect(
    database=os.getenv("MYSQL_DATABASE"),
    user=os.getenv("MYSQL_USER"),
    password=os.getenv("MYSQL_ROOT_PASSWORD"),
    port=3306,
    host=os.getenv("MYSQL_HOST"))

@app.get("/")
async def hello_world():
    return "Hello world"

@app.get("/users")
async def get_users():
    cursor = conn.cursor()
    sql_select_Query = "SELECT * from users"
    cursor.execute(sql_select_Query)
    # get all records
    records = cursor.fetchall()
    print("Total number of rows in utilisateur is: ", cursor.rowcount)
    # renvoyer nos données et 200 code ok
    return {"utilisateur": records, "code": 200}


@app.post("/login")
async def create_user(login: Login):
    cursor = conn.cursor()
    try:
        sql_select_Query = """
            INSERT INTO users (lastname, firstname, email, birthDate, city, postalCode)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql_select_Query, (
            login.lastname,
            login.firstname,
            login.email,
            login.birthDate,
            login.city,
            login.postalCode
        ))
        conn.commit()
        return {"message": "User added successfully", "code": 201}
    except mysql.connector.Error as err:
        return {"error": str(err), "code": 400}