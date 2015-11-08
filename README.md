# Short screencast

![Screen Cast](https://drive.google.com/file/d/0BxzvQixnNXlcXzhLOEdMYWl1RGc/view?usp=sharing)

# How to run

## Install jekyll

Instuctions can be found [here](https://help.github.com/articles/using-jekyll-with-pages/#installing-jekyll)

## Clone this repository

Something like 
`git clone git@github.com:PhantomYdn/investicon.git`
or
`git clone https://github.com/PhantomYdn/investicon.git`

## Run jekyll

Goto newly create local repository 'invericon' and run

`jekyll serve --port 80`

**Important:** Do not forgot to run it on port 80. Retsly key works only for addresses like http://localhost

## Open site in your browser

Goto http://localhost

## User Experience

You will see "common" page on "common" real estate site. But there is blue icon on right side. Click it!
Dialog box should apear. You can enter some address or zipcode (for example 85933 - not all areas covered.). 
Then you can go through data in list mode or in map mode.


# Troubleshuting

If you have problems with running jekyll on 80 port, try to execute the following command on your linux box:

`sudo setcap 'cap_net_bind_service=+ep' /usr/bin/ruby2.2`
