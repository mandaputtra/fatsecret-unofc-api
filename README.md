# Fat Secret Unofficial API

This are unofficial http interface to [Fat Secret](fatsecret.com) food databases. The API will show you information related about the food you're looking for. Remember that this are *unofficial*. Please report if something broken.

## Features

Here are some feature that this API offers you

### Multi Lang Multi Food

Some food are only available on your language, since Fat Secret had many [languages](https://www.fatsecret.co.id/Default.aspx?pa=sites) I tried to implement it as multi lang. However it still need some work. Since I only speak English and Indonesia for now it only support those two. You can make a pull request support your language!

### Search Food

To search food, you can do this:

```http
GET api/:lang/search?query=tempe&page=0

# query: name of your food
# page: go to current page
```

### Food Detail [WIP]

Print the detail of food that you're looking for

```http
GET api/:lang/detail
```

## Contribute

### Contribute to your own language

To make your language _plugin_ you could add to the settings [here](./utils/lang) let me explain whare are those config

```js
{
  lang: 'specify your language abbreviation',
  menuUrl: 'home page menu for foods',
  searchUrl: 'search url for fat secret',
  otherSizes: 'this are text that you will find 2 lines under the food name after you search food'
}
```