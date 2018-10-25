import sqlite3
import MyChatBot
import Word_Frequency
from flask import Flask,request,json

app = Flask(__name__)

selectedOption = {'institute': -1,'type': -1, 'name': -1}

@app.route("/process_query",methods=['GET','POST'])
def process_query():
    user_query = request.form['data']
    return process(user_query)

def process(message):
    con = sqlite3.connect('Data/replies.db')
    c = con.cursor()
    keywords = Word_Frequency.Get_Tokens(message)
    token = ' '.join(keywords)

    c.execute('SELECT Tag FROM tab1 WHERE Token=\"{0}\"'.format(token))
    out = c.fetchone()
    if not out:
        out = MyChatBot.Process_Query(message,c)  # response from
        c.execute('SELECT Tag FROM tab2 WHERE Response=\"{0}\"'.format(out))
        tag = c.fetchone()
        if tag:
            tag = tag[0]
        else:
            c.execute('SELECT max(tag) FROM tab2')
            tag = c.fetchone()[0]
        c.execute('INSERT INTO tab1 VALUES(\"{0}\",{1})'.format(token, tag))
        c.execute('INSERT INTO tab2 VALUES({0},\"{1}\")'.format(tag, out))
        return out
    else:
        c.execute('SELECT Response FROM tab2 WHERE Tag={0}'.format(out[0]))
        return c.fetchone()[0]

@app.route("/process_options",methods=['GET','POST'])
def process_options():
    conn = sqlite3.connect('Data/Options.db')
    con = conn.cursor()
    query = request.form['data']
    if query == 'About Charusat University':
        ans = json.dumps([-1, 'Charotar University of Science and Technology (CHARUSAT) has been conceived by Shri Charotar Moti Sattavis Patidar Kelavani Mandal - a not for profit premier education trust of India having a social lineage of more than 118 years. CHARUSAT has been established by promulgation of Gujarat Private University Act, 2009. It is empowered to confer degrees under Section 22 of UGC Act, 1956.'])

    elif query == 'Charusat Address':
        ans = json.dumps([-1, 'CHARUSAT Campus, Highway 139, Off, Nadiad - Petlad Road, Changa, Gujarat 388421'])

    elif query == 'Show all Institute':
        ans = json.dumps([i[0] for i in con.execute('SELECT Name FROM Institute').fetchall()])

    elif query in [i[0] for i in con.execute('SELECT Name FROM Institute').fetchall()]:
        selectedOption['institute'] = con.execute("SELECT Institute_id FROM Institute WHERE Name='" + query + "'").fetchone()[0]
        ans = json.dumps([i[0] for i in con.execute('SELECT Name FROM Programs WHERE Institute_id=' + str(selectedOption['institute'])).fetchall()])

    elif query in [i[0] for i in con.execute('SELECT Name FROM Programs WHERE Institute_id=' + str(selectedOption['institute'])).fetchall()]:
        selectedOption['type'] = con.execute("SELECT Prog_id FROM Programs WHERE Name='" + query + "' AND Institute_id=" + str(selectedOption['institute'])).fetchone()[0]
        ans = json.dumps([i[0] for i in con.execute('SELECT Name FROM Branch WHERE Prog_id=' + str(selectedOption['type'])).fetchall()])

    elif query in [i[0] for i in
        con.execute('SELECT Name FROM Branch WHERE Prog_id=' + str(selectedOption['type'])).fetchall()]:
        selectedOption['name'] = con.execute("SELECT Branch_id FROM Branch WHERE Name='" + query + "' AND Prog_id=" + str(selectedOption['type'])).fetchone()[0]
        ans = json.dumps([i[0] for i in con.execute("SELECT Name FROM Information WHERE Prog_id=" + str(selectedOption['type']) + " AND Branch_id=" + str(selectedOption['name'])).fetchall()])

    else:
        ans = json.dumps([-1, con.execute("SELECT Value FROM Information WHERE Prog_id=" + str(selectedOption['type']) + " AND Branch_id=" + str(selectedOption['name']) + " AND Name='" + query + "'").fetchone()[0]])

    return ans

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    return response

if __name__ == "__main__":
    app.run()