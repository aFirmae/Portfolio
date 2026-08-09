from flask import Flask, render_template, send_from_directory, redirect, request, make_response
import os
import json
from dotenv import load_dotenv
load_dotenv()
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import pyotp

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

DOCS_SLUG_MAP = {
    "aadhar": "Aadhar.pdf",
    "aadhar-masked": "Aadhar Card - Number Hidden.pdf",
    "pan": "PAN.pdf",
    "pan-digilocker": "PAN - Digilocker.pdf",
    "e-pan": "e-PAN.pdf",
    "driving-license": "Driving License.pdf",
    "driving-license-digilocker": "Driving Licence - Digilocker.pdf",
    "voter-id": "VoterID.pdf",
    "passport": "Passport.pdf",
    "10th-marksheet": "Marksheet X.pdf",
    "10th-admit-card": "Admit Card X.pdf",
    "10th-marksheet-digilocker": "X Marksheet - Digilocker.pdf",
    "10th-passing-certificate-digilocker": "X Passing Cerificate - Digilocker.pdf",
    "12th-marksheet": "Marksheet XII.pdf",
    "12th-reg-card": "Reg Card XII.pdf",
    "12th-marksheet-certificate-digilocker": "XII Marksheet and Certificate.pdf",
    "sem1": "Result Sem 1.pdf",
    "sem1-digilocker": "SEM 1 - Digilocker.pdf",
    "sem2": "Result Sem 2.pdf",
    "sem2-digilocker": "SEM 2 - Digilocker.pdf",
    "sem3": "Result Sem 3.pdf",
    "sem3-digilocker": "SEM 3 - Digilocker.pdf",
    "sem4": "Result Sem 4.PDF",
    "sem4-digilocker": "SEM 4 - Digilocker.pdf",
    "sem5": "Result Sem 5.pdf",
    "sem5-digilocker": "SEM 5 - Digilocker.pdf",
    "sem6": "Result Sem 6.pdf",
    "sem6-digilocker": "SEM 6 - Digilocker.pdf",
    "sem7": "Result Sem 7.pdf",
    "sem7-digilocker": "SEM 7 - Digilocker.pdf",
    "sem8": "Result Sem 8.pdf",
    "all-results": "All Results.pdf",
    "abcid-digilocker": "ABCID - Digilocker.pdf",
    "birth-certificate": "Birth Certificate.pdf",
    "domicile": "Domicile.pdf",
    "passbook": "Pass Book Front Page.pdf",
    "ration-card-digilocker": "Ration Card - Digilocker.pdf",
    "sc-certificate": "SC Certificate.pdf"
}

@app.route('/docs/<slug>')
@limiter.exempt
def serve_secure_document(slug):
    if request.cookies.get('docs_access') != 'true':
        return redirect('/docs')
        
    filename = DOCS_SLUG_MAP.get(slug)
    if not filename:
        return render_template('404.html', version=VERSION), 404
        
    return send_from_directory(os.path.join(app.root_path, 'public', 'documents'), filename)

@app.route('/docs')
def docs():
    # Check if user has the authorization cookie
    if request.cookies.get('docs_access') == 'true':
        return render_template('docs.html', version=VERSION)
    
    return render_template('docs_auth.html', version=VERSION)

@app.route('/docs/auth', methods=['POST'])
@limiter.limit("10 per minute")
def docs_auth():
    otp_code = request.form.get('otp_code')
    totp_secret = os.environ.get("TOTP_SECRET")
    
    if not otp_code:
        return render_template('docs_auth.html', version=VERSION, error="Missing authentication code.")
        
    if not totp_secret:
        return render_template('docs_auth.html', version=VERSION, error="Server configuration error: TOTP secret missing.")
        
    totp = pyotp.TOTP(totp_secret)
    
    # Verify the code (allows 1 period before/after for slight time drift)
    if totp.verify(otp_code, valid_window=1):
        # Create a response that redirects to /docs
        resp = make_response(redirect('/docs'))
        # Set a cookie valid for 1 minute
        resp.set_cookie('docs_access', 'true', max_age=60, httponly=True, secure=False)
        return resp
    else:
        # Re-render with error
        return render_template('docs_auth.html', version=VERSION, error="Invalid code. Please try again.")


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
