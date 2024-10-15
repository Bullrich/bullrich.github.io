---
layout: "layouts/blog.html"
title: "My must have software after a fresh install"
date: 2023-02-27
categories: blog
---

Every time I get a new macbook I install the same programs. These are my installation instructions. 
I wrote this mainly for my use, but could be useful for anyone else.

# Install [Homebrew](https://brew.sh/)

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

## Install base packages

This are the packages that I first need to configure

`brew install git zsh`

## Enable VIM syntax highlighting

It just makes reading files easier. Create the file `~/.vimrc` with the following:
```vim
syntax on
```

## Add Git alias

I use these git scripts to simplify my work flow
```ini
[alias]
        tree = log --graph --all --decorate --pretty=oneline --abbrev-commit

        tree-one = log --graph --decorate --oneline --abbrev-commit

        nuke = !git reset --hard && git clean -xdf
        reboot = !git reset --hard && git clean -df
```

## Install Dark Theme

I like the Dracula Dark theme for the MacOS terminal

`git clone https://github.com/dracula/terminal-app.git ~/Documents/dracula`

- Then open your terminal and select the `Dracula.terminal` file.

## Install [Oh-My-Zsh](https://ohmyz.sh/)

First, install the library: `sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`

Then add the plugins:

- Auto suggestions: `git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions`
- Syntax highlighting: `git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`

Finally, modify the `~/.zshrc` file to have the following content

```sh
# Path thingy goes above

ZSH_THEME="avit"

plugins=(git git-flow brew colorize zsh-syntax-highlighting zsh-autosuggestions)

source $ZSH/oh-my-zsh.sh
```

# Install other apps

Finally, I install my most common used libs and apps

`brew install mdv tldr tree yarn nvm deno gh imagemagick jq tree lazygit`

`brew install --cask 1password docker google-chrome arc cleanshot docker firefox postman fork jetbrains-toolbox visual-studio-code pinta`

# Windows installation

If I'm installing a new Windows computer, I first install [Chocolatey](https://chocolatey.org/install) and then run the following command:

`choco install 7zip battle.net discord Firefox git google-drive steam vlc vscode windirstat`

---

That's all! I'll be updating this file based on my new requirements.
