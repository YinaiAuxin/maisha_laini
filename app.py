from flask import Flask, render_template, redirect, request, session
from flask_session import Session
from sqlite3 import connect

app = Flask(__name__)

#configure database connection
class cfg_db:
    def login(user, pwd):
        users_db = connect('./database/users.db')
        cur =  users_db.cursor()
        rows = cur.execute("SELECT * FROM users  WHERE username = ?", [user])
        user_found = False
        for row in rows:
            user_found = True

        if not user_found:
            return 'user_error_msg'
        elif pwd != row[5]:
            return 'pwd_error_msg'
        else:
            cfg_sessions.create_session(row[1])
            return 'login successful'
    
    def get_user(usr_name):
        if not usr_name:
            return False
        db = connect('./database/users.db')
        cur = db.cursor()
        rows = cur.execute('SELECT * FROM users WHERE username = ?', [usr_name])
        user_found = False
        for row in rows:
            user_found = True
        return user_found

#login error messages
messages = dict(
    user_error_msg = 'user not found',
    pwd_error_msg = 'password invalid',
    missing_all = 'username and password not provided',
    missing_pwd = 'password not provided',
    missing_uname = 'username not provided'
)

#configure sessions
class cfg_sessions:
    app.config['SESSION_PERMANENT'] = False
    app.config['SESSION_TYPE'] = 'filesystem'
    Session(app)
    def create_session(f_name):
        session['name'] = f_name

#global session name
session_name = str()

#pass session information to layout template
@app.context_processor
def user_name():
    global session_name
    return dict(name=session_name)
     
@app.route("/")
def index(): 
    return redirect('/grab_a_bite')

@app.route('/grab_a_bite')
def menu():
    global session_name
    session_name = "Guest"
    if session.get('name'):
        session_name = session['name']
    return render_template("index.html")

@app.route("/join_our_team")
def work():
    return render_template("jobs.html")

@app.route("/explore")
def explore():
    return render_template("index.html")

@app.route("/contact_us", methods=["GET","POST"])
def contact_us():
    return render_template("contact_details.html")

@app.route("/clear_session")
def clear_session():
    if session.get("name"):
        session.clear()
    return redirect('/')

#User accessing login page either through GET or POST
@app.route('/login', methods=["GET", "POST"])
def login():
    message = str()
    #Code to be executed if page accessed through GET
    if request.method == 'GET' and not 'name' in session:
        user = request.args.get('username')
        userFound = cfg_db.get_user(user)
        return render_template('login.html', message=userFound)
    
    #Code to be executed if user accessed page using POST
    elif request.method == 'POST':
        username = request.form.get('user')
        pwd_input = request.form.get('pwd')

        #message returned if login failed
        if not (username or pwd_input):
            message = 'missing_all'
        elif not username:
            message = 'missing_uname'
        elif not pwd_input:
            message = 'missing_pwd'
        else:
            message = cfg_db.login(username, pwd_input)

        if message in messages:
            return render_template('login.html', message = messages[message])
        
    #redirect to homepage if all is well
    return redirect(f'/?{message}')

@app.route('/search', methods=['POST'])
def search():
    usrname = request.form.get('user')
    result = cfg_db.get_user(usrname)
    return render_template('search.html', search=result)