#!/bin/bash -eux

SOURCE_TOKEN=********
TARGET_TOKEN=********

post_commands() {
curl --silent --show-error --fail --write-out '\n' -X GET \
    https://api.nightbot.tv/1/commands \
    -H "Authorization: Bearer $1" \
    | jq '.commands[]' -c \
    | xargs -t -d '\n' -I'{}' \
        curl --silent --show-error --fail --write-out '\n' -X POST \
            https://api.nightbot.tv/1/commands \
            -H "Authorization: Bearer $2" \
            -H 'Cache-Control: no-cache' \
            -H 'Content-Type: application/json' \
            -d '{}'
}

get_commands() {
    curl --silent --show-error --fail --write-out '\n' -X GET \
        https://api.nightbot.tv/1/commands \
        -H "Authorization: Bearer $1" \
        | jq '.commands[]' -c \
        | xargs -t -d '\n' -I'{}' \
            echo -e ">>> {}\n"
}

delete_commands() {
    curl --silent --show-error --fail --write-out '\n' -X GET \
        https://api.nightbot.tv/1/commands \
        -H "Authorization: Bearer $1" \
        | jq '.commands[]._id' -c \
        | xargs -t -I'{}' \
            curl --silent --show-error --fail --write-out '\n' -X DELETE \
                "https://api.nightbot.tv/1/commands/{}" \
                -H "Authorization: Bearer $1" \
                -H 'Cache-Control: no-cache'
}


delete_commands $TARGET_TOKEN

post_commands $SOURCE_TOKEN $TARGET_TOKEN

get_commands $TARGET_TOKEN
