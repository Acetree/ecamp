# all the imports
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash, jsonify, escape

from contextlib import closing
from createOrderId import CreateOrderId
# create our little application :)


app = Flask(__name__)
app.config.from_object('config')
app.secret_key = 'fwf;r[ee4h[g]r\e3d4123@#3478&9(djw3r4tgfr54;h,53;lj,7ojg3ijg'

username = 'ecampadmin'
password = 'ECamp2014'

def connect_db():
    return sqlite3.connect(app.config['DATABASE'])


def init_db():
    with closing(connect_db()) as db:
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(app.config['DATABASE'])
    return db


@app.before_request
def before_request():
    g.db = connect_db()

@app.teardown_request
def teardown_request(exception):
    db = getattr(g, 'db', None)
    if db is not None:
        db.close()
    g.db.close()





'''
    views
'''

@app.route('/_beta', methods=['GET', 'POST'])
def beta_index():
    return render_template('betaindex.html')


@app.route('/_add_email',methods=['POST'])
def add_email():
    uid = CreateOrderId()
    g.db.execute('insert into betausers (uid, email) values (?, ?)',
                 [uid, request.form['email']])
    g.db.commit()
    return render_template('betaindex.html')



def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/_equipment', methods=['GET', 'POST'])
def show():
    session.pop('o_id', None)
    cur = g.db.execute('select name, price from equipments')
    equipments = [dict(name=row[0], price=row[1]) for row in cur.fetchall()]
    return render_template('equipment.html', equipments=equipments)


# diy
@app.route('/_start_order')
def start_order():
    o_id = CreateOrderId()
    session['o_id'] = o_id
    session['completed'] = 0
    
    is_diy = request.args.get('is_diy', 0, type=str)
    depart_date = request.args.get('depart_date', 0, type=str)
    return_date = request.args.get('return_date', 0, type=str)
    camping_people = request.args.get('camping_people', 0, type=str)
    
    
    g.db.execute('insert into orders (o_id, departDate, returnDate, campingPeople, isDiy) values (?, ?, ?, ?, ?)',
                 [o_id, depart_date, return_date, camping_people, is_diy])
    g.db.commit()

    if is_diy == '0':

        e_id = 90
        quantity = int(camping_people)

        query = query_db('select * from equipments where e_id = ?',
                    [e_id], one=True)
        price = int(query[2])
        cost = quantity * price
        g.db.execute('insert into orderEquipment (o_id, e_id, quantity, cost) values (?, ?, ?, ?)',
                    [o_id, e_id, quantity, cost])
        g.db.commit()

    return jsonify(result=0)
 

# add_equipment
@app.route('/_add_equipment')
def add_equipment():

    o_id = session['o_id']
    name = request.args.get('name', 0, type=str)
    quantity = request.args.get('quantity', 0, type=str)
    if quantity != '0':

        query = query_db('select * from equipments where name = ?',
                [name], one=True)
        e_id = query[0]
        cost = int(query[2]) * int(quantity)

        q = query_db('select * from orderEquipment where o_id = ? and e_id = ?',
                [o_id, e_id], one=True)

        if q != None:
            g.db.execute('delete from orderEquipment where o_id = ? and e_id = ?',
                 [o_id, e_id])
            g.db.commit()

        
    
        g.db.execute('insert into orderEquipment (o_id, e_id, quantity, cost) values (?, ?, ?, ?)',
                 [o_id, e_id, quantity, cost])
        g.db.commit()
    
    return jsonify(result=0)




@app.route('/_go_to_choose_tickets')
def go_to_choose_tickets():
    o_id = session['o_id']
    print o_id
    return render_template('destination.html')


def getEquipmentName(e_id):
    query = query_db('select * from equipments where e_id = ?',
                [e_id], one=True)
    return query[1]

def getEquipmentChineseName(e_id):
    query = query_db('select * from equipments where e_id = ?',
                [e_id], one=True)
    return query[3]

def getEquipmentPrice(e_id):
    query = query_db('select * from equipments where e_id = ?',
                [e_id], one=True)
    return query[2]

def getTicketName(e_id):
    query = query_db('select * from tickets where t_id = ?',
                [e_id], one=True)
    return query[1]

def getTicketChineseName(e_id):
    query = query_db('select * from tickets where t_id = ?',
                [e_id], one=True)
    return query[3]

def getTicketPrice(e_id):
    query = query_db('select * from tickets where t_id = ?',
                [e_id], one=True)
    return query[2]


def getEquipmentTotal(o_id):
    cur = g.db.execute('select * from orderEquipment where o_id = ?',
                [o_id])
    equipments = [dict(name=getEquipmentName(row[1]), price=getEquipmentPrice(row[1]), quantity=row[2], cost=row[3], chinese_name=getEquipmentChineseName(row[1])) for row in cur.fetchall()]

    equipment_total = 0

    for e in equipments:
        equipment_total += e['cost']

    return equipment_total, equipments


def getTicketTotal(o_id):
    cur = g.db.execute('select * from orderTicket where o_id = ?',
                [o_id])
    tickets = [dict(name=getTicketName(row[1]), price=getTicketPrice(row[1]), quantity=row[2], cost=row[3], chinese_name=getTicketChineseName(row[1])) for row in cur.fetchall()]

    ticket_total = 0

    for t in tickets:
        ticket_total += t['cost']

    return ticket_total, tickets

