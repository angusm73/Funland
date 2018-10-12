<?php
/**
 * Funland landing page
 */

require "./inc/core.php";
require "./inc/header.php";?>

<div class="sw p-0">
    <div class="hero">
        <?=file_get_contents("$_SERVER[DOCUMENT_ROOT]/img/australia.svg")?>
        <?=file_get_contents("$_SERVER[DOCUMENT_ROOT]/img/gun-2.svg")?>
        <?=file_get_contents("$_SERVER[DOCUMENT_ROOT]/img/dodgem-2.svg")?>
        <?=file_get_contents("$_SERVER[DOCUMENT_ROOT]/img/arcade-machine-2.svg")?>
        <h1>Plenty of <span data-item="arcade-machine" class="active">Arcade Fun</span> <br><span data-item="dodgem">Dodgems</span> + <span data-item="laser-gun">Laser Tag</span></h1>
        <h2>At 6 locations</h2>
        <button class="btn" onclick="game.initGame()">Explore</button>
        <audio src="/sound/slow-down-baby.wav" id="cheeky-tune"></audio>
        <div class="audio-controls">
            <button class="btn play">&#9658;</button>
        </div>
    </div>
</div>

<div class="sw p-0">
    <div class="cta-row">
        <div class="img-wrapper">
            <?=file_get_contents("$_SERVER[DOCUMENT_ROOT]/img/celebration.svg")?>
        </div>
        <div class="text">
            <h2>Funland Parties</h2>
            <h3>Book your next party with us!</h3>
            <p>We have a great range of party packages that we can tailor to suit your needs and budget. We offer the best range at amazing value and can cater for groups of almost any size or age!</p>
        </div>
        <div class="actions">
            <a href="/parties" class="btn">Book now</a>
            <a href="tel:0244543220"><?php echo file_get_contents("$_SERVER[DOCUMENT_ROOT]/img/phone.svg"); ?> 4454 3220</a>
        </div>
    </div>
</div>

<div class="sw p-0">
    <div class="map-container">
        <h2>Our Locations</h2>
        <div class="map" id="map"></div>
    </div>
</div>

<div class="sw p-0">
    <div class="more-attractions">
        <h2>Attractions</h2>
        <div class="attraction">
            <a href="/attractions/laser-tag" class="img-wrapper">
                <img src="/img/home/laser-tag.jpg" alt="Laser Tag">
            </a>
            <h3><a href="/attractions/laser-tag">Laser Tag</a></h3>
            <p>Funland has one of the best multi level laser arenas in the country.
                We know you’ll enjoy our Laser challenge.</p>
        </div>
        <div class="attraction">
            <a href="/attractions/dodgems" class="img-wrapper">
                <img src="/img/home/dodgems.jpg" alt="Dodgems">
            </a>
            <h3><a href="/attractions/dodgems">Dodgems</a></h3>
            <p>The latest cars with great music – the Fun never stops as you race
                around the track, avoiding the others for the fastest ride.</p>
        </div>
        <div class="attraction">
            <a href="/attractions/arcade-games" class="img-wrapper">
                <img src="/img/home/arcade-games.jpg" alt="Arcade Games">
            </a>
            <h3><a href="/attractions/arcade-games">Arcade Games</a></h3>
            <p>Driving, bowling, shooting, token, skill, prize, redemption, pinball,
                crane, dedicated and video games. We have them all!</p>
        </div>
        <div class="attraction">
            <a href="/attractions/jump-star" class="img-wrapper">
                <img src="/img/home/jump-star-drop-ride.jpg" alt="Jumping Star">
            </a>
            <h3><a href="/attractions/jump-star">Star Jump</a></h3>
            <p>This full size drop ride will thrill the kids as it takes them up
                more than two storeys then drops and bounces them up and down.</p>
        </div>
        <a href="/attractions" class="view-all" data-hover="view all rides, games &amp; activities"><span>view all rides, games &amp; activities</span></a>
    </div>
</div>

<?php
require "./inc/footer.php";
?>
