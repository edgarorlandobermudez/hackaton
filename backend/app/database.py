import psycopg2
from psycopg2 import OperationalError

DATABASE_URL = "dbname=hackatondb user=hackatonuser password=hackatonpassword host=localhost"

def create_connection():
    try:
        connection = psycopg2.connect(DATABASE_URL)
        cursor = connection.cursor()
        # Realizar una consulta simple para verificar la conexión
        cursor.execute("SELECT 1")
        print("Database connection successful")
        return connection
    except OperationalError as e:
        print(f"The error '{e}' occurred")
        return None
