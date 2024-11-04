#!/bin/sh

commit_msg_file=$1
commit_msg=$(cat $commit_msg_file)

emoji_map() {
  case $1 in
    feat) echo "✨";;
    fix) echo "🐛";;
    docs) echo "📝";;
    format) echo "🎨";;
    style) echo "💄";;
    remove) echo "🗑️";;
    refactor) echo "♻️";;
    perf) echo "⚡";;
    test) echo "🧪";;
    build) echo "🏗️";;
    ci) echo "👷";;
    chore) echo "🧹";;
    revert) echo "⏪";;
    hotfix) echo "🚑️";;
    typo) echo "✏️";;
    deps) echo "📦";;
    init) echo "🎉";;
    config) echo "🔧";;
    security) echo "🔒";;
    ux) echo "💄";;
    i18n) echo "🌐";;
    analytics) echo "📈";;
    accessibility) echo "♿";;
    move) echo "🚚";;
    rename) echo "🔤";;
    license) echo "📜";;
    breaking) echo "💥";;
    mock) echo "🤡";;
    seed) echo "🌱";;
    docker) echo "🐳";;
    experiment) echo "⚗️";;
    comment) echo "💬";;
    types) echo "🏷️";;
    deprecated) echo "🗑️";;
    log) echo "🔊";;
    assets) echo "🖼️";;
    *) echo "";;
  esac
}

prefix=$(echo $commit_msg | cut -d':' -f1)
emoji=$(emoji_map $prefix)

if [ -n "$emoji" ]; then
  new_commit_msg="$emoji $commit_msg"
  echo "$new_commit_msg" > $commit_msg_file
fi