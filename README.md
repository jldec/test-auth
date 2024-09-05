# pub-test-auth

Test repo and website for pub-server persistent sessions and google-oauth.

To deploy on [fly.io](https://fly.io/) with manual start/stop

1. change name in fly.toml
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

# fly secrets
fly secrets set GID=$GID --stage
fly secrets set GCS=$GCS --stage
fly secrets set SSC=$SSC --stage
fly secrets set ACL_ADMIN=$ACL_ADMIN --stage
fly secrets set RCS=$_RCS --stage
fly secrets set RCP=$_RCP --stage
fly secrets set RCH=$_RCH --stage
fly secrets set RCA=$_RCA --stage
```
