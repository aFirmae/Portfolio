from flask import Flask, render_template, send_from_directory, redirect, request, make_response
import os
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__, template_folder='templates')

# Initialize Limiter
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["50 per minute", "5 per second"],
    storage_uri="memory://"
)

VERSION = '1.0.8'
LEETCODE_USERNAME = 'aFirma'

@app.route('/')
def home():
    return render_template('index.html', version=VERSION, leetcode_username=LEETCODE_USERNAME)

# Serve assets folder
@app.route('/assets/<path:filename>')
@limiter.exempt
def custom_static(filename):
    return send_from_directory(os.path.join(app.root_path, 'public', 'assets'), filename)

@app.route('/documents/<path:filename>')
@limiter.exempt
def serve_documents(filename):
    return send_from_directory(os.path.join(app.root_path, 'public', 'documents'), filename)

@app.route('/docs')
def docs():
    # Check if user has the authorization cookie
    if request.cookies.get('docs_access') == 'true':
        return render_template('docs.html', version=VERSION, documents=[])
    
    # If not, render the auth page
    return render_template('docs_auth.html', version=VERSION)

@app.route('/docs/auth', methods=['POST'])
@limiter.limit("10 per minute") # Stricter limit for password guess
def docs_auth():
    keyword = request.form.get('keyword')
    expected_keyword = os.environ.get("DOCS_PASSWORD", "NilashisDocs2024")
    
    if keyword == expected_keyword:
        # Create a response that redirects to /docs
        resp = make_response(redirect('/docs'))
        # Set a cookie valid for 1 day (86400 seconds)
        resp.set_cookie('docs_access', 'true', max_age=86400, httponly=True, secure=False) # In prod on Vercel it's HTTPS, but for local testing secure=False is fine
        return resp
    else:
        # Re-render with error
        return render_template('docs_auth.html', version=VERSION, error="Invalid keyword. Please try again.")


# Serve specific root files
@app.route('/resume')
@limiter.exempt
def resume():
    try:
        return send_from_directory(os.path.join(app.root_path, 'public', 'assets'), 'Resume_Nilashis_Saha.pdf')
    except Exception:
        return redirect("/assets/Resume_Nilashis_Saha.pdf")

@app.route('/gallery')
def gallery():
    return render_template('gallery.html', version=VERSION)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html', version=VERSION), 404

@app.errorhandler(429)
def ratelimit_handler(e):
    return render_template('429.html', version=VERSION), 429

if __name__ == '__main__':
    app.run(debug=True, port=5000)
