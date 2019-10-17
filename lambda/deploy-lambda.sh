#!/usr/bin/env bash
zip -r ./update-nba-game.zip .

# 上傳至 AWS S3
#aws s3 cp "./update-nba-game.zip" "s3://lambda/nodejs/update-nba-game.zip"

# ACTION => 創建或更新 lambda function
ACTION=$1
if [[ "${ACTION}" == 'create' ]]
then
  aws lambda create-function \
    --function-name "updateNbaGame" \
    --description "更新 NBA 主隊分數" \
    --zip-file fileb://update-nba-game.zip \
    --role "arn:aws:iam::516660701239:role/lambda-s3" \
    --runtime nodejs10.x \
    --handler "index.updateNbaGame" \
    --timeout 120 \
    --memory-size 128
elif [[ "${ACTION}" == 'update' ]]
then
  aws lambda update-function-code \
    --function-name "updateNbaGame" \
    --zip-file fileb://update-nba-game.zip
fi
