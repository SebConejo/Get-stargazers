# Get Stargazers

This tool allow to get github stargazer profils from a github repository using Github API.

## prerequisites
- [Node.js 18](https://nodejs.org/fr)
- [Axios](https://axios-http.com/fr/docs/intro) running ` npm install axios`

## How to use

1. Clone or download the repository

2. Make sure you replace `YOUR_GITHUB_TOKEN`` with your actual GitHub personal access token

3. Update the `https://github.com/user/repo` url by a repo URL.

4. On your ternminal, rune the following command:

```
node stargazers.js
```

The script will create a `stargazers.json` file at the root with the emails found for each user.

**Result example:**

```
// stargazers.json
[
  "username1",
  "username2",
  "username3"
]
```

**Notes**

1. The script can take a few minutes depending on the number of users you want to retrieve emails for.

2. API Github limits the number of requests to 5000 per hour per token.

3. If you repeat the command, the `stargazers.json` file will overwrite the previous one.

## Related tools
Once you get the list, you can use [fetch-emails](https://github.com/SebConejo/fetch-emails) to get emails from the list of users.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
