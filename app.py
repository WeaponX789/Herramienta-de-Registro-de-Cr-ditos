
from flask import Flask, request, jsonify, render_template
from models import db, Credito



app = Flask(__name__)

#configuración para sql lite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():# se crea la base de datos
    db.create_all()
@app.route("/")
def home():
    return render_template("index.html")  # Se manda a llamar el archivo html que contiene la estructura de la página

#-----Funciones ------------------------------------------- 

# nuevo registro
@app.route("/creditos", methods=["POST"])# Se activa la función con el método Post para añadir un nuevo crédito
def nuevoCredito():
    data=request.json
    nuevo=Credito( #se crea una nueva clase Credito que recibe los datos ingresados
        cliente=data["cliente"],
        monto=data["monto"],
        tasa_interes=data["tasa_interes"],
        plazo=data["plazo"],
        fecha_otorgamiento=data["fecha_otorgamiento"]
    )
    db.session.add(nuevo)
    db.session.commit()
    return jsonify({"message": "Crédito registrado"}), 201

# imprime los datos
@app.route("/creditos", methods=["GET"])
# Se activa la función con el método Get para mostrar los créditos
def get_creditos():
    creditos = Credito.query.all()
    result = []
    for c in creditos:
        result.append({
            "id": c.id,
            "cliente": c.cliente,
            "monto": c.monto,
            "tasa_interes": c.tasa_interes,
            "plazo": c.plazo,
            "fecha_otorgamiento": c.fecha_otorgamiento
        })
    return jsonify(result)

# Editar crédito
@app.route("/creditos/<int:id>", methods=["PUT"])
#se usa el método PUT para editar el registro
def update_credito(id):
    data = request.json
    credito = Credito.query.get(id)
    if not credito:
        return jsonify({"error": "Crédito no encontrado"}), 404
    credito.cliente = data["cliente"]
    credito.monto = data["monto"]
    credito.tasa_interes = data["tasa_interes"]
    credito.plazo = data["plazo"]
    credito.fecha_otorgamiento = data["fecha_otorgamiento"]
    db.session.commit()

    return jsonify({"message": "Crédito actualizado"})

# Eliminar crédito
@app.route("/creditos/<int:id>", methods=["DELETE"])
#delete para eliminar un registro
def delete_credito(id):
    credito = Credito.query.get(id)
    if not credito:
        return jsonify({"error": "Crédito no encontrado"}), 404
    db.session.delete(credito)
    db.session.commit()
    return jsonify({"message": "Crédito eliminado"})



if __name__ == "__main__":
    app.run(debug=True)