@app.route('/_choose_ticket/<name>')
def choose_ticket(name):

    o_id = session['o_id']


    query2 = query_db('select * from orders where o_id = ?',
                [o_id], one=True)
    
    depart_date = query2[1]
    return_date = query2[2]
    camping_people = query2[3]

    
    query = query_db('select * from tickets where name = ?',
                [name], one=True)
    t_id = query[0]
    price = query[2]
    
    cost = int(camping_people) * price

    q = query_db('select * from orderTicket where o_id = ?',
                [o_id], one=True)

    if q != None:
        g.db.execute('delete from orderTicket where o_id = ?',
                 [o_id])
        g.db.commit()


    g.db.execute('insert into orderTicket (o_id, t_id, quantity, cost) values (?, ?, ?, ?)',
                 [o_id, t_id, camping_people, cost])
    g.db.commit()

    insurance = int(camping_people) * 5

    all_total = getEquipmentTotal(o_id)[0] + insurance + getTicketTotal(o_id)[0]

    return render_template('shop-detail.html', departDate=depart_date, returnDate=return_date, campingPeople=camping_people, equipments=getEquipmentTotal(o_id)[1], equipmentTotal=getEquipmentTotal(o_id)[0], tickets=getTicketTotal(o_id)[1], insurance=insurance, allTotal=all_total)



# add_equipment
@app.route('/_order_info')
def order_info():

    o_id = session['o_id']


    do_insurance = request.args.get('doInsurance', 0, type=str)
    note1 = request.args.get('note1', 0, type=str)

    if do_insurance == '1':
        camping_people = query_db('select campingPeople from orders where o_id = ?',
                [o_id], one=True)
        insurance = int(camping_people[0]) * 5
        g.db.execute('insert into orderInsurance (o_id, quantity, cost) values (?, ?, ?)',
                [o_id, camping_people[0], insurance])
        g.db.commit()
    else:
        insurance = 0
    
    g.db.execute('insert into costs (o_id, equipmentTotal, ticketTotal, insurance, allTotal) values (?, ?, ?, ?, ?)',
                [o_id, getEquipmentTotal(o_id)[0], getTicketTotal(o_id)[0], insurance, getEquipmentTotal(o_id)[0]+getTicketTotal(o_id)[0]+insurance])
    g.db.commit()

    g.db.execute('insert into orderNotes (o_id, note) values (?, ?)',
                 [o_id, note1])
    g.db.commit()

   
    return jsonify(result=0)




@app.route('/_contact_info',methods=['POST'])
def contact_info():
    o_id = session['o_id']
    
    session['completed'] = 1

    g.db.execute('insert into contacts (o_id, name, tel, email, note) values (?, ?, ?, ?, ?)',
                 [o_id, request.form['name'], request.form['tel'], request.form['email'], request.form['note2']])
    g.db.commit()

    g.db.execute('insert into orderCompleted (o_id,c) values (?,?)',
                 [o_id,'1'])

    g.db.commit()


    return render_template('success.html', o_id=o_id)

@app.route('/_group')
def group():
    return render_template('group.html')

@app.route('/_product')
def product():
    return render_template('product.html')

@app.route('/_add_group',methods=['POST'])
def add_group():
    o_id = CreateOrderId()
    g.db.execute('insert into groups (o_id, name, tel, email, note) values (?, ?, ?, ?, ?)',
                 [o_id, request.form['name'], request.form['tel'], request.form['email'], request.form['note2']])
    g.db.commit()
    return render_template('index.html')





@app.route('/_admin')
def admin():
    if 'admin_login' in session:
        cur = g.db.execute('select orders.o_id, orders.departDate, orders.returnDate, orders.campingPeople, orders.isDiy, orderCompleted.c, contacts.name, contacts.tel, contacts.email, contacts.note, orderNotes.note, equipments.chinese_name, orderEquipment.quantity, tickets.chinese_name, orderTicket.quantity, costs.insurance, costs.allTotal from orders, orderCompleted, contacts, orderNotes, equipments, orderEquipment, tickets, orderTicket, costs where orders.o_id = orderCompleted.o_id and contacts.o_id = orders.o_id and orderNotes.o_id = orders.o_id and orderEquipment.o_id = orders.o_id and orderEquipment.e_id = equipments.e_id and tickets.t_id = orderTicket.t_id and orderTicket.o_id = orders.o_id and costs.o_id = orders.o_id')
        orders = [dict(o_id=row[0], departDate=row[1], returnDate=row[2], campingPeople=row[3], isDiy=row[4], c=row[5], name=row[6], tel=row[7], email=row[8], cnote=row[9], onote=row[10], ename=row[11], eq=row[12], tname=row[13], tq=row[14], ic=row[15], total=row[16]) for row in cur.fetchall()]



        cur = g.db.execute('select * from groups')
        groups = [dict(o_id=row[0], name=row[1], tel=row[2], email=row[3], note=row[4]) for row in cur.fetchall()]


        return render_template('admin-query.html', orders=orders, groups=groups)
    return render_template('admin.html')
    

@app.route('/_admin_login',methods=['POST'])
def admin_login():

    if request.method == 'POST' and request.form['username'] == username and request.form['password'] == password:
        session['admin_login'] = 1
        return redirect(url_for('admin'))
    return render_template('admin.html')
    
        






@app.route('/_recommendation/<name>')
def recommendation(name):

    return render_template('show_recommendation.html', name=name)

@app.route('/_new_info/<name>')
def new_info(name):
    
    return render_template('show_new_info.html', name=name)

@app.route('/_tip/<name>')
def tip(name):
    
    return render_template('show_tip.html', name=name)

if __name__ == '__main__':
    app.run()

