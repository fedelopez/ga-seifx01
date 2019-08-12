# Day 01

What we covered today:

- Introduction | Orientation | Housekeeping
- Structure of the Course
- Introduction to the Command Line
- IMDb top 250 CLI challenge
- Command Line Murder Mystery

## Introduction | Orientation | Housekeeping 35mins

- Aaron Cox - Co-Lead Instructor - aaron.cox@ga.co **5mins**
- Fede Lopez - Co-Lead Instructor - fede.lopez@ga.co **5mins**
- Yianni Moustakas - Instructional Associate / Teaching Assistant - yianni.moustakas@ga.co​ **5mins**
- Students - introduce yourselves **20mins** eg. who they are, what they do, guilty pleasure              

The GA campus is typically open from 8.45am to 9:30pm on weekdays and from 9am to 6:30pm on Saturdays. 
The campus is closed on Sundays and public holidays.

## Classroom Values 5-10mins

You guys came up with these rules for the next 6 months:

- 
- 
- 
- 
- 

## Hacker Culture 5mins
                
### Slack

`ga-students.slack.com@#seifx-sydney-seifx01`

Share things with the class!

- Books
- Movies
- TV series
- Stupid memes
- Code snippets

### Hacker wisdom

- [​The Jargon File​](http://www.catb.org/jargon/html/index.html)
- [​The Tao of Programming​](http://canonical.org/~kragen/tao-of-programming.html)
- [The Codeless Code](http://thecodelesscode.com/contents)
    
Example app: https://jsbin.com/xequpubenu/edit?html,js,output
    
### Newsletters 5mins

- [Ruby Weekly​​](https://rubyweekly.com)
- [Javascript Weekly​](https://javascriptweekly.com)
- [Versioning​](https://www.sitepoint.com/versioning)
- [Sidebar​](https://sidebar.io)
- [Code Project](https://www.codeproject.com)

### Meetups 5mins

One of the amazing things about the development community is that it is very active, inclusive, social and supportive - people actually take time out of their lives to help other developers and attend meetups to: 

- learn more about development, and 
- socialize with others in the community

There are a ton of meetups in Sydney (most of which can be found on meetups.com.au), but the two most relevant to this course are:
​
- [RORO​](https://www.meetup.com/en-AU/Ruby-On-Rails-Oceania-Sydney)
- [​SydJS​](http://www.sydjs.com)

### Online coding links 10mins

- [​Gist](http://gist.github.com): sharing code, notes and guides
- Paste Bins: sharing code, debugging code, testing code (esp JS, HTML, CSS):
    - [​CodePen​](http://codepen.io)
    - ​[PasteBin​](http://pastebin.com)
    - [​JS Bin](http://jsbin.com)​
- REPLs: 'Read, Evaluate, Print, Loop' - interactive environments for evaluating code:
    - ​[REPL.it​](https://repl.it)
    - [Babel​](https://babeljs.io/repl)

## Structure of the Course (ask Yianni to elaborate on project milestones) 5-10mins

- Frontend
- Project 00
- Ruby 
- Ruby on Rails
- Project 01
- Mid-course celebration on Saturday of week 12 (drinks and pizza during class)
- Backend
- Project 02
- Advanced Backend
- Project 03
- End-of-course graduation celebration in week 25 (drinks off-site at a nearby bar)

### Your first week will look like this 5mins

- Command line
- Intro to programming in JavaScript
- Source code version control with Git

## A typical day here at GA 10mins

- Week class kicks off at 6pm till 9:30pm
    - Tuesday - Aaron 
    - Thursday - Fede
- Saturday class kicks off at 9:30
    - alternating roster between Aaron and Fede
    - Saturday morning warm-up exercise of 1h (Yianni to elaborate)
    - lunch break 1hour (decide lunch break with students)
- Breaks (decide with students)
- Every 2nd Wednesday outcome session from 5pm to 6pm

This is a typical day, but we have a Slack channel too! reach out and help out each other in class channel (not direct)

## GitBook, Homework Repository, Code-Along Repository (Yianni to run it) 5mins

- GitBook: You're reading it right now. At the end of each day, Yianni will update this GitBook to include notes for the day's lessons.
- [​​Homework Repo](https://github.com/Yiannimoustakas/seifx01-homework): Before class every morning, you should submit your homework for the last day using Github. The repository ("repo") has instructions for submitting your homework.
- ​[Classwork Repo](https://github.com/fedelopez/ga-seifx01): Missed something during a code-along? You can check this repository for the 'official' code.

### The Command Line

The command-line interface - aka "the CLI" or the shell - is a tool that performs specific tasks in response to user-typed commands. It has the potential to save you lots-and-lots of time because it can automate things, loop through items etc.

Software engineers live on the command line. It gives us fast, reliable, and automatable control over computers. Web servers usually don't have graphical interfaces,n so we need to interact with them through command line and programmatic interfaces. 

Once you become comfortable using the command line, staying on the keyboard will also help you keep an uninterrupted flow of work going without the disruption of shifting to the mouse.

macOS users: for running commands in the CLI you can use [iTerm2](https://www.iterm2.com)

`brew cask install iterm2`

Windows users: for running commands in the CLI you can use [cygwin](https://www.cygwin.com)

`choco install cygwin`

## Code-along

### list files and folders in the current directory:

`ls`

### you can also pass flags to display addition info such as permissions:

`ls -l`

### list all including hidden files:

`ls -la`

### go back to your home (`~`) directory:

`cd`

`cd ~`

`cd $HOME`

### go anywhere:

`cd ~/workstation`

### go to the root:

`cd /`

### we use echo to display text:

`echo Hello, World!`

### and printf is a little bit more sophisticated:

`printf 'Hello, World!\nHola Mundo!'`

### to add text to a text file we use redirection operators:

`echo john > names.txt`

`cat names.txt`

### to append text to a text file we use the double arrow heads:

`echo james >> names.txt` 
`echo mary >> names.txt` 

`cat names.txt`

### use `tail` or `less` to watch for content changes: 

`tail -f names.txt`
`less +F names.txt`

### which names start with the letter `j`?

`cat names.txt | grep ^j`

### you can also count the number of entries:

`cat names.txt | wc -l`

### quizz: sort the names in the file using `sort` and place the result another file in just one line.

tip: `man sort` will show you how to use the program `sort`

solution: `cat names.txt | sort > sorted.txt`

### to move a file we use the mv command:

`mv names.txt students.txt`

### we can also make a copy:
    
### `cp students.txt students.txt.bck`

### we can delete a file:

`rm students.txt.bck`

### quizz: create a folder and add some files to it. How can you remove the folder with everything from it?

### pbcopy and pbpaste let you interact with the clipboard:
 
`pbcopy < students.txt`

`pbpaste`

### top	displays active processes:

`top`

### execute the last command typed:

`!!`

### see the history of commands executed:

`history`

### open a program

`open -a "Visual Studio Code"`

### create an alias

`alias code='open -a "Visual Studio Code"'`

but this only lasts for the current session, what if we want to keep this alias always?

## Enter Bash profile

`vim ~/.bash_profile`

```bash
echo "Welcome to the terminal"
alias vs='open -a "Visual Studio Code"'
PS1="\W $ "
```

and we make the changes happen by sourcing the file

`source ~/.bash_profile`

now we can open VS Code very easily:

`vs`

## IMDb top 250 CLI challenge

- open https://raw.githubusercontent.com/jberkel/imdb-movie-links/master/top250.txt
- copy the page contents in the clipboard
- go to the command line and just by using the CLI:

How many movies released in 2007 made it to the top 250?

## Command-line Murder Mystery

Clone the repo or download it from [here](https://github.com/veltman/clmystery).

Follow the instructions in the `README.md`

