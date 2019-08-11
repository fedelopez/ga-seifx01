#!/usr/bin/env bash

# Fail immediately if any errors occur
set -e

brew install nvm
brew install rbenv

brew install postgres
brew services start postgres
createdb

brew install mongodb
brew services restart mongodb

gem install pg
brew cask install visual-studio-code
brew cask install iterm2

# nvm post-installation
# In your .bash_profile file (you may be using an other file, according to your shell), add the following:
# export NVM_DIR=~/.nvm
# source $(brew --prefix nvm)/nvm.sh

# Back to your shell, activate nvm and check it (if you have other shells opened and you want to keep them, do the same):
# source ~/.bash_profile
# nvm --version
