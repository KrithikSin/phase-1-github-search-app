document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const search = document.getElementById('search');
    let userUl = document.getElementById('user-list');
    let userInfo;
    let reposList = document.getElementById('repos-list');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        fetch(`https://api.github.com/users/${search.value}`).then((resp) =>
            resp.json().then((data) => {
                userInfo = document.createElement('div');
                console.log(data, data.login, data.avatar_url, data.url);

                userInfo.id = 'userInfo';
                let username = document.createElement('li');
                username.id = 'username';
                username.textContent = data.login;

                let avatarImg = document.createElement('img');
                avatarImg.id = 'avatar';
                avatarImg.src = data.avatar_url;
                let avatar = document.createElement('li');
                avatar.appendChild(avatarImg);

                let urlLink = document.createElement('li');
                urlLink.textContent = `Link To Page: ${data.url}`;

                userInfo.append(username, avatar, urlLink);
                userUl.append(userInfo);

                userInfo.addEventListener('click', function (e) {
                    fetch(
                        `https://api.github.com/users/${username.textContent}/repos`
                    )
                        .then((resp) => resp.json())
                        .then((data) => {
                            data.forEach((repo) => {
                                const repoLi = document.createElement('li');
                                repoLi.textContent = repo.url;
                                reposList.append(repoLi);
                            });
                            console.log(data);
                            // reposList.append(data);
                        });
                });
            })
        );
    });
});
