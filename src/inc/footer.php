    <!-- Footer -->
    <div class="footer">
        <footer>
            <nav class="footer-nav">
                <a href="/about" id="fAboutLink" title="See who we are + what we have to offer"<?= ($page_id == 3 ? ' class="active"' : '') ?>><span>About Us</span></a>
                <a href="/attractions" id="fAttractionsLink" title="View our great value rides + attractions"<?= ($page_id == 2 ? ' class="active"' : '') ?>><span>Attractions</span></a>
                <a href="/parties" id="fPartyLink" title="Info about our parties" <?= ($page_id == 4 ? ' class="active"' : '') ?>><span>Parties</span></a>
                <a href="/contact" id="fContactLink" title="Get in touch via phone, email or drop into the box" <?= ($page_id == 5 ? ' class="active"' : '') ?>><span>Contact</span></a>
            </nav>
            <div class="social">
                <a href="tel:0244543220" class="phone" id="fCtaNumber">(02) 4454 3220</a>
                <a href="https://www.facebook.com/FunlandUlladulla/" target="_blank" title="View CrossFit Huey on Facebook">
                    <svg enable-background="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Flat_copy" fill="currentColor"><path d="M11.848,32h6.612V15.998h4.411l0.584-5.514H18.46l0.007-2.761c0-1.437,0.137-2.209,2.2-2.209h2.757V0h-4.412   c-5.299,0-7.164,2.675-7.164,7.174v3.311H8.545v5.515h3.303V32z"/></g></svg>
                </a>
                <a href="https://www.instagram.com/ulladullafunland/" target="_blank" title="View CrossFit Huey on Instagram">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="currentColor" viewBox="0 0 56.7 56.7" enable-background="new 0 0 56.7 56.7" xml:space="preserve"><g><path d="M28.2,16.7c-7,0-12.8,5.7-12.8,12.8s5.7,12.8,12.8,12.8S41,36.5,41,29.5S35.2,16.7,28.2,16.7z M28.2,37.7 c-4.5,0-8.2-3.7-8.2-8.2s3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2S32.7,37.7,28.2,37.7z"></path><circle cx="41.5" cy="16.4" r="2.9"></circle><path d="M49,8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7,0-14.5,5.8-14.5,14.5v20.5c0,4.3,1.4,8,4.2,10.7c2.7,2.6,6.3,3.9,10.4,3.9 h20.4c4.3,0,7.9-1.4,10.5-3.9c2.7-2.6,4.1-6.3,4.1-10.6V19.3C53,15.1,51.6,11.5,49,8.9z M48.6,39.9c0,3.1-1.1,5.6-2.9,7.3 s-4.3,2.6-7.3,2.6H18c-3,0-5.5-0.9-7.3-2.6C8.9,45.4,8,42.9,8,39.8V19.3c0-3,0.9-5.5,2.7-7.3c1.7-1.7,4.3-2.6,7.3-2.6h20.6 c3,0,5.5,0.9,7.3,2.7c1.7,1.8,2.7,4.3,2.7,7.2V39.9L48.6,39.9z"></path></g></svg>
                </a>
            </div>
            <div class="logo">
                <a href="/">
                    <img src="/img/funland-logo.png" alt="CrossFit Huey">
                </a>
            </div>
            <p class="copyright">&copy; <?=date('Y')?> Funland Australia - All rights reserved</p>
        </footer>
    </div>

    <!-- SIGNUP MODAL -->
    <div class="overlay"></div>
    <div class="modal">
        <a href="#" class="close">x</a>
        <div class="inner">
            <h1>Modal title</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quas, quo fugiat rerum voluptate, veritatis eos quaerat labore tempora similique dolorum explicabo et tempore blanditiis, doloremque quasi delectus voluptates. Ea.</p>
            <form action="/contact?submit" method="post">
                <input type="hidden" name="_tok" value="<?=$_SESSION['csrf_token']?>">
                <div class="input-group">
                    <label for="join_name" class="form-label">Your name</label>
                    <input type="text" name="name" id="join_name" class="form-control" required>
                </div>
                <div class="input-group">
                    <label for="join_phone" class="form-label">Phone number</label>
                    <input type="tel" name="phone" id="join_phone" class="form-control" required>
                </div>
                <div class="input-group">
                    <label for="join_email" class="form-label">Email address <small>(optional)</small></label>
                    <input type="email" name="email" id="join_email" class="form-control">
                </div>
                <div class="input-group">
                    <label for="join_message" class="form-label">Message <small>(optional)</small></label>
                    <textarea name="message" id="join_message" class="form-control" rows="4"></textarea>
                </div>
                <div class="loader"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>
                <button type="submit" class="btn">Submit</button>
                <div class="results"></div>
            </form>
        </div>
    </div>
    <?php if (isset($_GET['mode']) && $_GET['mode'] == 'login' && !$logged_in) {?>
    <div class="login-modal">
        <div class="inner">
            <h1>Admin Login</h1>
            <form action="/login.php?submit" method="POST" class="form">
                <input type="hidden" name="_tok" value="<?=$_SESSION['csrf_token']?>">
                <div class="input-group inline">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" name="username" id="username" class="form-control">
                </div>
                <div class="input-group inline">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" name="password" id="password" class="form-control">
                </div>
                <div class="loader"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>
                <button type="submit" class="btn">Login</button>
                <div class="results"></div>
            </form>
        </div>
    </div>
    <script>
        document.addEventListener("DOMContentLoaded", function(event) {
            front_end.modal.open('.login-modal')
        });
    </script>
    <?php }?>

    <!-- <script src="/js/libs/axios/axios.min.js"></script> -->
    <?php if ($logged_in) {?><script src="/js/admin.js"></script><?php }?>
    <script src="/js/main.js"></script>
    <script src="/js/game.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=<?=$google_api_key?>&callback=front_end.initMap"
        async defer></script>
</body>

</html>
