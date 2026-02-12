from flask import Flask, render_template, send_from_directory, redirect

app = Flask(__name__, template_folder='templates')

VERSION = '1.0.7'
LEETCODE_USERNAME = 'aFirma'

@app.route('/')
def home():
    return render_template('index.html', version=VERSION, leetcode_username=LEETCODE_USERNAME)

# Serve assets folder
@app.route('/assets/<path:filename>')
def custom_static(filename):
    return send_from_directory('public/assets', filename)


# Serve specific root files
@app.route('/resume')
def resume():
    try:
        return send_from_directory('public/assets', 'Resume_Nilashis_Saha.pdf')
    except Exception:
        return redirect("/assets/Resume_Nilashis_Saha.pdf")

@app.route('/gallery')
def gallery():
    return render_template('gallery.html', version=VERSION)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
