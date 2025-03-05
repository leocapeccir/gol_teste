from app import db 


class Voo(db.Model):

    __tablename__ = 'voos'

    id = db.Column(db.Integer, primary_key=True)
    ano = db.Column(db.Integer)
    mes = db.Column(db.Integer)
    mercado = db.Column(db.String(100))
    rpk = db.Column(db.Float)
    ask = db.Column(db.Float)

    def __init__(self, ano, mes, mercado, rpk, ask):
        self.ano = ano
        self.mes = mes
        self.mercado = mercado
        self.rpk = rpk
        self.ask = ask

    def __repr__(self):
        return f"<Voo {self.mercado} - {self.ano}-{self.mes}>"
    
    def calcular_load_factor(self):
        if self.rpk is None or self.ask is None:
            return 0  
        return (self.rpk / self.ask) * 100

        
