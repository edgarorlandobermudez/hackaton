from database import create_connection

def test_connection():
    conn = create_connection()
    if conn:
        print("Conexión a la base de datos exitosa")
        try:
            with conn.cursor() as cursor:
                cursor.execute("SELECT version();")
                db_version = cursor.fetchone()
                print(f"Versión de la base de datos: {db_version[0]}")
        except Exception as e:
            print(f"Error al realizar la consulta: {e}")
        finally:
            conn.close()
    else:
        print("No se pudo conectar a la base de datos")

if __name__ == "__main__":
    test_connection()
