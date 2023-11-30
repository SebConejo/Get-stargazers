const axios = require('axios');
const fs = require('fs');

const token = 'YOUR_GITHUB_TOKEN'; // Replace by yout personal GitHub token
const startStargazer = 10; // start from the 10th stargazer
const endStargazer = 1000; // end by the 1000th stargazer (max 5000 request per hour per token for GitHub API)
const perPage = 100; // Number of result per page (max 100 for GitHub API)

async function getGithubStargazers(repoUrl) {
    const parts = repoUrl.split('/');
    const username = parts[parts.length - 2];
    const repoName = parts[parts.length - 1];

    let page = Math.floor((startStargazer - 1) / perPage) + 1;
    let apiUrl = `https://api.github.com/repos/${username}/${repoName}/stargazers?page=${page}&per_page=${perPage}`;
    const stargazers = [];

    try {
        while (stargazers.length < endStargazer - startStargazer + 1) {
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });

            stargazers.push(...response.data.map(user => user.login));

            if (!response.headers.link || !response.headers.link.includes('rel="next"')) {
                break;
            }

            const nextLink = response.headers.link.split(',').find(s => s.includes('rel="next"'));
            apiUrl = nextLink.match(/<(.*?)>/)[1];
        }
    } catch (error) {
        console.error("Error fetching stargazers: ", error);
        return;
    }

    return stargazers.slice(startStargazer - 1 - (page - 1) * perPage, endStargazer - (page - 1) * perPage);
}

const repoUrl = 'https://github.com/user/repo'; // Replace by your repo URL
getGithubStargazers(repoUrl).then(stargazers => {
    fs.writeFile('stargazers.json', JSON.stringify(stargazers, null, 2), err => {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier JSON', err);
        } else {
            console.log('Fichier stargazers.json créé avec succès');
        }
    });
});
