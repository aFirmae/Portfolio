from flask import Flask, render_template, send_from_directory
import os

# Initialize Flask with specific static folder configuration to match existing structure
# We set static_folder to current directory but we'll use specific routes for assets to be safe
app = Flask(__name__, template_folder='templates')

VERSION = '1.0.4'

@app.route('/')
def home():
    return render_template('index.html', version=VERSION)

# Serve assets folder
@app.route('/assets/<path:filename>')
def custom_static(filename):
    return send_from_directory('assets', filename)

# Serve specific root files
@app.route('/resume')
def resume():
    return send_from_directory('assets', 'Resume_Nilashis_Saha.pdf')
    
@app.route('/robots.txt')
def robots():
    return send_from_directory('.', 'robots.txt')

@app.route('/sitemap.xml')
def sitemap():
    return send_from_directory('.', 'sitemap.xml')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
