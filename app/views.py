from flask import jsonify, render_template, request, redirect, url_for
from models import Voo
from app import app, db

@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if username == "admin" and password == "senha123":
            return jsonify({"success": True, "redirect": url_for("home")}), 200

        return jsonify({"success": False}), 401

    return render_template("login.html")

@app.route("/dashboard")
def home():
    return render_template("home.html")


@app.route("/api/mercados", methods=["GET"])
def get_mercados():
    mercados = db.session.query(Voo.mercado).distinct().all()

    mercados_list = [mercado[0] for mercado in mercados]

    return jsonify({"mercados": mercados_list})

@app.route('/api/voo_data', methods=['GET'])
def voo_data():
    mercado = request.args.get('mercado')
    ano = request.args.get('ano')
    mes = request.args.get('mes')

    voos = Voo.query.filter_by(mercado=mercado, ano=ano, mes=mes).all()

    if voos:
        dates = [f"{dados.mes}/{dados.ano}" for dados in voos]
        rpk = [dados.rpk for dados in voos]
        ask = [dados.ask for dados in voos]
        load_factors = [v.calcular_load_factor() for v in voos]
        return jsonify({
            'dates': dates,
            'rpk': rpk,
            'ask': ask,
            'load_factor': load_factors
        })
    else:
        return jsonify({'message': 'Nenhum dado encontrado'}), 404