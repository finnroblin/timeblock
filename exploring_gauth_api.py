from google_auth_oauthlib.flow import Flow
from google.oauth2.credentials import Credentials

flow = Flow.from_client_secrets_file(
    'secrets.json',
    scopes = ['profile','email'],
    redirect_uri='https://oauth2.example.com/code'
)

auth_url, _ = flow.authorization_url(prompt='consent')
print(f'URL: {auth_url}')

code = input('Enter auth code: ')
flow.fetch_token(code=code)

session = flow.authorized_session()
print(session.get('https://www.googleapis.com/userinfo/v2/me'))
# from google_auth_oauthlib.flow import InstalledAppFlow

# flow = InstalledAppFlow.from_client_secrets_file(
#     'secrets.json',
#     scopes=['profile','email']
# )

# flow.run_console()
# session = flow.authorized_session()

# profile_info = session.get('https://www.googleapis.com/userinfo/v2/me').json()
# print(profile_info)