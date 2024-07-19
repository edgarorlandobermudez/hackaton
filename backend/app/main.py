from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import psycopg2

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Case(BaseModel):
    database: str
    schema: str
    query: str
    person: str

@app.get("/databases")
async def get_databases():
    try:
        conn = psycopg2.connect(
            dbname="postgres",
            user="hackatonuser",
            password="hackatonpassword",
            host="localhost"
        )
        cur = conn.cursor()
        cur.execute("SELECT datname FROM pg_database WHERE datistemplate = false;")
        databases = cur.fetchall()
        cur.close()
        conn.close()
        return {"databases": [db[0] for db in databases]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Validar conexión a la base de datos al iniciar
@app.on_event("startup")
async def startup_event():
    conn = create_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Could not connect to the database")

@app.post("/cases")
async def create_case(case: Case):
    try:
        conn = psycopg2.connect(
            dbname="hackatondb",
            user="hackatonuser",
            password="hackatonpassword",
            host="localhost"
        )
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO cases (database, schema, query, person) VALUES (%s, %s, %s, %s)",
            (case.database, case.schema, case.query, case.person)
        )
        conn.commit()
        cur.close()
        conn.close()
        return {"message": "Case enviado correctamnete"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/cases")
async def get_cases():
    try:
        conn = psycopg2.connect(
            dbname="hackatondb",
            user="hackatonuser",
            password="hackatonpassword",
            host="localhost"
        )
        cur = conn.cursor()
        cur.execute("SELECT * FROM cases")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        
        cases = [
            {"id": row[0], "database": row[1], "schema": row[2], "query": row[3], "person": row[4]}
            for row in rows
        ]
        return {"cases": cases}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def create_connection():
    try:
        conn = psycopg2.connect(
            dbname="hackatondb",
            user="hackatonuser",
            password="hackatonpassword",
            host="localhost"
        )
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None
