<?php
/**
 * Funland landing page
 */

require "./inc/core.php";
require "./inc/header.php";?>

<div class="sw p-0">
    <div class="hero">
        <h1>3 Levels of <span data-item="arcade-machine">Arcade Fun</span> <br><span data-item="dodgem">Dodgems</span> <br>+ <span data-item="laser-gun" class="active">Laser Tag</span></h1>
        <button class="btn">Explore</button>
        <?=file_get_contents("$_SERVER[DOCUMENT_ROOT]/img/gun.svg")?>
        <?=file_get_contents("$_SERVER[DOCUMENT_ROOT]/img/dodgem.svg")?>
        <?=file_get_contents("$_SERVER[DOCUMENT_ROOT]/img/arcade-machine.svg")?>
        <audio src="/sound/slow-down-baby.wav" id="cheeky-tune"></audio>
        <div class="audio-controls">
            <button class="btn play">&#9658;</button>
        </div>
    </div>
</div>

<div class="sw p-0">
    <!-- <div class="img-wrapper">
        <img src="/img/home/parties.jpg" alt="Parties">
    </div> -->
    <div class="cta-row">
        <div class="img-wrapper">
            <?=file_get_contents("$_SERVER[DOCUMENT_ROOT]/img/celebration.svg")?>
        </div>
        <div class="text">
            <h2>Birthday coming up?</h2>
            <h3>Book a Funland party</h3>
        </div>
        <a href="/parties" class="btn">Book now</a>
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
        <a href="/attractions" class="view-all">view all rides, games &amp; activities</a>
        <div class="attraction">
            <img src="/img/home/laser-tag.jpg" alt="Laser Tag">
            <h3>Laser Tag</h3>
            <p>Funland has one of the best multi level laser arenas in the country.
                We know you’ll enjoy our Laser challenge.</p>
        </div>
        <div class="attraction">
            <img src="/img/home/dodgems.jpg" alt="Dodgems">
            <h3>Dodgems</h3>
            <p>The latest cars with great music – the Fun never stops as you race
                around the track, avoiding the others for the fastest ride.</p>
        </div>
        <div class="attraction">
            <img src="/img/home/arcade-games.jpg" alt="Arcade Games">
            <h3>Arcade Games</h3>
            <p>Driving, bowling, shooting, token, skill, prize, redemption, pinball,
                crane, dedicated and video games. We have them all!</p>
        </div>
        <!-- <div class="attraction">
            <h3>Air Hockey</h3>
            <p>Driving, bowling, shooting, token, skill, prize, redemption, pinball,
                crane, dedicated and video games. We have them all!</p>
        </div>
        <div class="attraction">
            <h3>Space Invaders</h3>
            <p>Driving, bowling, shooting, token, skill, prize, redemption, pinball,
                crane, dedicated and video games. We have them all!</p>
        </div> -->
        <div class="attraction">
            <img src="/img/home/jump-star-drop-ride.jpg" alt="Jumping Star">
            <h3>Star Jump</h3>
            <p>This full size drop ride will thrill the kids as it takes them up
                more than two storeys then drops and bounces them up and down.</p>
        </div>
    </div>
</div>

<?php
require "./inc/footer.php";
?>
