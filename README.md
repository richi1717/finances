# finances

#### Getting Started

```
$ git clone git@github.com:richi1717/finances.git
$ npm i
```

After that you need to change the file name of bills2.json to bills.json and update your bills/cash budget with your needs.
The template is setup with name (name of the bill you have to pay), amount (how much it cost monthly), due (due date each month), debt (if it's something that can be paid off then "debt": true, if it's just a bill like cable then false), id (will be automatically created unless you hard code it in, if you do hard code it you must put the id in for this to work), payoff (is how much you owe total before it's paid off only for debts), and I have an asof (which I'm not using yet but in the future will keep track of the last payment for you).

Then:

```
$ npm run start
```

If you get an error like http server/webpack/webpack-dev-server any or all of those is not defined or installed, then:

```
$ npm i -g webpack webpack-dev-server http-server
$ npm run start
```

You should be able to point your browser to `http://localhost:8080/` and then use it.

#### Contribute

If there are any issues let me know or even better, I am willing and would love for anyone to contribute to this.  Feel free to do a pull request and I'll see if I want to use your changes and then give you credit:)  I used bootstrap for the styling and one of the last things I'd like to do is style it and make it look good.  Right now I'm using buttons because they look slick but I don't like the colors and I don't like the way it looks at all.  It is easy to read and such but just needs some love.

#### Use

Please use this to better yourself with a budget and get out of debt tool.  
