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
        <div class="navbar">
            <div class="container">
                <div class="navbar-left">
                    <a href="/" class="navbar-logo"><img src="/assets/images/runpurpose-logo.svg" /></a>
                </div>
                <div class="navbar-right">
                    <ul class="navbar-menu">
                        <li>
                            <a href="#">${title}</a>
                        </li>
                        <li>
                            <a class="profile-login" href="#">${label}</a>
                        </li>
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