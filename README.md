#Empress

Empress is a bootstrapped blogging template that leverages [EmberJS](http://emberjs.com/) and GitHub. Empress lets you author your blog posts in [Markdown](http://daringfireball.net/projects/markdown/syntax), and uses git (and some Ruby hackery) to generate your blog on the fly. Empress leverages [Twitter Bootstrap](http://twitter.github.io/bootstrap/) to allow for easy styling.

![Empress](https://raw.github.com/hodgesmr/Empress/master/content/images/empress-screenshot.png "Empress")

##Quick Start

It is easy to launch a local instance of Empress:

```sh
git clone https://github.com/hodgesmr/Empress.git ~/Empress`
~/Empress/launch.py
```

If you want to host your Empress blog on GitHub, the following section will walk you through that.

##Empress on GitHub

This section will walk you through setting up Empress to be your hosted GitHub user page. For more details on setting up GitHub pages, see [GitHub's documentation](https://help.github.com/categories/20/articles).

First, create a new repository on GitHub called YOURNAME.github.io (where YOURNAME is your GitHub username).

Next, clone Empress (again, substitute YOURNAME as appropriate):

```sh
git clone https://github.com/hodgesmr/Empress.git YOURNAME.github.io
```
And edit your Git config file to point to your origin URL:

```sh
cd YOURNAME.github.io
git remote rm origin
git remote add origin https://github.com/YOURNAME/YOURNAME.github.io.git
```

Optionally, you can reference the original Empress project as an upstream source:

```sh
git remote add upstream https://github.com/hodgesmr/Empress.git
```

Finally, push:
```sh
git push -u origin master
```

At this point, you will be able to push/pull from your GitHub repository. If you chose to reference the Empress project as an upstream, you can bring down project changes:
```sh
git fetch upstream
git merge upstream/master
```

##Authoring posts

Use Markdown to author your blog posts. All posts should be placed in `/content/posts/`.

The Empress build process works by referencing files that have a commit in your git tree. While authoring a post (or changing any file), git commit as usual to track your changes. Once you are ready to publish your blog, add, commit, and then run `/build.rb`. You can see your changes locally with `/launch.py` before pushing.

####Conventions

A post's slug is determined by its filename. All post files should be named accordingly: `My-Blog-Post.md`. This tells Empress not only the resource location for your post, but also that the post slug will be `My-Blog-Post`.

The post's title is defined by the first line in its Markdown file. This should be denoted using Markdown's H1 atx syntax. So, the first line of your post file should be `#My Blog Post`.

##Other files

By default, Empress references two other files when rendering its template: `/content/about.md` and `/content/externalLinks.json`. Update these as necessary. Also, update your blog's title in `app.js`.

## A Matt Hodges project

This project is maintained by [@hodgesmr](http://twitter.com/hodgesmr)


