# Configuring role-specific emojis on Discord

## Prerequisites

### Create a Discord application and bot user

Unfortunately Discord's emoij API is only available to bot users
and can not be directly invoked by a user with sufficient permissions.

A Discord application can be created on the [Developer Portal](https://discordapp.com/developers/applications/):

* Click `Create an application` and enter a name.
* Navigate to the `Bot` section, click `Add Bot` and then confirm the dialog.
* Enter or update its username.
* If you are the owner of the Discord server you want the bot to join, uncheck `Public Bot`.
  Otherwise keep the bot public until the owner of the server has invited it (see below).
* Uncheck `Requires OAuth2 Code Grant`.
* Click `Save Changes`.


### Invite the bot user a Discord server

A Discord bot can only interact with servers it was invited to.
The following steps describe how this can be achieved:

* Navigate to the `Create an application` section, click `Add Bot` and then confirm the dialog.
* Click `Create an application` and enter a `Redirect`. For example: `https://broughy.com`<br>
  (the URL does not matter for this scenario)
* Click `Save Changes`.
* Use the `OAuth2 URL Generator`:
    * Select the redirect URL.
    * Check the `bot` scope and then check the bot permission `Manage Emojis`.
    * Copy the generated URL.<br>
      If you are the owner of the Discord server, use the URL to invite the bot yourself.<br>
      If you don't own the server, send the invitation link to the owner and wait until the bot is invited. 
      Then navigate to the `Bot` section uncheck `Pucblic Bot`.


### Obtain an API token

Using Discord's API with the bot requires an authentication token.
Think of this token as the username and password for the bot and **never share the token**.
It can be found developer portal:

* Navigate to the `Bot` section and click `Copy` or `Click to Reveal Token`.
* Replace the placeholder `$TOKEN` in following commands with the actual token.


## Using Discord's API

### Get guilds

Discord's API refers to servers as "Guilds".
The following commands require the `guild.id` of the server you want to interact with.
Replace the placeholder `$GUILD` in following commands with the actual `guild.id`.
  
Guilds can be listed using the following command
(see [Get Current User Guilds](https://discordapp.com/developers/docs/resources/user#get-current-user-guilds) for further details):

```bash
curl -X GET https://discordapp.com/api/users/@me/guilds \
  -H 'Accept: application/json' \
  -H "Authorization: Bot $TOKEN" \
  -H 'cache-control: no-cache'
```


### Get roles

Configuring role-specific emojis requires the `id` of the roles you want to whitelist.
Replace the placeholder `$ROLE` in following commands with the actual `role.id`.

Roles can be listed using the following command
(see [Get Guild Roles](https://discordapp.com/developers/docs/resources/guild#get-guild-roles) for further details):

```bash
curl -X GET "https://discordapp.com/api/guilds/$GUILD/roles" \
  -H 'Accept: application/json' \
  -H "Authorization: Bot $TOKEN" \
  -H 'cache-control: no-cache'
```

You can write the response to a file by adding the `-o roles.json` argument
and then use the following command to only show the `id` and `name` of the roles: 
```bash
jq -c '.[] | {id:.id,name:.name}' roles.json
```


### Get emojis

Configuring role-specific emojis requires the `id` of the emojis you want to modify.
Replace the placeholder `$EMOJI` in following commands with the actual `emoji.id`.

Emoji can be listed using the following command
(see [List Guild Emojis](https://discordapp.com/developers/docs/resources/emoji#list-guild-emojis) for further details):

```bash
curl -X GET "https://discordapp.com/api/guilds/$GUILD/emojis" \
  -H 'Accept: application/json' \
  -H "Authorization: Bot $TOKEN" \
  -H 'cache-control: no-cache' 
```

You can write the response to a file by adding the `-o emojis.json` argument
and then use the following command to only show the `id`, `name` and `roles` of the emojis: 
```bash
jq -c '.[] | {id:.id,name:.name}' emojis.json
```


### Patch emojis

Each emoji has a `roles` whitelist that can be modified using Discord's API.

* An empty list (i.e. `"roles": []`) means that everyone has access to the emoji.
* A list with one role (e.g. `"roles": ["$ROLE"]`) means that only users with this role have access to the emoji.
* A list with multiple roles (e.g. `"roles": ["$ROLE", "$ROLE"]`) means that the emoji can be accessed by all users with any of these roles.


Use the `id` of guild, emoji and roles in the following command to configure the whitelist
(see [Modify Guild Emoji](https://discordapp.com/developers/docs/resources/emoji#modify-guild-emoji) for further details):

```bash
curl -X PATCH "https://discordapp.com/api/guilds/$GUILD/emojis/$EMOJI" \
  -H 'Accept: application/json' \
  -H "Authorization: Bot $TOKEN" \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{ "roles": ["$ROLE", "$ROLE", "$ROLE"] }'
```
