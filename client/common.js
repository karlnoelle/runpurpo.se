$(function() {
    const $headerDiv = $('.header');
    const title = $headerDiv.data('title');
    let href, label;
    
    let user = JSON.parse(window.localStorage.getItem('who'));
    if (user) {
        label = user.name;
    } else {
        user = { name: 'Guest' };
        window.localStorage.setItem('who', JSON.stringify(user));
        label = 'Login';
    }

    function showLoginPanel() {
        alert('show modal');
    }

    
    $headerDiv.html(`
        <div class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <button class="navbar-toggle" type="button">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    </button>
                    <a href="/" class="navbar-brand"><img src="/assets/images/runpurpose-logo.svg" /></a>
                </div>
                <div class="navbar-collapse collapse" id="navbar-main">
                    <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a>${title}</a>
                    </li>
                    <li><a class="profile-login" href="#">${label}</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `);
    $headerDiv.find('a.profile-login').click(function (e) {
        if (user) {
            window.location.href = '/profile';
        } else {
            showLoginPanel();
        }
    });
});