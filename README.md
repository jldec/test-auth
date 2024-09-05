# pub-test-auth

Test repo and website for pub-server persistent sessions and google-oauth.

- Access restricted to known emails, authenticated using google oauth
- Sessions maintained with a rolling 1-hour cookie, persisted in redis,
- Browser sends urls on nav, stored with offset (in seconds) in session log.
- Server can be stopped and restarted without losing session.

![Screenshot 2024-09-05 at 10 29 59](https://github.com/user-attachments/assets/61397bc2-c0e3-4dc7-aea4-f0dd803b76b6)

### To deploy locally

1. Clone this repo and `pnpm install`.
1. Install a remotely managed [cloudflare tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/configure-tunnels/remote-management/) with a public hostname routing to service HTTP://localhost:3001.
2. Install redis e.g. with `brew install redis`
3. Create `.env` file with your [google oauth2](https://console.cloud.google.com/apis/credentials) credentials

```sh
$ source ./.env
$ pnpm start
```

### To deploy on [fly.io](https://fly.io/) with manual start/stop

1. change name in fly.toml and create app with `fly launch`
2. create `.env` and `.fly-secrets` and make executable with chmod +x
3. run in order

```sh
$ source ./.env
$ ./.fly-secrets
$ fly deploy
```

#### .env
```sh
# see fly.toml
# APP=https://test-auth.fly.dev = fly.io endpoint, internal port 3000
# APP=https://some.example.com = cloudflare tunnel to localhost:3001
export APP=https://some.example.com

# google oauth
# https://console.cloud.google.com/apis/
export AUTH=pub-pkg-google-oauth
export GID=???_oauth_client_id_???
export GCS=???_oauth_client_secret_???

# pub-serve-session
export SSC=???_session_secret_???

# ACLS
export ACL_ADMIN=???_comma_separated_admin_user_emails_???
export ACL_EDIT=???_optional_comma_separated_editor_emails_???
export ACL_READ=???_optional_comma_separated_reader_emails_???

# redis
# _ prefix avoids hitting hosted redis service from localhost
export REDIS=1
export _RCS=???_set_to_1_for_rediss_???
export _RCP=???_redis_port_???
export _RCH=???_redis_hostname_???
export _RCA=???_redis_password_???

echo 'auth credentials set'
echo 'run ./.fly-secrets to update secrets on fly.io.'
```

#### .fly-secrets
```sh
#!/bin/bash

fly secrets set --stage \
GID=$GID \
GCS=$GCS \
SSC=$SSC \
ACL_ADMIN=$ACL_ADMIN \
RCS=$_RCS \
RCP=$_RCP \
RCH=$_RCH \
RCA=$_RCA
```
